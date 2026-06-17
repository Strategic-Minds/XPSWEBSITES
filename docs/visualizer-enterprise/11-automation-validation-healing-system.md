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

## Vercel Workflow Plan

Use Vercel Workflows for durable multi-step jobs when runtime support is active.

Recommended workflows:

1. Visualizer E2E validation workflow.
2. Enterprise ops tick workflow.
3. Owner assistant QA workflow.
4. Document intake workflow.
5. Takeoff triple-check workflow.
6. Proposal QA workflow.
7. Social content approval workflow.
8. Auto-heal branch-safe repair workflow.

## Vercel Agent Plan

Agents should review, investigate, and recommend. They must not promote production or approve their own changes.

Core validation agents:

- Visualizer Benchmark Agent.
- UI/UX/Aesthetic QA Agent.
- Browser Worker E2E Agent.
- AI Gateway Model Router Agent.
- Owner Assistant QA Agent.
- Document Takeoff QA Agent.
- Proposal QA Agent.
- Security/Governance Agent.
- Social Automation QA Agent.

## Auto-Heal Rules

Allowed automatically:

- Detect failing routes.
- Detect missing env readiness.
- Detect bad flags.
- Produce branch-safe patch plans.
- Create evidence receipts.
- Recommend rollback flags.

Requires approval:

- Production deploy.
- Merge to main.
- Database migration.
- Storage bucket creation.
- Sending emails, SMS, calls, social posts.
- Persisting customer photos.
- Paid AI runs outside budget policy.
- Any destructive action.

## Browser Worker Validation

Required E2E once deployed:

- Desktop visualizer load.
- Mobile visualizer load.
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
- Flags.
- Screenshots or proof links.
- Pass/fail summary.
- Blockers.
- Recommended next action.
