# Environment And Integration Contract

## Purpose

Define the env and integration surfaces needed for the enterprise system without exposing secrets or implying live activation.

## Current Rule

Presence of an env variable is not the same as approval to execute live mutations. Feature flags and approval gates still control behavior.

## Visualizer

- `VISUALIZER_ENTERPRISE_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_CUSTOM_BLEND_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_ANALYTICS_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_DEBUG_OVERLAY_ENABLED`
- `VISUALIZER_QUOTE_UPLOAD_ENABLED`
- `VISUALIZER_AI_ENABLED`
- `VISUALIZER_AI_MAX_BYTES`

## Vercel Automation

- `CRON_SECRET`
- `ENTERPRISE_VALIDATION_SECRET`
- `BROWSER_WORKER_URL`
- `VISUALIZER_BROWSER_WORKER_ENABLED`
- `ENTERPRISE_AUTO_OPS_ENABLED`
- `ENTERPRISE_AUTO_FIX_ENABLED`

### Browser Worker Enablement

Preview activation value:

```env
VISUALIZER_BROWSER_WORKER_ENABLED=true
```

Rules:

- Use lowercase `true`, with no quotes and no spaces.
- Enable in Preview first, preferably branch-scoped to `auto-builder/enterprise-floor-visualizer`.
- Do not enable Production until upload/mask/export/mobile E2E has passed.
- `BROWSER_WORKER_URL` must be present.
- One protected validation secret must be present: `ENTERPRISE_VALIDATION_SECRET` or `CRON_SECRET`.
- The validation route must report execution enabled before true browser-worker E2E is considered active.

## AI Gateway

- `AI_GATEWAY_API_KEY` or Vercel OIDC runtime support.
- `AI_GATEWAY_PRIMARY_MODEL`: must be a valid Vercel AI Gateway routeable model slug from the live model registry.
- `AI_GATEWAY_PRIMARY_PROVIDER`: set to `groq` when Groq is the required primary provider route.
- `AI_GATEWAY_FALLBACK_MODELS`: comma-separated list and must include at least one valid OpenAI routeable model slug such as `openai/gpt-5.5` when available in the model registry.
- `ENTERPRISE_AI_AGENTS_ENABLED`
- `OWNER_ASSISTANT_ENABLED`

Recommended preview pattern after verifying live model availability:

```env
AI_GATEWAY_PRIMARY_MODEL=meta/llama-4-scout
AI_GATEWAY_PRIMARY_PROVIDER=groq
AI_GATEWAY_FALLBACK_MODELS=openai/gpt-5.5
```

Fallback-safe validation rule:

- Accept a primary config when `AI_GATEWAY_PRIMARY_PROVIDER=groq` and `AI_GATEWAY_PRIMARY_MODEL` is a valid routeable model slug.
- Also accept legacy direct-provider slugs if Vercel exposes a `groq/...` model slug in the live registry.
- Reject human-readable placeholders like `GROQ`, `OPEN AI`, `OpenAI`, or `Groq` because those are not routeable model IDs.

## Voice And Video

- `TWILIO_VOICE_ASSISTANT_ENABLED`
- Twilio account SID/auth/token/from-number env names to be finalized.
- `HEYGEN_VIDEO_CHAT_ENABLED`
- HeyGen API/project env names to be finalized.

## Google Workspace

- `GOOGLE_WORKSPACE_ENABLED`
- Gmail scopes to be finalized.
- Drive root folder IDs to be finalized.
- Calendar IDs to be finalized.
- Google Tasks list IDs to be finalized.

## Document, Takeoff, Proposal

- `DOCUMENT_SCANNER_ENABLED`
- `TAKEOFF_ENGINE_ENABLED`
- `PROPOSAL_ENGINE_ENABLED`
- Proposal template IDs to be finalized.
- Scope template IDs to be finalized.
- Category dictionary source to be finalized.
- Follow-up cadence to be finalized.
- Bid inbox address to be finalized.

## Storage, CRM, Analytics

- `ENTERPRISE_STORAGE_CRM_ENABLED`
- `ENTERPRISE_CRM_FOLDER_ID`
- `ENTERPRISE_CRM_SPREADSHEET_ID`
- `ENTERPRISE_CRM_SYNC_ENABLED`
- `ENTERPRISE_PREVIEW_STORAGE_TARGET`
- `ENTERPRISE_QUOTE_ATTACHMENT_STORAGE_TARGET`
- Supabase project/branch/bucket variables to be finalized if Supabase becomes the durable data layer.
- Analytics destination variables to be finalized.

Current approved interim metadata/control targets:

- CRM folder: `XPS_ENTERPRISE_VISUALIZER_CRM`, folder ID `1hRvRfg4k4HfM1-vPF34LySDcU5WxG_Rm`.
- CRM Sheet: `XPS Enterprise Visualizer CRM`, spreadsheet ID `1jizwt6Cf0wBNltNfhldyekkoa1kR0J7Ugm4_rzbLWvs`.
- Mockup baseline folder: `PIXEL_PERFECT_MOCKUP_BASELINES_20260617`, folder ID `1RlIkclW2H8Cm1q-cpc26HGQ1XkTnujES`.

## Required Before Activation

1. Verify env is present in Vercel.
2. Verify route reads env without leaking values.
3. Verify feature flag is off by default for mutation-capable modules.
4. Run dry-run receipt.
5. Confirm approval policy.
6. Enable in preview.
7. Validate with browser worker or connector evidence.
8. Only then consider production activation.

## Official Routing Notes

Vercel AI Gateway supports model fallback through provider options. The repo uses env-driven model configuration because available model slugs can change and should be discovered from the Gateway before hardcoding.

Vercel Cron Jobs can call protected routes on a schedule, but cron execution must remain auth-gated and non-destructive until the production approval gate is cleared.