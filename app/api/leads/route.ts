import { NextResponse } from "next/server";

function scoreLead(hasPhotos: boolean, hasMeasurements: boolean, hasFinish: boolean, hasColor: boolean) {
  const completedSignals = [hasPhotos, hasMeasurements, hasFinish, hasColor].filter(Boolean).length;
  if (completedSignals >= 4) return "hot";
  if (completedSignals >= 2) return "warm";
  return "cold";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const honeypot = String(formData.get("website") || "");

  if (honeypot) {
    return NextResponse.json({ ok: true, score: "filtered" });
  }

  const files = formData.getAll("photos").filter((file) => typeof file !== "string");
  const floorMeasurements = String(formData.get("floorMeasurements") || "").trim();
  const desiredFinish = String(formData.get("desiredFinish") || "").trim();
  const desiredColor = String(formData.get("desiredColor") || "").trim();
  const score = scoreLead(files.length > 0, floorMeasurements.length > 0, desiredFinish.length > 0, desiredColor.length > 0);

  return NextResponse.json({
    ok: true,
    score,
    fileCount: files.length,
    message: "Digital estimator request received. Phoenix Epoxy Pros will prepare the estimate, warranty direction, and job tracker setup path for email delivery within 24 hours."
  });
}
