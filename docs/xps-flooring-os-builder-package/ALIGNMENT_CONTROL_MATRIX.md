# XPS Flooring OS Alignment Control Matrix

Generated: 2026-06-17

Status: docs-only alignment pass. No frontend code, production database, production deployment, cron launch, SMS, payment, contract, or Drive permission mutation performed.

## Executive Control

The active frontend agent owns frontend implementation. This matrix preserves the backend, Drive, GitHub, Supabase, and Vercel handoff lane so the frontend work can continue without schema or workflow drift.

## Verified Alignment

| Surface | Verified State | Alignment Decision | Allowed Next Step | Approval Gate |
| --- | --- | --- | --- | --- |
| Drive | XPS package folder exists under `XPS WEBSITES` as `16_XPS_FLOORING_OS_DOCUMENT_BUILDER_PACKAGE`; package root contains README, manifest, implementation packet, validation status, Drive folder manifest, workspace asset manifest, and package ZIP. | Drive is the operator-facing archive and package control room. | Add coordination receipts and non-destructive docs inside the package folder. | Do not change sharing permissions, move existing source-truth folders, or delete prior assets without explicit approval. |
| GitHub | Repo `Strategic-Minds/XPSWEBSITES` has docs branch `docs/xps-flooring-os-builder-package`, 10 commits ahead and 0 behind `auto-builder/phoenix-nextjs-site-20260616`; diff is docs-only under `docs/xps-flooring-os-builder-package/`. | GitHub docs branch is the implementation draft source for backend/schema/workflow specs. | Add docs-only coordination files to the docs branch. | Do not touch frontend files, `main`, merge branches, or open production release PRs without explicit approval. |
| Supabase | Project `Strategic Minds Advisory` ref `prhppuuwcnmfdhwsagug` is the target. Read-only inspection found only `customers` and `leads` overlapping the draft XPS table list. No matching XPS storage buckets returned. Existing edge function list only shows `autobuilder-gpt-bridge`. | Supabase remains unmutated; XPS schema is draft-only until a sandbox branch is approved. | Prepare a sandbox-branch migration packet and RLS test checklist. | Do not execute migrations, create buckets, deploy edge functions, or merge branches without explicit approval. |
| Vercel | Project `xpswebsites` ID `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`; docs branch deployments are preview deployments with `target: null`; latest docs deployment is READY from commit `e07c4309862487972a0e018fdd66968dadb98b5c`. | Vercel workflow and cron specs remain drafts. Preview metadata confirms docs branch deployment only. | Keep workflow implementation packet ready for later preview branch work. | Do not mutate env vars, add production cron, or promote production deployments without explicit approval. |

## Source Of Truth Map

| Domain | Canonical Draft Source | Mirror / Archive | Runtime Target |
| --- | --- | --- | --- |
| Master package | Drive package folder and local ZIP | GitHub `PACKAGE_MANIFEST.json` | None until implementation approval |
| Supabase schema | GitHub `SUPABASE_SCHEMA_DRAFT.md` and `supabase/20260617_xps_flooring_os_schema_draft.sql` | Drive `06_SUPABASE_BUILD_DOCS/01_SUPABASE_SCHEMA_MASTER.md` | Future Supabase sandbox branch |
| Vercel workflows | GitHub `VERCEL_WORKFLOW_DRAFT.md` and `vercel/vercel.crons.draft.json` | Drive `07_VERCEL_WORKFLOW_AND_CRONS/01_VERCEL_WORKFLOW_ARCHITECTURE.md` | Future preview workflow branch |
| Approval gates | GitHub `APPROVAL_GATES.md` | Drive operator and receipt folders | Required before production mutation |
| Frontend implementation | Active frontend agent branch/workspace, not modified here | Drive frontend docs are reference only | Vercel preview branch after frontend agent handoff |

## Supabase Gap Check

Draft XPS schema contains 44 public table names across tenant, people, lead/quote, project, approvals, operations, revenue, and retention groups.

Read-only inspection of the current Supabase production project found only these draft-name overlaps:

- `customers`
- `leads`

No draft storage buckets were found from the required bucket list:

- `tenant-assets`
- `brand-assets`
- `floor-visualizer-inputs`
- `floor-visualizer-results`
- `lead-uploads`
- `inspiration-uploads`
- `project-photos`
- `damage-photos`
- `signed-documents`
- `contracts`
- `warranties`
- `maintenance-guides`
- `receipts`
- `review-assets`
- `referral-assets`
- `bridge-receipts`

This means the XPS Supabase package is not production-applied. The next safe database step is a Supabase sandbox branch only, followed by RLS/advisor validation.

## Frontend Agent Guardrails

- Frontend agent may use Drive and GitHub docs as reference specs.
- Frontend agent should not assume Supabase tables, buckets, workflows, or cron routes exist yet.
- Frontend code should use mocks, feature flags, adapter interfaces, or disabled integration states until the Supabase sandbox branch is approved and validated.
- Backend/workflow implementation should wait for the frontend agent's handoff branch or a clearly named backend/sandbox branch to avoid merge collisions.

## Gated Actions

These remain blocked until explicit approval:

- GitHub `main` changes or branch merges
- Frontend file edits from this alignment lane
- Supabase migration execution
- Supabase storage bucket creation
- Supabase Edge Function deployment
- Vercel production deploys or promotions
- Vercel production cron launches
- Vercel environment variable mutation
- Drive sharing-permission changes
- Real Twilio SMS or customer messaging
- Contracts, payments, invoices, or customer-facing financial flows

## Recommended Next Phase

1. Let the frontend agent finish its active branch and produce a handoff summary.
2. Approve one backend lane:
   - `A`: GitHub docs-to-code branch-safe implementation packet only.
   - `B`: Supabase sandbox branch creation and dry migration validation.
   - `C`: Vercel workflow implementation on a preview branch with cron disabled or test-gated.
3. Reconcile frontend route/API assumptions against the Supabase draft before any live backend mutation.
4. Run preview validation and RLS/advisor checks before production approval.
