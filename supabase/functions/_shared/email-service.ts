import nodemailer from 'npm:nodemailer@6.9.14';

// Get recipient list combining admin notification emails and form submitted personal email
const getRecipientEmails = (userSubmittedEmail?: string) => {
  const envEmails = Deno.env.get('NOTIFICATION_EMAIL') || 'Jitendrapoc@gmail.com';
  const adminEmails = envEmails.split(',').map((e: string) => e.trim()).filter(Boolean);
  if (userSubmittedEmail && !adminEmails.includes(userSubmittedEmail.trim())) {
    adminEmails.push(userSubmittedEmail.trim());
  }
  return adminEmails.join(', ');
};

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

function createTransporter() {
  const smtpHost = Deno.env.get('SMTP_HOST') || 'smtp.gmail.com';
  const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '587', 10);
  const smtpUser = Deno.env.get('SMTP_USER');
  const smtpPass = Deno.env.get('SMTP_PASS');

  if (!smtpUser || !smtpPass) {
    return null;
  }

  // Configure transporter with proper TLS settings for Gmail
  // Port 587 uses STARTTLS, Port 465 uses SSL
  const transporterConfig = {
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // SSL only for port 465
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  };

  // Add STARTTLS for port 587 (Gmail default)
  if (smtpPort === 587 || smtpPort === 25) {
    transporterConfig.requireTLS = true;
  }

  // Allow self-signed certs (may be needed in some environments)
  transporterConfig.tls = {
    rejectUnauthorized: false,
  };

  console.log('[Edge Email] Creating transporter with port:', smtpPort, 'secure:', transporterConfig.secure);
  return nodemailer.createTransport(transporterConfig);
}

export async function sendLeadNotification(lead) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('SMTP credentials not configured. Skipping email notification.');
      return { sent: false, reason: 'not_configured' };
    }

    const smtpUser = Deno.env.get('SMTP_USER');
    const formType = getFormTypeLabel(lead.source);
    const isClaimAssistance = lead.source === 'claim-assistance' || lead.claim_type;

    const subjectEmoji = isClaimAssistance ? '🔔' : '🏆';
    const subject = `${subjectEmoji} ${formType}: ${lead.name} - ${getInsuranceLabel(lead.insurance_type || lead.claim_type)}`;

    let additionalFields = '';

    if (isClaimAssistance) {
      additionalFields = `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 35%;">Claim Type</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1B6B5A; font-weight: 600;">${getInsuranceLabel(lead.claim_type)}</td>
        </tr>
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Claim Status</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: 600;">${getClaimStatusLabel(lead.claim_status)}</td>
        </tr>
        ${lead.insurer_name ? `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Insurance Company</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">${lead.insurer_name}</td>
        </tr>
        ` : ''}
        ${lead.policy_number ? `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Policy Number</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151; font-family: monospace;">${lead.policy_number}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Preferred Callback</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #7c3aed; font-weight: 600;">${getCallbackTimeLabel(lead.callback_time)}</td>
        </tr>
      `;
    } else {
      additionalFields = `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Insurance Type</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #1B6B5A; font-weight: 600;">${getInsuranceLabel(lead.insurance_type)}</td>
        </tr>
      `;
    }

    const recipients = getRecipientEmails(lead.email);
    const mailOptions = {
      from: `"BimaKey Website" <${smtpUser}>`,
      to: recipients,
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
            <div style="background: linear-gradient(135deg, #1B6B5A 0%, #0d4a3d 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                ${isClaimAssistance ? '🔔' : '🏆'} ${formType}
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                New inquiry from BimaKey Website
              </p>
            </div>
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
                      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: ${lead.whatsapp_consent ? '#059669' : '#dc2626'};">
                        ${lead.whatsapp_consent ? '✅ Consented' : '❌ Not Consented'}
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
🏆 NEW INQUIRY FROM BIMAKEY
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
Claim Type: ${getInsuranceLabel(lead.claim_type)}
Claim Status: ${getClaimStatusLabel(lead.claim_status)}
${lead.insurer_name ? `Insurance Company: ${lead.insurer_name}` : ''}
${lead.policy_number ? `Policy Number: ${lead.policy_number}` : ''}
Preferred Callback: ${getCallbackTimeLabel(lead.callback_time)}
` : `
INSURANCE DETAILS
-----------------
Insurance Type: ${getInsuranceLabel(lead.insurance_type)}
`}
WhatsApp Consent: ${lead.whatsapp_consent ? 'Yes' : 'No'}

${lead.message ? `MESSAGE:\n--------\n${lead.message}\n` : ''}
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

---
Auto-generated from BimaKey Website
www.bimakey.in | hello@bimakey.in
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to %s: %s', recipients, info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { sent: false, error: error.message };
  }
}

