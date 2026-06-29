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
