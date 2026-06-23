// app/api/leads/route.ts
// Digital Estimator lead submission — saves to Supabase, sends email, sends WhatsApp

import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const LeadSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  zipCode: z.string().min(4),
  address: z.string().optional(),
  projectType: z.string().min(1),
  floorMeasurements: z.string().optional(),
  existingFloorCovering: z.string().optional(),
  concreteCondition: z.string().optional(),
  desiredFinish: z.string().optional(),
  desiredColor: z.string().optional(),
  asapRequested: z.boolean().optional().default(false),
  asapNotes: z.string().optional(),
  preferredTimeline: z.string().optional(),
  notes: z.string().optional(),
  whatsappConsent: z.boolean().optional().default(false),
  attachmentCount: z.number().optional().default(0),
  attachmentPaths: z.array(z.string()).optional().default([]),
  source: z.string().optional().default('estimator'),
  campaign: z.string().optional().default('organic'),
});

type LeadInput = z.infer<typeof LeadSchema>;

function scoreLead(lead: LeadInput): number {
  let score = 20;
  if (lead.asapRequested) score += 30;
  if (lead.floorMeasurements) score += 15;
  if (lead.existingFloorCovering) score += 10;
  if (lead.desiredFinish) score += 10;
  if (lead.desiredColor) score += 5;
  if (lead.attachmentCount && lead.attachmentCount > 0) score += 10;
  if (lead.address) score += 5;
  return Math.min(score, 100);
}

