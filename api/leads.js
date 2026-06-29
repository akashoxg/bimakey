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
