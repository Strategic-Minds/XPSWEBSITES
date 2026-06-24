// app/api/migrate/route.ts
// DB migration runner — creates all pep_ tables
// POST /api/migrate { "key": "value_of_MIGRATION_KEY_env" }
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const secret = process.env.MIGRATION_KEY || process.env.ENTERPRISE_VALIDATION_SECRET;
  if (!secret || body.key !== secret) {
    return NextResponse.json({ error: 'Unauthorized', hint: 'Send body: {"key": "MIGRATION_KEY value"}' }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  // Tables to create — check existence first, then create
  const tables = [
    {
      name: 'pep_leads',
      sql: `CREATE TABLE IF NOT EXISTS pep_leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        zip_code TEXT,
        address TEXT,
        project_type TEXT,
        floor_measurements TEXT,
        existing_floor_covering TEXT,
        concrete_condition TEXT,
        desired_finish TEXT,
        desired_color TEXT,
        asap_requested BOOLEAN DEFAULT false,
        preferred_timeline TEXT,
        notes TEXT,
        whatsapp_consent BOOLEAN DEFAULT true,
        whatsapp_number TEXT,
        attachment_count INTEGER DEFAULT 0,
        attachment_paths TEXT[] DEFAULT '{}',
        coupon_claimed BOOLEAN DEFAULT false,
        source_campaign TEXT DEFAULT 'organic',
        source_page TEXT DEFAULT 'estimator',
        ai_score INTEGER DEFAULT 0,
        lead_score TEXT DEFAULT 'cold',
        status TEXT DEFAULT 'new',
        raw_payload JSONB,
        square_footage TEXT,
        dashboard_token TEXT UNIQUE DEFAULT gen_random_uuid()::text
      )`
    },
    {
      name: 'pep_jobs',
      sql: `CREATE TABLE IF NOT EXISTS pep_jobs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        lead_id UUID,
        status TEXT DEFAULT 'intake',
        project_number TEXT UNIQUE,
        scheduled_date DATE,
        finish_system TEXT,
        selected_color TEXT,
        square_footage INTEGER,
        job_address TEXT,
        city TEXT DEFAULT 'Phoenix',
        state TEXT DEFAULT 'AZ',
        total_price DECIMAL(10,2),
        deposit_amount DECIMAL(10,2),
        deposit_paid BOOLEAN DEFAULT false,
        balance_amount DECIMAL(10,2),
        balance_paid BOOLEAN DEFAULT false,
        install_date DATE,
        completion_date DATE,
        notes TEXT
      )`
    },
    {
      name: 'pep_photos',
      sql: `CREATE TABLE IF NOT EXISTS pep_photos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        lead_id UUID,
        job_id UUID,
        photo_type TEXT,
        url TEXT NOT NULL,
        storage_path TEXT,
        uploaded_by TEXT DEFAULT 'customer'
      )`
    },
    {
      name: 'pep_messages',
      sql: `CREATE TABLE IF NOT EXISTS pep_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        lead_id UUID,
        direction TEXT,
        platform TEXT DEFAULT 'whatsapp',
        from_number TEXT,
        to_number TEXT,
        content TEXT,
        template_name TEXT,
        status TEXT DEFAULT 'sent',
        twilio_sid TEXT
      )`
    },
    {
      name: 'pep_timeline_events',
      sql: `CREATE TABLE IF NOT EXISTS pep_timeline_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        job_id UUID,
        step_number INTEGER,
        step_name TEXT,
        status TEXT DEFAULT 'pending',
        completed_at TIMESTAMPTZ
      )`
    },
    {
      name: 'pep_system_health',
      sql: `CREATE TABLE IF NOT EXISTS pep_system_health (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        checked_at TIMESTAMPTZ DEFAULT NOW(),
        service TEXT,
        status TEXT,
        error_message TEXT,
        auto_fixed BOOLEAN DEFAULT false
      )`
    }
  ];

  const results: {table: string; existed: boolean; created: boolean; error?: string}[] = [];

  for (const t of tables) {
    // Check if table exists
    const { error: checkError } = await supabase.from(t.name).select('id').limit(1);
    
    if (!checkError) {
      results.push({ table: t.name, existed: true, created: false });
      continue;
    }

    // Table missing — use rpc to execute DDL if available
    const { error: rpcError } = await supabase.rpc('exec_ddl', { sql: t.sql });
    
    if (!rpcError) {
      results.push({ table: t.name, existed: false, created: true });
    } else {
      // Last resort: try raw fetch to pg endpoint
      results.push({ 
        table: t.name, 
        existed: false, 
        created: false, 
        error: `Table missing. Run SQL manually: ${t.sql.slice(0, 100)}...`
      });
    }
  }

  // Generate ready-to-run SQL for manual execution if needed
  const missingSql = tables
    .filter((t, i) => results[i] && !results[i].existed && !results[i].created)
    .map(t => t.sql)
    .join(';\n\n');

  return NextResponse.json({ 
    success: true, 
    results,
    manualSql: missingSql || null,
    supabaseDashboardUrl: `https://supabase.com/dashboard/project/prhppuuwcnmfdhwsagug/sql/new`
  });
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key');
  const migrationKey = process.env.MIGRATION_KEY || '';
  if (key === migrationKey && migrationKey) {
    return NextResponse.json({ endpoint: '/api/migrate', status: 'ready', method: 'POST' });
  }
  return NextResponse.json({ endpoint: '/api/migrate', method: 'POST required' });
}
