# XPS Flooring OS Vercel Workflow Draft

Status: DRAFT ONLY. Production cron not launched.

## Target When Approved

- Vercel project: `xpswebsites`
- Project ID: `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`
- Team ID: `team_aFdds8lsbHMwe2ip4aQdbQ3d`

## Durable Workflows

- `quoteIntakeWorkflow`
- `visualizerSaveWorkflow`
- `smsDispatchWorkflow`
- `projectStatusWorkflow`
- `installerCheckInWorkflow`
- `changeOrderWorkflow`
- `colorApprovalWorkflow`
- `finalSignoffWorkflow`
- `reviewReferralWorkflow`
- `validationAgentWorkflow`

## Five-Minute Cron Wake-Up Routes

- `/api/cron/event-processor`
- `/api/cron/quote-sla-monitor`
- `/api/cron/sms-dispatcher`
- `/api/cron/project-status-monitor`
- `/api/cron/review-referral-monitor`
- `/api/cron/validation-agent`

Schedule: `*/5 * * * *`

## Cron Rule

- Every five minutes only.
- No uncontrolled background loops.
- Every run writes a receipt.
- Every failure creates a validation event.
- Routes must be auth-gated with `CRON_SECRET` or equivalent.

## Cron Checks

- Unprocessed events.
- Quote SLA violations.
- Pending customer actions.
- Pending SMS messages.
- Unsigned contracts.
- Pending color approvals.
- Open change orders.
- Jobs delayed.
- Review requests due.
- Referral rewards due.
- Validation failures.

## Execution Gate

Do not add production cron to `vercel.json`, promote production deployment, or mutate env vars without explicit approval.
