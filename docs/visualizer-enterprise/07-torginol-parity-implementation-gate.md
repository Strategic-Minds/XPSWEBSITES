# Torginol / FloorWIZ Parity Implementation Gate

## Purpose

This document makes the benchmark mandatory: the XPS Vizualizer must meet or exceed the public Torginol / FloorWIZ visualizer standard in technology, simplicity, workflow, visual quality, and conversion capability.

## Verified Benchmark Signals

- Torginol exposes a public Floor Design Visualizer at `https://torginol.com/design`.
- Torginol public material references custom blends, room selection, user photo upload, 3D environments, new materials, environmental shading, and floor mapping AI.
- FloorWIZ public material references custom flake blend controls, three flake sizes, pigment and metallic mixer options, room photo upload, AI floor mapping, realistic shadowing, gloss, share links, lead capture, and platform/CRM readiness.

## Required XPS Capabilities

1. Upload a real garage, patio, commercial, or interior photo.
2. Detect or manually select the floor plane.
3. Edit the mask with draggable points.
4. Render finish systems with lighting, shadow, gloss, perspective, and texture density.
5. Include chart-backed XPS finish families: Flake, Metallic, Quartz, Concrete Stain/Dye, Metallic Glitter, and Liquid Pigment.
6. Support custom flake controls: size, coverage, light/mid/dark distribution, and live texture preview.
7. Support metallic/pigment mixer controls: three colors, pattern, intensity, and wet-look behavior.
8. Export preview image locally.
9. Prepare quote-ready metadata without storing customer photos by default.
10. Add save/share/project continuity only after storage/CRM approval.
11. Validate desktop and mobile through a browser worker.
12. Keep homepage integration separate from standalone route approval.

## Current Branch Coverage

Implemented or scaffolded on `auto-builder/enterprise-floor-visualizer`:

- Standalone `/visualizer` Enterprise shell.
- Local browser upload.
- Manual polygon masking.
- Draggable/editable mask points.
- Flake, Metallic, Quartz, Concrete Stain/Dye, Metallic Glitter, and Liquid Pigment families.
- Flake size, coverage, and distribution controls.
- Metallic/pigment three-color mixer and pattern controls.
- Export/quote preparation panel.
- Browser-worker validation route.
- Five-minute visualizer validation cron.
- Five-minute enterprise ops cron.

## Remaining Enterprise Gaps

- Full browser-worker E2E proof after deployment.
- AI segmentation provider integration and quality scoring.
- True 3D showroom/free exploration mode.
- Persistent saved projects/share links.
- Storage/CRM/analytics activation.
- Production-grade accessibility and performance audit evidence.
- User approval for homepage embed and production promotion.

## Non-Copy Rule

Use public Torginol/FloorWIZ behavior as a benchmark. Do not copy private code, private assets, internal APIs, proprietary blend algorithms, or protected implementation details.