async function sendOwnerEmail(lead: LeadInput, leadId: string, score: number): Promise<boolean> {
  const resendKey = process.env.EMAIL_PROVIDER_API_KEY;
  if (!resendKey) return false;
  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'XPS Estimator <noreply@phoenixepoxypros.com>',
        to: ['jeremy@shopxps.com'],
        subject: `🔔 New Lead: ${lead.fullName} — ${lead.projectType} [Score: ${score}]${lead.asapRequested ? ' ⚡ ASAP' : ''}`,
        html: `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#111214;padding:24px;text-align:center">
    <h1 style="color:#c9a227;margin:0;font-size:24px">Phoenix Epoxy Pros</h1>
    <p style="color:#fff;margin:4px 0 0">New Digital Estimator Lead</p>
  </div>
  <div style="padding:24px;background:#fff;border:1px solid #e2e0dc">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Lead ID</td><td style="padding:8px 0;font-weight:600">${leadId}</td></tr>
      <tr style="background:#f8f7f4"><td style="padding:8px;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Name</td><td style="padding:8px;font-weight:700;font-size:16px">${lead.fullName}</td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Email</td><td style="padding:8px 0">${lead.email}</td></tr>
      <tr style="background:#f8f7f4"><td style="padding:8px;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Phone</td><td style="padding:8px">${lead.phone}</td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">ZIP</td><td style="padding:8px 0">${lead.zipCode}</td></tr>
      ${lead.address ? `<tr style="background:#f8f7f4"><td style="padding:8px;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Address</td><td style="padding:8px">${lead.address}</td></tr>` : ''}
      <tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Project Type</td><td style="padding:8px 0;font-weight:600">${lead.projectType}</td></tr>
      ${lead.floorMeasurements ? `<tr style="background:#f8f7f4"><td style="padding:8px;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Measurements</td><td style="padding:8px">${lead.floorMeasurements}</td></tr>` : ''}
      ${lead.existingFloorCovering ? `<tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Existing Floor</td><td style="padding:8px 0">${lead.existingFloorCovering}</td></tr>` : ''}
      ${lead.concreteCondition ? `<tr style="background:#f8f7f4"><td style="padding:8px;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Concrete Condition</td><td style="padding:8px">${lead.concreteCondition}</td></tr>` : ''}
      ${lead.desiredFinish ? `<tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Desired Finish</td><td style="padding:8px 0;font-weight:600">${lead.desiredFinish}</td></tr>` : ''}
      ${lead.desiredColor ? `<tr style="background:#f8f7f4"><td style="padding:8px;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Desired Color</td><td style="padding:8px;font-weight:600">${lead.desiredColor}</td></tr>` : ''}
      ${lead.asapRequested ? `<tr><td style="padding:8px 0;color:#c9a227;font-size:12px;text-transform:uppercase;font-weight:700">⚡ ASAP</td><td style="padding:8px 0;color:#c9a227;font-weight:700">YES${lead.asapNotes ? ' — ' + lead.asapNotes : ''}</td></tr>` : ''}
      ${lead.notes ? `<tr style="background:#f8f7f4"><td style="padding:8px;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Notes</td><td style="padding:8px">${lead.notes}</td></tr>` : ''}
      <tr><td style="padding:8px 0;color:#888;font-size:12px;text-transform:uppercase;font-weight:700">Photos</td><td style="padding:8px 0">${lead.attachmentCount || 0} file(s)</td></tr>
    </table>
    <div style="margin:20px 0;padding:16px;background:${score >= 70 ? '#f0fdf4' : '#fefce8'};border-left:4px solid ${score >= 70 ? '#16a34a' : '#d97706'};border-radius:4px">
      <strong style="font-size:18px">Lead Score: ${score}/100</strong>
      ${score >= 70 ? '<span style="color:#16a34a;margin-left:8px">🔥 Hot Lead</span>' : score >= 40 ? '<span style="color:#d97706;margin-left:8px">⭐ Warm Lead</span>' : '<span style="color:#6b7280;margin-left:8px">Cold Lead</span>'}
    </div>
  </div>
  <div style="background:#111214;padding:16px;text-align:center">
    <p style="color:#888;font-size:12px;margin:0">Phoenix Epoxy Pros | 772-209-0266 | jeremy@shopxps.com</p>
  </div>
</div>`,
      }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

async function sendWhatsAppNotifications(lead: LeadInput, leadId: string, score: number): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
  if (!appUrl) return;

  // Notify customer
  if (lead.whatsappConsent && lead.phone) {
    await fetch(`${appUrl}/api/whatsapp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: lead.phone,
        template: 'xps_lead_submitted',
        params: { name: lead.fullName.split(' ')[0], projectType: lead.projectType },
        leadId,
      }),
    }).catch(() => null);
  }

  // Notify Jeremy
  const ownerPhone = process.env.TWILIO_OWNER_NOTIFY_TO;
  if (ownerPhone) {
    await fetch(`${appUrl}/api/whatsapp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: ownerPhone,
        template: 'xps_admin_new_lead',
        params: {
          name: lead.fullName,
          zip: lead.zipCode,
          projectType: lead.projectType,
          score: String(score),
          asap: lead.asapRequested ? 'YES' : 'no',
        },
        leadId,
      }),
    }).catch(() => null);
  }
}

export async function POST(req: NextRequest) {
  const receipt: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    supabaseConfigured: isSupabaseConfigured(),
  };

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 422 });
  }

  const lead = parsed.data;
  const score = scoreLead(lead);
  const leadId = crypto.randomUUID();

  receipt.leadId = leadId;
  receipt.score = score;

  // Save to Supabase
  let savedToDb = false;
  if (isSupabaseConfigured()) {
    const { error } = await supabaseAdmin.from('leads').insert({
      id: leadId,
      full_name: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      project_type: lead.projectType,
      address: lead.address,
      floor_measurements: lead.floorMeasurements,
      existing_floor_covering: lead.existingFloorCovering,
      concrete_condition: lead.concreteCondition,
      desired_finish: lead.desiredFinish,
      desired_color: lead.desiredColor,
      asap_requested: lead.asapRequested,
      asap_notes: lead.asapNotes,
      preferred_timeline: lead.preferredTimeline,
      notes: lead.notes,
      whatsapp_consent: lead.whatsappConsent,
      whatsapp_number: lead.whatsappConsent ? lead.phone : null,
      attachment_count: lead.attachmentCount,
      attachment_paths: lead.attachmentPaths,
      coupon_claimed: true,
      source_campaign: lead.campaign,
      source_page: lead.source,
      ai_score: score,
      raw_payload: lead as unknown as Record<string, unknown>,
      square_footage: lead.floorMeasurements,
      zip_code: lead.zipCode,
      lead_score: score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'cold',
      status: 'new',
    });
    savedToDb = !error;
    receipt.savedToDb = savedToDb;
    if (error) receipt.dbError = error.message;
  }

  // Send email notification
  const emailSent = await sendOwnerEmail(lead, leadId, score);
  receipt.emailSent = emailSent;

  // Send WhatsApp notifications (async, non-blocking)
  void sendWhatsAppNotifications(lead, leadId, score);

  return NextResponse.json({
    ...receipt,
    status: 'received',
    message: 'Your request has been submitted. Jeremy will send your estimate within 24 hours.',
  });
}
