import { NextRequest, NextResponse } from "next/server";

const SUPA = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const TWILIO_SID   = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const FROM_SMS = "+15616780328";
const FROM_WA  = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+15559730487";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xpswebsites.vercel.app";

async function supaGet(table: string, filter: string) {
  const res = await fetch(`${SUPA}/rest/v1/${table}?${filter}&limit=1`, {
    headers: { "apikey": KEY, "Authorization": `Bearer ${KEY}` },
  });
  const rows = await res.json();
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

async function supaUpdate(table: string, id: string, data: Record<string, unknown>) {
  await fetch(`${SUPA}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers: { "apikey": KEY, "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

function generateCode(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

async function sendMsg(to: string, body: string, channel: "sms" | "whatsapp") {
  const From = channel === "whatsapp" ? FROM_WA : FROM_SMS;
  const To   = channel === "whatsapp" ? `whatsapp:${to}` : to;
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To, From, Body: body }).toString(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { lead_id } = await req.json();
    if (!lead_id) return NextResponse.json({ error: "lead_id required" }, { status: 400 });

    const lead = await supaGet("pep_leads", `id=eq.${lead_id}`);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    // Generate or reuse code
    const code = lead.dashboard_token || generateCode();
    if (!lead.dashboard_token) {
      await supaUpdate("pep_leads", lead_id, { dashboard_token: code });
    }

    const dashUrl = `${SITE_URL}/customer-portal`;
    const firstName = (lead.full_name || "").split(" ")[0];
    const msg = `Hi ${firstName}! Your Phoenix Epoxy Pros project dashboard is ready.\n\nAccess code: *${code}*\n\nLogin: ${dashUrl}\n\nView your project timeline, install date, and message us directly from your dashboard.`;

    // Send both SMS + WhatsApp for max delivery
    const phone = lead.phone?.replace(/\D/g, "");
    await Promise.allSettled([
      sendMsg(`+1${phone}`, msg, "sms"),
      sendMsg(`+1${phone}`, msg, "whatsapp"),
    ]);

    return NextResponse.json({ ok: true, code, phone: lead.phone });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
