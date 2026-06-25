import { NextRequest, NextResponse } from "next/server";

const SUPA = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const TWILIO_SID   = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const FROM_WA  = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+15559730487";
const NOTIFY   = process.env.TWILIO_OWNER_NOTIFY_TO || "";
const FROM_SMS = "+15616780328";

async function supaInsert(table: string, data: Record<string, unknown>) {
  const res = await fetch(`${SUPA}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "apikey": KEY,
      "Authorization": `Bearer ${KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function sendSMS(to: string, body: string) {
  if (!TWILIO_SID || !TWILIO_TOKEN || !to) return null;
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Authorization": "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: FROM_SMS, Body: body }).toString(),
    }
  );
  return res.json();
}

async function sendWhatsApp(to: string, body: string) {
  if (!TWILIO_SID || !TWILIO_TOKEN || !to) return null;
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Authorization": "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: `whatsapp:${to}`, From: FROM_WA, Body: body }).toString(),
    }
  );
  return res.json();
}

function scoreLead(data: Record<string, unknown>): { score: number; grade: string } {
  let score = 50;
  const sqft = Number(data.square_footage) || 0;
  if (sqft > 800) score += 20;
  else if (sqft > 400) score += 10;
  if (data.project_type === "commercial") score += 15;
  if (data.email) score += 5;
  if (data.phone) score += 5;
  if (data.timeline === "asap") score += 10;
  const grade = score >= 80 ? "hot" : score >= 60 ? "warm" : "cold";
  return { score, grade };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { full_name, phone, email, zip_code, project_type, square_footage, timeline, how_did_you_hear, notes, coupon_claimed } = body;

    if (!full_name || !phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const { score, grade } = scoreLead(body);

    // 1. Insert into Supabase
    const lead = await supaInsert("pep_leads", {
      full_name, phone, email, zip_code,
      project_type: project_type || "garage",
      square_footage: square_footage ? Number(square_footage) : null,
      timeline, how_did_you_hear, notes,
      coupon_claimed: coupon_claimed || false,
      status: "new",
      ai_score: score,
      lead_score: grade,
      source_campaign: req.headers.get("referer")?.includes("google") ? "Google Ads" : "Organic",
    });

    const leadId = Array.isArray(lead) ? lead[0]?.id : lead?.id;

    // 2. Notify Jeremy via SMS (always works, no template needed)
    const notifyTo = NOTIFY || "+17722090266";
    const smsBody = `🚨 NEW LEAD\n${full_name} | ${phone}\n${zip_code} | ${project_type} | ${square_footage || "?"}sqft\nScore: ${grade.toUpperCase()} (${score})\nID: ${leadId?.slice(0,8) || "new"}`;
    
    const [smsResult, waResult] = await Promise.allSettled([
      sendSMS(notifyTo, smsBody),
      sendWhatsApp(notifyTo, smsBody),
    ]);

    // 3. Send confirmation SMS to lead
    if (phone) {
      const confirmMsg = `Hi ${full_name?.split(" ")[0]}! Your Phoenix Epoxy Pros bid request was received. We'll send your quote within 24 hours. Questions? Reply to this number or WhatsApp us at (772) 209-0266.`;
      await sendSMS(phone, confirmMsg).catch(() => null);
    }

    return NextResponse.json({
      ok: true,
      leadId,
      score: grade,
      message: "Lead submitted successfully.",
    });

  } catch (err) {
    console.error("submit-lead error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Lead submission endpoint active" });
}
