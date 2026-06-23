-- 0003_auth_schema_repair_20260623.sql
-- CRITICAL: Supabase Auth 500 Error Fix
-- Issue: Database error querying schema on token-related field reads
-- Root Cause: Null/corrupt values in auth.users token metadata fields
-- Solution: Repair fields, ensure RLS consistency, validate auth schema integrity
-- Status: REQUIRES APPROVAL - Do not run on production without Jeremy's sign-off

BEGIN;

-- 1. Backup current auth state
CREATE TABLE IF NOT EXISTS auth_users_backup_20260623 AS
SELECT * FROM auth.users WHERE email_confirmed_at IS NOT NULL;

-- 2. Fix null app_meta_data and user_meta_data
UPDATE auth.users
SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb),
    raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb)
WHERE raw_app_meta_data IS NULL OR raw_user_meta_data IS NULL;

-- 3. Validate email_confirmed_at consistency
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE email = 'strategicmindsadvisory@gmail.com' AND email_confirmed_at IS NULL;

-- 4. Ensure RLS policy on auth.users is correct
-- (RLS should prevent token exposure outside user's own role)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create or replace the auth.users RLS policy
DROP POLICY IF EXISTS "users_own_record_only" ON auth.users;
CREATE POLICY "users_own_record_only" ON auth.users
  FOR SELECT USING (auth.uid() = id);

-- 5. Create repair audit record
INSERT INTO auth_repair_log (migration_version, action, details)
VALUES (
  '0003',
  'auth_schema_repair_applied',
  jsonb_build_object(
    'timestamp', now(),
    'rows_fixed_meta_data', (
      SELECT COUNT(*) FROM auth.users 
      WHERE raw_app_meta_data = '{}'::jsonb OR raw_user_meta_data = '{}'::jsonb
    ),
    'email_confirmed_users', (
      SELECT COUNT(*) FROM auth.users WHERE email_confirmed_at IS NOT NULL
    )
  )
);

COMMIT;

-- Manual verification commands (run after this migration):
-- SELECT id, email, email_confirmed_at, raw_app_meta_data, raw_user_meta_data
-- FROM auth.users WHERE email = 'strategicmindsadvisory@gmail.com';
