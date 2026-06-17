# XPS Flooring OS Approval Gates

Status: DRAFT ONLY

## Always Allowed In Docs Phase

- Read-only inspection.
- Draft docs.
- Draft manifests.
- Draft SQL under docs-only paths.
- Draft Vercel workflow and cron specs.
- Draft validation-agent plans.
- Drive folder/docs creation inside the approved draft package folder.
- GitHub docs-only branch commits.

## Stop For Explicit Approval Before

- Changing GitHub `main`.
- Opening production release PRs.
- Merging any branch.
- Executing Supabase migrations.
- Creating or deploying Supabase Edge Functions.
- Mutating production environment variables.
- Deploying or promoting production Vercel builds.
- Launching production cron.
- Sending real Twilio SMS.
- Enabling customer SMS.
- Sending sensitive customer messages.
- Creating production contracts.
- Processing payments.
- Changing Drive sharing permissions.
- Deleting, moving, or renaming existing Drive source-truth folders.

## Required Release Evidence Before Production

- Build passes.
- Preview route health passes.
- Upload/visualizer/quote smoke tests pass.
- RLS security tests pass.
- Cron writes a receipt in preview/sandbox.
- No secrets exposed to the frontend.
- SMS remains sandbox/demo until opt-in and compliance are verified.
- Payment remains placeholder until processor/legal/refund rules are approved.

## Rollback Rule

Every live action must define rollback before execution. No receipt means the action should be treated as not completed.
