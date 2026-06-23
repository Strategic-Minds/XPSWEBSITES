-- ============================================================
-- XPS WEBSITES: Auth Repair Migration
-- File: supabase/migrations/0002_auth_repair.sql
-- Purpose: Fix 500 DB error on auth token-related field reads
-- APPROVAL REQUIRED before running in production
-- ============================================================

-- Step 1: Diagnose null/corrupt token fields in auth.users
-- These are the fields that cause "Database error querying schema"
-- when Supabase auth tries to read them during sign-in.

-- Safe read-only check (run this first to confirm issue):
-- SELECT id, email, aud, role, confirmation_token, recovery_token,
--        email_change_token_new, email_change_token_current,
--        reauthentication_token, phone_change_token
-- FROM auth.users
-- WHERE email = 'strategicmindsadvisory@gmail.com';

-- Step 2: Clear corrupt null-string token values that cause schema query errors
-- This replaces empty strings with proper empty values and ensures
-- the auth schema can read these fields without a 500 error.

UPDATE auth.users
SET
  confirmation_token    = COALESCE(NULLIF(confirmation_token, ''), ''),
  recovery_token        = COALESCE(NULLIF(recovery_token, ''), ''),
  email_change_token_new     = COALESCE(NULLIF(email_change_token_new, ''), ''),
  email_change_token_current = COALESCE(NULLIF(email_change_token_current, ''), ''),
  reauthentication_token     = COALESCE(NULLIF(reauthentication_token, ''), ''),
  phone_change_token         = COALESCE(NULLIF(phone_change_token, ''), ''),
  updated_at = now()
WHERE email = 'strategicmindsadvisory@gmail.com';

-- Step 3: Ensure the user is email-confirmed and active
UPDATE auth.users
SET
  email_confirmed_at = COALESCE(email_confirmed_at, now()),
  is_sso_user = false,
  banned_until = NULL,
  deleted_at = NULL,
  updated_at = now()
WHERE email = 'strategicmindsadvisory@gmail.com';

-- Step 4: Create a whatsapp_messages table for logging all WA comms
CREATE TABLE IF NOT EXISTS public.whatsapp_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
  direction text NOT NULL CHECK (direction IN ('outbound', 'inbound')),
  to_number text,
  from_number text,
  message_body text NOT NULL,
  template_name text,
  template_params jsonb DEFAULT '{}'::jsonb,
  twilio_sid text,
  status text DEFAULT 'queued',
  sent_at timestamptz,
  delivered_at timestamptz,
  failed_reason text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS whatsapp_messages_lead_id_idx ON public.whatsapp_messages(lead_id);
CREATE INDEX IF NOT EXISTS whatsapp_messages_job_id_idx ON public.whatsapp_messages(job_id);

-- Step 5: Extend leads table with WhatsApp consent and extra fields needed by estimator
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS floor_measurements text,
  ADD COLUMN IF NOT EXISTS existing_floor_covering text,
  ADD COLUMN IF NOT EXISTS concrete_condition text,
  ADD COLUMN IF NOT EXISTS desired_finish text,
  ADD COLUMN IF NOT EXISTS desired_color text,
  ADD COLUMN IF NOT EXISTS asap_requested boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS asap_notes text,
  ADD COLUMN IF NOT EXISTS preferred_timeline text,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS whatsapp_consent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS attachment_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS attachment_paths jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS coupon_claimed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS source_campaign text DEFAULT 'organic',
  ADD COLUMN IF NOT EXISTS source_page text,
  ADD COLUMN IF NOT EXISTS notification_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS whatsapp_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS ai_score integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_notes text;

-- Step 6: Create magic link / OTP support table for temporary no-password access
CREATE TABLE IF NOT EXISTS public.customer_access_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE,
  email text NOT NULL,
  token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  token_type text NOT NULL DEFAULT 'magic_link' CHECK (token_type IN ('magic_link', 'otp', 'temp_access')),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '48 hours'),
  used_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.customer_access_tokens ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS cat_email_idx ON public.customer_access_tokens(email);
CREATE INDEX IF NOT EXISTS cat_token_idx ON public.customer_access_tokens(token);

-- Step 7: Create a proposal_documents table
CREATE TABLE IF NOT EXISTS public.proposal_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id),
  job_id uuid REFERENCES public.jobs(id),
  document_type text NOT NULL DEFAULT 'proposal' CHECK (document_type IN ('proposal','takeoff','scope','warranty','invoice')),
  title text NOT NULL,
  content_html text,
  content_json jsonb DEFAULT '{}'::jsonb,
  drive_file_id text,
  drive_file_url text,
  status text DEFAULT 'draft' CHECK (status IN ('draft','pending_review','approved','sent','signed','expired')),
  sent_at timestamptz,
  signed_at timestamptz,
  total_amount numeric(12,2),
  ai_generated boolean DEFAULT false,
  ai_confidence text,
  human_reviewed boolean DEFAULT false,
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.proposal_documents ENABLE ROW LEVEL SECURITY;

-- Step 8: RLS policies — service role bypasses all; anon can insert leads only
CREATE POLICY IF NOT EXISTS "service_role_all_whatsapp" ON public.whatsapp_messages
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "service_role_all_tokens" ON public.customer_access_tokens
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "service_role_all_proposals" ON public.proposal_documents
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow anon to insert leads (for public estimator form)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'anon_insert_leads'
  ) THEN
    CREATE POLICY "anon_insert_leads" ON public.leads
      FOR INSERT TO anon WITH CHECK (true);
  END IF;
END
$$;

-- Verification query (run after migration to confirm):
-- SELECT id, email, email_confirmed_at, updated_at FROM auth.users WHERE email = 'strategicmindsadvisory@gmail.com';
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'leads' ORDER BY ordinal_position;

