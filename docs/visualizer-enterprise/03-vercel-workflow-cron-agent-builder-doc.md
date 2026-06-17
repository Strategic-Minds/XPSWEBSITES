# Vercel Workflow, Cron, And Agent Builder Doc

## Objective

Create a governed validation system for the enterprise visualizer:

- 5-minute validation monitor.
- Preview deployment validation.
- Vercel Agent review/investigation.
- Evidence receipts.
- No production mutation without approval.

## Verified Vercel Target

- Team ID: `team_aFdds8lsbHMwe2ip4aQdbQ3d`
- Project: `xpswebsites`
- Project ID: `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`

## Cron Configuration

File: `vercel.json`

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [
    {
      "path": "/api/cron/enterprise-visualizer-validation",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

Important:

- The path must be an API route.
- `*/5 * * * *` is the required 5-minute cadence.
- Vercel cron schedules are evaluated in UTC. Every-five-minute cadence is timezone-neutral.
- Vercel cron runs against production deployments.
- Preview validation should also use deployment checks, manual runs, GitHub checks, or Vercel Agent.
- Cron should check status and queue/record validation; it should not be the only validation path.

## Cron Route Contract

File: `app/api/cron/enterprise-visualizer-validation/route.ts`

Responsibilities:

- Verify `Authorization: Bearer ${CRON_SECRET}`.
- Check route health expectations.
- Check feature flag state.
- Check latest validation receipt if persistence exists.
- Report blockers.
- Return JSON receipt.

Receipt shape:

```ts
type EnterpriseVisualizerCronReceipt = {
  ok: boolean;
  checkedAt: string;
  route: "/visualizer";
  project: "xpswebsites";
  schedule: "*/5 * * * *";
  action: "status_only" | "queued_validation" | "blocked";
  blockers: string[];
};
```

## Workflow Implementation Shape

Use Vercel Workflow for durable validation stages when account/runtime support is enabled.

Recommended stages:

1. `fetchDeploymentContext`
2. `checkVisualizerRoute`
3. `runDesktopPlaywright`
4. `runMobilePlaywright`
5. `runCanvasPixelDiff`
6. `runAISegmentationSmoke`
7. `runMaterialCoverage`
8. `runPWAAudit`
9. `runHomepageRegression`
10. `writeValidationReceipt`

The workflow may write evidence receipts, screenshots, and status reports. It must not promote production, mutate billing, or persist customer photos.

## Vercel Agent Validation

Agent name: `XPS Enterprise Visualizer Validation Agent`

Agent role:

- Review pull requests and preview deployments.
- Investigate failed validation runs.
- Explain likely root causes and proposed fixes.
- Confirm when evidence supports `ready_for_user_review`.
- Never promote production or approve its own release gate.

Agent validates:

- Benchmark parity.
- AI mask quality and fallback.
- Material-family coverage.
- Canvas render behavior.
- 3D scene nonblank when enabled.
- Export behavior.
- Quote handoff.
- Privacy controls.
- PWA/mobile.
- Accessibility.
- Performance.
- Homepage non-regression.

Blocked actions:

- Production deploy.
- Billing mutation.
- Database mutation without approval.
- Customer-photo storage without consent.
- Paid AI unbounded usage.
- AI training on customer images.
- Infrastructure deletion.

## Status Values

- `blocked`
- `needs_revision`
- `preview_ready`
- `ready_for_user_review`
- `approved_for_homepage_embed`
- `approved_for_production`

Only the user can approve production or homepage embedding.

## Official References

- https://vercel.com/docs/cron-jobs
- https://vercel.com/docs/workflows
- https://vercel.com/docs/agent
