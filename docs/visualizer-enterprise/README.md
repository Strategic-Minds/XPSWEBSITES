# XPS Enterprise Floor Visualizer Builder Docs

Prepared: 2026-06-17

This pack upgrades the floor visualizer from a limited MVP path into an Enterprise V1 target for Phoenix Epoxy Pros / XPSWEBSITES and bootstraps the broader XPS enterprise operating system behind approval gates.

## Build Position

- Skip a throwaway limited MVP.
- Do not skip validation gates.
- Build Enterprise V1 behind feature flags and release progressively.
- The six uploaded Phoenix/XPS mockups are now locked as pixel-target frontend acceptance baselines.
- Keep manual masking as the guaranteed fallback.
- Enable AI segmentation, 3D scenes, quote attachment, analytics, storage, voice, document automation, and CRM only behind explicit flags, budget controls, consent gates, and approval policy.

## Verified Targets

- Repo: `Strategic-Minds/XPSWEBSITES`
- Base branch: `auto-builder/phoenix-nextjs-site-20260616`
- Enterprise branch: `auto-builder/enterprise-floor-visualizer`
- Standalone route: `/visualizer`
- Vercel project: `xpswebsites`
- Vercel project ID: `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`
- Cron route: `/api/cron/enterprise-visualizer-validation`
- Ops cron route: `/api/cron/enterprise-ops-tick`
- Cron cadence: `*/5 * * * *`
- CRM folder: `XPS_ENTERPRISE_VISUALIZER_CRM`, folder ID `1hRvRfg4k4HfM1-vPF34LySDcU5WxG_Rm`
- CRM Sheet: `XPS Enterprise Visualizer CRM`, spreadsheet ID `1jizwt6Cf0wBNltNfhldyekkoa1kR0J7Ugm4_rzbLWvs`
- Mockup baseline folder: https://drive.google.com/drive/folders/1RlIkclW2H8Cm1q-cpc26HGQ1XkTnujES

## Pixel-Perfect Mockup Targets

- Public quote landing desktop/mobile.
- Floor Design Center desktop/mobile.
- Project Design and Quote Center desktop/mobile.
- Customer Dashboard desktop/mobile.
- Customer Project Detail desktop/mobile.
- Installer PWA / Job Tracker and desktop command center.

## Finish Families

- Flake
- Metallic
- Quartz
- Concrete Stain/Dye
- Metallic Glitter
- Liquid Pigment

## Included Docs

- `00-enterprise-build-packet.md`
- `01-total-process.md`
- `02-ai-and-3d-capability-plan.md`
- `03-vercel-workflow-cron-agent-builder-doc.md`
- `04-validation-governance-release.md`
- `05-repo-implementation-map.md`
- `06-validation-receipt-20260617-cron-secret-redeploy.md`
- `07-torginol-parity-implementation-gate.md`
- `08-xps-enterprise-operating-system-bootstrap.md`
- `09-owner-voice-assistant-google-workspace.md`
- `10-ai-takeoff-proposal-engine.md`
- `11-automation-validation-healing-system.md`
- `12-env-and-integration-contract.md`
- `13-branch-reconciliation-report.md`
- `14-pixel-perfect-frontend-automation-packet.md`
- `15-blocker-fix-and-automation-matrix.md`

## Source Links

- Torginol Floor Design Visualizer: https://torginol.com/design
- Torginol / Pikcells visualizer article: https://torginol.com/resources/blog/meet-pikcells-the-developers-of-the-torginol-floor-visualizer-tool
- FloorWIZ Torginol case study: https://floor-wiz.com/blog/torginol-floor-visualizer
- Vercel Cron Jobs: https://vercel.com/docs/cron-jobs
- Vercel Workflows: https://vercel.com/docs/workflows
- Vercel AI Gateway: https://vercel.com/docs/ai-gateway

## Governance

Do not promote production, persist customer photos, train AI on customer images, create unbounded paid AI usage, mutate databases, mutate billing, send email, place calls, send SMS, create calendar events, write Drive project folders, publish social content, or activate live CRM/customer messaging without explicit approval.

## Next Build Lane

Implement the pixel-perfect frontend lane using `14-pixel-perfect-frontend-automation-packet.md` and validate against `15-blocker-fix-and-automation-matrix.md`. All work must stay branch-safe, preview-first, and evidence-backed until the production approval gate is cleared.