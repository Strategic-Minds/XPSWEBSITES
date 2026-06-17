# XPS Flooring OS Branch-Safe Backend Code Implementation Packet

Generated: 2026-06-17

Status: approved packet lane only. This packet is the handoff artifact for a later branch-safe backend/code implementation. It does not execute code changes, Supabase migrations, Vercel cron, production deploys, SMS, payments, contracts, Drive sharing changes, or frontend edits.

## 1. Current Status

### Verified

- Target repo: `Strategic-Minds/XPSWEBSITES`.
- Active frontend/base branch inspected: `auto-builder/phoenix-nextjs-site-20260616`.
- Docs package branch: `docs/xps-flooring-os-builder-package`.
- Drive package folder: `16_XPS_FLOORING_OS_DOCUMENT_BUILDER_PACKAGE`.
- Supabase target project: `Strategic Minds Advisory`, project ref `prhppuuwcnmfdhwsagug`.
- Vercel target project: `xpswebsites`, project ID `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`, team `team_aFdds8lsbHMwe2ip4aQdbQ3d`.
- Current repo is a compact Next.js App Router app under `app/`.
- Current `package.json` has `next`, `react`, `react-dom`, TypeScript packages, and scripts `dev`, `build`, `vercel-build`, `start`, `typecheck`, `validate`, and `validate:production`.
- Current route `app/api/leads/route.ts` exists and returns a JSON stub after reading multipart form data.
- Current lead form `app/components/PhoenixLeadForm.tsx` posts `FormData` to `/api/leads`.
- Current frontend pages include `app/page.tsx`, `app/visualizer/page.tsx`, and `app/customer-portal/page.tsx`.
- No `src/` app tree was found for the inspected branch.
- No root `vercel.json` was found on the inspected branch.
- No Supabase dependency is currently declared in `package.json`.
- Supabase read-only inspection found production tables named `customers` and `leads`, which overlap the draft XPS schema.
- Supabase read-only inspection found no matching XPS draft storage buckets.
- Supabase Edge Function inspection found only `autobuilder-gpt-bridge`.
- Vercel docs-branch preview deployments are non-production (`target: null`).

### Inferred

- The next implementation should be a separate backend branch after the frontend agent handoff is available, or from the latest approved frontend branch if the owner explicitly approves that base.
- Backend code should be adapter-first so the frontend can keep moving with mocks or disabled states until Supabase sandbox validation exists.
- The first backend code pass should preserve the current `/api/leads` response shape while adding receipts and stricter validation behind a feature flag.

### Could Not Verify

- The active frontend agent's uncommitted branch state.
- Final route names or component contracts from the active frontend agent.
- Whether production `public.leads` and `public.customers` are intended to become XPS-owned tables or shared AWOS tables.
- Live Supabase RLS behavior for XPS schema because no schema was executed.
- Live Vercel Workflow behavior because workflow implementation was not approved in this lane.

## 2. Source Truth

Primary source truth for this packet:

- Drive package folder: `16_XPS_FLOORING_OS_DOCUMENT_BUILDER_PACKAGE`.
- GitHub docs branch: `docs/xps-flooring-os-builder-package`.
- `ALIGNMENT_CONTROL_MATRIX.md`.
- `SUPABASE_SCHEMA_DRAFT.md`.
- `VERCEL_WORKFLOW_DRAFT.md`.
- `APPROVAL_GATES.md`.
- Local package route/event maps under `output/xps-flooring-os-document-builder-package/`.
- Current inspected frontend/base branch: `auto-builder/phoenix-nextjs-site-20260616`.

Runtime facts take priority over drafts. If a draft conflicts with current repo state, the implementation agent must reconcile in a receipt before coding.

## 3. System Boundary

### Included In This Backend Code Lane

- API route contracts.
- Backend validation and sanitization.
- Event receipt model.
- Server-side adapters for data persistence.
- Disabled-by-default Supabase adapter scaffolding.
- Disabled-by-default upload/storage adapter scaffolding.
- Cron route skeletons with auth gates and disabled responses.
- Backend smoke checks.
- Build/typecheck validation.
- Implementation receipts.

