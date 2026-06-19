# XPS Website Operating Plan

Last updated: June 18, 2026
Project: `xpswebsites`
Repo: `Strategic-Minds/XPSWEBSITES`
Drive source folder: `XPS WEBSITES`
Connection account: `strategicmindsadvisory@gmail.com`

## Operating Intent

Keep the existing Phoenix Epoxy Pros/XPS website branding intact while refining the customer path into a complete, easy-to-use operating workflow:

1. Website visitor starts a Digital Bid from the hero, customer portal entry, or 15% Digital Estimator section.
2. The full Digital Bid System captures professional intake details and multiple image uploads.
3. The estimate package routes to `jeremy@shopxps.com` for human review.
4. The customer lands on a client dashboard that shows their selected finish, selected color, floor details, ASAP status, image count, coupon, and next workflow stage.
5. The proposal is sent by email with warranty information and the payment-link path.
6. After payment, the customer receives temporary job tracker access.
7. The long-term portal target is email-first access, preferably Supabase magic link/OTP, so customers do not need to remember a username and password.

## Verified Source Truth

The connected Drive folder `XPS WEBSITES` is already organized as the operating source of truth. Key inspected source assets:

- `XPS Website Factory Master Strategy Pack.pdf`
- `XPS Customer Job Operations App Blueprint.pdf`
- `16_XPS_FLOORING_OS_DOCUMENT_BUILDER_PACKAGE/IMPLEMENTATION_PACKET.md`
- `16_XPS_FLOORING_OS_DOCUMENT_BUILDER_PACKAGE/VALIDATION_STATUS.md`

The current website branch contains:

- Home page with branded hero, quote-start form, services, process, color charts, job tracker promo, and 15% estimator section.
- `/digital-estimator` professional Digital Bid page with address, measurements, existing floor, concrete condition, finish/color logic, image upload, ASAP service request, and proposal workflow metadata.
- `/client-dashboard` interactive client dashboard with finish/color card, coupon card, upload summary, delivery status, workflow tracker, client action checklist, and instant chat access.
- `/customer-portal` temporary no-password intake that redirects to `/digital-estimator` with prefilled customer details.
- `/job-tracker` temporary tracker preview for proposal/payment/tracker/warranty flow.
- `/api/leads` route that attempts owner email through Resend, attempts image storage in Supabase Storage, attempts lead persistence to `public.leads`, and no longer returns false success when neither email nor queueing succeeds.

## Customer Workflow

### 1. Entry

Customers should not have to understand the backend. Every entry point should feel like a simple estimate path:

- Hero quote form: collect name, email, phone, ZIP, project type, and optional ASAP request, then prefill the Digital Bid page.
- Homepage 15% estimator section: advertise the coupon and route to the same Digital Bid page.
- Temporary customer portal: collect the same basics and route to the same Digital Bid page without password friction.

### 2. Digital Bid System

The Digital Bid System should collect:

- Full name
- Address
- Email
- Phone number
- ZIP code
- Project type
- Floor measurements
- Existing floor: bare concrete, paint, laminate, tile, VCT, peeling epoxy, carpet
- Concrete condition: new, fair/some cracks, bad/cracks and holes
- Desired floor finish
- Desired color tied to desired finish, including natural options for polished/sealed concrete
- Preferred timeline
- ASAP service request and ASAP notes
- Project notes
- Multiple floor images and inspiration screenshots from the XPS site or anywhere online

The promise shown to the customer is: 15% Digital Estimator coupon, estimate within 24 hours by email, warranty information, proposal path, and job tracker access after payment.

Current Supabase bucket reality: `media-assets` allows `image/png`, `image/jpeg`, and `image/webp`, so the production form should only promise image upload until the bucket is explicitly expanded.

### 3. Client Dashboard

After submit, the client dashboard should show:

- Customer contact summary
- Submitted date/time
- Project type
- Address
- Floor measurements
- Existing floor covering
- Concrete condition
- Desired floor finish
- Desired color
- Preferred timeline
- ASAP status and notes
- Uploaded image count and image names available in the browser session
- 15% coupon status
- Delivery/queue status
- Interactive workflow steps:
  1. Digital Bid Submitted
  2. Estimator Review
  3. Proposal + Warranty Email
  4. Payment Link
  5. Job Tracker Access
- Client action checklist
- Instant chat access that carries project context with the message

### 4. Review And Proposal

The MVP workflow remains human-reviewed:

- The website receives the submission.
- Attachments are stored when Supabase Storage write access is available.
- A lead row is inserted into `public.leads` when Supabase write access is available.
- An email notification is sent to `jeremy@shopxps.com` when Resend credentials and a valid sender are configured.
- Jeremy reviews the package and sends the proposal by email.
- The customer receives warranty information and a payment link after proposal approval.
- After payment, the customer receives temporary job tracker access.

### 5. Job Tracker

The tracker should advertise and later deliver:

- Estimate received
- Estimator review
- Proposal emailed
- Payment confirmed
- Install scheduled
- Crew progress
- Final walkthrough
- Warranty and care records

In MVP, the tracker can be preview/temporary access. In the enterprise version, it should become role-based for customer, home office, estimator, crew leader, and owner.

## Backend And Data Plan

### Current Supabase Fit

The current `public.leads` table fits the current API because it supports:

- `source`
- `campaign`
- `status`
- `owner`
- `meta_json`

The `meta_json` payload is appropriate for the flexible estimator details until the workflow is ready for a stricter XPS schema.

### Current Supabase Findings

Read-only inspection verified:

