import { mockupTargets } from "./phoenix-demo-data";

export type EnterpriseModuleStatus = {
  id: string;
  label: string;
  enabled: boolean;
  configured: boolean;
  mode: "active" | "planned" | "approval_gated" | "blocked";
  blockers: string[];
};

export const enterpriseOwner = {
  name: "Chris Lavin",
  operatingPreference: "voice_only_primary",
  explanationStyle: "plain_language_layman_terms"
};

export const xpsCorporateSystem = {
  parentCompany: "Xtreme Polishing Systems",
  stores: "XPS Xpress",
  installationCompany: "National Concrete Polishing",
  trainingSchool: "Polished Concrete University",
  brandStandard: "enterprise_light_mode_primary_pwa"
};

export function readEnterpriseFlags() {
  return {
    visualizerEnterprise: process.env.VISUALIZER_ENTERPRISE_ENABLED !== "false",
    browserWorker: Boolean(process.env.BROWSER_WORKER_URL),
    browserWorkerExecute: process.env.VISUALIZER_BROWSER_WORKER_ENABLED === "true",
    aiGateway: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN),
    aiAgents: process.env.ENTERPRISE_AI_AGENTS_ENABLED === "true",
    autoOps: process.env.ENTERPRISE_AUTO_OPS_ENABLED === "true",
    autoFix: process.env.ENTERPRISE_AUTO_FIX_ENABLED === "true",
    frontendAutoBuild: process.env.ENTERPRISE_FRONTEND_AUTOBUILD_ENABLED === "true",
    socialAutomation: process.env.ENTERPRISE_SOCIAL_AUTOMATION_ENABLED === "true",
    twilioVoice: process.env.TWILIO_VOICE_ASSISTANT_ENABLED === "true",
    heygenVideo: process.env.HEYGEN_VIDEO_CHAT_ENABLED === "true",
    googleWorkspace: process.env.GOOGLE_WORKSPACE_ENABLED === "true",
    documentScanner: process.env.DOCUMENT_SCANNER_ENABLED === "true",
    takeoffEngine: process.env.TAKEOFF_ENGINE_ENABLED === "true",
    proposalEngine: process.env.PROPOSAL_ENGINE_ENABLED === "true",
    storageCrm: process.env.ENTERPRISE_STORAGE_CRM_ENABLED === "true",
    crmSheet: Boolean(process.env.ENTERPRISE_CRM_SPREADSHEET_ID || "1jizwt6Cf0wBNltNfhldyekkoa1kR0J7Ugm4_rzbLWvs"),
    quoteUpload: process.env.VISUALIZER_QUOTE_UPLOAD_ENABLED === "true" || process.env.NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED === "true",
    analytics: process.env.NEXT_PUBLIC_VISUALIZER_ANALYTICS_ENABLED === "true"
  };
}

function isRouteableModel(model: string) {
  return /^[a-z0-9-]+\/[a-z0-9_.:-]+$/i.test(model);
}

export function readAiGatewayConfig() {
  const primaryModel = process.env.AI_GATEWAY_PRIMARY_MODEL ?? "";
  const primaryProvider = process.env.AI_GATEWAY_PRIMARY_PROVIDER ?? "";
  const fallbackModels = (process.env.AI_GATEWAY_FALLBACK_MODELS ?? "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);
  const groqPrimary = (primaryProvider === "groq" && isRouteableModel(primaryModel)) || primaryModel.startsWith("groq/");

  return {
    primaryModel,
    primaryProvider,
    fallbackModels,
    hasGatewayAuth: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN),
    routeablePrimary: isRouteableModel(primaryModel),
    groqPrimary,
    openAiFallback: fallbackModels.some((model) => model.startsWith("openai/"))
  };
}

export function getFrontendAutomationStatus() {
  const requiredRoutes = [
    "/",
    "/design",
    "/floor-design-center",
    "/quote/design",
    "/customer-portal",
    "/customer-portal/dashboard",
    "/customer-portal/projects/demo",
    "/installer",
    "/installer/jobs/J-1001",
    "/ops"
  ];
  return {
    baselineFolderId: "1RlIkclW2H8Cm1q-cpc26HGQ1XkTnujES",
    crmSpreadsheetId: process.env.ENTERPRISE_CRM_SPREADSHEET_ID || "1jizwt6Cf0wBNltNfhldyekkoa1kR0J7Ugm4_rzbLWvs",
    mockupTargets,
    requiredRoutes,
    validationViewports: ["1491x1055", "1440x1200", "390x844", "430x932"],
    allowedAutonomousActions: [
      "route_smoke_check",
      "desktop_mobile_screenshot_capture",
      "pixel_diff_against_baselines",
      "console_error_detection",
      "mobile_overflow_detection",
      "branch_safe_patch_plan",
      "evidence_receipt"
    ],
    gatedActions: [
      "production_promotion",
      "main_branch_merge",
      "vercel_env_mutation",
      "customer_photo_persistence",
      "database_migration",
      "storage_bucket_creation",
      "live_email_sms_calls_social_posts"
    ]
  };
}

