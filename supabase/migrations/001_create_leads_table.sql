-- ====================================================
-- BimaKey Insurance Platform - Supabase Database Schema
-- ====================================================

-- Create enum types
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'converted', 'closed');
CREATE TYPE insurance_type AS ENUM ('health', 'term', 'motor', 'other');

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  phone TEXT NOT NULL CHECK (phone ~ '^[6-9]\d{9}$'),
  email TEXT NOT NULL CHECK (email ~ '^\S+@\S+\.\S+$'),
  insurance_type insurance_type NOT NULL DEFAULT 'other',
  message TEXT DEFAULT '' CHECK (char_length(message) <= 1000),
  whatsapp_consent BOOLEAN DEFAULT true,
  source TEXT DEFAULT 'website' CHECK (char_length(source) <= 100),
  status lead_status DEFAULT 'new',
  ip_address TEXT,
  -- Claim-specific fields (nullable, used when source = 'claim-assistance')
  claim_type TEXT,
  claim_status TEXT,
  insurer_name TEXT,
  policy_number TEXT,
  callback_time TEXT,
  hospital_name TEXT,
  treatment_type TEXT,
  health_claim_type TEXT,
  estimated_amount NUMERIC,
  admission_date TIMESTAMPTZ,
  vehicle_number TEXT,
  motor_claim_type TEXT,
  accident_date TIMESTAMPTZ,
  accident_location TEXT,
  fir_registered TEXT,
  fir_number TEXT,
  damage_description TEXT,
  policy_holder_name TEXT,
  life_claim_type TEXT,
  incident_date TIMESTAMPTZ,
  cause_of_death TEXT,
  nominee_name TEXT,
  nominee_relationship TEXT,
  nominee_phone TEXT,
  issue_type TEXT,
  issue_description TEXT,
  renewal_reason TEXT,
  expiry_date TIMESTAMPTZ,
  additional_info TEXT,
  query_type TEXT,
  query_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX idx_leads_status_created ON leads (status, created_at DESC);
CREATE INDEX idx_leads_phone ON leads (phone);
CREATE INDEX idx_leads_email ON leads (email);
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to leads table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (public lead submission)
CREATE POLICY "Allow anonymous lead creation"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Policy: Allow service role full access (for Edge Functions)
CREATE POLICY "Allow service role full access"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

-- Policy: Allow authenticated users to read (admin)
CREATE POLICY "Allow authenticated read access"
  ON leads FOR SELECT
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Policy: Allow authenticated users to update (admin)
CREATE POLICY "Allow authenticated update access"
  ON leads FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