### Excluded From This Backend Code Lane

- Frontend layout, styling, copy, hero, visualizer UI, customer portal UI, installer UI, or admin UI edits.
- Supabase migration execution.
- Supabase storage bucket creation.
- Supabase Edge Function deployment.
- Vercel production cron launch.
- Vercel env mutation.
- Production deployment or branch merge.
- Twilio live SMS.
- Customer messaging.
- Payment processing.
- Contract generation.
- Drive permission changes.

## 4. Frontend Plan

The frontend agent owns active frontend implementation.

Backend code must preserve these contracts until the frontend handoff says otherwise:

- `POST /api/leads` accepts `multipart/form-data`.
- Current lead form fields include `fullName`, `phone`, `email`, `zipCode`, `projectType`, `budget`, and honeypot `website`.
- Current response must remain JSON and should continue to support:

```json
{
  "ok": true,
  "score": "cold|warm|hot",
  "message": "string"
}
```

Backend implementation may add optional fields without breaking the current UI:

```json
{
  "leadId": "string|null",
  "receiptId": "string",
  "mode": "mock|sandbox|disabled"
}
```

Frontend avoid zones while the other agent is active:

- `app/page.tsx`
- `app/globals.css`
- `app/*.css`
- `app/components/*`
- `app/visualizer/page.tsx`
- `app/customer-portal/page.tsx`
- `public/images/*`
- Existing chart/media assets

If a backend implementation requires frontend wiring, create a docs note and wait for the frontend handoff instead of editing these files.

## 5. Backend Plan

### Phase 1: Backend Contract Layer

Create server-only backend helpers under `app/lib/xps/` because `tsconfig.json` currently includes `app/**/*.ts` and `app/**/*.tsx`.

Recommended files:

- `app/lib/xps/env.ts`
- `app/lib/xps/types.ts`
- `app/lib/xps/events.ts`
- `app/lib/xps/receipts.ts`
- `app/lib/xps/validation.ts`
- `app/lib/xps/lead-scoring.ts`
- `app/lib/xps/adapters/data-store.ts`
- `app/lib/xps/adapters/mock-store.ts`
- `app/lib/xps/adapters/supabase-store.ts`
- `app/lib/xps/adapters/storage.ts`
- `app/lib/xps/http.ts`

The default runtime mode must be `disabled` or `mock` unless explicitly configured:

- `XPS_BACKEND_MODE=disabled|mock|sandbox`
- `XPS_BACKEND_ENABLED=true|false`
- `CRON_SECRET` for cron route authorization only

### Phase 2: Lead Intake Upgrade

Update only `app/api/leads/route.ts` in the first backend branch, preserving the current response contract.

Required behavior:

- Reject honeypot submissions silently with `{ ok: true, mode: "blocked" }`.
- Validate `fullName`, `phone`, `email`, `zipCode`, and `projectType`.
- Normalize phone/email/zip before storing.
- Preserve existing scoring behavior or replace it with an equivalent deterministic helper.
- Write receipt in mock mode.
- Do not write to production Supabase unless sandbox mode is approved and configured.
- Never expose service role keys to client code.

### Phase 3: New Backend API Skeletons

Add route skeletons that return disabled/mock responses until Supabase sandbox approval exists:

- `app/api/quote-requests/route.ts`
- `app/api/visualizer-results/route.ts`
- `app/api/uploads/route.ts`
- `app/api/projects/route.ts`
- `app/api/project-events/route.ts`
- `app/api/customer-messages/route.ts`
- `app/api/installer/jobs/route.ts`
- `app/api/admin/events/route.ts`
- `app/api/admin/validation/route.ts`

Each route must:

- Return JSON only.
- Include `mode`.
- Include `receiptId` where useful.
- Avoid customer-facing sends.
- Avoid storage writes unless sandbox storage is approved.
- Avoid database writes unless sandbox Supabase is approved.

