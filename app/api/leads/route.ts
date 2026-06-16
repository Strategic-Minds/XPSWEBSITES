import { NextResponse } from "next/server";
import { scoreLead } from "@/lib/brand";

export async function POST(request: Request) {
  const formData = await request.formData();
  const timeline = String(formData.get("timeline") || "");
  const budget = String(formData.get("budget") || "");
  const files = formData.getAll("photos");
  const score = scoreLead(timeline, files.length > 0, budget.length > 0);

  return NextResponse.json({
    ok: true,
    score,
    message: "Estimate request received. Phoenix Epoxy Pros will review the project details and photos next."
  });
}
