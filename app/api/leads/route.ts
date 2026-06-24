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
  const resendKey = process.env.EMAIL_PROVIDER_API_KEY || process.env.RESEND_API_KEY;
  if (!resendKey) return false;
  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'XPS Estimator <noreply@phoenixepoxypros.com>',
        to: ['jeremy@shopxps.com'],
        subject: `🔔 New Lead: ${lead.fullName} — ${lead.projectType} [Score: ${score}]${lead.asapRequested ? ' ⚡ ASAP' : ''}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px">
<div style="background:#111214;padding:24px;text-align:center">
  <h1 style="color:#c9a227;margin:0">Phoenix Epoxy Pros — New Lead</h1>
</div>
<div style="padding:24px;background:#fff">
  <p><strong>Name:</strong> ${lead.fullName}</p>
  <p><strong>Email:</strong> ${lead.email}</p>
  <p><strong>Phone:</strong> ${lead.phone}</p>
  <p><strong>ZIP:</strong> ${lead.zipCode}</p>
  <p><strong>Project:</strong> ${lead.projectType}</p>
  ${lead.asapRequested ? '<p style="color:#c9a227"><strong>⚡ ASAP SERVICE REQUESTED</strong></p>' : ''}
  <p><strong>Score:</strong> ${score}/100</p>
  <p><strong>Lead ID:</strong> ${leadId}</p>
</div>
</div>`,
      }),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();
  const receipt: Record<string, unknown> = { timestamp, supabaseConfigured: isSupabaseConfigured() };

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

  // Save to Supabase — gracefully skip if not configured
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabaseAdmin.from('pep_leads').insert({
        id: leadId,
        full_name: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        project_type: lead.projectType,
        address: lead.address || null,
        floor_measurements: lead.floorMeasurements || null,
        existing_floor_covering: lead.existingFloorCovering || null,
        concrete_condition: lead.concreteCondition || null,
        desired_finish: lead.desiredFinish || null,
        desired_color: lead.desiredColor || null,
        asap_requested: lead.asapRequested,
        notes: (lead.notes || lead.asapNotes || null),
        preferred_timeline: lead.preferredTimeline || null,
        notes: lead.notes || null,
        whatsapp_consent: lead.whatsappConsent,
        whatsapp_number: lead.whatsappConsent ? lead.phone : null,
        attachment_count: lead.attachmentCount,
        attachment_paths: lead.attachmentPaths,
        coupon_claimed: true,
        source_campaign: lead.campaign,
        source_page: lead.source,
        ai_score: score,
        raw_payload: lead as unknown as Record<string, unknown>,
        square_footage: lead.floorMeasurements || null,
        zip_code: lead.zipCode,
        lead_score: score >= 70 ? 'hot' : score >= 40 ? 'warm' : 'cold',
        status: 'new',
      });
      receipt.savedToDb = !error;
      if (error) receipt.dbError = error.message;
    } catch (err) {
      receipt.savedToDb = false;
      receipt.dbError = err instanceof Error ? err.message : 'Unknown DB error';
    }
  } else {
    receipt.savedToDb = false;
    receipt.dbNote = 'Supabase not configured — lead logged but not persisted';
  }

  // Send email notification
  const emailSent = await sendOwnerEmail(lead, leadId, score);
  receipt.emailSent = emailSent;

  // Non-blocking WhatsApp notify (customer confirmation + owner alert)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || '';
  if (appUrl) {
    const wa = (payload: object) =>
      fetch(`${appUrl}/api/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

    // Trigger 1: Customer confirmation
    if (lead.whatsappConsent && lead.phone) {
      wa({
        to: lead.phone,
        template: 'xps_lead_submitted',
        params: { name: lead.fullName.split(' ')[0], projectType: lead.projectType },
        leadId,
      });
    }

    // Trigger 2: Owner admin alert
    const ownerPhone = process.env.TWILIO_OWNER_NOTIFY_TO || '';
    if (ownerPhone) {
      wa({
        to: ownerPhone,
        template: 'xps_admin_new_lead',
        params: {
          name: lead.fullName,
          projectType: lead.projectType,
          zip: lead.zipCode,
          score: String(score),
          asap: String(lead.asapRequested),
        },
        leadId,
      });
    }
  }

  return NextResponse.json({
    ...receipt,
    status: 'received',
    message: 'Your request has been submitted. Jeremy will send your estimate within 24 hours.',
  });
}

// HEAD for health check
export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: '/api/leads', configured: isSupabaseConfigured() });
}
