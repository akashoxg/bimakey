import nodemailer from 'nodemailer';
import config from '../config/env.js';

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

    const insuranceLabels = {
      health: 'Health Insurance',
      term: 'Term Life Insurance',
      motor: 'Motor Insurance',
      other: 'Other',
    };

    const mailOptions = {
      from: `"BimaKey Leads" <${config.SMTP_USER}>`,
      to: config.ADMIN_EMAIL,
      subject: `🏆 New Lead: ${lead.name} - ${insuranceLabels[lead.insuranceType] || lead.insuranceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B6B5A; border-bottom: 2px solid #1B6B5A; padding-bottom: 10px;">
            🏆 New Consultation Request
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:+91${lead.phone}">+91 ${lead.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${lead.email}">${lead.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Insurance Type</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${insuranceLabels[lead.insuranceType] || lead.insuranceType}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Source</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.source}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">WhatsApp Consent</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${lead.whatsappConsent ? '✅ Yes' : '❌ No'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Submitted At</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </td>
            </tr>
          </table>
          
          ${lead.message ? `
            <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
              <strong>Message:</strong>
              <p style="margin: 10px 0 0;">${lead.message}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: #1B6B5A; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">
              <a href="https://wa.me/919717427154?text=Hi" style="color: white; text-decoration: none;">
                💬 Reply via WhatsApp
              </a>
            </p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
            Auto-generated from BimaKey Website
          </p>
        </div>
      `,
      text: `
New Consultation Request

Name: ${lead.name}
Phone: +91${lead.phone}
Email: ${lead.email}
Insurance Type: ${insuranceLabels[lead.insuranceType] || lead.insuranceType}
Source: ${lead.source}
WhatsApp Consent: ${lead.whatsappConsent ? 'Yes' : 'No'}
${lead.message ? `\nMessage: ${lead.message}` : ''}

---
Auto-generated from BimaKey Website
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { sent: false, error: error.message };
  }
};

export { sendLeadNotification };
