import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const timeline = String(formData.get("timeline") || "").toLowerCase();
  const budget = String(formData.get("budget") || "");
  const photoCount = formData.getAll("photos").filter(Boolean).length;
  const score = (timeline.includes("asap") || timeline.includes("30")) && photoCount > 0 && budget ? "hot" : photoCount > 0 || timeline.includes("90") ? "warm" : "cold";

  return NextResponse.json({
    ok: true,
    score,
    message: "Lead captured in template mode. Connect CRM, storage, email, SMS, calendar, and AI estimating after owner approval."
  });
}
