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
    socialAutomation: process.env.ENTERPRISE_SOCIAL_AUTOMATION_ENABLED === "true",
    twilioVoice: process.env.TWILIO_VOICE_ASSISTANT_ENABLED === "true",
    heygenVideo: process.env.HEYGEN_VIDEO_CHAT_ENABLED === "true",
    googleWorkspace: process.env.GOOGLE_WORKSPACE_ENABLED === "true",
    documentScanner: process.env.DOCUMENT_SCANNER_ENABLED === "true",
    takeoffEngine: process.env.TAKEOFF_ENGINE_ENABLED === "true",
    proposalEngine: process.env.PROPOSAL_ENGINE_ENABLED === "true",
    storageCrm: process.env.ENTERPRISE_STORAGE_CRM_ENABLED === "true",
    quoteUpload: process.env.VISUALIZER_QUOTE_UPLOAD_ENABLED === "true" || process.env.NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED === "true",
    analytics: process.env.NEXT_PUBLIC_VISUALIZER_ANALYTICS_ENABLED === "true"
  };
}

export function readAiGatewayConfig() {
  const primaryModel = process.env.AI_GATEWAY_PRIMARY_MODEL ?? "";
  const fallbackModels = (process.env.AI_GATEWAY_FALLBACK_MODELS ?? "")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);

  return {
    primaryModel,
    fallbackModels,
    hasGatewayAuth: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN),
    groqPrimary: primaryModel.startsWith("groq/"),
    openAiFallback: fallbackModels.some((model) => model.startsWith("openai/"))
  };
}

export function getEnterpriseModuleStatuses(): EnterpriseModuleStatus[] {
  const flags = readEnterpriseFlags();
  const ai = readAiGatewayConfig();

  return [
    {
      id: "visualizer",
      label: "Torginol-grade XPS Vizualizer",
      enabled: flags.visualizerEnterprise,
      configured: flags.visualizerEnterprise,
      mode: flags.visualizerEnterprise ? "active" : "blocked",
      blockers: flags.visualizerEnterprise ? [] : ["VISUALIZER_ENTERPRISE_ENABLED is false."]
    },
    {
      id: "browser-worker-validation",
      label: "Browser worker E2E validation",
      enabled: flags.browserWorkerExecute,
      configured: flags.browserWorker,
      mode: flags.browserWorker ? (flags.browserWorkerExecute ? "active" : "approval_gated") : "blocked",
      blockers: flags.browserWorker ? [] : ["BROWSER_WORKER_URL is not visible to this deployment."]
    },
    {
      id: "ai-gateway-agents",
      label: "AI Gateway agents with Groq primary and OpenAI fallback",
      enabled: flags.aiAgents,
      configured: flags.aiGateway && ai.groqPrimary && ai.openAiFallback,
      mode: flags.aiAgents ? "active" : "approval_gated",
      blockers: [
        ...(flags.aiGateway ? [] : ["AI Gateway auth is not configured."],),
        ...(ai.groqPrimary ? [] : ["AI_GATEWAY_PRIMARY_MODEL must be a groq/* model."],),
        ...(ai.openAiFallback ? [] : ["AI_GATEWAY_FALLBACK_MODELS must include at least one openai/* model."],)
      ]
    },
    {
      id: "voice-owner-assistant",
      label: "Chris Lavin voice-only executive assistant",
      enabled: flags.twilioVoice,
      configured: flags.twilioVoice && flags.aiGateway,
      mode: flags.twilioVoice ? "approval_gated" : "planned",
      blockers: flags.twilioVoice && flags.aiGateway ? [] : ["Twilio voice and AI Gateway must be enabled before live calls."]
    },
    {
      id: "google-workspace",
      label: "Gmail, Drive, Calendar, and Tasks workspace layer",
      enabled: flags.googleWorkspace,
      configured: flags.googleWorkspace,
      mode: flags.googleWorkspace ? "approval_gated" : "planned",
      blockers: flags.googleWorkspace ? [] : ["Google Workspace connector scopes and folder/calendar policy are not yet approved in-app."]
    },
    {
      id: "takeoff-proposal-engine",
      label: "AI document scanner, takeoff, proposal, and triple-check QA",
      enabled: flags.documentScanner && flags.takeoffEngine && flags.proposalEngine,
      configured: flags.documentScanner && flags.takeoffEngine && flags.proposalEngine,
      mode: flags.documentScanner ? "approval_gated" : "planned",
      blockers: flags.documentScanner ? [] : ["Document scanning and proposal automation remain scaffolded only."]
    },
    {
      id: "autonomous-ops",
      label: "Auto analyze, diagnose, heal, create, optimize, enhance, evolve",
      enabled: flags.autoOps,
      configured: flags.autoOps,
      mode: flags.autoFix ? "approval_gated" : "planned",
      blockers: flags.autoFix ? ["Auto-fix must stay branch-safe and approval-gated for production mutations."] : ["Auto-ops is scaffolded as status-only until enabled."]
    },
    {
      id: "quote-storage-crm",
      label: "Persistent preview storage, CRM, lead routing, and analytics",
      enabled: flags.storageCrm && flags.quoteUpload,
      configured: flags.storageCrm && flags.quoteUpload,
      mode: flags.storageCrm ? "approval_gated" : "blocked",
      blockers: flags.storageCrm ? [] : ["No approved storage/CRM target is active for customer photo persistence."]
    },
    {
      id: "heygen-video-chat",
      label: "HeyGen AI video chat bootstrap",
      enabled: flags.heygenVideo,
      configured: flags.heygenVideo,
      mode: flags.heygenVideo ? "approval_gated" : "planned",
      blockers: flags.heygenVideo ? [] : ["HeyGen is intentionally prepared for later use, not immediate launch."]
    },
    {
      id: "social-automation",
      label: "Autonomous social content and distribution system",
      enabled: flags.socialAutomation,
      configured: flags.socialAutomation,
      mode: flags.socialAutomation ? "approval_gated" : "planned",
      blockers: flags.socialAutomation ? [] : ["Social posting remains disabled until channels, approvals, and brand policy are set."]
    }
  ];
}

export function buildStatusReceipt() {
  const modules = getEnterpriseModuleStatuses();
  const blockers = modules.flatMap((module) => module.blockers.map((blocker) => `${module.id}: ${blocker}`));

  return {
    ok: blockers.length === 0,
    checkedAt: new Date().toISOString(),
    owner: enterpriseOwner,
    corporateSystem: xpsCorporateSystem,
    modules,
    blockers
  };
}
