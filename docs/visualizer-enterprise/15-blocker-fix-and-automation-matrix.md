# Blocker Fix And Automation Matrix

Generated: 2026-06-17
Branch: `auto-builder/enterprise-floor-visualizer`

## Purpose

This matrix converts the current XPS/Phoenix frontend, CRM, browser-worker, AI Gateway, storage, and automation blockers into exact fixes, workarounds, and automation ownership.

## Current Blockers

| Blocker | Verified status | Exact fix | Workaround | Can automate? | Gate |
| --- | --- | --- | --- | --- | --- |
| Uploaded mockups were not locked as frontend acceptance targets | Fixed in docs by `14-pixel-perfect-frontend-automation-packet.md` | Use Drive baseline folder and screenshot diff in every frontend preview run | Manual visual review until diff tooling is installed | Yes | No production gate |
| `/visualizer` does not match Floor Design Center mockup | Current preview is a dark visualizer shell | Build `/design` or `/floor-design-center` from M01 and let product cards open `/visualizer` | Keep current `/visualizer` for interactive rendering | Yes | Preview branch only |
| `/customer-portal` is only a placeholder | Verified live preview text page | Replace with M02 dashboard and route detail pages from M03 | Demo data only until auth/data approved | Yes | Auth/data gate for live use |
| Public landing is not pixel-matched to M05 | `/` exists but differs from mockup | Rebuild hero, quote card, before/after, services, portal strip to match M05 | Preserve existing safe lead form behavior | Yes | Lead submission must remain safe |
| Project Design & Quote Center missing/not verified | No matching route verified | Add `/quote/design` or `/project-design-quote` from M06 | Use local preview uploads only | Yes | Storage/CRM gate |
| Installer PWA missing/not verified | No matching route verified | Add `/installer` and `/installer/jobs/[jobId]` from M04 | Demo/offline local state | Yes | Auth/sync/data gate |
| Desktop command center missing/not verified | No matching route verified | Add `/ops` or `/admin/command-center` shell from M04 | Locked/demo-only view | Yes | Auth/admin gate |
| Browser-worker execution disabled | Existing route reports execution disabled | Set `VISUALIZER_BROWSER_WORKER_ENABLED=true`, ensure `BROWSER_WORKER_URL`, and auth secret | Manual route fetch and screenshots until enabled | Partially | Env gate |
| Validation secret not confirmed | Protected execution not used | Add/verify `ENTERPRISE_VALIDATION_SECRET` or `CRON_SECRET` in Vercel preview | Dry-run validation only | No, requires env access | Secret gate |
| AI Gateway env values not routeable | Status previously showed human labels like `GROQ` / `OPEN AI` | Use Vercel routeable model slug plus provider, e.g. `AI_GATEWAY_PRIMARY_MODEL=meta/llama-4-scout`, `AI_GATEWAY_PRIMARY_PROVIDER=groq`, `AI_GATEWAY_FALLBACK_MODELS=openai/gpt-5.5` after registry verification | Keep owner assistant disabled | Partially | Env/model gate |
| Customer preview and quote file storage unapproved | CRM Sheet exists, object storage not approved | Approve Vercel Blob for previews and Drive for docs, or another explicit storage target | Store metadata only in CRM Sheet | No, requires approval | Storage/privacy gate |
| CRM sync target not wired | Google Sheet exists as control surface | Add service-account or Workspace connector sync adapter to write approved rows | Manual/connector-mediated Sheet updates | Partially | Workspace write gate |
| Supabase schema not production-applied | Prior alignment found only `customers` and `leads` overlap draft schema | Use Supabase sandbox branch before production migration | Use deterministic frontend demo data | Partially | DB approval gate |
| Pixel-diff tooling not verified in repo | Not verified | Add Playwright screenshot tests plus image-diff threshold and baseline pull/caching | Browser-worker manual screenshots | Yes | Preview branch only |
| PWA install/offline behavior not verified for installer | Not verified | Add manifest, service worker/offline queue, local draft storage, sync status UI | Offline demo state only | Yes | Sync/data gate |
| Production approval gate not encoded for mockup lane | Planned, not live | Add release checklist requiring green build, route smoke, visual diffs, mobile screenshots, accessibility, storage/CRM gate status | Human review checklist | Yes for checks, no for final approval | Human gate |

