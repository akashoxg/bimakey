/**
 * WhatsApp notification service for Supabase Edge Functions
 * Uses the WhatsApp Click-to-Chat API (no API key required)
 */

export function sendWhatsAppNotification(lead) {
  const whatsappEnabled = Deno.env.get('WHATSAPP_ENABLED') === 'true';
  const adminNumber = (Deno.env.get('WHATSAPP_ADMIN_NUMBER') || '').replace(/\D/g, '');

  if (!whatsappEnabled || !adminNumber) {
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
🏥 *Insurance Type:* ${insuranceLabels[lead.insurance_type] || lead.insurance_type}
💬 *WhatsApp Consent:* ${lead.whatsapp_consent ? 'Yes ✅' : 'No'}
📍 *Source:* ${lead.source}
🕐 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

${lead.message ? `💬 *Message:* ${lead.message}` : ''}

---
Auto-generated from BimaKey Website
  `.trim();

  const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

  console.log('WhatsApp notification URL:', whatsappUrl);

  return {
    sent: true,
    url: whatsappUrl,
  };
}
