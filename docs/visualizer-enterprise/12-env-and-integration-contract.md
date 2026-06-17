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

## AI Gateway

- `AI_GATEWAY_API_KEY` or Vercel OIDC runtime support.
- `AI_GATEWAY_PRIMARY_MODEL`: must be a `groq/*` model to satisfy the requested primary route.
- `AI_GATEWAY_FALLBACK_MODELS`: comma-separated list and must include at least one `openai/*` model.
- `ENTERPRISE_AI_AGENTS_ENABLED`
- `OWNER_ASSISTANT_ENABLED`

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
- Supabase project/branch/bucket variables to be finalized.
- CRM target variables to be finalized.
- Analytics destination variables to be finalized.

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
