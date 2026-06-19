import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_SUPABASE_URL = "https://prhppuuwcnmfdhwsagug.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kGj9PTt1biObaT6q1uOTHw_nEJI1Rov";
const DEFAULT_LEAD_BUCKET = "media-assets";
const DEFAULT_ESTIMATE_RECIPIENT = "jeremy@shopxps.com";
const MAX_EMAIL_ATTACHMENT_BYTES = 7 * 1024 * 1024;
const MAX_TOTAL_EMAIL_ATTACHMENT_BYTES = 20 * 1024 * 1024;
const IMAGE_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

type AttachmentResult = {
  name: string;
  type: string;
  size: number;
  stored: boolean;
  bucket?: string;
  path?: string;
  mode?: string;
  reason?: string;
  error?: string;
};

type PersistenceResult = {
  stored: boolean;
  mode: string;
  leadId?: string | null;
  reason?: string;
  error?: string;
};

type NotificationResult = {
  sent: boolean;
  mode: string;
  to: string;
  reason?: string;
  error?: string;
  result?: unknown;
};

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function yesNo(formData: FormData, key: string) {
  return value(formData, key) === "yes";
}

function scoreLead(timeline: string, hasFiles: boolean, hasDigitalEstimatorFields: boolean, asapServiceRequested: boolean) {
  const normalized = timeline.toLowerCase();
  if (asapServiceRequested) return "hot";
  if ((normalized.includes("asap") || normalized.includes("urgent") || normalized.includes("24") || normalized.includes("30")) && hasFiles && hasDigitalEstimatorFields) return "hot";
  if (normalized.includes("90") || hasFiles || hasDigitalEstimatorFields) return "warm";
  return "cold";
}

function safeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90) || "attachment";
}

function fileMeta(file: File) {
  return {
    name: file.name,
    type: file.type || "application/octet-stream",
    size: file.size
  };
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, content: string) {
  return `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd;width:210px;vertical-align:top;">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd;vertical-align:top;">${escapeHtml(content || "Not provided")}</td></tr>`;
}

function compactError(error: string) {
  return error.replace(/\s+/g, " ").slice(0, 900);
}

function supabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
}

function supabaseWriteKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    DEFAULT_SUPABASE_PUBLISHABLE_KEY;
}

function supabaseWriteMode() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ? "service_role" : "publishable";
}

function buildLeadPackage(formData: FormData, attachmentResults: AttachmentResult[], score: string, notificationEmail: string) {
  const preferredTimeline = value(formData, "preferredTimeline") || value(formData, "timeline");
  const asapServiceRequested = yesNo(formData, "asapServiceRequested");

  return {
    score,
    source: value(formData, "source") || "xps_website",
    campaign: value(formData, "campaign") || null,
    fullName: value(formData, "fullName"),
    address: value(formData, "address"),
    phone: value(formData, "phone"),
    email: value(formData, "email"),
    zipCode: value(formData, "zipCode"),
    projectType: value(formData, "projectType"),
    timeline: value(formData, "timeline") || preferredTimeline,
    preferredTimeline,
    asapServiceRequested,
    asapNotes: value(formData, "asapNotes"),
    floorMeasurements: value(formData, "floorMeasurements"),
    existingFloorCovering: value(formData, "existingFloorCovering"),
    concreteCondition: value(formData, "concreteCondition"),
    desiredFinish: value(formData, "desiredFinish"),
    desiredColor: value(formData, "desiredColor"),
    notes: value(formData, "notes"),
    chatMessage: value(formData, "chatMessage"),
    attachments: attachmentResults,
    attachmentCount: attachmentResults.length,
    storedAttachmentCount: attachmentResults.filter((item) => item.stored).length,
    notificationEmail,
    proposalWorkflow: value(formData, "proposalWorkflow") || "Email estimate to Jeremy, send proposal to customer, send payment link, then send temporary job tracker sign-in after payment.",
    coupon: "15% Digital Estimator coupon",
    estimateGuarantee: "Guaranteed estimate within 24 hours by email when the estimator package is deliverable.",
    portalPath: "/client-dashboard",
    submittedAt: new Date().toISOString()
  };
}

