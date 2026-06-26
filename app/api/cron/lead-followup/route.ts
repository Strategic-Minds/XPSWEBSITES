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

async function supaUpdate(table: string, id: string, data: Record<string,unknown>) {
  await fetch(`${SUPA}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers: { "apikey": KEY, "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function sendSMS(to: string, body: string) {
  if (!TWILIO_SID || !TWILIO_TOKEN) return;
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
    const cutoff24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const cutoff48h = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
    const cutoff72h = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();

    // Leads still "new" after 24h → remind Jeremy
    const staleLeads = await supaGet(
      `pep_leads?status=eq.new&created_at=lt.${cutoff24h}&select=id,full_name,phone,lead_score,created_at`
    );
    const stale = Array.isArray(staleLeads) ? staleLeads : [];

    // Leads in proposal_sent over 48h → follow-up text
    const pendingProposals = await supaGet(
      `pep_leads?status=eq.proposal_sent&updated_at=lt.${cutoff48h}&select=id,full_name,phone,lead_score`
    );
    const pending = Array.isArray(pendingProposals) ? pendingProposals : [];

    let notified = 0;

    // Alert Jeremy about stale new leads
    if (stale.length > 0) {
      const names = stale.slice(0, 5).map((l: Record<string,unknown>) => `${l.full_name} (${l.lead_score})`).join(", ");
      await sendSMS(NOTIFY_TO, `⚠️ STALE LEADS (24h+)\n${stale.length} leads need attention:\n${names}\n\nDashboard: https://xpswebsites.vercel.app/admin-dashboard`);
      notified++;
    }

    // Follow-up text to leads with pending proposals
    for (const lead of pending.slice(0, 10) as Record<string,unknown>[]) {
      const phone = (lead.phone as string)?.replace(/\D/g, "");
      const firstName = (lead.full_name as string)?.split(" ")[0];
      if (!phone) continue;
      const msg = `Hi ${firstName}, this is Phoenix Epoxy Pros following up on your floor quote. Have questions or ready to schedule? Reply here or call (772) 209-0266.`;
      await sendSMS(`+1${phone}`, msg);
      notified++;
    }

    return NextResponse.json({ ok: true, stale: stale.length, followups: pending.length, notified });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
