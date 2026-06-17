# Repo Implementation Map

## Route

- `app/visualizer/page.tsx`

## Shared Enterprise Contract

- `app/lib/enterprise-system.ts`

## Data

- `app/data/finish-options.ts`

## Components

- `app/components/visualizer/EnterpriseVisualizerShell.tsx`
- `app/components/visualizer/ImageUploader.tsx`
- `app/components/visualizer/FloorRenderCanvas.tsx`
- `app/components/visualizer/MaterialPicker.tsx`
- `app/components/visualizer/PreviewControls.tsx`
- `app/components/visualizer/ExportAndQuotePanel.tsx`
- `app/components/visualizer/ValidationBadge.tsx`
- `app/components/visualizer/types.ts`

## API Routes

Visualizer:

- `app/api/visualizer/segment/route.ts`
- `app/api/visualizer/quote-attachment/route.ts`
- `app/api/visualizer/browser-validation/route.ts`

Automation:

- `app/api/cron/enterprise-visualizer-validation/route.ts`
- `app/api/cron/enterprise-ops-tick/route.ts`
- `app/api/enterprise/status/route.ts`

Enterprise expansion scaffolds:

- `app/api/ai/owner-assistant/route.ts`
- `app/api/voice/twilio/route.ts`
- `app/api/documents/intake/route.ts`
- `app/api/takeoff/proposal/route.ts`

## Vercel

- `vercel.json`

## Tests To Add

- `tests/visualizer-enterprise.spec.ts`
- `tests/visualizer-homepage-regression.spec.ts`
- `tests/enterprise-ops-routes.spec.ts`

## Environment Variables

Server-side:

- `VISUALIZER_ENTERPRISE_ENABLED`
- `VISUALIZER_AI_PROVIDER`
- `VISUALIZER_AI_MAX_BYTES`
- `VISUALIZER_AI_RATE_LIMIT`
- `CRON_SECRET`
- `ENTERPRISE_VALIDATION_SECRET`
- `BROWSER_WORKER_URL`
- `VISUALIZER_BROWSER_WORKER_ENABLED`
- `AI_GATEWAY_PRIMARY_MODEL`
- `AI_GATEWAY_FALLBACK_MODELS`
- `OWNER_ASSISTANT_ENABLED`
- `TWILIO_VOICE_ASSISTANT_ENABLED`
- `GOOGLE_WORKSPACE_ENABLED`
- `DOCUMENT_SCANNER_ENABLED`
- `TAKEOFF_ENGINE_ENABLED`
- `PROPOSAL_ENGINE_ENABLED`
- `ENTERPRISE_AUTO_OPS_ENABLED`
- `ENTERPRISE_AUTO_FIX_ENABLED`
- `ENTERPRISE_STORAGE_CRM_ENABLED`

Client-safe:

- `NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_CUSTOM_BLEND_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_ANALYTICS_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_DEBUG_OVERLAY_ENABLED`

## Build Order

1. Commit docs.
2. Reconcile the two diverged base files.
3. Add finish data.
4. Add upload/mask/canvas/export components.
5. Add Torginol-grade custom blend and mixer controls.
6. Replace `/visualizer` route behind flag.
7. Add AI segmentation route with safe fallback.
8. Add quote handoff route with consent gate.
9. Add browser-worker validation route.
10. Add enterprise status and ops cron routes.
11. Add owner assistant, voice, document intake, and takeoff/proposal scaffolds.
12. Add tests.
13. Run build/typecheck.
14. Deploy preview and collect evidence.
15. Run browser-worker desktop/mobile evidence.
16. Request standalone route review.
17. Embed above color charts only after approval.