export function getEnterpriseModuleStatuses(): EnterpriseModuleStatus[] {
  const flags = readEnterpriseFlags();
  const ai = readAiGatewayConfig();

  return [
    { id: "frontend-mockup-system", label: "Pixel-perfect Phoenix/XPS frontend routes", enabled: true, configured: true, mode: "active", blockers: [] },
    { id: "visualizer", label: "Torginol-grade XPS Vizualizer", enabled: flags.visualizerEnterprise, configured: flags.visualizerEnterprise, mode: flags.visualizerEnterprise ? "active" : "blocked", blockers: flags.visualizerEnterprise ? [] : ["VISUALIZER_ENTERPRISE_ENABLED is false."] },
    { id: "browser-worker-validation", label: "Browser worker E2E validation", enabled: flags.browserWorkerExecute, configured: flags.browserWorker, mode: flags.browserWorker ? (flags.browserWorkerExecute ? "active" : "approval_gated") : "blocked", blockers: flags.browserWorker ? (flags.browserWorkerExecute ? [] : ["VISUALIZER_BROWSER_WORKER_ENABLED is not true in this environment."]) : ["BROWSER_WORKER_URL is not visible to this deployment."] },
    { id: "ai-gateway-agents", label: "AI Gateway agents with Groq primary and OpenAI fallback", enabled: flags.aiAgents, configured: flags.aiGateway && ai.groqPrimary && ai.openAiFallback, mode: flags.aiAgents ? "active" : "approval_gated", blockers: [ ...(flags.aiGateway ? [] : ["AI Gateway auth is not configured."]), ...(ai.groqPrimary ? [] : ["AI_GATEWAY_PRIMARY_PROVIDER must be groq with a routeable model, or primary model must be groq/* if available."]), ...(ai.openAiFallback ? [] : ["AI_GATEWAY_FALLBACK_MODELS must include at least one openai/* model."]) ] },
    { id: "frontend-autonomy", label: "Auto validate, fix, heal, and harden frontend lane", enabled: flags.frontendAutoBuild || flags.autoOps, configured: true, mode: flags.autoFix ? "approval_gated" : "planned", blockers: flags.autoFix ? ["Auto-fix must remain branch-safe and cannot promote production or mutate protected systems."] : ["Frontend autonomy is validation-ready; write-capable repairs remain approval-gated."] },
    { id: "voice-owner-assistant", label: "Chris Lavin voice-only executive assistant", enabled: flags.twilioVoice, configured: flags.twilioVoice && flags.aiGateway, mode: flags.twilioVoice ? "approval_gated" : "planned", blockers: flags.twilioVoice && flags.aiGateway ? [] : ["Twilio voice and AI Gateway must be enabled before live calls."] },
    { id: "google-workspace", label: "Gmail, Drive, Calendar, and Tasks workspace layer", enabled: flags.googleWorkspace, configured: flags.googleWorkspace, mode: flags.googleWorkspace ? "approval_gated" : "planned", blockers: flags.googleWorkspace ? [] : ["Google Workspace connector scopes and folder/calendar policy are not yet approved in-app."] },
    { id: "takeoff-proposal-engine", label: "AI document scanner, takeoff, proposal, and triple-check QA", enabled: flags.documentScanner && flags.takeoffEngine && flags.proposalEngine, configured: flags.documentScanner && flags.takeoffEngine && flags.proposalEngine, mode: flags.documentScanner ? "approval_gated" : "planned", blockers: flags.documentScanner ? [] : ["Document scanning and proposal automation remain scaffolded only."] },
    { id: "quote-storage-crm", label: "Persistent preview storage, CRM, lead routing, and analytics", enabled: flags.storageCrm && flags.quoteUpload, configured: flags.crmSheet, mode: flags.storageCrm ? "approval_gated" : "blocked", blockers: flags.storageCrm ? [] : ["CRM Sheet exists for metadata, but customer photo/object storage is not active."] },
    { id: "heygen-video-chat", label: "HeyGen AI video chat bootstrap", enabled: flags.heygenVideo, configured: flags.heygenVideo, mode: flags.heygenVideo ? "approval_gated" : "planned", blockers: flags.heygenVideo ? [] : ["HeyGen is intentionally prepared for later use, not immediate launch."] },
    { id: "social-automation", label: "Autonomous social content and distribution system", enabled: flags.socialAutomation, configured: flags.socialAutomation, mode: flags.socialAutomation ? "approval_gated" : "planned", blockers: flags.socialAutomation ? [] : ["Social posting remains disabled until channels, approvals, and brand policy are set."] }
  ];
}

export function buildFrontendAutomationReceipt() {
  const flags = readEnterpriseFlags();
  const frontend = getFrontendAutomationStatus();
  return {
    ok: true,
    checkedAt: new Date().toISOString(),
    mode: flags.autoFix ? "branch_safe_auto_fix_planning" : "validation_and_receipt_only",
    frontend,
    requiredNextValidation: [
      "npm run build",
      "npm run validate:enterprise",
      "browser-worker desktop screenshots",
      "browser-worker mobile screenshots",
      "pixel-diff against Drive baselines",
      "release approval receipt"
    ],
    protectedSystemsRemainGated: frontend.gatedActions
  };
}

export function buildStatusReceipt() {
  const modules = getEnterpriseModuleStatuses();
  const blockers = modules.flatMap((module) => module.blockers.map((blocker) => `${module.id}: ${blocker}`));
  return {
    ok: blockers.length === 0,
    checkedAt: new Date().toISOString(),
    owner: enterpriseOwner,
    corporateSystem: xpsCorporateSystem,
    frontendAutomation: getFrontendAutomationStatus(),
    modules,
    blockers
  };
}
