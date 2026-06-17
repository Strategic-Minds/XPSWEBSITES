# Automation, Validation, And Healing System

## Objective

Create a Vercel-first automation layer that continuously validates, diagnoses, and prepares branch-safe repairs for the XPS enterprise system.

## Required Automation Loop

DISCOVER -> VALIDATE -> DIAGNOSE -> PLAN -> FIX SAFELY -> VALIDATE -> RECORD -> OPTIMIZE -> EVOLVE

## Implemented Scaffold

- `vercel.json` includes:
  - `/api/cron/enterprise-visualizer-validation` every 5 minutes.
  - `/api/cron/enterprise-ops-tick` every 5 minutes.
- `app/api/enterprise/status/route.ts` exposes readiness and blockers.
- `app/api/visualizer/browser-validation/route.ts` can call the configured browser worker when enabled.
- `app/lib/enterprise-system.ts` centralizes module status, owner, corporate map, feature flags, and blockers.

## Frontend Automation Packet

The six uploaded Phoenix/XPS mockups are locked by `14-pixel-perfect-frontend-automation-packet.md`. That packet is the visual source of truth for frontend creation, screenshot validation, pixel-diff checks, and auto-fix behavior.

Baseline folder: https://drive.google.com/drive/folders/1RlIkclW2H8Cm1q-cpc26HGQ1XkTnujES

## Vercel Workflow Plan

Use Vercel Workflows for durable multi-step jobs when runtime support is active.

Recommended workflows:

1. Visualizer E2E validation workflow.
2. Enterprise ops tick workflow.
3. Pixel-perfect frontend validation workflow.
4. Mobile visual regression workflow.
5. Torginol benchmark scoring workflow.
6. Owner assistant QA workflow.
7. Document intake workflow.
8. Takeoff triple-check workflow.
9. Proposal QA workflow.
10. Social content approval workflow.
11. Auto-heal branch-safe repair workflow.

## Vercel Agent Plan

Agents should review, investigate, and recommend. They must not promote production or approve their own changes.

Core validation agents:

- Frontend Creation Agent.
- Visualizer Benchmark Agent.
- UI/UX/Aesthetic QA Agent.
- Torginol Benchmark Scoring Agent.
- Browser Worker E2E Agent.
- Mobile Visual Regression Agent.
- Auto-Fix UI Agent.
- Auto Validate / Auto Fix / Auto Heal / Auto Harden Agent.
- AI Gateway Model Router Agent.
- Owner Assistant QA Agent.
- Document Takeoff QA Agent.
- Proposal QA Agent.
- Security/Governance Agent.
- Social Automation QA Agent.
- Production Approval Gate Agent.

## Agent Responsibilities

### Frontend Creation Agent

- Builds branch-safe UI routes and shared components from `14-pixel-perfect-frontend-automation-packet.md`.
- Uses deterministic demo data until live data scopes are approved.
- Does not mutate storage, database, env, billing, messaging, or production deployment.

### Visualizer UX QA Agent

- Checks the Floor Design Center, visualizer link path, material cards, filter rail, save/use-for-quote controls, upload/mask/export flow, and mobile usability.

### Torginol Benchmark Scoring Agent

- Scores simplicity, visual clarity, My Projects/My Blends-style continuity, product browsing, quote handoff, and human support fallback against Torginol/FloorWIZ-level expectations.

### Mobile Visual Regression Agent

- Captures mobile screenshots at 390x844 and 430x932.
- Fails on horizontal overflow, clipped content, overlapping UI, missing bottom nav, missing CTA, or unreadable text.

### Auto-Fix UI Agent

Allowed branch-safe fixes:

- Spacing and alignment corrections.
- Responsive grid corrections.
- Font-size and container overflow fixes.
- Missing card/empty/loading/error states.
- Broken route links.
- Missing deterministic demo rows.
- Screenshot-diff repair plans.

### Auto Validate / Auto Fix / Auto Heal / Auto Harden Agent

Runs as a scheduled maintenance system once enabled.

Minimum 5-minute loop:

1. Read commit, branch, deployment, and feature flags.
2. Check `/api/enterprise/status`.
3. Check `/api/visualizer/browser-validation` readiness.
4. Check public, design, quote, portal, project-detail, installer, and ops routes.
5. Run or request browser-worker screenshots.
6. Compare screenshots against the mockup baselines.
7. Check console/page/runtime errors.
8. Check PWA manifest, mobile theme, and offline-readiness signals.
9. Check AI Gateway and browser-worker env readiness without leaking secret values.
10. Record evidence receipt.
11. Create branch-safe repair plan or patch lane for frontend-only failures.
12. Escalate protected failures to human approval.

## Auto-Heal Rules

Allowed automatically:

- Detect failing routes.
- Detect missing env readiness.
- Detect bad flags.
- Detect screenshot diff failures.
- Detect mobile overflow and clipping.
- Produce branch-safe patch plans.
- Create evidence receipts.
- Recommend rollback flags.

Requires approval:

- Production deploy.
- Merge to main.
- Vercel env mutation.
- Database migration.
- Storage bucket creation.
- Sending emails, SMS, calls, social posts.
- Persisting customer photos.
- Paid AI runs outside budget policy.
- Any destructive action.

## Browser Worker Validation

Required E2E once deployed and enabled:

- Desktop visualizer load.
- Mobile visualizer load.
- Public quote landing screenshot.
- Floor Design Center screenshot.
- Project Design and Quote Center screenshot.
- Customer Dashboard screenshot.
- Customer Project Detail screenshot.
- Installer PWA screenshot.
- Ops Command Center screenshot.
- Upload fixture image.
- Create and drag mask points.
- Select each material family.
- Confirm canvas pixels change.
- Export PNG.
- Confirm quote prep does not store photo unless enabled and consented.
- Check light/dark mode once implemented.
- Capture screenshots and receipt.

## Social Automation Bootstrap

Social automation is planned but disabled.

Future scope:

- Content ideas from project wins, before/after images, training events, store promos, and product launches.
- Human approval before publishing.
- Channel-specific formatting.
- Performance tracking.
- Repurpose winning content.

## Required Evidence Receipt

Every validation run should record:

- Run ID.
- Commit SHA or deployment ID.
- Route checked.
- Browser mode.
- Viewport.
- Baseline image ID where applicable.
- Pixel-diff summary.
- Flags.
- Screenshots or proof links.
- Pass/fail summary.
- Blockers.
- Recommended next action.

## Release Readiness Rule

The frontend lane is not release-ready until all six mockup screens are implemented, desktop and mobile screenshots pass the visual acceptance gate, upload/mask/export/mobile E2E passes, no protected flags are misrepresented, and the production approval gate is explicitly cleared.