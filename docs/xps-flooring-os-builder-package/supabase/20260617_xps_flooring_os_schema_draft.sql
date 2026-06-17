-- XPS Flooring OS schema draft
-- DRAFT ONLY. DO NOT APPLY TO PRODUCTION WITHOUT EXPLICIT APPROVAL.
-- Target if approved: Strategic Minds Advisory (prhppuuwcnmfdhwsagug)
-- Required first: Supabase branch/sandbox target, backup/rollback plan, RLS review, advisors, validation queries.

create extension if not exists pgcrypto;

-- Tenant
-- tenants, tenant_domains, tenant_branding, tenant_settings

-- People
-- profiles, customers, installers, admins, roles

-- Lead / Quote
-- leads, lead_uploads, visualizer_results, favorite_floor_images, quote_requests, quotes, quote_line_items

-- Project
-- projects, project_stages, project_status_events, project_photos, prep_checklists, install_windows, installer_assignments

-- Approvals
-- contracts, signatures, color_approvals, change_orders, final_signoffs, punch_list_items

-- Operations
-- messages, sms_messages, notification_events, ai_assistant_logs, event_log, audit_log

-- Revenue
-- payments, payment_events, invoices, receipts

-- Retention
-- warranties, maintenance_guides, reviews, referrals, rewards

-- Baseline table template for approved implementation:
-- create table if not exists public.<table_name> (
--   id uuid primary key default gen_random_uuid(),
--   tenant_id uuid,
--   status text default 'draft',
--   metadata jsonb not null default '{}'::jsonb,
--   created_at timestamptz not null default now(),
--   updated_at timestamptz not null default now()
-- );
-- alter table public.<table_name> enable row level security;
-- create policy "<table_name>_service_role_all" on public.<table_name>
--   for all using (auth.role() = 'service_role')
--   with check (auth.role() = 'service_role');

-- Storage bucket draft list:
-- tenant-assets
-- brand-assets
-- floor-visualizer-inputs
-- floor-visualizer-results
-- lead-uploads
-- inspiration-uploads
-- project-photos
-- damage-photos
-- signed-documents
-- contracts
-- warranties
-- maintenance-guides
-- receipts
-- review-assets
-- referral-assets
-- bridge-receipts

-- Core event names:
-- lead.created
-- visualizer.saved
-- upload.created
-- quote.requested
-- quote.ready
-- contract.sent
-- contract.signed
-- install.window.requested
-- install.confirmed
-- prep.checklist.completed
-- installer.en_route
-- installer.arrived
-- walkthrough.completed
-- damage.photos_uploaded
-- change_order.created
-- change_order.signed
-- color_approval.required
-- color_approval.signed
-- daily_update.posted
-- project.delayed
-- final_walkthrough.ready
-- final_signoff.signed
-- payment.requested
-- warranty.issued
-- review.requested
-- referral.created
