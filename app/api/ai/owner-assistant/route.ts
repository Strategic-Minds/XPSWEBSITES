import { enterpriseOwner, readAiGatewayConfig } from "../../../lib/enterprise-system";

export const dynamic = "force-dynamic";

type OwnerAssistantRequest = {
  message?: string;
  context?: string;
  channel?: "voice" | "chat" | "email" | "calendar";
};

const systemPrompt = `You are the dedicated executive assistant for Chris Lavin and the Xtreme Polishing Systems enterprise operating system.
Speak in plain language for a non-technical owner. Be calm, concise, human, and operational.
Explain technical status in layman's terms. Never pretend an email, calendar event, call, CRM update, or production action was performed unless the connected tool confirms it.
For voice-only use, answer with short spoken paragraphs and clear next actions.
Company map: Xtreme Polishing Systems is the parent company, XPS Xpress is the store network, National Concrete Polishing is the installation company, and Polished Concrete University is the training school.`;

export async function POST(request: Request) {
  if (process.env.OWNER_ASSISTANT_ENABLED !== "true") {
    return Response.json({
      ok: false,
      status: "approval_gated",
      message: "Owner assistant is scaffolded but disabled. Set OWNER_ASSISTANT_ENABLED=true only after access, scopes, and review policy are approved."
    }, { status: 403 });
  }

  const ai = readAiGatewayConfig();
  const blockers = [
    ...(ai.hasGatewayAuth ? [] : ["AI Gateway auth is missing."]),
    ...(ai.groqPrimary ? [] : ["AI_GATEWAY_PRIMARY_MODEL must be set to a groq/* model for the requested primary route."]),
    ...(ai.openAiFallback ? [] : ["AI_GATEWAY_FALLBACK_MODELS must include at least one openai/* model."])
  ];

  if (blockers.length > 0) {
    return Response.json({ ok: false, status: "blocked", blockers }, { status: 503 });
  }

  let payload: OwnerAssistantRequest;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, status: "invalid_json" }, { status: 400 });
  }

  const message = payload.message?.trim();
  if (!message) {
    return Response.json({ ok: false, status: "missing_message" }, { status: 400 });
  }

  const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
  const response = await fetch("https://ai-gateway.vercel.sh/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: ai.primaryModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Channel: ${payload.channel ?? "chat"}\nContext: ${payload.context ?? "none"}\nRequest: ${message}` }
      ],
      providerOptions: {
        gateway: {
          models: ai.fallbackModels,
          tags: ["xps-owner-assistant", "owner:chris-lavin"]
        }
      }
    })
  });

  const result = await response.json().catch(() => ({}));
  const assistantText = result?.choices?.[0]?.message?.content ?? "The assistant did not return usable text.";

  return Response.json({
    ok: response.ok,
    owner: enterpriseOwner,
    model: result?.model ?? ai.primaryModel,
    channel: payload.channel ?? "chat",
    assistantText,
    rawStatus: response.status
  }, { status: response.ok ? 200 : 502 });
}