- Supabase project `Strategic Minds Advisory` / `prhppuuwcnmfdhwsagug` is active.
- `public.leads` exists.
- `media-assets` exists.
- `media-assets` is private and currently allows PNG, JPG, and WEBP files.
- `public.leads` had no rows after prior test activity, confirming the previous implementation returned success without confirmed storage.
- `anon` has grants on `public.leads`, but RLS has no public insert policy.
- Existing policies allow authenticated SELECT and service-role management, but do not allow public website insert.

### Required Environment Variables

The lead API can use these runtime values:

- `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` for server-side private Supabase persistence and storage
- `SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for public-key fallback after RLS insert policy approval
- `SUPABASE_LEAD_BUCKET`, defaulting to `media-assets`
- `RESEND_API_KEY`
- `LEADS_FROM_EMAIL` or `RESEND_FROM_EMAIL`
- `XPS_ESTIMATE_RECIPIENT`, defaulting to `jeremy@shopxps.com`

Service-role credentials must stay server-only and must never be exposed through `NEXT_PUBLIC_` variables.

## Email Delivery Plan

The app should not tell customers the request was submitted unless at least one delivery path succeeds:

- Preferred path: Resend sends email to `jeremy@shopxps.com` with the estimate details and eligible image attachments.
- Queue fallback: Supabase stores the lead row and image paths for staff review.
- Failure path: if neither email nor Supabase queue succeeds, the UI should show a clear failure message with call/email fallback.

The current code now follows this contract. The remaining work is platform configuration and approval:

- Verify or add `RESEND_API_KEY` in Vercel.
- Verify `LEADS_FROM_EMAIL` uses a sender/domain Resend allows to send to `jeremy@shopxps.com`.
- Run a controlled test estimate after email configuration.

## Auth Plan

### Current Blocker

Supabase Auth password login is currently blocked by a live auth error:

`500: Database error querying schema`

The inspected auth log shows password token requests failing because Supabase Auth hits a `confirmation_token` scan error for the connected user row. The row for `strategicmindsadvisory@gmail.com` exists and is email-confirmed, but the `confirmation_token` value is null. Repairing auth data or auth schema is a production database action and must remain approval-gated.

### Temporary Model

Use no-password temporary entry for now:

- Collect full name, email, phone, ZIP, and optional ASAP request.
- Prefill the Digital Bid page.
- Route estimate/proposal/payment through email.
- Send temporary job tracker access after payment.

### Target Model

Move customers to email-first login after the auth blocker is repaired:

- Supabase passwordless magic link/OTP using `signInWithOtp`.
- Configure allowed Site URL and redirect URLs in Supabase.
- Store customer/job records against the verified email.
- Keep the portal simple: enter email, receive secure link, open tracker.

This follows current Supabase guidance that passwordless auth supports magic links and OTP, and that Next.js SSR auth should use the Supabase SSR/browser client pattern when sessions need to persist through cookies.

## Implementation Rules

Do not change the approved brand system unless owner-approved:

- Keep black/white/gold industrial visual identity.
- Keep Phoenix Epoxy Pros branding on the current pilot site.
- Keep the professional white Digital Bid form fields.
- Keep the color charts available directly on the home page.
- Keep the floor visualizer removed from the public site/system until explicitly reapproved.
- Keep the phone icon white.

## Approval Gates

These actions require explicit approval before production mutation:

- Supabase auth row/schema repair
- Supabase schema migrations
- Supabase RLS policy changes
- Storage bucket permission changes
- Vercel environment variable mutation
- Production Vercel promotion
- Payment processor activation
- SMS activation
- Customer messaging automation
- Cron/workflow production launch
- Domain or DNS changes

## Required Supabase Policy Approval

To make website submissions fully queueable through Supabase without relying only on a server service key, approve:

1. Insert-only RLS policy for `anon` on `public.leads`, scoped to XPS website lead sources and valid JSON payloads.
2. Insert-only storage policy for `anon` on `storage.objects`, scoped to `media-assets/xps-digital-estimator/*`.
3. Public read remains blocked.
4. Staff review remains through owner email, Supabase dashboard, or future admin portal.

## Validation Checklist

Before production release:

- Home page loads and no floor visualizer route/link is visible.
- Hero form routes to `/digital-estimator` with prefilled name/email/phone/ZIP/project type/ASAP request.
- Homepage 15% estimator routes to the same Digital Bid page.
- `/customer-portal` temporary intake routes to the Digital Bid page.
- `/digital-estimator` accepts image uploads and all required fields.
- `/api/leads` returns success only when email notification or Supabase queueing succeeds.
- `/client-dashboard` shows the submitted customer package, finish, color, measurement, condition, upload summary, ASAP status, coupon, and workflow steps.
- Instant chat opens from the dashboard and carries project context.
- `/job-tracker` communicates the complete post-estimate workflow.
- Supabase Auth password failure is not exposed to customers.
- Email-link portal is implemented only after Supabase auth repair and redirect URL configuration.

## Next Implementation Phase

1. Approve the Supabase insert-only intake policies or configure the server-side service key in Vercel.
2. Configure/verify Resend in Vercel with a sender that can deliver to `jeremy@shopxps.com`.
3. Run a controlled browser test with a small test image.
4. Confirm the lead appears in `public.leads` and the notification reaches `jeremy@shopxps.com`.
5. Approve a Supabase auth repair plan.
6. Implement email magic-link portal access.
7. Add customer/job relationship tables only after the MVP lead/proposal/payment flow is proven.
8. Promote the validated preview to production after owner approval.
