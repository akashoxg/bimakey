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
        
        // 1. Send detailed claim inquiry to Admin only
        await transporter.sendMail({
          from: `"BimaKey Claim Form" <${process.env.SMTP_USER}>`,
          to: adminEmails.join(', '),
          subject: `🔔 Claim Assistance Request: ${data.name} (${data.claimType || 'General'})`,
          html: `<div style="font-family: Arial, sans-serif; padding: 20px;"><h2>🔔 Claim Assistance Request</h2><p><strong>Name:</strong> ${data.name}</p><p><strong>Phone:</strong> +91 ${data.phone}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Claim Type:</strong> ${data.claimType || 'General'}</p><p><strong>Insurer:</strong> ${data.insurerName || 'None'}</p><p><strong>Policy Number:</strong> ${data.policyNumber || 'None'}</p><p><strong>Message:</strong> ${data.message || 'None'}</p></div>`
        });
        console.log("Vercel claim notification email sent to admin:", adminEmails.join(', '));

        // 2. Send claim request acknowledgement to User
        if (data.email && data.email.trim()) {
          await transporter.sendMail({
            from: `"BimaKey Claims Support" <${process.env.SMTP_USER}>`,
            to: data.email.trim(),
            subject: `We have received your claim assistance request! 🔔`,
            html: `<div style="font-family: Arial, sans-serif; padding: 25px; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
              <div style="background: #1B6B5A; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Claim Request Received 🔔</h2>
              </div>
              <div style="padding: 20px 10px; color: #374151; line-height: 1.6;">
                <p style="font-size: 16px;">Hi <strong>${data.name}</strong>,</p>
                <p>Thanks for raising your claim assistance query with BimaKey! We have successfully received your request regarding <strong>${data.claimType || 'Insurance Claim'}</strong>.</p>
                <p>Our dedicated claims specialists are reviewing your details and will get back to you soon to assist you with the settlement process.</p>
                <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1B6B5A;">
                  <p style="margin: 0; font-size: 14px; color: #4b5563;">Need urgent help? Reach our claim desk on WhatsApp at +91 9204946314.</p>
                </div>
                <p style="margin-bottom: 0;">Warm regards,<br/><strong>The BimaKey Claims Desk</strong></p>
              </div>
            </div>`
          });
          console.log("Vercel claim thank you email sent to user:", data.email.trim());
        }
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
