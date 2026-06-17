# Repo Implementation Map

## Route

- `app/visualizer/page.tsx`

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

- `app/api/visualizer/segment/route.ts`
- `app/api/visualizer/quote-attachment/route.ts`
- `app/api/cron/enterprise-visualizer-validation/route.ts`

## Vercel

- `vercel.json`

## Tests To Add

- `tests/visualizer-enterprise.spec.ts`
- `tests/visualizer-homepage-regression.spec.ts`

## Environment Variables

Server-side:

- `VISUALIZER_ENTERPRISE_ENABLED`
- `VISUALIZER_AI_PROVIDER`
- `VISUALIZER_AI_MAX_BYTES`
- `VISUALIZER_AI_RATE_LIMIT`
- `CRON_SECRET`

Client-safe:

- `NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_CUSTOM_BLEND_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_ANALYTICS_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_DEBUG_OVERLAY_ENABLED`

## Build Order

1. Commit docs.
2. Add finish data.
3. Add upload/mask/canvas/export components.
4. Replace `/visualizer` route behind flag.
5. Add AI segmentation stub route with safe fallback.
6. Add quote handoff stub route with consent gate.
7. Add cron route and `vercel.json`.
8. Add tests.
9. Run build/typecheck.
10. Deploy preview and collect evidence.
11. Request standalone route review.
12. Embed above color charts only after approval.
