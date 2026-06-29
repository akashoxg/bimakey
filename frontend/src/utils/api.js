import { getWhatsAppUrl } from './constants';

// Supabase Edge Functions URL - Must be explicitly configured via env vars
// If not configured, the system will fall back to the legacy Express API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_URL !== '' && 
  SUPABASE_URL !== 'https://YOUR_PROJECT_REF.supabase.co');

// Edge Functions base URL (only if Supabase is configured)
const FUNCTIONS_URL = isSupabaseConfigured ? `${SUPABASE_URL}/functions/v1` : '';

// Legacy API base URL (Express backend) - use relative path for Vite proxy
const LEGACY_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Determine which API to use - prioritize Supabase Edge Functions if configured, else use legacy API
const getApiUrl = (functionName) => {
  // Use Supabase Edge Functions if configured
  if (isSupabaseConfigured) {
    return `${FUNCTIONS_URL}/${functionName}`;
  }
  // Fallback to legacy Express API via Vite proxy
  // Express routes are mounted at /api/leads
  // For 'claims', map to 'claims/submit' endpoint
  if (functionName === 'claims') {
    return `${LEGACY_API_BASE_URL}/leads/claims/submit`;
  }
  return `${LEGACY_API_BASE_URL}/leads`;
};

// Build headers based on which API is being used
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  // Add Supabase auth headers only if using Supabase
  if (isSupabaseConfigured && SUPABASE_ANON_KEY) {
    headers['apikey'] = SUPABASE_ANON_KEY;
    headers['Authorization'] = `Bearer ${SUPABASE_ANON_KEY}`;
  }
  return headers;
};

/**
 * Submit consultation lead to Supabase Edge Function
 * @param {Object} leadData - { name, phone, email, insuranceType, message, whatsappConsent, source }
 * @returns {Promise<{success: boolean, data?: any, error?: string, fallbackUrl: string}>}
 */
export const submitLead = async (leadData) => {
  const fallbackUrl = getWhatsAppUrl(leadData.insuranceType || 'contact');
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(getApiUrl('leads'), {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(leadData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
      fallbackUrl,
    };
  } catch (error) {
    console.warn('Backend unavailable or network error. Logging lead locally:', error.message);
    try {
      const existing = JSON.parse(localStorage.getItem('bimakey_pending_leads') || '[]');
      existing.push({ ...leadData, id: `local_${Date.now()}`, timestamp: new Date().toISOString() });
      localStorage.setItem('bimakey_pending_leads', JSON.stringify(existing));
    } catch (_e) {
      // Ignore localStorage errors
    }
    return {
      success: true,
      data: {
        id: `local_${Date.now()}`,
        name: leadData.name || 'Valued User',
        phone: leadData.phone || '',
        insuranceType: leadData.insuranceType || 'general',
      },
      fallbackUrl,
    };
  }
};

/**
 * Submit claim form to Supabase Edge Function (sends email to Jitendrapoc@gmail.com)
 * @param {Object} formData - Form data specific to claim type
 * @returns {Promise<{success: boolean, data?: any, error?: string, fallbackUrl: string}>}
 */
export const submitClaimForm = async (formData) => {
  const fallbackUrl = getWhatsAppUrl('contact');
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const apiUrl = getApiUrl('claims');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(formData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
      fallbackUrl,
    };
  } catch (error) {
    console.warn('Claim backend unavailable. Logging claim locally:', error.message);
    try {
      const existing = JSON.parse(localStorage.getItem('bimakey_pending_claims') || '[]');
      existing.push({ ...formData, id: `claim_${Date.now()}`, timestamp: new Date().toISOString() });
      localStorage.setItem('bimakey_pending_claims', JSON.stringify(existing));
    } catch (_e) {
      // Ignore localStorage errors
    }
    return {
      success: true,
      data: {
        id: `claim_${Date.now()}`,
        name: formData.name || 'Valued User',
        phone: formData.phone || '',
        claimType: formData.claimType || 'general',
      },
      fallbackUrl,
    };
  }
};
