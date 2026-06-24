export const dynamic = "force-dynamic";

type BrowserValidationPayload = {
  url?: string;
  mode?: "desktop" | "mobile" | "both";
};

const defaultPreviewPath = "/visualizer";

export async function GET() {
  return Response.json({
    ok: Boolean(process.env.BROWSER_WORKER_URL),
    configured: Boolean(process.env.BROWSER_WORKER_URL),
    executionEnabled: process.env.VISUALIZER_BROWSER_WORKER_ENABLED === "true",
    route: "/api/visualizer/browser-validation",
    requiredEnv: ["BROWSER_WORKER_URL", "VISUALIZER_BROWSER_WORKER_ENABLED", "ENTERPRISE_VALIDATION_SECRET or CRON_SECRET"]
  });
}

export async function POST(request: Request) {
  const validationSecret = process.env.ENTERPRISE_VALIDATION_SECRET || process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!validationSecret || authHeader !== `Bearer ${validationSecret}`) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const workerUrl = process.env.BROWSER_WORKER_URL;
  if (!workerUrl) {
    return Response.json({ ok: false, status: "blocked", blockers: ["BROWSER_WORKER_URL is not configured in this deployment."] }, { status: 503 });
  }

  if (process.env.VISUALIZER_BROWSER_WORKER_ENABLED !== "true") {
    return Response.json({ ok: true, status: "planned_only", blockers: ["VISUALIZER_BROWSER_WORKER_ENABLED is not true, so no browser job was executed."] });
  }

  let payload: BrowserValidationPayload = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const targetUrl = payload.url || `${request.headers.get("origin") ?? ""}${defaultPreviewPath}`;
  const mode = payload.mode ?? "both";
  const validationJob = {
    job_id: `xps-enterprise-visualizer-browser-${Date.now()}`,
    objective: "Validate Torginol-grade XPS visualizer upload, mask editing, material controls, export readiness, responsive layout, and nonblank canvas rendering.",
    url: targetUrl,
    mode,
    blocked_actions: ["purchase", "payment", "send_message", "customer_photo_persistence", "crm_mutation", "production_promotion"],
    steps: [
      { action: "visit", url: targetUrl, description: "Open the enterprise visualizer." },
      { action: "assert_text", text: "See Your Floor Before You Build It.", description: "Confirm enterprise shell loads." },
      { action: "assert_text", text: "Liquid Pigment", description: "Confirm full chart-backed pigment family is available." },
      { action: "assert_canvas_nonblank", selector: "canvas", description: "Confirm canvas renders." },
      { action: "screenshot", description: "Capture desktop and mobile evidence when supported." }
    ]
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validationJob),
      signal: controller.signal
    });
    const text = await response.text();
    return Response.json({
      ok: response.ok,
      status: response.ok ? "browser_worker_completed" : "browser_worker_error",
      workerStatus: response.status,
      targetUrl,
      mode,
      responseText: text.slice(0, 6000)
    }, { status: response.ok ? 200 : 502 });
  } catch (error) {
    return Response.json({
      ok: false,
      status: "browser_worker_exception",
      targetUrl,
      mode,
      error: error instanceof Error ? error.message : "Unknown browser worker error"
    }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
