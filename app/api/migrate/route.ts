// app/api/migrate/route.ts
// One-time DB migration — creates all pep_ tables
// POST /api/migrate { "key": "ENTERPRISE_VALIDATION_SECRET" }
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const secret = process.env.ENTERPRISE_VALIDATION_SECRET;
  if (!secret || body.key !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const statements = [
    `CREATE TABLE IF NOT EXISTS pep_leads (
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
    )`,
    `CREATE TABLE IF NOT EXISTS pep_jobs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      lead_id UUID REFERENCES pep_leads(id) ON DELETE SET NULL,
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
    )`,
    `CREATE TABLE IF NOT EXISTS pep_photos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      lead_id UUID REFERENCES pep_leads(id) ON DELETE CASCADE,
      job_id UUID REFERENCES pep_jobs(id) ON DELETE CASCADE,
      photo_type TEXT,
      url TEXT NOT NULL,
      storage_path TEXT,
      uploaded_by TEXT DEFAULT 'customer'
    )`,
    `CREATE TABLE IF NOT EXISTS pep_messages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      lead_id UUID REFERENCES pep_leads(id) ON DELETE SET NULL,
      direction TEXT,
      platform TEXT DEFAULT 'whatsapp',
      from_number TEXT,
      to_number TEXT,
      content TEXT,
      template_name TEXT,
      status TEXT DEFAULT 'sent',
      twilio_sid TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS pep_timeline_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      job_id UUID REFERENCES pep_jobs(id) ON DELETE CASCADE,
      step_number INTEGER,
      step_name TEXT,
      status TEXT DEFAULT 'pending',
      completed_at TIMESTAMPTZ
    )`,
    `CREATE TABLE IF NOT EXISTS pep_system_health (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      checked_at TIMESTAMPTZ DEFAULT NOW(),
      service TEXT,
      status TEXT,
      error_message TEXT,
      auto_fixed BOOLEAN DEFAULT false
    )`
  ];

  const results: {stmt: string; ok: boolean; error?: string}[] = [];

  for (const stmt of statements) {
    const tableName = stmt.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] ?? 'unknown';
    try {
      const res = await fetch(`${url}/rest/v1/${tableName}?limit=0`, {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
        }
      });
      
      if (res.ok || res.status === 200) {
        results.push({ stmt: tableName, ok: true, error: 'already_exists' });
        continue;
      }

      // Table doesn't exist — create via pg SQL
      const sqlRes = await fetch(`${url}/rest/v1/rpc/exec_ddl`, {
        method: 'POST',
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql: stmt })
      });
      
      results.push({ 
        stmt: tableName, 
        ok: sqlRes.ok,
        error: sqlRes.ok ? undefined : await sqlRes.text()
      });
    } catch (e) {
      results.push({ stmt: tableName, ok: false, error: String(e) });
    }
  }

  return NextResponse.json({ success: true, results, message: 'Migration run complete' });
}

export async function GET() {
  return NextResponse.json({ endpoint: '/api/migrate', method: 'POST', status: 'ready' });
}
