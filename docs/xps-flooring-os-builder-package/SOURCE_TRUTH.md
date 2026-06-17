# XPS Flooring OS Source Truth

## VERIFIED

- User requested implementation of the uploaded XPS Flooring OS plan into XPS website Drive, Git, Supabase, and Vercel workflow.
- Uploaded packet is explicitly phase-gated as PLAN/DOCS and says to stop before production mutation.
- Drive root `XPS WEBSITES` exists and contains existing numbered folders including visualizer, color charts, automation/Vercel workflow, CRM/payment/calendar integrations, QA receipts, content, templates, and location factory.
- New Drive package folder created: `16_XPS_FLOORING_OS_DOCUMENT_BUILDER_PACKAGE`.
- GitHub repo `Strategic-Minds/XPSWEBSITES` is accessible and public, with admin/maintain/push/triage permissions verified.
- Active Phoenix preview branch exists: `auto-builder/phoenix-nextjs-site-20260616`.
- Supabase project verified: `Strategic Minds Advisory`, ref `prhppuuwcnmfdhwsagug`, region `us-east-2`, Postgres `17.6.1`.
- Supabase Edge Function verified: `autobuilder-gpt-bridge`, JWT verification enabled.
- Vercel project verified: `xpswebsites`, project ID `prj_Pb24DYvWhwMzYLNKMaTkRzcxVGvt`.
- Existing Enterprise Floor Visualizer branch and Vercel preview were previously validated, but homepage embed and production promotion remain blocked.

## INFERRED

- XPS Flooring OS should become the governed operating layer for the public website, visualizer, quote center, customer portal, installer PWA, admin command center, AI assistant, SMS, event processing, validation agents, receipts, and city replication.
- Drive is the source-truth and approval system; GitHub is the executable/docs source; Supabase is data/auth/storage/events/logs; Vercel is preview/runtime/workflow/cron/agent validation.

## COULD NOT VERIFY

- Live Vercel environment variables.
- Final production Supabase schema readiness for the proposed XPS tables.
- SMS A2P/10DLC approval and marketing opt-in readiness.
- Payment processor, refund policy, contract legal copy, or warranty claims process.
- Full browser E2E for the broader Flooring OS because this branch is docs-only.

## BLOCKERS

- Do not execute production migrations, live cron, live SMS, payments, contracts, customer messages, or production deploys from this docs branch.

## WORKAROUNDS

- Keep SQL under docs/draft paths until approved.
- Use Vercel preview and validation agents before production.
- Use demo/sandbox SMS and placeholder payments until compliance and processor details are verified.

## NEXT ACTIONS

- Convert this package into a branch-safe code implementation packet only after explicit approval for the next phase.
