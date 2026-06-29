import config from '../config/env.js';

/**
 * Send WhatsApp notification to admin when a new lead is created
 * Uses the WhatsApp Click-to-Chat API (no API key required)
 * https://wa.me/919876543210?text=Hello
 */
export const sendWhatsAppNotification = async (lead) => {
  if (!config.WHATSAPP_ENABLED || !config.WHATSAPP_ADMIN_NUMBER) {
    console.log('WhatsApp notifications disabled');
    return { sent: false, reason: 'disabled' };
  }

  const insuranceLabels = {
    health: 'Health Insurance',
    term: 'Term Life Insurance',
    motor: 'Motor Insurance',
    other: 'Other',
  };

  const message = `
🏆 *New Consultation Lead*

👤 *Name:* ${lead.name}
📞 *Phone:* +91${lead.phone}
📧 *Email:* ${lead.email}
🏥 *Insurance Type:* ${insuranceLabels[lead.insuranceType] || lead.insuranceType}
💬 *WhatsApp Consent:* ${lead.whatsappConsent ? 'Yes ✅' : 'No'}
📍 *Source:* ${lead.source}
🕐 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

${lead.message ? `💬 *Message:* ${lead.message}` : ''}

---
Auto-generated from BimaKey Website
  `.trim();

  const whatsappUrl = `https://wa.me/${config.WHATSAPP_ADMIN_NUMBER}?text=${encodeURIComponent(message)}`;
  
  console.log('WhatsApp notification URL:', whatsappUrl);
  
  // In production, you can use a WhatsApp Business API like:
  // - Twilio WhatsApp API
  // - MessageBird
  // - Gupshup
  // - Interakt
  
  return {
    sent: true,
    url: whatsappUrl,
  };
};