### Phase 4: Cron Skeletons Without Production Launch

Add route handlers only. Do not add production cron schedules to `vercel.json` in this lane.

Recommended routes:

- `app/api/cron/event-processor/route.ts`
- `app/api/cron/quote-sla-monitor/route.ts`
- `app/api/cron/sms-dispatcher/route.ts`
- `app/api/cron/project-status-monitor/route.ts`
- `app/api/cron/review-referral-monitor/route.ts`
- `app/api/cron/validation-agent/route.ts`

Required behavior:

- Require `CRON_SECRET` or return `401`.
- Return `503` or `200 disabled` when `XPS_BACKEND_ENABLED` is not `true`.
- Never send SMS.
- Never process payments.
- Never mutate production data.
- Emit a local/mock receipt only.

## 6. Repo And File Map

### Safe Write Zones For Later Backend Branch

- `app/api/leads/route.ts`
- `app/api/quote-requests/**`
- `app/api/visualizer-results/**`
- `app/api/uploads/**`
- `app/api/projects/**`
- `app/api/project-events/**`
- `app/api/customer-messages/**`
- `app/api/installer/**`
- `app/api/admin/**`
- `app/api/cron/**`
- `app/lib/xps/**`
- `supabase/migrations/**` as draft files only
- `supabase/policies/**` as draft files only
- `supabase/storage/**` as draft files only
- `docs/xps-flooring-os-builder-package/**`
- `.github/workflows/**` only if adding non-production validation checks
- `package.json` only if adding required dependencies on a branch, with build validation

### Avoid Zones Until Frontend Handoff

- `app/page.tsx`
- `app/layout.tsx`
- `app/components/**`
- `app/visualizer/**`
- `app/customer-portal/**`
- `app/*.css`
- `public/images/**`
- Existing approved hero/chart assets

### Conditional Write Zones

- `vercel.json`: do not add cron schedules in this lane. Only touch after explicit Vercel workflow/cron approval.
- `.env.example`: may add placeholder names only, never secrets.
- `package.json`: allowed only when the backend branch is actually implementing dependencies and build passes.

## 7. Tool And Integration Plan

### Supabase

Current production project has `customers` and `leads` tables already. The implementation branch must not blindly assume the draft `customers` and `leads` tables are safe to own.

Required rule:

- Use an adapter interface first.
- Do not write to production tables.
- For sandbox migration approval, choose one of these paths:
  - `Option A`: namespace XPS tables as `xps_leads`, `xps_customers`, etc.
  - `Option B`: formally map and extend existing `leads` and `customers` after schema ownership is verified.

Preferred safe default: `Option A` in sandbox, because it avoids collision with existing production tables.

Supabase implementation requirements:

- RLS enabled for every public table.
- No service role key in frontend.
- No secrets in Git or Drive.
- Views must use `security_invoker = true` when exposed.
- `security definer` functions must not live in exposed schemas.
- Storage policies must handle insert/select/update requirements for upserts.
- Run advisors after sandbox schema creation, before any production discussion.

### Vercel

In this lane:

- API route skeletons are allowed.
- Cron route skeletons are allowed.
- Production cron launch is not allowed.
- Vercel env mutation is not allowed.
- Production promotion is not allowed.

Later Vercel workflow lane must decide whether to use Vercel Workflow or simpler authenticated cron polling after preview evidence exists.

### Drive

Drive remains the operator-facing package archive and receipt store.

Allowed:

- Upload packet and receipts inside the existing package/receipt folders.

Blocked:

- Sharing permission changes.
- Moving or deleting existing source-truth folders.

### GitHub

This packet should be published to the docs branch. Later backend implementation should use a new branch, not the docs branch.

Recommended later branch name:

- `auto-builder/xps-flooring-os-backend-code-20260617`

Do not create or push this code branch until the frontend handoff source branch is known, unless the owner explicitly says to branch from `auto-builder/phoenix-nextjs-site-20260616`.