async function uploadAttachment(file: File, index: number): Promise<AttachmentResult> {
  const bucket = process.env.SUPABASE_LEAD_BUCKET || DEFAULT_LEAD_BUCKET;
  const key = supabaseWriteKey();
  const mode = supabaseWriteMode();

  if (!IMAGE_MIME_TYPES.has(file.type)) {
    return { ...fileMeta(file), stored: false, reason: "Only PNG, JPG, and WEBP floor images are accepted by the current Supabase bucket." };
  }

  if (!key) {
    return { ...fileMeta(file), stored: false, reason: "Supabase write key is not configured." };
  }

  const path = `xps-digital-estimator/${Date.now()}-${index}-${safeFileName(file.name)}`;
  const response = await fetch(`${supabaseUrl()}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false"
    },
    body: file
  });

  if (!response.ok) {
    const error = compactError(await response.text());
    console.error("[xps-leads] attachment upload failed", { bucket, path, mode, status: response.status, error });
    return { ...fileMeta(file), stored: false, bucket, path, mode, error };
  }

  return { ...fileMeta(file), stored: true, bucket, path, mode };
}

async function persistLead(leadPackage: ReturnType<typeof buildLeadPackage>): Promise<PersistenceResult> {
  const key = supabaseWriteKey();
  const mode = supabaseWriteMode();

  if (!key) {
    return { stored: false, mode: "not-configured", reason: "Supabase write key is not configured." };
  }

  const leadId = randomUUID();
  const payload = {
    lead_id: leadId,
    source: leadPackage.source,
    campaign: leadPackage.campaign,
    status: leadPackage.asapServiceRequested ? "asap_new" : "new",
    owner: "xps",
    meta_json: leadPackage
  };

  const response = await fetch(`${supabaseUrl()}/rest/v1/leads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = compactError(await response.text());
    console.error("[xps-leads] Supabase persistence failed", { mode, status: response.status, error });
    return { stored: false, mode: `${mode}-error`, error };
  }

  return { stored: true, mode, leadId };
}

async function buildEmailAttachments(files: File[]) {
  const attachments = [];
  let totalBytes = 0;

  for (const file of files) {
    if (!IMAGE_MIME_TYPES.has(file.type)) continue;
    if (file.size > MAX_EMAIL_ATTACHMENT_BYTES) continue;
    if (totalBytes + file.size > MAX_TOTAL_EMAIL_ATTACHMENT_BYTES) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: safeFileName(file.name),
      content: buffer.toString("base64"),
      content_type: file.type
    });
    totalBytes += file.size;
  }

  return attachments;
}

function attachmentSummary(attachmentResults: AttachmentResult[]) {
  if (!attachmentResults.length) return "No files attached";
  return attachmentResults
    .map((item) => `${item.name} (${Math.round(item.size / 1024)} KB) - ${item.stored ? `stored at ${item.bucket}/${item.path}` : item.reason || item.error || "not stored"}`)
    .join("\n");
}

