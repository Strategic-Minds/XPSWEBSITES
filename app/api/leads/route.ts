import { NextResponse } from "next/server";

const DEFAULT_SUPABASE_URL = "https://prhppuuwcnmfdhwsagug.supabase.co";
const DEFAULT_LEAD_BUCKET = "media-assets";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function scoreLead(timeline: string, hasFiles: boolean, hasDigitalEstimatorFields: boolean) {
  const normalized = timeline.toLowerCase();
  if ((normalized.includes("asap") || normalized.includes("24") || normalized.includes("30")) && hasFiles && hasDigitalEstimatorFields) return "hot";
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
      phone: value(formData, "phone"),
      email: value(formData, "email"),
      zipCode: value(formData, "zipCode"),
      projectType: value(formData, "projectType"),
      timeline: value(formData, "timeline"),
      floorMeasurements: value(formData, "floorMeasurements"),
      existingFloorCovering: value(formData, "existingFloorCovering"),
      desiredFinish: value(formData, "desiredFinish"),
      desiredColor: value(formData, "desiredColor"),
      notes: value(formData, "notes"),
      attachments: attachmentResults,
      portalPath: "/customer-portal"
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

export async function POST(request: Request) {
  const formData = await request.formData();
  const timeline = value(formData, "timeline");
  const attachmentValues = [...formData.getAll("attachments"), ...formData.getAll("photos")];
  const files = attachmentValues.filter((item): item is File => item instanceof File && item.size > 0);
  const hasDigitalEstimatorFields = Boolean(
    value(formData, "floorMeasurements") ||
    value(formData, "existingFloorCovering") ||
    value(formData, "desiredFinish") ||
    value(formData, "desiredColor")
  );
  const score = scoreLead(timeline, files.length > 0, hasDigitalEstimatorFields);
  const attachmentResults = await Promise.all(files.map(uploadAttachment));
  const persistence = await persistLead(formData, attachmentResults, score);

  return NextResponse.json({
    ok: true,
    score,
    persistence,
    message: hasDigitalEstimatorFields
      ? "Digital estimator request received. Phoenix Epoxy Pros will review the uploads and email the estimate path next."
      : "Estimate request received. Phoenix Epoxy Pros will review the project details and photos next."
  });
}
