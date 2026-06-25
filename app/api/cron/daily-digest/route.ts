import { NextRequest, NextResponse } from "next/server";

const SUPA = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const TWILIO_SID   = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const CRON_SECRET  = process.env.CRON_SECRET || "";
const NOTIFY_TO    = process.env.TWILIO_OWNER_NOTIFY_TO || "+17722090266";
const FROM_SMS     = "+15616780328";

async function supaGet(path: string) {
  const res = await fetch(`${SUPA}/rest/v1/${path}`, {
    headers: { "apikey": KEY, "Authorization": `Bearer ${KEY}` },
  });
  return res.json();
}

async function sendSMS(to: string, body: string) {
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: to, From: FROM_SMS, Body: body }).toString(),
  });
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret") || new URL(req.url).searchParams.get("secret");
  if (CRON_SECRET && secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const [leads, jobs] = await Promise.all([
      supaGet(`pep_leads?select=id,status,lead_score,created_at&order=created_at.desc`),
      supaGet(`pep_jobs?select=id,status,total_price,install_date&order=created_at.desc`),
    ]);

    const leadsArr = Array.isArray(leads) ? leads : [];
    const jobsArr  = Array.isArray(jobs)  ? jobs  : [];

    const newToday    = leadsArr.filter((l: Record<string,unknown>) => (l.created_at as string)?.startsWith(today)).length;
    const hotLeads    = leadsArr.filter((l: Record<string,unknown>) => l.lead_score === "hot").length;
    const openLeads   = leadsArr.filter((l: Record<string,unknown>) => l.status === "new").length;
    const activeJobs  = jobsArr.filter((j: Record<string,unknown>) => j.status === "in_progress").length;
    const todayInstalls = jobsArr.filter((j: Record<string,unknown>) => (j.install_date as string) === today).length;
    const revenue     = jobsArr.reduce((s: number, j: Record<string,unknown>) => s + ((j.total_price as number) || 0), 0);

    const digest = `☀️ DAILY DIGEST — ${today}\n\n📥 New leads today: ${newToday}\n🔥 Hot leads open: ${hotLeads}\n📋 Total open: ${openLeads}\n🔧 Active jobs: ${activeJobs}\n📅 Installs today: ${todayInstalls}\n💰 Pipeline: $${revenue.toLocaleString()}\n\nDashboard: https://xpswebsites.vercel.app/admin-dashboard`;

    await sendSMS(NOTIFY_TO, digest);

    return NextResponse.json({ ok: true, sent: digest });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
