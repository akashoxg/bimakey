// Supabase Edge Function: health
// Simple health check endpoint

import { handleCors, jsonResponse } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  return jsonResponse({
    success: true,
    message: 'BimaKey API is running on Supabase Edge Functions',
    timestamp: new Date().toISOString(),
  });
});