## Automation Ownership

### Frontend Creation Agent

- Builds M01-M06 screens from `14-pixel-perfect-frontend-automation-packet.md`.
- Owns frontend routes, shared components, demo data, local-only state, and responsive behavior.
- Must not change production env, database, storage, live messaging, billing, or social posting.

### Visualizer UX QA Agent

- Checks that Floor Design Center, product cards, visualizer CTAs, saved design behavior, quote handoff, filters, and mobile navigation match the benchmarked Torginol simplicity target.

### Torginol Benchmark Scoring Agent

- Scores against these dimensions:
  - Entry simplicity.
  - Visual clarity.
  - Product/material browsing.
  - Save/use-for-quote flow.
  - Project/blend continuity.
  - Human-contact fallback.
  - Mobile ease.

### Mobile Visual Regression Agent

- Captures 390x844 and 430x932 screenshots for all required routes.
- Fails on horizontal scroll, clipping, overlap, missing cards, missing CTA, or incorrect bottom nav.

### Auto-Fix UI Agent

Allowed automatic branch-safe fixes:

- Spacing and alignment corrections.
- Responsive grid corrections.
- Font size/container overflow fixes.
- Missing empty/loading/error states.
- Broken route links.
- Missing demo-data rows.
- Non-destructive screenshot-diff improvements.

Not allowed without approval:

- Main branch merge.
- Production deployment or promotion.
- Vercel env mutation.
- Customer file persistence.
- Database migration.
- Storage bucket creation.
- Live email, SMS, calls, social posts, or payments.

### Auto Validate / Auto Fix / Auto Heal / Auto Harden Agent

Runs as a Vercel Workflow/Cron-controlled maintenance loop when enabled.

Minimum 5-minute cycle:

1. Read current deployment/commit/branch.
2. Check `/api/enterprise/status`.
3. Check `/api/visualizer/browser-validation` readiness.
4. Check required routes return 200.
5. Run or request browser-worker screenshot pass.
6. Compare current screenshots against mockup baselines.
7. Check console/page errors.
8. Check PWA manifest and mobile layout.
9. Check env drift without leaking secret values.
10. Record receipt to CRM Sheet / evidence store.
11. If failure is frontend-only and safe, create a branch-safe repair plan or patch lane.
12. If failure touches protected systems, mark as blocked and request approval.

## Immediate Fix Order

1. Enable preview browser-worker execution after confirming secret: `VISUALIZER_BROWSER_WORKER_ENABLED=true`.
2. Add route skeletons for `/design`, `/quote/design`, `/customer-portal/dashboard`, `/customer-portal/projects/[projectId]`, `/installer`, `/installer/jobs/[jobId]`, and `/ops`.
3. Add shared Phoenix UI system and deterministic demo data.
4. Implement M05 public quote landing without breaking existing lead form behavior.
5. Implement M01 Floor Design Center and wire product-card visualizer context.
6. Implement M06 Project Design and Quote Center with local-only uploads.
7. Implement M02/M03 customer portal dashboard and project detail using demo data.
8. Implement M04 installer PWA and command-center demo shell.
9. Add Playwright route smoke and screenshot capture.
10. Add visual diff against Drive/repo baselines or downloaded artifacts.
11. Run mobile overflow/accessibility checks.
12. Update `/api/enterprise/status` to report mockup implementation state.
13. Keep storage/CRM/live messaging disabled until approved.
14. Only after all preview checks pass, prepare a production approval packet.

## Workarounds Until Full Automation Is Live

- Use the Drive baseline folder as the manual review source of truth.
- Use deterministic demo data instead of Supabase production reads.
- Use local-only upload preview states instead of storing customer files.
- Use existing CRM Sheet for metadata planning and QA receipts.
- Use browser-worker dry-run if execution remains disabled.
- Keep all live outbound systems in draft/approval mode.

## Release Readiness Rule

The frontend lane is not release-ready until all six mockup screens are implemented, screenshot evidence exists for desktop and mobile, the visual-diff threshold is met or exceptions are approved, no critical console/runtime errors exist, storage/CRM flags remain honest, and the production approval gate is explicitly cleared.