## 8. Validation Plan

### Packet Validation

- Confirm packet exists locally.
- Confirm packet is uploaded to Drive receipt folder.
- Confirm packet is committed under GitHub docs branch only.
- Confirm docs branch diff remains docs-only.
- Confirm any Vercel build caused by docs branch remains non-production.

### Later Backend Code Validation

Minimum checks:

```bash
npm run typecheck
npm run build
npm run validate:production
```

Manual route checks:

- `POST /api/leads` with valid multipart payload returns `ok: true`.
- Honeypot lead request does not store or alert.
- `GET/POST` unsupported methods return proper status.
- Cron routes return `401` without secret.
- Cron routes return disabled response when `XPS_BACKEND_ENABLED` is not `true`.
- Root `/`, `/visualizer`, and `/customer-portal` still return successfully after backend changes.

Preview checks:

- Vercel preview deploy is READY.
- Runtime logs show no new backend errors.
- Existing lead form still submits successfully in preview.
- No production target is promoted.

Supabase sandbox checks, only after sandbox approval:

- Apply draft migration to sandbox branch only.
- Confirm no writes go to production ref `prhppuuwcnmfdhwsagug`.
- Run Supabase advisors.
- Verify RLS positive/negative cases.
- Verify storage bucket access rules.

## 9. Required Docs And Playbooks

Required docs to create or update in later implementation:

- `docs/xps-flooring-os-builder-package/BACKEND_CODE_IMPLEMENTATION_RECEIPT.md`
- `docs/xps-flooring-os-builder-package/API_CONTRACTS.md`
- `docs/xps-flooring-os-builder-package/SUPABASE_COLLISION_DECISION.md`
- `docs/xps-flooring-os-builder-package/PREVIEW_VALIDATION_RECEIPT.md`
- `docs/xps-flooring-os-builder-package/ROLLBACK_PLAN.md`

Required operating references:

- `APPROVAL_GATES.md`
- `ALIGNMENT_CONTROL_MATRIX.md`
- `SUPABASE_SCHEMA_DRAFT.md`
- `VERCEL_WORKFLOW_DRAFT.md`

## 10. Blockers Or Missing Pieces

- Active frontend agent handoff branch is not verified.
- Supabase table ownership for existing `customers` and `leads` is not verified.
- Supabase sandbox branch has not been approved.
- Vercel workflow/cron implementation has not been approved.
- Vercel env mutation has not been approved.
- Twilio, payment, contract, and live customer messaging are blocked.
- No full browser E2E has been run against the future backend code because code is not implemented yet.

## 11. Rollback Path

For this packet:

- Delete or supersede the docs packet if the owner changes direction.
- No runtime rollback is required because no code or production mutation is included.

For later backend implementation:

- Revert the backend implementation branch commits.
- Disable `XPS_BACKEND_ENABLED`.
- Keep cron routes unactionable unless secret and enabled flag are present.
- Do not merge to `main` until preview evidence is accepted.
- If sandbox migration was approved separately, drop/recreate sandbox branch rather than repairing production.

## 12. Next Best Prompt

Use this only after frontend handoff is available:

```text
APPROVED: Create branch `auto-builder/xps-flooring-os-backend-code-20260617` from the current approved frontend handoff branch. Implement only the branch-safe backend adapter layer, preserve the `/api/leads` form contract, avoid frontend files, keep Supabase writes disabled unless sandbox env is explicitly configured, do not add production Vercel cron, run typecheck/build, and publish a preview validation receipt. Keep production actions gated.
```

If the owner wants backend work before frontend handoff, use this narrower prompt:

```text
APPROVED: Create a backend-only branch from `auto-builder/phoenix-nextjs-site-20260616` and implement only `app/lib/xps/**` plus disabled/mock API route scaffolds. Do not edit frontend pages/components/styles, do not execute Supabase migrations, and do not add Vercel production cron.
```
