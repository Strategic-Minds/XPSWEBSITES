# Enterprise Build Packet: XPS Vizualizer And Operating System Bootstrap

## Current Status

Status: branch-safe enterprise scaffold in progress.

Recommended branch: `auto-builder/enterprise-floor-visualizer`
Base branch: `auto-builder/phoenix-nextjs-site-20260616`
Core route: `/visualizer`

Recommendation: skip the throwaway limited MVP, not the validation gates. Build Enterprise V1 behind feature flags and release progressively.

## Source Truth

- User requires Torginol/FloorWIZ parity or better for technology, workflow simplicity, visual quality, and capability.
- User requires Vercel-first automation with 5-minute crons, validation agents, browser worker E2E, AI Gateway routing, and internal QA.
- User requires future XPS enterprise operating system capabilities: owner voice assistant for Chris Lavin, Twilio voice, Google Workspace, HeyGen video chat bootstrap, AI document scanner, AI takeoff, proposal automation, follow-up system, and autonomous analyze/diagnose/heal/optimize/evolve loops.

## Verified Runtime Facts

- Repo exists: `Strategic-Minds/XPSWEBSITES`.
- Base branch exists: `auto-builder/phoenix-nextjs-site-20260616`.
- Enterprise branch exists: `auto-builder/enterprise-floor-visualizer`.
- Vercel project is `xpswebsites` with project ID `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`.
- Existing `/visualizer` Enterprise route has already deployed once and returned HTTP 200.
- Branch divergence is isolated to `app/components/FinishVisualizer.tsx` and `app/xps-flake-chart-lock.css` from the base branch.

## Benchmark Facts

- Torginol has a public Floor Design Visualizer at `https://torginol.com/design`.
- Torginol public materials reference 3D environments, new materials, environmental shading, and floor mapping AI.
- FloorWIZ public materials reference custom flake blends, flake sizes, pigment/metallic mixers, room-photo upload, AI overlay, realistic shadowing, browser/device accessibility, share links, lead capture, and platform/CRM readiness.

## System Boundary

### Frontend

- Standalone `/visualizer` route.
- Browser-local photo upload.
- Manual polygon floor mask fallback.
- Draggable/editable mask points.
- Material picker with XPS chart-backed finish families.
- Custom flake blend controls.
- Metallic/pigment mixer controls.
- Export and quote-prep panel.
- Light-mode-primary PWA target remains required for the broader app; current visualizer is still dark enterprise shell and needs later theme work.

### Backend / Automation

- Vercel cron for visualizer validation.
- Vercel cron for enterprise ops tick.
- Browser-worker validation route.
- Enterprise status route.
- AI Gateway owner-assistant route.
- Twilio voice scaffold.
- Document intake scaffold.
- Takeoff/proposal scaffold.
- All mutation-capable routes stay disabled or approval-gated by default.

## Finish Families

- Flake.
- Metallic.
- Quartz.
- Concrete Stain/Dye.
- Metallic Glitter.
- Liquid Pigment from uploaded Chromaflo FLV chart.

## Feature Flags

- `VISUALIZER_ENTERPRISE_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_CUSTOM_BLEND_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_ANALYTICS_ENABLED`
- `NEXT_PUBLIC_VISUALIZER_DEBUG_OVERLAY_ENABLED`
- `VISUALIZER_BROWSER_WORKER_ENABLED`
- `ENTERPRISE_AUTO_OPS_ENABLED`
- `ENTERPRISE_AUTO_FIX_ENABLED`
- `ENTERPRISE_AI_AGENTS_ENABLED`
- `OWNER_ASSISTANT_ENABLED`
- `TWILIO_VOICE_ASSISTANT_ENABLED`
- `GOOGLE_WORKSPACE_ENABLED`
- `DOCUMENT_SCANNER_ENABLED`
- `TAKEOFF_ENGINE_ENABLED`
- `PROPOSAL_ENGINE_ENABLED`
- `ENTERPRISE_STORAGE_CRM_ENABLED`

## Target Files

- `app/visualizer/page.tsx`
- `app/data/finish-options.ts`
- `app/lib/enterprise-system.ts`
- `app/components/visualizer/*`
- `app/api/visualizer/segment/route.ts`
- `app/api/visualizer/quote-attachment/route.ts`
- `app/api/visualizer/browser-validation/route.ts`
- `app/api/cron/enterprise-visualizer-validation/route.ts`
- `app/api/cron/enterprise-ops-tick/route.ts`
- `app/api/enterprise/status/route.ts`
- `app/api/ai/owner-assistant/route.ts`
- `app/api/voice/twilio/route.ts`
- `app/api/documents/intake/route.ts`
- `app/api/takeoff/proposal/route.ts`
- `vercel.json`

## Acceptance Gates

1. Reconcile the two diverged base files without regressing homepage chart behavior.
2. `/visualizer` loads without runtime errors.
3. Upload validates JPEG, PNG, and WebP only.
4. Manual mask works and supports draggable point edits.
5. Each finish family has selectable options.
6. Flake blend controls visibly affect rendering.
7. Metallic/pigment mixer controls visibly affect rendering.
8. Canvas preview visibly changes inside the selected floor area.
9. Export works.
10. Quote preparation works without storing the original photo.
11. Mobile width around 390px is usable.
12. PWA manifest remains available.
13. Browser-worker desktop/mobile flow passes or blocker is documented.
14. Vercel cron routes are auth-gated.
15. Enterprise status route accurately reports enabled/configured/blocked modules.
16. Owner assistant, voice, document intake, and takeoff/proposal routes remain disabled until approved.
17. `npm run build` passes.
18. Homepage remains unchanged except approved future link/embed.

## Out Of Scope Without Approval

- Production promotion.
- Persistent customer-photo storage.
- AI training on customer images.
- Unbounded paid AI calls.
- Database/schema/storage mutation.
- Billing mutation.
- Live CRM/customer messaging.
- Sending Gmail messages.
- Creating Calendar events or Google Tasks.
- Writing project folders to Drive.
- Placing outbound phone calls.
- Social posting.
- HeyGen video generation.
- Copying Torginol/FloorWIZ/Pikcells private code, assets, APIs, prompts, or implementation.

## Next Best Prompt

Run a targeted reconciliation and validation pass on `auto-builder/enterprise-floor-visualizer`: reconcile `FinishVisualizer.tsx` and `app/xps-flake-chart-lock.css` from `auto-builder/phoenix-nextjs-site-20260616`, run build/typecheck, fetch the new Vercel preview, and execute browser-worker desktop/mobile visualizer E2E through `/api/visualizer/browser-validation`.
