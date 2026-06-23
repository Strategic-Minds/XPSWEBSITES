// app/api/whatsapp/send/route.ts
// WhatsApp message sender via Twilio WhatsApp API

import { NextRequest, NextResponse } from 'next/server';

const isWhatsAppConfigured = () =>
  Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM);

export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();

  let body: { to?: string; message?: string; template?: string; params?: Record<string, string>; leadId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.to || (!body.message && !body.template)) {
    return NextResponse.json({ error: 'Missing required fields: to, message or template' }, { status: 400 });
  }

  // Normalize phone number
  const to = body.to.replace(/\D/g, '');
  const toE164 = to.startsWith('1') ? `+${to}` : `+1${to}`;

  if (!isWhatsAppConfigured()) {
    return NextResponse.json({
      status: 'disabled',
      message: 'WhatsApp not configured — set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM',
      timestamp,
      to: toE164,
    });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const from = process.env.TWILIO_WHATSAPP_FROM!;

  // Build message body
  const messageBody = body.message || buildTemplateMessage(body.template!, body.params || {});

  try {
    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const resp = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: `whatsapp:${from}`,
        To: `whatsapp:${toE164}`,
        Body: messageBody,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return NextResponse.json({
        status: 'failed',
        error: data.message || 'Twilio error',
        code: data.code,
        timestamp,
      }, { status: 502 });
    }

    return NextResponse.json({
      status: 'sent',
      messageSid: data.sid,
      to: toE164,
      timestamp,
    });
  } catch (err) {
    return NextResponse.json({
      status: 'failed',
      error: err instanceof Error ? err.message : 'Network error',
      timestamp,
    }, { status: 502 });
  }
}

function buildTemplateMessage(template: string, params: Record<string, string>): string {
  const templates: Record<string, string> = {
    xps_lead_submitted: `Hi ${params.name || 'there'}! ✅ Your Phoenix Epoxy Pros estimate request for *${params.projectType || 'your project'}* was received. Jeremy will send your detailed estimate within 24 hours. Questions? Reply to this message. — XPS Digital`,
    xps_admin_new_lead: `🔔 *New Lead Alert*\nName: ${params.name}\nProject: ${params.projectType}\nZIP: ${params.zip}\nScore: ${params.score}/100${params.asap === 'YES' ? '\n⚡ ASAP REQUESTED' : ''}`,
    xps_proposal_sent: `Hi ${params.name}! 📋 Your Phoenix Epoxy Pros proposal for *${params.projectType}* has been sent to ${params.email}. Review it and reply with any questions. — XPS Team`,
    xps_job_confirmed: `Hi ${params.name}! 🎉 Your epoxy floor installation is confirmed for *${params.date}*. Our crew will arrive at ${params.time}. See you then! — XPS Team`,
  };
  return templates[template] || `Phoenix Epoxy Pros: ${template}`;
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/whatsapp/send',
    configured: isWhatsAppConfigured(),
    timestamp: new Date().toISOString(),
  });
}
