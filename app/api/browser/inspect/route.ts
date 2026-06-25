export const dynamic = "force-dynamic";

type BrowserInspectPayload = {
  url?: string;
  mode?: "desktop" | "mobile" | "both";
  objective?: string;
  waitForText?: string;
  selector?: string;
};

const blockedActions = [
  "purchase",
  "payment",
  "send_message",
  "post_social",
  "submit_form",
  "login",
  "credential_entry",
  "file_upload",
  "download",
  "customer_photo_persistence",
  "crm_mutation",
  "database_mutation",
  "production_promotion"
];

function getValidationSecret() {
  return process.env.ENTERPRISE_VALIDATION_SECRET || process.env.CRON_SECRET;
}

function getOrigin(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  return forwardedHost ? `${forwardedProto}://${forwardedHost}` : "";
}

function getStatusPayload() {
  return {
    ok: Boolean(process.env.BROWSER_WORKER_URL),
    configured: Boolean(process.env.BROWSER_WORKER_URL),
    executionEnabled: process.env.VISUALIZER_BROWSER_WORKER_ENABLED === "true",
    route: "/api/browser/inspect",
    purpose: "Protected general browser inspection bridge for homepage, portal, ops, and visualizer screenshot jobs.",
    runModes: {
      status: "GET /api/browser/inspect",
      cronSecuredHomepageInspection: "Vercel Cron GET /api/browser/inspect with Authorization: Bearer CRON_SECRET and x-vercel-cron-schedule header",
      protectedHomepageInspection: "GET /api/browser/inspect?run=homepage with Authorization: Bearer CRON_SECRET",
      protectedGeneralInspection: "POST /api/browser/inspect with Authorization: Bearer ENTERPRISE_VALIDATION_SECRET or CRON_SECRET"
    },
    requiredEnv: [
      "BROWSER_WORKER_URL",
      "VISUALIZER_BROWSER_WORKER_ENABLED",
      "ENTERPRISE_VALIDATION_SECRET or CRON_SECRET"
    ],
    blockedActions
  };
}

function unauthorizedResponse() {
  return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function isAuthorized(request: Request) {
  const validationSecret = getValidationSecret();
  const authHeader = request.headers.get("authorization");
  return Boolean(validationSecret && authHeader === `Bearer ${validationSecret}`);
}

async function runInspection(request: Request, payload: BrowserInspectPayload) {
  const workerUrl = process.env.BROWSER_WORKER_URL;
  if (!workerUrl) {
    return Response.json({
      ok: false,
      status: "blocked",
      blockers: ["BROWSER_WORKER_URL is not configured in this deployment."]
    }, { status: 503 });
  }

  if (process.env.VISUALIZER_BROWSER_WORKER_ENABLED !== "true") {
    return Response.json({
      ok: true,
      status: "planned_only",
      blockers: ["VISUALIZER_BROWSER_WORKER_ENABLED is not true, so no browser job was executed."]
    });
  }

  const origin = getOrigin(request);
  const targetUrl = payload.url || `${origin}/`;
  const mode = payload.mode || "both";
  const waitForText = payload.waitForText || "Start Digital Bid";
  const selector = payload.selector || "body";

  const inspectionJob = {
    job_id: `xps-browser-inspect-${Date.now()}`,
    objective: payload.objective || "Visually inspect the deployed homepage, capture screenshots, extract visible page text, and report layout issues without mutating the site.",
    url: targetUrl,
    mode,
    blocked_actions: blockedActions,
    steps: [
      { action: "visit", url: targetUrl, description: "Open the requested page." },
      { action: "wait_for_selector", selector, description: "Wait for the main page content to render." },
      { action: "assert_text", text: waitForText, description: "Confirm the expected page copy is present." },
      { action: "screenshot", description: "Capture visual evidence for desktop and mobile when supported." },
      { action: "extract_text", selector: "body", description: "Extract visible page text for inspection notes." }
    ]
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(inspectionJob),
      signal: controller.signal
    });

    const text = await response.text();
    return Response.json({
      ok: response.ok,
      status: response.ok ? "browser_worker_completed" : "browser_worker_error",
      workerStatus: response.status,
      targetUrl,
      mode,
      responseText: text.slice(0, 12000)
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

function homepageInspectionPayload(request: Request): BrowserInspectPayload {
  const origin = getOrigin(request);
  return {
    url: `${origin}/`,
    mode: "both",
    waitForText: "Start Digital Bid",
    selector: "body",
    objective: "Cron-secured read-only homepage inspection for Epoxy Nation Pros rebrand planning. Capture screenshots and visible text without submitting forms or mutating data."
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const run = searchParams.get("run");
  const isCronInvocation = Boolean(request.headers.get("x-vercel-cron-schedule"));

  if (run !== "homepage" && !isCronInvocation) {
    return Response.json(getStatusPayload());
  }

  if (!isAuthorized(request)) {
    return unauthorizedResponse();
  }

  return runInspection(request, homepageInspectionPayload(request));
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return unauthorizedResponse();
  }

  let payload: BrowserInspectPayload = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  return runInspection(request, payload);
}