# XPS Enterprise Floor Visualizer Builder Docs

Prepared: 2026-06-17

This pack upgrades the floor visualizer from a limited MVP path into an Enterprise V1 target for Phoenix Epoxy Pros / XPSWEBSITES.

## Build Position

- Skip a throwaway limited MVP.
- Do not skip validation gates.
- Build Enterprise V1 behind feature flags and release progressively.
- Keep manual masking as the guaranteed fallback.
- Enable AI segmentation, 3D scenes, quote attachment, and analytics only behind explicit flags, budget controls, and consent gates.

## Verified Targets

- Repo: `Strategic-Minds/XPSWEBSITES`
- Base branch: `auto-builder/phoenix-nextjs-site-20260616`
- Enterprise branch: `auto-builder/enterprise-floor-visualizer`
- Standalone route: `/visualizer`
- Vercel project: `xpswebsites`
- Vercel project ID: `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`
- Cron route: `/api/cron/enterprise-visualizer-validation`
- Cron cadence: `*/5 * * * *`

## Finish Families

- Flake
- Metallic
- Quartz
- Concrete Stain/Dye
- Metallic Glitter

## Included Docs

- `00-enterprise-build-packet.md`
- `01-total-process.md`
- `02-ai-and-3d-capability-plan.md`
- `03-vercel-workflow-cron-agent-builder-doc.md`
- `04-validation-governance-release.md`
- `05-repo-implementation-map.md`

## Source Links

- Torginol Floor Design Visualizer: https://torginol.com/design
- Torginol / Pikcells visualizer article: https://torginol.com/resources/blog/meet-pikcells-the-developers-of-the-torginol-floor-visualizer-tool
- FloorWIZ Torginol case study: https://floor-wiz.com/blog/torginol-floor-visualizer
- Vercel Cron Jobs: https://vercel.com/docs/cron-jobs
- Vercel Workflows: https://vercel.com/docs/workflows
- Vercel Agent: https://vercel.com/docs/agent

## Governance

Do not promote production, persist customer photos, train AI on customer images, create unbounded paid AI usage, mutate databases, mutate billing, or activate live CRM/customer messaging without explicit approval.
