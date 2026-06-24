import { buildFrontendAutomationReceipt } from "../../../lib/enterprise-system";

export const dynamic = "force-dynamic";

type CronReceipt = {
  ok: boolean;
  checkedAt: string;
  project: "xpswebsites";
  schedule: "*/5 * * * *";
  action: "status_only" | "blocked";
  flags: Record<string, boolean>;
  frontendAutomation: ReturnType<typeof buildFrontendAutomationReceipt>;
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
    browserWorkerConfigured: Boolean(process.env.BROWSER_WORKER_URL),
    browserWorkerExecution: process.env.VISUALIZER_BROWSER_WORKER_ENABLED === "true",
    aiSegmentation: process.env.NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED === "true" || process.env.VISUALIZER_AI_ENABLED === "true",
    scenes3d: process.env.NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED === "true",
    quoteUpload: process.env.NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED === "true" || process.env.VISUALIZER_QUOTE_UPLOAD_ENABLED === "true"
  };

  if (!flags.enterprise) blockers.push("Enterprise visualizer flag is disabled.");
  if (!flags.browserWorkerExecution) blockers.push("Browser-worker execution is disabled; screenshot E2E remains pending.");

  const receipt: CronReceipt = {
    ok: blockers.length === 0,
    checkedAt: new Date().toISOString(),
    project: "xpswebsites",
    schedule: "*/5 * * * *",
    action: blockers.length > 0 ? "blocked" : "status_only",
    flags,
    frontendAutomation: buildFrontendAutomationReceipt(),
    blockers
  };

  return Response.json(receipt, { status: blockers.length > 0 ? 207 : 200 });
}
