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
    
    // Check if Supabase env vars are configured
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://YOUR_PROJECT_REF.supabase.co') {
      try {
        await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            email: data.email,
            insurance_type: data.insuranceType,
            message: data.message || '',
            whatsapp_consent: data.whatsappConsent !== false,
            source: data.source || 'website'
          })
        });
      } catch (err) {
        console.error("Supabase storage fallback error:", err);
      }
    } else {
      console.log("Lead successfully captured by Vercel Serverless Function:", data);
    }

    // Send email notification if SMTP is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = (nodemailer.default || nodemailer).createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });
        const adminEmails = (process.env.NOTIFICATION_EMAIL || 'Jitendrapoc@gmail.com').split(',').map(e => e.trim()).filter(Boolean);
        
        // 1. Send detailed inquiry to Admin only
        await transporter.sendMail({
          from: `"BimaKey Website" <${process.env.SMTP_USER}>`,
          to: adminEmails.join(', '),
          subject: `🏆 Consultation Inquiry: ${data.name} - ${data.insuranceType || 'General'}`,
          html: `<div style="font-family: Arial, sans-serif; padding: 20px;"><h2>🏆 New Consultation Inquiry</h2><p><strong>Name:</strong> ${data.name}</p><p><strong>Phone:</strong> +91 ${data.phone}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Insurance Type:</strong> ${data.insuranceType || 'General'}</p><p><strong>Message:</strong> ${data.message || 'None'}</p></div>`
        });
        console.log("Vercel notification email sent to admin:", adminEmails.join(', '));

        // 2. Send thank you acknowledgement email to User
        if (data.email && data.email.trim()) {
          await transporter.sendMail({
            from: `"BimaKey Support" <${process.env.SMTP_USER}>`,
            to: data.email.trim(),
            subject: `Thank you for connecting with BimaKey! 🌱`,
            html: `<div style="font-family: Arial, sans-serif; padding: 25px; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb;">
              <div style="background: #1B6B5A; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Welcome to BimaKey 🌱</h2>
              </div>
              <div style="padding: 20px 10px; color: #374151; line-height: 1.6;">
                <p style="font-size: 16px;">Hi <strong>${data.name}</strong>,</p>
                <p>Thanks for reaching out and connecting with BimaKey! We have successfully received your query regarding <strong>${data.insuranceType || 'Insurance'}</strong>.</p>
                <p>Our expert advisors will review your request and get back to you soon with 100% unbiased recommendations tailored to your needs.</p>
                <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1B6B5A;">
                  <p style="margin: 0; font-size: 14px; color: #4b5563;">No spam calls. No hidden commissions. Just honest expert advice.</p>
                </div>
                <p style="margin-bottom: 0;">Warm regards,<br/><strong>The BimaKey Team</strong></p>
              </div>
            </div>`
          });
          console.log("Vercel thank you email sent to user:", data.email.trim());
        }
      } catch (emailErr) {
        console.error("Vercel email sending error:", emailErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Consultation booked successfully! We'll contact you within 24 hours.",
      data: {
        id: `lead_${Date.now()}`,
        name: data.name || 'Valued User',
        phone: data.phone || '',
        insuranceType: data.insuranceType || 'general'
      }
    });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
