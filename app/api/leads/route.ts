import { NextResponse } from "next/server";

const DEFAULT_SUPABASE_URL = "https://prhppuuwcnmfdhwsagug.supabase.co";
const DEFAULT_LEAD_BUCKET = "media-assets";
const DEFAULT_ESTIMATE_RECIPIENT = "jeremy@shopxps.com";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
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
  return `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(content || "Not provided")}</td></tr>`;
}

async function uploadAttachment(file: File, index: number) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_LEAD_BUCKET || DEFAULT_LEAD_BUCKET;

  if (!serviceKey) {
    return { ...fileMeta(file), stored: false, reason: "SUPABASE_SERVICE_ROLE_KEY not configured" };
  }

  const path = `xps-digital-estimator/${Date.now()}-${index}-${safeFileName(file.name)}`;
  const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false"
    },
    body: file
  });

  if (!response.ok) {
    const error = await response.text();
    return { ...fileMeta(file), stored: false, bucket, path, error };
  }

  return { ...fileMeta(file), stored: true, bucket, path };
}

async function persistLead(formData: FormData, attachmentResults: unknown[], score: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const notificationEmail = value(formData, "notificationEmail") || process.env.XPS_ESTIMATE_RECIPIENT || DEFAULT_ESTIMATE_RECIPIENT;

  if (!serviceKey) {
    return { stored: false, mode: "preview", reason: "SUPABASE_SERVICE_ROLE_KEY not configured" };
  }

  const payload = {
    source: value(formData, "source") || "xps_website",
    campaign: value(formData, "campaign") || null,
    status: "new",
    owner: "xps",
    meta_json: {
      score,
      fullName: value(formData, "fullName"),
      address: value(formData, "address"),
      phone: value(formData, "phone"),
      email: value(formData, "email"),
      zipCode: value(formData, "zipCode"),
      projectType: value(formData, "projectType"),
      timeline: value(formData, "timeline"),
      preferredTimeline: value(formData, "preferredTimeline"),
      asapServiceRequested: value(formData, "asapServiceRequested") === "yes",
      asapNotes: value(formData, "asapNotes"),
      floorMeasurements: value(formData, "floorMeasurements"),
      existingFloorCovering: value(formData, "existingFloorCovering"),
      concreteCondition: value(formData, "concreteCondition"),
      desiredFinish: value(formData, "desiredFinish"),
      desiredColor: value(formData, "desiredColor"),
      notes: value(formData, "notes"),
      attachments: attachmentResults,
      notificationEmail,
      proposalWorkflow: value(formData, "proposalWorkflow"),
      portalPath: "/client-dashboard"
    }
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return { stored: false, mode: "supabase-error", error: await response.text() };
  }

  return { stored: true, mode: "supabase", rows: await response.json() };
}

async function notifyOwner(formData: FormData, attachmentResults: unknown[], score: string, persistence: unknown) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = value(formData, "notificationEmail") || process.env.XPS_ESTIMATE_RECIPIENT || DEFAULT_ESTIMATE_RECIPIENT;

  if (!apiKey) {
    return { sent: false, mode: "preview", to, reason: "RESEND_API_KEY not configured" };
  }

  const from = process.env.LEADS_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "Phoenix Epoxy Pros <onboarding@resend.dev>";
  const details = [
    row("Score", score),
    row("ASAP service requested", value(formData, "asapServiceRequested") === "yes" ? "Yes" : "No"),
    row("Preferred timeline", value(formData, "preferredTimeline") || value(formData, "timeline")),
    row("ASAP notes", value(formData, "asapNotes")),
    row("Full name", value(formData, "fullName")),
    row("Address", value(formData, "address")),
    row("Email", value(formData, "email")),
    row("Phone", value(formData, "phone")),
    row("ZIP code", value(formData, "zipCode")),
    row("Project type", value(formData, "projectType")),
    row("Floor measurements", value(formData, "floorMeasurements")),
    row("Existing floor", value(formData, "existingFloorCovering")),
    row("Concrete condition", value(formData, "concreteCondition")),
    row("Desired finish", value(formData, "desiredFinish")),
    row("Desired color", value(formData, "desiredColor")),
    row("Notes", value(formData, "notes")),
    row("Attachments", JSON.stringify(attachmentResults)),
    row("Persistence", JSON.stringify(persistence))
  ].join("");

  const subjectPrefix = value(formData, "asapServiceRequested") === "yes" ? "ASAP XPS Request" : "New XPS Digital Bid Request";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `${subjectPrefix} - ${value(formData, "fullName") || "Website Lead"}`,
      html: `<h1>${escapeHtml(subjectPrefix)}</h1><p>A customer submitted a website request.</p><table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">${details}</table>`
    })
  });

  if (!response.ok) {
    return { sent: false, mode: "resend-error", to, error: await response.text() };
  }

  return { sent: true, mode: "resend", to, result: await response.json().catch(() => ({})) };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const timeline = value(formData, "timeline");
  const attachmentValues = [...formData.getAll("attachments"), ...formData.getAll("photos")];
  const files = attachmentValues.filter((item): item is File => item instanceof File && item.size > 0);
  const hasDigitalEstimatorFields = Boolean(
    value(formData, "floorMeasurements") ||
    value(formData, "existingFloorCovering") ||
    value(formData, "concreteCondition") ||
    value(formData, "desiredFinish") ||
    value(formData, "desiredColor")
  );
  const asapServiceRequested = value(formData, "asapServiceRequested") === "yes";
  const score = scoreLead(timeline, files.length > 0, hasDigitalEstimatorFields, asapServiceRequested);
  const attachmentResults = await Promise.all(files.map(uploadAttachment));
  const persistence = await persistLead(formData, attachmentResults, score);
  const notification = await notifyOwner(formData, attachmentResults, score, persistence);

  return NextResponse.json({
    ok: true,
    score,
    persistence,
    notification,
    dashboardPath: "/client-dashboard",
    message: hasDigitalEstimatorFields
      ? "Digital estimator request received. Opening the client dashboard next."
      : "Request received. Phoenix Epoxy Pros will review the details and follow up next."
  });
}