export async function sendClaimNotification(formData) {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('SMTP credentials not configured. Skipping claim email notification.');
      return { sent: false, reason: 'not_configured' };
    }

    const smtpUser = Deno.env.get('SMTP_USER');
    const { claimType, name, phone, email, insurerName, policyNumber, callbackTime, message, ...claimDetails } = formData;

    const claimTypeLabels = {
      'health-claim': { label: 'Health Insurance Claim', emoji: '🏥', color: '#1B6B5A' },
      'motor-claim': { label: 'Motor Insurance Claim', emoji: '🚗', color: '#2563EB' },
      'life-claim': { label: 'Life Insurance Claim', emoji: '🛡️', color: '#0C1220' },
      'policy-issue': { label: 'Policy Related Issue', emoji: '📄', color: '#D97706' },
      'renewal-help': { label: 'Renewal Assistance', emoji: '🏢', color: '#059669' },
      'other': { label: 'Other Query', emoji: '❓', color: '#6B7280' },
    };

    const claimInfo = claimTypeLabels[claimType] || { label: 'Claim', emoji: '📋', color: '#1B6B5A' };

    let claimFieldsHTML = '';
    let claimFieldsText = '';

    switch (claimType) {
      case 'health-claim':
        claimFieldsHTML = `
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Claim Status</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: 600;">${getClaimStatusLabel(claimDetails.claimStatus)}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Treatment Type</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.healthClaimType === 'cashless' ? '💰 Cashless' : '📝 Reimbursement'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Hospital Name</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 600;">${claimDetails.hospitalName || '-'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Treatment Type</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.treatmentType || '-'}</td></tr>
          ${claimDetails.estimatedAmount ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Estimated Amount</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: 600;">₹${Number(claimDetails.estimatedAmount).toLocaleString('en-IN')}</td></tr>` : ''}
          ${claimDetails.admissionDate ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Admission Date</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${new Date(claimDetails.admissionDate).toLocaleDateString('en-IN')}</td></tr>` : ''}
        `;
        claimFieldsText += `\nCLAIM DETAILS\n${'─'.repeat(20)}\nClaim Status: ${getClaimStatusLabel(claimDetails.claimStatus)}\nTreatment Type: ${claimDetails.healthClaimType === 'cashless' ? 'Cashless' : 'Reimbursement'}\nHospital: ${claimDetails.hospitalName || '-'}\nTreatment: ${claimDetails.treatmentType || '-'}\n${claimDetails.estimatedAmount ? `Est. Amount: ₹${Number(claimDetails.estimatedAmount).toLocaleString('en-IN')}\n` : ''}${claimDetails.admissionDate ? `Admission Date: ${new Date(claimDetails.admissionDate).toLocaleDateString('en-IN')}\n` : ''}`;
        break;

      case 'motor-claim':
        const motorClaimLabels = { 'own-damage': 'Own Damage (OD)', 'third-party': 'Third Party Liability', 'theft': 'Theft/Total Loss', 'windshield': 'Windshield Damage' };
        const firStatus = claimDetails.firRegistered === 'yes' ? '✅ Yes' : claimDetails.firRegistered === 'no' ? '❌ No' : 'N/A';
        claimFieldsHTML = `
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Claim Status</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: 600;">${getClaimStatusLabel(claimDetails.claimStatus)}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Vehicle Number</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 600; font-family: monospace;">${claimDetails.vehicleNumber || '-'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Claim Type</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${motorClaimLabels[claimDetails.motorClaimType] || '-'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Incident Date</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.accidentDate ? new Date(claimDetails.accidentDate).toLocaleDateString('en-IN') : '-'}</td></tr>
          ${claimDetails.accidentLocation ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Location</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.accidentLocation}</td></tr>` : ''}
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Police FIR</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${firStatus}</td></tr>
          ${claimDetails.firNumber ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">FIR Number</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151; font-family: monospace;">${claimDetails.firNumber}</td></tr>` : ''}
          ${claimDetails.damageDescription ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Damage Details</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.damageDescription}</td></tr>` : ''}
        `;
        claimFieldsText += `\nCLAIM DETAILS\n${'─'.repeat(20)}\nClaim Status: ${getClaimStatusLabel(claimDetails.claimStatus)}\nVehicle No: ${claimDetails.vehicleNumber || '-'}\nClaim Type: ${motorClaimLabels[claimDetails.motorClaimType] || '-'}\nIncident Date: ${claimDetails.accidentDate ? new Date(claimDetails.accidentDate).toLocaleDateString('en-IN') : '-'}\nLocation: ${claimDetails.accidentLocation || '-'}\nFIR: ${firStatus}\n${claimDetails.firNumber ? `FIR No: ${claimDetails.firNumber}\n` : ''}${claimDetails.damageDescription ? `Damage: ${claimDetails.damageDescription}\n` : ''}`;
        break;

      case 'life-claim':
        const lifeClaimLabels = { 'death': 'Death Claim', 'maturity': 'Maturity Benefit', 'surrender': 'Surrender Value', 'survival': 'Survival Benefit' };
        claimFieldsHTML = `
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Policy Holder</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 600;">${claimDetails.policyHolderName || '-'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Claim Type</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${lifeClaimLabels[claimDetails.lifeClaimType] || '-'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Date of Incident</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.incidentDate ? new Date(claimDetails.incidentDate).toLocaleDateString('en-IN') : '-'}</td></tr>
          ${claimDetails.causeOfDeath ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Cause</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.causeOfDeath}</td></tr>` : ''}
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; background: #fef3c7;">Nominee Name</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #92400e; font-weight: 600;">${claimDetails.nomineeName || '-'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Relationship</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.nomineeRelationship || '-'}</td></tr>
          ${claimDetails.nomineePhone ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Nominee Phone</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1B6B5A;"><a href="tel:+91${claimDetails.nomineePhone}">+91 ${claimDetails.nomineePhone}</a></td></tr>` : ''}
        `;
        claimFieldsText += `\nCLAIM DETAILS\n${'─'.repeat(20)}\nPolicy Holder: ${claimDetails.policyHolderName || '-'}\nClaim Type: ${lifeClaimLabels[claimDetails.lifeClaimType] || '-'}\nIncident Date: ${claimDetails.incidentDate ? new Date(claimDetails.incidentDate).toLocaleDateString('en-IN') : '-'}\n${claimDetails.causeOfDeath ? `Cause: ${claimDetails.causeOfDeath}\n` : ''}\nNOMINEE DETAILS\n${'─'.repeat(20)}\nNominee: ${claimDetails.nomineeName || '-'}\nRelationship: ${claimDetails.nomineeRelationship || '-'}\nPhone: ${claimDetails.nomineePhone ? `+91 ${claimDetails.nomineePhone}` : '-'}\n`;
        break;

      case 'policy-issue':
        const issueLabels = { 'cancellation': 'Policy Cancellation', 'modification': 'Policy Modification', 'document-request': 'Document Request', 'name-correction': 'Name Correction', 'address-change': 'Address Change', 'nominee-change': 'Nominee Change', 'other': 'Other' };
        claimFieldsHTML = `
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Issue Type</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #D97706; font-weight: 600;">${issueLabels[claimDetails.issueType] || '-'}</td></tr>
          ${claimDetails.issueDescription ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Issue Description</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.issueDescription}</td></tr>` : ''}
        `;
        claimFieldsText += `\nISSUE DETAILS\n${'─'.repeat(20)}\nIssue Type: ${issueLabels[claimDetails.issueType] || '-'}\n${claimDetails.issueDescription ? `Description: ${claimDetails.issueDescription}\n` : ''}`;
        break;

      case 'renewal-help':
        const renewalLabels = { 'renewal': 'Policy Renewal', 'porting': 'Port to New Plan', 'upgrade': 'Upgrade Coverage', 'compare': 'Compare Other Plans', 'other': 'Other' };
        claimFieldsHTML = `
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Assistance Type</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #059669; font-weight: 600;">${renewalLabels[claimDetails.renewalReason] || '-'}</td></tr>
          ${claimDetails.expiryDate ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Expiry Date</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${new Date(claimDetails.expiryDate).toLocaleDateString('en-IN')}</td></tr>` : ''}
          ${claimDetails.additionalInfo ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Additional Info</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.additionalInfo}</td></tr>` : ''}
        `;
        claimFieldsText += `\nRENEWAL DETAILS\n${'─'.repeat(20)}\nAssistance: ${renewalLabels[claimDetails.renewalReason] || '-'}\n${claimDetails.expiryDate ? `Expiry Date: ${new Date(claimDetails.expiryDate).toLocaleDateString('en-IN')}\n` : ''}${claimDetails.additionalInfo ? `Info: ${claimDetails.additionalInfo}\n` : ''}`;
        break;

      case 'other':
        const queryLabels = { 'information': 'General Information', 'comparison': 'Plan Comparison', 'recommendation': 'Plan Recommendation', 'pricing': 'Premium/Pricing Query', 'coverage': 'Coverage Query', 'other': 'Other' };
        const insTypeLabels = { health: 'Health Insurance', term: 'Term Life Insurance', motor: 'Motor Insurance', other: 'Other' };
        claimFieldsHTML = `
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Insurance Type</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${insTypeLabels[claimDetails.insuranceType] || claimDetails.insuranceType || '-'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Query Type</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6B7280; font-weight: 600;">${queryLabels[claimDetails.queryType] || '-'}</td></tr>
          ${claimDetails.queryDescription ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Query</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${claimDetails.queryDescription}</td></tr>` : ''}
        `;
        claimFieldsText += `\nQUERY DETAILS\n${'─'.repeat(20)}\nInsurance: ${insTypeLabels[claimDetails.insuranceType] || claimDetails.insuranceType || '-'}\nQuery Type: ${queryLabels[claimDetails.queryType] || '-'}\n${claimDetails.queryDescription ? `Query: ${claimDetails.queryDescription}\n` : ''}`;
        break;
    }

    const recipients = getRecipientEmails(email);
    const mailOptions = {
      from: `"BimaKey Claim Form" <${smtpUser}>`,
      to: recipients,
      subject: `${claimInfo.emoji} ${claimInfo.label}: ${name} - ${insurerName || 'Unknown Insurer'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
          <div style="max-width: 650px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, ${claimInfo.color} 0%, ${claimInfo.color}dd 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                ${claimInfo.emoji} ${claimInfo.label}
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                New ${claimInfo.label.toLowerCase()} from BimaKey Website
              </p>
            </div>
            <div style="padding: 30px;">
              <div style="background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: ${claimInfo.color};">
                      <th colspan="2" style="padding: 12px 10px; text-align: left; color: white; font-size: 13px; font-weight: 600;">CONTACT INFORMATION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 35%;">Full Name</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-size: 15px; font-weight: 600; color: #111827;">${name}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Phone</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:+91${phone}" style="color: ${claimInfo.color}; text-decoration: none; font-weight: 600;">📞 +91 ${phone}</a></td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Email</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: ${claimInfo.color}; text-decoration: none;">✉️ ${email}</a></td></tr>
                    ${insurerName ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Insurer</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151;">${insurerName}</td></tr>` : ''}
                    ${policyNumber ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Policy No.</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #374151; font-family: monospace;">${policyNumber}</td></tr>` : ''}
                    <tr><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Callback</td><td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #7c3aed; font-weight: 600;">${getCallbackTimeLabel(callbackTime)}</td></tr>
                  </tbody>
                </table>
              </div>
              ${claimFieldsHTML ? `
              <div style="background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background: #1B6B5A;">
                      <th colspan="2" style="padding: 12px 10px; text-align: left; color: white; font-size: 13px; font-weight: 600;">CLAIM DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>${claimFieldsHTML}</tbody>
                </table>
              </div>
              ` : ''}
              ${message ? `
              <div style="margin-top: 20px; padding: 20px; background: #fef3c7; border-radius: 12px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0 0 10px; font-weight: 600; color: #92400e; font-size: 14px;">💬 Additional Message</p>
                <p style="margin: 0; color: #78350f; line-height: 1.6;">${message}</p>
              </div>
              ` : ''}
              <p style="color: #6b7280; font-size: 13px; margin: 20px 0;">
                📅 Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <div style="margin-top: 25px; text-align: center;">
                <a href="tel:+91${phone}" style="display: inline-block; padding: 12px 24px; background: ${claimInfo.color}; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; margin: 5px;">📞 Call Now</a>
                <a href="https://wa.me/91${phone}?text=Hi ${name}, thank you for contacting BimaKey regarding ${claimInfo.label.toLowerCase()}. How can we help you?" style="display: inline-block; padding: 12px 24px; background: #25D366; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; margin: 5px;">💬 WhatsApp</a>
                <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: #374151; color: white; text-decoration: none; border-radius: 10px; font-weight: 600; margin: 5px;">✉️ Email</a>
              </div>
            </div>
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Auto-generated from <strong>BimaKey</strong> — India's Only 100% Unbiased Insurance Platform</p>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 11px;">📧 hello@bimakey.in | 🌐 www.bimakey.in</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
${claimInfo.emoji} NEW ${claimInfo.label.toUpperCase()} - BIMAKEY
${'═'.repeat(45)}

CONTACT INFORMATION
${'─'.repeat(20)}
Name: ${name}
Phone: +91 ${phone}
Email: ${email}
${insurerName ? `Insurer: ${insurerName}\n` : ''}${policyNumber ? `Policy No: ${policyNumber}\n` : ''}Callback: ${getCallbackTimeLabel(callbackTime)}

${claimFieldsText}
${message ? `ADDITIONAL MESSAGE\n${'─'.repeat(20)}\n${message}\n` : ''}
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

${'─'.repeat(45)}
Auto-generated from BimaKey Website
www.bimakey.in | hello@bimakey.in
      `.trim(),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Claim notification email sent to %s: %s', recipients, info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending claim notification email:', error);
    return { sent: false, error: error.message };
  }
}
