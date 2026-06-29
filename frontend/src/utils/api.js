import { getWhatsAppUrl } from './constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Submit consultation lead to backend API
 * @param {Object} leadData - { name, phone, email, insuranceType, message, whatsappConsent, source }
 * @returns {Promise<{success: boolean, data?: any, error?: string, fallbackUrl: string}>}
 */
export const submitLead = async (leadData) => {
  const fallbackUrl = getWhatsAppUrl(leadData.insuranceType || 'contact');
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to submit lead to server.');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
      fallbackUrl,
    };
  } catch (error) {
    console.error('API submission error:', error.message);
    return {
      success: false,
      error: error.name === 'AbortError' ? 'Request timed out.' : error.message,
      fallbackUrl,
    };
  }
};

/**
 * Submit claim form to backend API (sends email to Jitendrapoc@gmail.com)
 * @param {Object} formData - Form data specific to claim type
 * @returns {Promise<{success: boolean, data?: any, error?: string, fallbackUrl: string}>}
 */
export const submitClaimForm = async (formData) => {
  const fallbackUrl = getWhatsAppUrl('contact');
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for email

    const response = await fetch(`${API_BASE_URL}/claims/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to submit claim form.');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
      fallbackUrl,
    };
  } catch (error) {
    console.error('Claim form submission error:', error.message);
    return {
      success: false,
      error: error.name === 'AbortError' ? 'Request timed out.' : error.message,
      fallbackUrl,
    };
  }
};
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to submit lead to server.');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
      fallbackUrl,
    };
  } catch (error) {
    console.error('API submission error:', error.message);
    return {
      success: false,
      error: error.name === 'AbortError' ? 'Request timed out.' : error.message,
      fallbackUrl,
    };
  }
};
