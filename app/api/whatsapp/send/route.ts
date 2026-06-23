// app/api/whatsapp/send/route.ts
// WhatsApp messaging via Twilio — all 9 customer/crew/admin touchpoints
// Feature-flagged: WHATSAPP_ENABLED=true required (graceful no-op when not set)

import { NextRequest, NextResponse } from 'next/server';

const ENABLED = process.env.WHATSAPP_ENABLED === 'true';

const isConfigured = () =>
  Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM);

// ── 9 canonical message templates (per master spec) ──────────────────────────
const TEMPLATES: Record<string, (p: Record<string, string>) => string> = {
  // 1. Customer confirmation on lead submit
  xps_lead_submitted: (p) =>
    `Hi ${p.name || 'there'}! ✅ Your Phoenix Epoxy Pros estimate for *${p.projectType || 'your project'}* was received. Jeremy will send your detailed proposal within 24 hours. Questions? Reply here. — XPS`,

  // 2. Owner/admin new lead alert
  xps_admin_new_lead: (p) =>
    `🔔 *New XPS Lead*\nName: ${p.name}\nProject: ${p.projectType}\nZIP: ${p.zip}\nScore: ${p.score || '?'}/100${p.asap === 'true' ? '\n⚡ ASAP REQUESTED' : ''}`,

  // 3. Proposal sent to customer
  xps_proposal_sent: (p) =>
    `Hi ${p.name}! 📋 Your Phoenix Epoxy Pros proposal for *${p.projectType}* has been sent to ${p.email}. Review it and reply with any questions. — XPS Team`,

  // 4. Payment link sent
  xps_payment_link: (p) =>
    `Hi ${p.name}! 💳 Your payment link is ready:\n${p.link}\nOnce received we will lock in your installation date. — XPS Team`,

  // 5. Job Tracker portal access granted
  xps_tracker_access: (p) =>
    `Hi ${p.name}! 🔑 Your XPS Job Tracker is now active. Track your project 24/7 here:\n${p.link}\n— Phoenix Epoxy Pros`,

  // 6. Crew assignment notification
  xps_crew_assignment: (p) =>
    `📋 *Job Assignment — XPS*\nCustomer: ${p.customerName}\nAddress: ${p.address}\nDate: ${p.date} @ ${p.time || 'TBD'}\nFinish: ${p.finish || 'See portal'}\nSq Ft: ${p.sqft || 'TBD'}`,

  // 7. Change order alert to owner
  xps_change_order_alert: (p) =>
    `⚠️ *Change Order Request*\nCrew: ${p.crewLeader}\nJob: ${p.customerName}\nDescription: ${p.description}\nAmount: $${p.amount}\n\nReply APPROVE or DENY.`,

  // 8. Color approval request to customer
  xps_color_approval_request: (p) =>
    `Hi ${p.name}! 🎨 *Color Confirmation Needed*\nFinish: ${p.finish}\nColor: ${p.color}\n\nReply *YES* to approve before installation. If no response by ${p.deadline || '8am day-of'}, we proceed with selected color. — XPS`,

  // 9. Job completion + review request
  xps_job_complete: (p) =>
    `Hi ${p.name}! 🎉 Your XPS epoxy floor is complete! We hope you love it.\n\nWould you leave us a quick Google review?\n${p.reviewLink || 'https://g.page/phoenix-epoxy-pros/review'}\n\nThank you for choosing Phoenix Epoxy Pros! — Jeremy`,
};

interface SendPayload {
  to: string;
  template?: string;
  message?: string;
  params?: Record<string, string>;
  leadId?: string;
  jobId?: string;
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  return digits.startsWith('1') ? `+${digits}` : `+1${digits}`;
}

async function sendViaTwilio(to: string, body: string): Promise<{ ok: boolean; sid?: string; error?: string }> {
  const sid = process.env.TWILIO_ACCOUNT_SID!;
  const token = process.env.TWILIO_AUTH_TOKEN!;
  const from = process.env.TWILIO_WHATSAPP_FROM!;
  const toWA = `whatsapp:${to}`;
  const fromWA = from.startsWith('whatsapp:') ? from : `whatsapp:${from}`;

  const resp = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ From: fromWA, To: toWA, Body: body }).toString(),
  });

  const data = await resp.json() as { sid?: string; message?: string; code?: number };
  if (!resp.ok) return { ok: false, error: data.message || `Twilio HTTP ${resp.status}` };
  return { ok: true, sid: data.sid };
}

export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();

  let payload: SendPayload;
  try {
    payload = await req.json() as SendPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { to, template, message, params = {}, leadId, jobId } = payload;

  if (!to || (!template && !message)) {
    return NextResponse.json(
      { error: 'Required: to + (template or message)' },
      { status: 400 }
    );
  }

  // Feature flag check — graceful no-op (not an error)
  if (!ENABLED) {
    return NextResponse.json({
      status: 'disabled',
      message: 'WHATSAPP_ENABLED is not set to true',
      timestamp,
      to,
      template: template || null,
      leadId: leadId || null,
      jobId: jobId || null,
    });
  }

  if (!isConfigured()) {
    return NextResponse.json({
      status: 'not_configured',
      message: 'Twilio credentials missing — set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM',
      timestamp,
    }, { status: 503 });
  }

  const toE164 = normalizePhone(to);

  // Build message body
  let body: string;
  if (message) {
    body = message;
  } else if (template && TEMPLATES[template]) {
    body = TEMPLATES[template](params);
  } else {
    return NextResponse.json({ error: `Unknown template: ${template}` }, { status: 400 });
  }

  const result = await sendViaTwilio(toE164, body);

  return NextResponse.json({
    status: result.ok ? 'sent' : 'failed',
    sid: result.sid || null,
    error: result.error || null,
    to: toE164,
    template: template || null,
    leadId: leadId || null,
    jobId: jobId || null,
    timestamp,
  }, { status: result.ok ? 200 : 502 });
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'xps-whatsapp',
    enabled: ENABLED,
    configured: isConfigured(),
    templates: Object.keys(TEMPLATES),
    timestamp: new Date().toISOString(),
  });
}
