# Enterprise Build Packet: XPS Floor Visualizer

## Current Status

Status: branch-safe implementation started.

Recommended branch: `auto-builder/enterprise-floor-visualizer`
Base branch: `auto-builder/phoenix-nextjs-site-20260616`
Core route: `/visualizer`

Recommendation: skip the throwaway limited MVP, not the validation gates. Build Enterprise V1 behind feature flags and release progressively.

## Verified Runtime Facts

- Repo exists: `Strategic-Minds/XPSWEBSITES`.
- Base branch exists: `auto-builder/phoenix-nextjs-site-20260616`.
- Existing `/visualizer` previously wrapped `FinishVisualizer` only.
- Existing chart work includes Flake, Metallic, Quartz, Concrete Stain/Dye, and Metallic Glitter data.
- Vercel project is `xpswebsites` with project ID `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`.

## Benchmark Facts

- Torginol has a public Floor Design Visualizer at `https://torginol.com/design`.
- Torginol says its Pikcells visualizer includes 3D environments, new materials, environmental shading, and floor mapping AI.
- FloorWIZ says the Torginol implementation includes customizable 3D scenes, custom flake blends, flake sizes, pigment/metallic mixers, room-photo upload, AI overlay, realistic shadowing, and browser/device accessibility.

## Enterprise V1 Scope

- Standalone `/visualizer` route.
- Browser-only upload preview by default.
- Manual polygon floor mask fallback.
- AI-assisted segmentation behind `NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED`.
- Perspective-aware 2D material projection.
- Optional 3D scene renderer behind `NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED`.
- Material families: Flake, Metallic, Quartz, Concrete Stain/Dye, Metallic Glitter.
- Finish controls: opacity, gloss/wet look, texture scale, texture angle, glitter size where practical.
- Export preview image.
- Prepare quote attachment without upload by default.
- Consent-gated quote upload later.
- Validation receipts and cron monitor.
- PWA/mobile usability.

## Out Of Scope Without Approval

- Production promotion.
- Persistent customer-photo storage.
- AI training on customer images.
- Unbounded paid AI calls.
- Database/schema mutation.
- Billing mutation.
- Live CRM/customer messaging.
- Copying Torginol/FloorWIZ/Pikcells private code, assets, APIs, prompts, or implementation.

## Feature Flags

- `VISUALIZER_ENTERPRISE_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_CUSTOM_BLEND_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_ANALYTICS_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_DEBUG_OVERLAY_ENABLED`

## Target Files

- `app/visualizer/page.tsx`
- `app/data/finish-options.ts`
- `app/components/visualizer/*`
- `app/api/visualizer/segment/route.ts`
- `app/api/visualizer/quote-attachment/route.ts`
- `app/api/cron/enterprise-visualizer-validation/route.ts`
- `vercel.json`
- `tests/visualizer-enterprise.spec.ts`

## Acceptance Gates

1. `/visualizer` loads without runtime errors.
2. Upload validates JPEG, PNG, and WebP only.
3. Manual mask works and has undo/redo/clear/restart.
4. Each finish family has selectable options.
5. Canvas preview visibly changes inside the selected floor area.
6. Export works.
7. Quote preparation works without storing the original photo.
8. Mobile width around 390px is usable.
9. PWA manifest remains available.
10. `npm run build` passes.
11. Playwright desktop/mobile flow passes or blocker is documented.
12. Homepage remains unchanged except approved future link/embed.
