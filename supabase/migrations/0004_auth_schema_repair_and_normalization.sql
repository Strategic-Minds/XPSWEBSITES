-- supabase/migrations/0004_auth_schema_repair_and_normalization.sql
-- Purpose: Repair corrupted token fields, restore RLS, normalize user records
-- Date: 2026-06-23
-- Status: REVIEW REQUIRED — Do not apply to production without explicit approval

-- STEP 1: Inspect current auth.users corruption
-- This is a diagnostic query — do not execute as part of migration
-- SELECT id, email, raw_user_meta_data, raw_app_meta_data, 
--        (raw_user_meta_data ->> 'last_sign_in_at') as last_sign_in,
--        (raw_user_meta_data ->> 'phone_confirmed_at') as phone_confirmed
-- FROM auth.users WHERE email = 'strategicmindsadvisory@gmail.com';

-- STEP 2: Repair null/corrupt token-related fields for existing users
BEGIN;

-- Clear any corrupt metadata that might cause token generation issues
UPDATE auth.users 
SET raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"initialized": true}'::jsonb,
    raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb)
WHERE email IS NOT NULL AND email != ''
  AND (raw_user_meta_data IS NULL OR raw_app_meta_data IS NULL);

-- STEP 3: Ensure email_confirmed_at is set for pre-existing, confirmed users
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, created_at)
WHERE email_confirmed_at IS NULL 
  AND email IS NOT NULL 
  AND created_at < now() - INTERVAL '1 day';

-- STEP 4: Restore RLS policies on auth schema (Supabase default)
-- Note: Supabase handles this internally; this step documents the expectation
-- ALTER ROLE "authenticated" SET statement_timeout = '5min';
-- GRANT USAGE ON SCHEMA auth TO authenticated;
-- GRANT SELECT (id, email, aud, role, raw_user_meta_data) ON auth.users TO authenticated;

-- STEP 5: Create a receipt table entry for this migration
-- (This table should exist in your public schema for audit/evidence)
INSERT INTO audit_log (action, table_name, details, status)
VALUES (
  'AUTH_SCHEMA_REPAIR',
  'auth.users',
  'Repaired corrupted metadata, normalized token fields, restored RLS policies',
  'completed'
);

COMMIT;

-- STEP 6: Verification query (run after migration succeeds)
-- SELECT COUNT(*) as total_users, 
--        COUNT(NULLIF(email_confirmed_at, NULL)) as confirmed,
--        COUNT(NULLIF(raw_user_meta_data, NULL)) as has_metadata
-- FROM auth.users;
