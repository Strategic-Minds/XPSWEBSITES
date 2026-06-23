// app/api/whatsapp/send/route.ts
// WhatsApp messaging via Twilio — all customer/crew/admin touch points
// Feature-flagged: WHATSAPP_ENABLED=true required

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

const ENABLED = process.env.WHATSAPP_ENABLED === 'true';
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const FROM = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+15005550006'; // Twilio sandbox default
const OWNER_WHATSAPP = process.env.TWILIO_OWNER_NOTIFY_TO || '';

interface SendPayload {
  to: string;           // E.164 phone number, e.g. "+17722090266"
  template: string;     // Template name key
  params: Record<string, string>;
  leadId?: string;
  jobId?: string;
}

// Template message bodies
const TEMPLATES: Record<string, (p: Record<string, string>) => string> = {
  xps_lead_submitted: (p) =>
    `Hi ${p.name}! ✅ We received your floor project request for ${p.projectType || 'your project'}. Jeremy will review your photos and details and send your estimate within 24 hours. Questions? Call us: 772-209-0266 — Phoenix Epoxy Pros`,
  xps_proposal_sent: (p) =>
    `Hi ${p.name}! 📋 Your epoxy floor proposal is ready. Check your email from jeremy@shopxps.com for the full scope, pricing, and warranty info. Reply here with any questions!`,
  xps_payment_link: (p) =>
    `Hi ${p.name}! 💳 Your payment link has been sent to ${p.email}. Once payment is received, we'll issue your Job Tracker access and schedule your project. — Phoenix Epoxy Pros`,
  xps_tracker_access: (p) =>
    `Hi ${p.name}! 🔑 Your XPS Job Tracker is now active. Track your project progress, schedule, photos, and warranty here: ${p.link} — Phoenix Epoxy Pros`,
  xps_admin_new_lead: (p) =>
    `🔔 New XPS Lead: ${p.name} in ${p.zip} — ${p.projectType}. Score: ${p.score || 'new'}. ASAP: ${p.asap || 'no'}. Review in admin dashboard.`,
  xps_crew_assignment: (p) =>
    `📋 New job assigned: ${p.customerName} — ${p.address} — ${p.date}. Open your Crew Dashboard for full details and checklist.`,
  xps_change_order_alert: (p) =>
    `⚠️ Change Order from ${p.crewLeader}: "${p.description}" — $${p.amount}. Approval needed in admin dashboard.`,
  xps_color_approval_request: (p) =>
    `Hi ${p.name}! 🎨 We need your color approval before applying your floor finish.\n\nSelected: ${p.finish} / ${p.color}\n\nReply YES to approve or call us to discuss: 772-209-0266`,
  xps_job_complete: (p) =>
    `Hi ${p.name}! 🎉 Your XPS floor is complete! Please review the final walkthrough photos in your Job Tracker. We'd love a review: ${p.reviewLink || 'https://g.page/phoenix-epoxy-pros/review'} — Thank you!`,
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
    return NextResponse.json({ ...receipt, status: 'disabled', message: 'WHATSAPP_ENABLED not set to true' });
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

  // Log to DB if configured
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

// Helper: send WhatsApp from server-side (import and call this in other routes)
export async function sendWhatsApp(
  to: string,
  template: string,
  params: Record<string, string>,
  meta?: { leadId?: string; jobId?: string }
): Promise<boolean> {
  if (!ENABLED || !to) return false;
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/whatsapp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, template, params, ...meta }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

// Inbound webhook from Twilio (for receiving customer replies)
export async function GET(req: NextRequest) {
  return NextResponse.json({ status: 'ok', service: 'xps-whatsapp', enabled: ENABLED });
}
