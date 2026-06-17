export const dynamic = "force-dynamic";

type CronReceipt = {
  ok: boolean;
  checkedAt: string;
  route: "/visualizer";
  project: "xpswebsites";
  schedule: "*/5 * * * *";
  action: "status_only" | "blocked";
  flags: Record<string, boolean>;
  blockers: string[];
};

export async function GET(request: Request) {
  const blockers: string[] = [];
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret) {
    blockers.push("CRON_SECRET is not configured.");
  } else if (authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const flags = {
    enterprise: process.env.VISUALIZER_ENTERPRISE_ENABLED !== "false",
    aiSegmentation: process.env.NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED === "true" || process.env.VISUALIZER_AI_ENABLED === "true",
    scenes3d: process.env.NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED === "true",
    quoteUpload: process.env.NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED === "true" || process.env.VISUALIZER_QUOTE_UPLOAD_ENABLED === "true"
  };

  if (!flags.enterprise) {
    blockers.push("Enterprise visualizer flag is disabled.");
  }

  const receipt: CronReceipt = {
    ok: blockers.length === 0,
    checkedAt: new Date().toISOString(),
    route: "/visualizer",
    project: "xpswebsites",
    schedule: "*/5 * * * *",
    action: blockers.length > 0 ? "blocked" : "status_only",
    flags,
    blockers
  };

  const status = blockers.length > 0 ? 503 : 200;
  return Response.json(receipt, { status });
}
