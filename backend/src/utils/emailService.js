import nodemailer from 'nodemailer';
import config from '../config/env.js';

// Email recipient
const NOTIFICATION_EMAIL = 'Jitendrapoc@gmail.com';

// Get form type label
const getFormTypeLabel = (source) => {
  const labels = {
    'contact-page': 'Contact Form',
    'claim-assistance': 'Claim Assistance',
    'hero': 'Hero Consultation',
    'navbar': 'Navbar CTA',
    'about': 'About Page',
    'contact': 'Contact Form',
    'health-plans': 'Health Plans CTA',
    'term-plans': 'Term Plans CTA',
    'motor-plans': 'Motor Plans CTA',
    'health-basics': 'Health Basics',
    'term-basics': 'Term Basics',
    'motor-basics': 'Motor Basics',
    'experts': 'Experts Page',
  };
  return labels[source] || source || 'Website Form';
};

// Get insurance type label
const getInsuranceLabel = (type) => {
  const labels = {
    health: '🏥 Health Insurance',
    term: '🛡️ Term Life Insurance',
    motor: '🚗 Motor Insurance',
    other: '📋 Other',
    'health-claim': '🏥 Health Insurance Claim',
    'motor-claim': '🚗 Motor Insurance Claim',
    'life-claim': '🛡️ Life Insurance Claim',
    'policy-issue': '📄 Policy Related Issue',
    'renewal-help': '🏢 Renewal Assistance',
  };
  return labels[type] || type || '-';
};

// Get claim status label
const getClaimStatusLabel = (status) => {
  const labels = {
    'not-started': '⏳ Not Started Yet',
    'in-progress': '🔄 Claim In Progress',
    'rejected': '❌ Claim Rejected',
    'query': '❓ Just Have a Query',
  };
  return labels[status] || status || '-';
};

// Get callback time label
const getCallbackTimeLabel = (time) => {
  const labels = {
    morning: '🌅 Morning (9 AM - 12 PM)',
    afternoon: '☀️ Afternoon (12 PM - 4 PM)',
    evening: '🌆 Evening (4 PM - 7 PM)',
    anytime: '📞 Anytime (9 AM - 7 PM)',
  };
  return labels[time] || time || '-';
};

