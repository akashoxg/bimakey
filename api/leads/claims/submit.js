export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, apikey'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const data = req.body || {};
    console.log("Claim form successfully captured by Vercel Serverless Function:", data);

    // Send email notification if SMTP is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const nodemailer = await import('nodemailer');
        const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
        const transporter = (nodemailer.default || nodemailer).createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: smtpPort,
          secure: smtpPort === 465, // Use SSL only for port 465
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
          requireTLS: smtpPort === 587 || smtpPort === 25,
          tls: { rejectUnauthorized: false }
        });
        const adminEmails = (process.env.NOTIFICATION_EMAIL || 'Jitendrapoc@gmail.com').split(',').map(e => e.trim()).filter(Boolean);
        if (data.email && !adminEmails.includes(data.email.trim())) adminEmails.push(data.email.trim());
        
        await transporter.sendMail({
          from: `"BimaKey Claim Form" <${process.env.SMTP_USER}>`,
          to: adminEmails.join(', '),
          subject: `🔔 Claim Assistance Request: ${data.name} (${data.claimType || 'General'})`,
          html: `<div style="font-family: Arial, sans-serif; padding: 20px;"><h2>🔔 Claim Assistance Request</h2><p><strong>Name:</strong> ${data.name}</p><p><strong>Phone:</strong> +91 ${data.phone}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Claim Type:</strong> ${data.claimType || 'General'}</p><p><strong>Insurer:</strong> ${data.insurerName || 'None'}</p><p><strong>Policy Number:</strong> ${data.policyNumber || 'None'}</p><p><strong>Message:</strong> ${data.message || 'None'}</p></div>`
        });
        console.log("Vercel claim notification email sent to:", adminEmails.join(', '));
      } catch (emailErr) {
        console.error("Vercel claim email sending error:", emailErr.message, emailErr.code);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Your claim assistance request has been submitted. We'll contact you within 30 minutes!",
      data: {
        id: `claim_${Date.now()}`,
        name: data.name || 'Valued User',
        phone: data.phone || '',
        claimType: data.claimType || 'general'
      }
    });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
