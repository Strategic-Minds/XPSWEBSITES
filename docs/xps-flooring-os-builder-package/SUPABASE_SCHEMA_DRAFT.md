# XPS Flooring OS Supabase Schema Draft

Status: DRAFT ONLY. SQL not executed.

## Target When Approved

- Project: `Strategic Minds Advisory`
- Project ref: `prhppuuwcnmfdhwsagug`
- Region: `us-east-2`
- Postgres: `17.6.1`

## Required Table Groups

Tenant:
- `tenants`
- `tenant_domains`
- `tenant_branding`
- `tenant_settings`

People:
- `profiles`
- `customers`
- `installers`
- `admins`
- `roles`

Lead / Quote:
- `leads`
- `lead_uploads`
- `visualizer_results`
- `favorite_floor_images`
- `quote_requests`
- `quotes`
- `quote_line_items`

Project:
- `projects`
- `project_stages`
- `project_status_events`
- `project_photos`
- `prep_checklists`
- `install_windows`
- `installer_assignments`

Approvals:
- `contracts`
- `signatures`
- `color_approvals`
- `change_orders`
- `final_signoffs`
- `punch_list_items`

Operations:
- `messages`
- `sms_messages`
- `notification_events`
- `ai_assistant_logs`
- `event_log`
- `audit_log`

Revenue:
- `payments`
- `payment_events`
- `invoices`
- `receipts`

Retention:
- `warranties`
- `maintenance_guides`
- `reviews`
- `referrals`
- `rewards`

## Storage Buckets

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

## Security Baseline

- RLS enabled on every public table.
- No service role key in frontend.
- No secrets in Drive.
- No secrets in Git.
- Customer sees only own projects.
- Installer sees only assigned jobs.
- Tenant admin sees own tenant.
- Super admin sees all tenants.

## Execution Gate

Do not apply this schema until a Supabase branch/sandbox target, rollback path, RLS review, advisors, and explicit approval are complete.
