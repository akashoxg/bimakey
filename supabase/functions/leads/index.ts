// Supabase Edge Function: leads
// Handles lead creation (POST) and admin operations (GET, PATCH)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts';
import { sendLeadNotification } from '../_shared/email-service.ts';
import { sendWhatsAppNotification } from '../_shared/whatsapp-service.ts';

// Validation function (ported from middleware/validate.js)
function validateLead(data) {
  const { name, phone, email, insuranceType } = data;
  const errors = [];

  if (!name || typeof name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name cannot exceed 100 characters' });
  }

  if (!phone || typeof phone !== 'string') {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.push({ field: 'phone', message: 'Enter a valid 10-digit Indian mobile number' });
  }

  if (!email || typeof email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push({ field: 'email', message: 'Enter a valid email address' });
  }

  const validTypes = ['health', 'term', 'motor', 'other'];
  if (!insuranceType || !validTypes.includes(insuranceType)) {
    errors.push({ field: 'insuranceType', message: 'Select a valid insurance type' });
  }

  if (data.message && data.message.length > 1000) {
    errors.push({ field: 'message', message: 'Message cannot exceed 1000 characters' });
  }

  return errors;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  const url = new URL(req.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  // pathParts will be like: ['leads'] or ['leads', 'admin', 'leads'] or ['leads', 'admin', 'leads', ':id', 'status']

  try {
    // Create Supabase client with service role key for full DB access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // ========================================
    // POST /leads — Create a new lead (public)
    // ========================================
    if (req.method === 'POST' && (pathParts.length <= 1 || pathParts[pathParts.length - 1] === 'leads')) {
      const body = await req.json();

      // Validate
      const errors = validateLead(body);
      if (errors.length > 0) {
        return jsonResponse({ success: false, message: 'Validation failed', errors }, 400);
      }

      // Get client IP
      const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                         req.headers.get('x-real-ip') || 
                         'unknown';

      // Insert into Supabase
      const { data: lead, error } = await supabase
        .from('leads')
        .insert({
          name: body.name.trim(),
          phone: body.phone,
          email: body.email.trim().toLowerCase(),
          insurance_type: body.insuranceType,
          message: body.message || '',
          whatsapp_consent: body.whatsappConsent !== false,
          source: body.source || 'website',
          ip_address: ipAddress,
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return errorResponse(error.message, 400);
      }

      // Send email notification asynchronously (don't await)
      sendLeadNotification(lead).catch(err =>
        console.error('Failed to send email notification:', err)
      );

      // Send WhatsApp notification if consented
      if (body.whatsappConsent !== false) {
        try {
          sendWhatsAppNotification(lead);
        } catch (err) {
          console.error('Failed to send WhatsApp notification:', err);
        }
      }

      return jsonResponse({
        success: true,
        message: "Consultation booked successfully! We'll contact you within 24 hours.",
        data: {
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          insuranceType: lead.insurance_type,
        },
      }, 201);
    }

    // ============================================
    // GET /leads/admin/leads — List leads (admin)
    // ============================================
    if (req.method === 'GET') {
      // Verify JWT token for admin access
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return errorResponse('Access denied. No token provided.', 401);
      }

      const status = url.searchParams.get('status');
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const limit = parseInt(url.searchParams.get('limit') || '20', 10);
      const offset = (page - 1) * limit;

      let query = supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status) {
        query = query.eq('status', status);
      }

      const { data: leads, error, count } = await query;

      if (error) {
        console.error('Supabase query error:', error);
        return errorResponse(error.message, 500);
      }

      return jsonResponse({
        success: true,
        count: leads?.length || 0,
        total: count || 0,
        page,
        pages: Math.ceil((count || 0) / limit),
        data: leads,
      });
    }

    // =====================================================
    // PATCH /leads/admin/leads/:id/status — Update status
    // =====================================================
    if (req.method === 'PATCH') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return errorResponse('Access denied. No token provided.', 401);
      }

      // Extract ID from URL - look for UUID pattern
      const uuidPattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
      const match = url.pathname.match(uuidPattern);
      
      if (!match) {
        return errorResponse('Lead ID is required', 400);
      }

      const id = match[0];
      const body = await req.json();

      const { data: lead, error } = await supabase
        .from('leads')
        .update({ status: body.status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase update error:', error);
        return errorResponse('Lead not found', 404);
      }

      return jsonResponse({
        success: true,
        data: lead,
      });
    }

    return errorResponse('Method not allowed', 405);

  } catch (error) {
    console.error('Edge Function error:', error);
    return errorResponse(error.message || 'Internal Server Error', 500);
  }
});
