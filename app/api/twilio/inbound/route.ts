import { NextRequest, NextResponse } from "next/server";

const SUPA = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function supaInsert(table: string, data: Record<string, unknown>) {
  await fetch(`${SUPA}/rest/v1/${table}`, {
    method: "POST",
    headers: { "apikey": KEY, "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function supaFind(table: string, filter: string) {
  const res = await fetch(`${SUPA}/rest/v1/${table}?${filter}&limit=1`, {
    headers: { "apikey": KEY, "Authorization": `Bearer ${KEY}` },
  });
  const rows = await res.json();
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const from    = formData.get("From")?.toString() || "";
    const body    = formData.get("Body")?.toString() || "";
    const msgSid  = formData.get("MessageSid")?.toString() || "";
    const channel = from.startsWith("whatsapp:") ? "whatsapp" : "sms";
    const phone   = from.replace("whatsapp:", "").replace(/^\+1/, "").replace(/\D/g, "");

    // Match to a lead by phone
    const lead = await supaFind("pep_leads", `phone=eq.${phone}`);
    const leadId = lead?.id || null;

    // Store message in pep_messages
    await supaInsert("pep_messages", {
      lead_id:   leadId,
      twilio_sid: msgSid,
      direction: "inbound",
      platform:  channel,
      content:   body,
      from_number: from,
      status:    "received",
    });

    // Auto-reply with TwiML
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Thanks for reaching out to Phoenix Epoxy Pros! We received your message and will get back to you shortly. For faster help, call (772) 209-0266.</Message>
</Response>`;

    return new NextResponse(twiml, {
      headers: { "Content-Type": "text/xml" },
    });

  } catch (err) {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;
    return new NextResponse(twiml, { headers: { "Content-Type": "text/xml" } });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Twilio inbound webhook active" });
}