async function notifyOwner(
  formData: FormData,
  leadPackage: ReturnType<typeof buildLeadPackage>,
  attachmentResults: AttachmentResult[],
  persistence: PersistenceResult,
  files: File[]
): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = leadPackage.notificationEmail || process.env.XPS_ESTIMATE_RECIPIENT || DEFAULT_ESTIMATE_RECIPIENT;

  if (!apiKey) {
    console.warn("[xps-leads] RESEND_API_KEY is not configured; owner email was not sent", { to, source: leadPackage.source });
    return { sent: false, mode: "not-configured", to, reason: "RESEND_API_KEY is not configured." };
  }

  const from = process.env.LEADS_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "Phoenix Epoxy Pros <onboarding@resend.dev>";
  const subjectPrefix = leadPackage.asapServiceRequested ? "ASAP XPS Request" : "New XPS Digital Bid Request";
  const details = [
    row("Lead ID", persistence.leadId || "Not stored yet"),
    row("Storage status", persistence.stored ? `Stored in Supabase (${persistence.mode})` : `Not stored: ${persistence.error || persistence.reason || persistence.mode}`),
    row("Score", leadPackage.score),
    row("ASAP service requested", leadPackage.asapServiceRequested ? "Yes" : "No"),
    row("Preferred timeline", leadPackage.preferredTimeline),
    row("ASAP notes", leadPackage.asapNotes),
    row("Full name", leadPackage.fullName),
    row("Address", leadPackage.address),
    row("Email", leadPackage.email),
    row("Phone", leadPackage.phone),
    row("ZIP code", leadPackage.zipCode),
    row("Project type", leadPackage.projectType),
    row("Floor measurements", leadPackage.floorMeasurements),
    row("Existing floor", leadPackage.existingFloorCovering),
    row("Concrete condition", leadPackage.concreteCondition),
    row("Desired finish", leadPackage.desiredFinish),
    row("Desired color", leadPackage.desiredColor),
    row("Project notes", leadPackage.notes),
    row("Chat message", leadPackage.chatMessage),
    row("Coupon", leadPackage.coupon),
    row("Proposal workflow", leadPackage.proposalWorkflow),
    row("Attachments", attachmentSummary(attachmentResults))
  ].join("");
  const emailAttachments = await buildEmailAttachments(files);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: leadPackage.email ? [leadPackage.email] : undefined,
      subject: `${subjectPrefix} - ${leadPackage.fullName || "Website Lead"}`,
      html: `<h1>${escapeHtml(subjectPrefix)}</h1><p>A customer submitted a website request. Reply directly to the customer from this email when ready.</p><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">${details}</table>`,
      attachments: emailAttachments.length ? emailAttachments : undefined
    })
  });

  if (!response.ok) {
    const error = compactError(await response.text());
    console.error("[xps-leads] Resend notification failed", { to, from, status: response.status, error });
    return { sent: false, mode: "resend-error", to, error };
  }

  return { sent: true, mode: "resend", to, result: await response.json().catch(() => ({})) };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const timeline = value(formData, "timeline") || value(formData, "preferredTimeline");
  const attachmentValues = [...formData.getAll("attachments"), ...formData.getAll("photos")];
  const files = attachmentValues.filter((item): item is File => item instanceof File && item.size > 0);
  const hasDigitalEstimatorFields = Boolean(
    value(formData, "floorMeasurements") ||
    value(formData, "existingFloorCovering") ||
    value(formData, "concreteCondition") ||
    value(formData, "desiredFinish") ||
    value(formData, "desiredColor")
  );
  const asapServiceRequested = yesNo(formData, "asapServiceRequested");
  const score = scoreLead(timeline, files.length > 0, hasDigitalEstimatorFields, asapServiceRequested);
  const attachmentResults = await Promise.all(files.map(uploadAttachment));
  const notificationEmail = value(formData, "notificationEmail") || process.env.XPS_ESTIMATE_RECIPIENT || DEFAULT_ESTIMATE_RECIPIENT;
  const leadPackage = buildLeadPackage(formData, attachmentResults, score, notificationEmail);
  const persistence = await persistLead(leadPackage);
  const notification = await notifyOwner(formData, leadPackage, attachmentResults, persistence, files);
  const accepted = persistence.stored || notification.sent;

  if (!accepted) {
    return NextResponse.json({
      ok: false,
      score,
      persistence,
      notification,
      dashboardPath: "/client-dashboard",
      message: "We could not email or safely queue this request yet. Please call 772-209-0266 or email jeremy@shopxps.com while we finish the connection."
    }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    score,
    leadPackage,
    persistence,
    notification,
    dashboardPath: "/client-dashboard",
    message: hasDigitalEstimatorFields
      ? "Digital estimator request received. Opening the client dashboard next."
      : "Request received. Phoenix Epoxy Pros will review the details and follow up next."
  });
}
