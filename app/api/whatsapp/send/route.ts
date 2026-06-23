// app/api/whatsapp/send/route.ts
// WhatsApp messaging via Twilio — all customer/crew/admin touch points
// Feature-flagged: WHATSAPP_ENABLED=true required

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

const ENABLED = process.env.WHATSAPP_ENABLED === 'true';
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+15005550006';

interface SendPayload {
  to: string;
  template: string;
  params: Record<string, string>;
  leadId?: string;
  jobId?: string;
}

const TEMPLATES: Record<string, (p: Record<string, string>) => string> = {
  xps_lead_submitted: (p) =>
    `Hi ${p.name}! ✅ We received your floor project request. Jeremy will review and send your estimate within 24 hours. — Phoenix Epoxy Pros`,
  xps_proposal_sent: (p) =>
    `Hi ${p.name}! 📋 Your proposal is ready. Check your email for details.`,
  xps_payment_link: (p) =>
    `Hi ${p.name}! 💳 Your payment link has been sent to ${p.email}.`,
  xps_tracker_access: (p) =>
    `Hi ${p.name}! 🔑 Your Job Tracker is now active: ${p.link}`,
  xps_admin_new_lead: (p) =>
    `🔔 New Lead: ${p.name} in ${p.zip} — ${p.projectType}. Score: ${p.score || 'new'}.`,
  xps_crew_assignment: (p) =>
    `📋 New job: ${p.customerName} — ${p.address} — ${p.date}.`,
  xps_change_order_alert: (p) =>
    `⚠️ Change Order: "${p.description}" — $${p.amount}.`,
  xps_color_approval_request: (p) =>
    `🎨 Color approval needed: ${p.finish} / ${p.color}. Reply YES to approve.`,
  xps_job_complete: (p) =>
    `🎉 Your floor is complete! Review it in your Job Tracker.`,
};

async function sendTwilioWhatsApp(
  to: string,
  body: string
): Promise<{ success: boolean; sid?: string; error?: string }> {
  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    return { success: false, error: 'Twilio credentials not configured' };
  }
  const toWA = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
  const resp = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: FROM, To: toWA, Body: body }).toString(),
    }
  );
  const data = await resp.json() as { sid?: string; error_message?: string };
  if (!resp.ok) return { success: false, error: data.error_message || 'Twilio error' };
  return { success: true, sid: data.sid };
}

export async function POST(req: NextRequest) {
  const receipt: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    enabled: ENABLED,
    configured: Boolean(ACCOUNT_SID && AUTH_TOKEN),
  };

  if (!ENABLED) {
    return NextResponse.json({ ...receipt, status: 'disabled' });
  }

  let payload: SendPayload;
  try {
    payload = await req.json() as SendPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { to, template, params, leadId, jobId } = payload;
  if (!to || !template) {
    return NextResponse.json({ error: 'to and template are required' }, { status: 400 });
  }

  const templateFn = TEMPLATES[template];
  if (!templateFn) {
    return NextResponse.json({ error: `Unknown template: ${template}` }, { status: 400 });
  }

  const body = templateFn(params);
  const result = await sendTwilioWhatsApp(to, body);

  if (isSupabaseConfigured()) {
    await supabaseAdmin.from('whatsapp_messages').insert({
      lead_id: leadId || null,
      job_id: jobId || null,
      direction: 'outbound',
      to_number: to,
      from_number: FROM,
      message_body: body,
      template_name: template,
      template_params: params,
      twilio_sid: result.sid || null,
      status: result.success ? 'sent' : 'failed',
      sent_at: result.success ? new Date().toISOString() : null,
      failed_reason: result.error || null,
    });
  }

  return NextResponse.json({
    ...receipt,
    status: result.success ? 'sent' : 'failed',
    to,
    template,
    sid: result.sid,
    error: result.error,
  });
}

export async function GET(_req: NextRequest) {
  return NextResponse.json({ status: 'ok', service: 'xps-whatsapp', enabled: ENABLED });
}
