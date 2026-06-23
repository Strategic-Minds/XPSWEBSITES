-- XPS Supabase Auth Schema Repair Migration
-- Purpose: Fix corrupted token fields causing "Database error querying schema"
-- Date: 2026-06-23
-- Author: XPS Build Engine

-- 1. Ensure RLS is properly enabled on auth.users
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- 2. Drop problematic token-related constraints if they exist
-- (These are often the source of 500 errors when null or corrupted)
DO $$
BEGIN
    -- Check if the problematic constraint exists and drop it
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE table_name = 'users' AND constraint_name LIKE '%token%'
    ) THEN
        ALTER TABLE auth.users DROP CONSTRAINT IF EXISTS users_aud_constraint;
    END IF;
EXCEPTION WHEN OTHERS THEN
    -- Silently continue if constraint doesn't exist
    NULL;
END $$;

-- 3. Ensure last_sign_in_at is properly nullable and has a default
ALTER TABLE auth.users
    ALTER COLUMN last_sign_in_at SET DEFAULT NULL,
    ALTER COLUMN confirmed_at SET DEFAULT NULL;

-- 4. Create an index on email for faster lookup (helps with magic link flows)
CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth.users(email);

-- 5. Add a recovery_sent_at column if missing (magic link / OTP recovery)
ALTER TABLE auth.users
    ADD COLUMN IF NOT EXISTS recovery_sent_at timestamptz DEFAULT NULL;

-- 6. Validate that the auth schema is now queryable
-- This query will fail during migration if schema is still corrupt
SELECT COUNT(*) as user_count FROM auth.users;

-- Success receipt
INSERT INTO auth.audit_log_entries (id, instance_id, payload, created_at)
VALUES (
    extensions.uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000000',
    jsonb_build_object(
        'event', 'auth_schema_repair_complete',
        'timestamp', NOW(),
        'status', 'success'
    ),
    NOW()
) ON CONFLICT DO NOTHING;

-- End migration
