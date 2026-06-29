// Supabase Edge Function: claims
// Handles claim form submission (POST)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts';
import { sendClaimNotification } from '../_shared/email-service.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { claimType, name, phone, email, insurerName, policyNumber, callbackTime, message, ...claimDetails } = body;

    // Validate required fields
    if (!name || !phone || !email || !claimType) {
      return jsonResponse({
        success: false,
        message: 'Name, phone, email, and claim type are required.',
      }, 400);
    }

    const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                       req.headers.get('x-real-ip') ||
                       'unknown';

    // Map camelCase form fields to snake_case DB columns
    const insertData = {
      name: name.trim(),
      phone,
      email: email.trim().toLowerCase(),
      insurance_type: 'other', // Default for claims
      claim_type: claimType,
      source: 'claim-assistance',
      ip_address: ipAddress,
      insurer_name: insurerName || null,
      policy_number: policyNumber || null,
      callback_time: callbackTime || null,
      message: message || '',
      // Claim-specific fields (mapped from camelCase)
      claim_status: claimDetails.claimStatus || null,
      hospital_name: claimDetails.hospitalName || null,
      treatment_type: claimDetails.treatmentType || null,
      health_claim_type: claimDetails.healthClaimType || null,
      estimated_amount: claimDetails.estimatedAmount ? Number(claimDetails.estimatedAmount) : null,
      admission_date: claimDetails.admissionDate || null,
      vehicle_number: claimDetails.vehicleNumber || null,
      motor_claim_type: claimDetails.motorClaimType || null,
      accident_date: claimDetails.accidentDate || null,
      accident_location: claimDetails.accidentLocation || null,
      fir_registered: claimDetails.firRegistered || null,
      fir_number: claimDetails.firNumber || null,
      damage_description: claimDetails.damageDescription || null,
      policy_holder_name: claimDetails.policyHolderName || null,
      life_claim_type: claimDetails.lifeClaimType || null,
      incident_date: claimDetails.incidentDate || null,
      cause_of_death: claimDetails.causeOfDeath || null,
      nominee_name: claimDetails.nomineeName || null,
      nominee_relationship: claimDetails.nomineeRelationship || null,
      nominee_phone: claimDetails.nomineePhone || null,
      issue_type: claimDetails.issueType || null,
      issue_description: claimDetails.issueDescription || null,
      renewal_reason: claimDetails.renewalReason || null,
      expiry_date: claimDetails.expiryDate || null,
      additional_info: claimDetails.additionalInfo || null,
      query_type: claimDetails.queryType || null,
      query_description: claimDetails.queryDescription || null,
    };

    const { data: lead, error } = await supabase
      .from('leads')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return errorResponse(error.message, 400);
    }

    // Send formatted claim notification email asynchronously
    sendClaimNotification(body).catch(err =>
      console.error('Failed to send claim notification email:', err)
    );

    return jsonResponse({
      success: true,
      message: "Your claim assistance request has been submitted. We'll contact you within 30 minutes!",
      data: {
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        claimType: lead.claim_type,
      },
    }, 201);

  } catch (error) {
    console.error('Claims Edge Function error:', error);
    return errorResponse(error.message || 'Internal Server Error', 500);
  }
});