const sendLeadNotification = async (lead) => {
  try {
    if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASS) {
      console.log('SMTP credentials not configured. Skipping email notification.');
      return { sent: false, reason: 'not_configured' };
    }

    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_SECURE,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });

    const formType = getFormTypeLabel(lead.source);
    const isClaimAssistance = lead.source === 'claim-assistance' || lead.claimType;

    // Build email subject
    const subjectEmoji = isClaimAssistance ? '🔔' : '🏆';
    const subject = `${subjectEmoji} ${formType}: ${lead.name} - ${getInsuranceLabel(lead.insuranceType || lead.claimType)}`;

    // Build HTML table rows based on form type
    let additionalFields = '';
    
    if (isClaimAssistance) {
      // Claim assistance specific fields
      additionalFields = `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 35%;">Claim Type</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1B6B5A; font-weight: 600;">${getInsuranceLabel(lead.claimType)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Claim Status</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: 600;">${getClaimStatusLabel(lead.claimStatus)}</td>
        </tr>
        ${lead.insurerName ? `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Insurance Company</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">${lead.insurerName}</td>
        </tr>
        ` : ''}
        ${lead.policyNumber ? `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Policy Number</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; font-family: monospace;">${lead.policyNumber}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Preferred Callback</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #7c3aed; font-weight: 600;">${getCallbackTimeLabel(lead.callbackTime)}</td>
        </tr>
      `;
    } else {
      // Standard consultation fields
      additionalFields = `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Insurance Type</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1B6B5A; font-weight: 600;">${getInsuranceLabel(lead.insuranceType)}</td>
        </tr>
      `;
    }

    const mailOptions = {
      from: `"BimaKey Website" <${config.SMTP_USER}>`,
      to: NOTIFICATION_EMAIL,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="max-width: 650px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1B6B5A 0%, #0d4a3d 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                ${isClaimAssistance ? '🔔' : '🏆'} ${formType}
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                New inquiry from BimaKey Website
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 20px;">
                You have received a new inquiry. Please respond within 24 hours.
              </p>
              
              <div style="background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #1B6B5A; color: white;">
                      <th colspan="2" style="padding: 15px 12px; text-align: left; font-size: 14px; font-weight: 600;">
                        Contact Information
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 35%;">Full Name</td>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 16px; font-weight: 600; color: #111827;">${lead.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Phone</td>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                        <a href="tel:+91${lead.phone}" style="color: #1B6B5A; text-decoration: none; font-weight: 600;">
                          📞 +91 ${lead.phone}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Email</td>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                        <a href="mailto:${lead.email}" style="color: #1B6B5A; text-decoration: none;">
                          ✉️ ${lead.email}
                        </a>
                      </td>
                    </tr>
                    ${additionalFields}
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">WhatsApp</td>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: ${lead.whatsappConsent ? '#059669' : '#dc2626'};">
                        ${lead.whatsappConsent ? '✅ Consented' : '❌ Not Consented'}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Submitted At</td>
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
                        📅 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              ${lead.message ? `
              <div style="margin-top: 20px; padding: 20px; background: #fef3c7; border-radius: 12px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0 0 10px; font-weight: 600; color: #92400e; font-size: 14px;">💬 Message</p>
                <p style="margin: 0; color: #78350f; line-height: 1.6;">${lead.message}</p>
              </div>
              ` : ''}
              
              <!-- Action Buttons -->
              <div style="margin-top: 30px; text-align: center;">
                <a href="tel:+91${lead.phone}" style="display: inline-block; padding: 14px 28px; background: #1B6B5A; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; margin: 5px;">
                  📞 Call Now
                </a>
                <a href="https://wa.me/91${lead.phone}?text=Hi ${lead.name}, thank you for contacting BimaKey. How can we help you?" style="display: inline-block; padding: 14px 28px; background: #25D366; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; margin: 5px;">
                  💬 WhatsApp
                </a>
                <a href="mailto:${lead.email}" style="display: inline-block; padding: 14px 28px; background: #374151; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; margin: 5px;">
                  ✉️ Send Email
                </a>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                This email was auto-generated from <strong>BimaKey</strong> — India's Only 100% Unbiased Insurance Platform
              </p>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 11px;">
                📧 hello@bimakey.in | 🌐 www.bimakey.in
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
      text: `
🏆 NEW INQUIRY FROM BIMARKEY
================================

Form Type: ${formType}

CONTACT INFORMATION
-------------------
Name: ${lead.name}
Phone: +91 ${lead.phone}
Email: ${lead.email}

${isClaimAssistance ? `
CLAIM DETAILS
-------------
Claim Type: ${getInsuranceLabel(lead.claimType)}
Claim Status: ${getClaimStatusLabel(lead.claimStatus)}
${lead.insurerName ? `Insurance Company: ${lead.insurerName}` : ''}
${lead.policyNumber ? `Policy Number: ${lead.policyNumber}` : ''}
Preferred Callback: ${getCallbackTimeLabel(lead.callbackTime)}
` : `
INSURANCE DETAILS
-----------------
Insurance Type: ${getInsuranceLabel(lead.insuranceType)}
`}
WhatsApp Consent: ${lead.whatsappConsent ? 'Yes' : 'No'}

${lead.message ? `MESSAGE:
--------
${lead.message}
` : ''}
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

---
Auto-generated from BimaKey Website
www.bimakey.in | hello@bimakey.in
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to %s: %s', NOTIFICATION_EMAIL, info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { sent: false, error: error.message };
  }
};

export { sendLeadNotification };
