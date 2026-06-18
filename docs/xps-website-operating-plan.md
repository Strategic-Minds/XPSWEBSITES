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
4. The proposal is sent by email with warranty information and the payment-link path.
5. After payment, the customer receives temporary job tracker access.
6. The long-term portal target is email-first access, preferably Supabase magic link/OTP, so customers do not need to remember a username and password.

## Verified Source Truth

The connected Drive folder `XPS WEBSITES` is already organized as the operating source of truth. Key inspected source assets:

- `XPS Website Factory Master Strategy Pack.pdf`
- `XPS Customer Job Operations App Blueprint.pdf`
- `16_XPS_FLOORING_OS_DOCUMENT_BUILDER_PACKAGE/IMPLEMENTATION_PACKET.md`
- `16_XPS_FLOORING_OS_DOCUMENT_BUILDER_PACKAGE/VALIDATION_STATUS.md`

The current website branch already contains:

- Home page with branded hero, quote-start form, services, process, color charts, job tracker promo, and 15% estimator section.
- `/digital-estimator` professional Digital Bid page with address, measurements, existing floor, concrete condition, finish/color logic, multiple attachment upload, and proposal workflow metadata.
- `/customer-portal` temporary no-password intake that redirects to `/digital-estimator` with prefilled customer details.
- `/job-tracker` temporary tracker preview for proposal/payment/tracker/warranty flow.
- `/api/leads` route that can store uploads in Supabase Storage, persist lead payloads to `public.leads`, and notify the owner by email when the needed environment variables are configured.

## Customer Workflow

### 1. Entry

Customers should not have to understand the backend. Every entry point should feel like a simple estimate path:

- Hero quote form: collect name, email, phone, ZIP, and project type, then prefill the Digital Bid page.
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
- Project notes
- Multiple images/PDFs
- Optional inspiration photos from the XPS site or anywhere online

The promise shown to the customer is: 15% Digital Estimator coupon, estimate within 24 hours by email, warranty information, proposal path, and job tracker access after payment.

### 3. Review And Proposal

The MVP workflow remains human-reviewed:

- The website receives the submission.
- Attachments are stored when Supabase service credentials are configured.
- A lead row is inserted into `public.leads` when Supabase service credentials are configured.
- An email notification is sent to `jeremy@shopxps.com` when Resend credentials are configured.
- Jeremy reviews the package and sends the proposal by email.
- The customer receives a payment link after proposal approval.

### 4. Job Tracker

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

### Required Environment Variables

The lead API depends on these runtime values:

- `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_LEAD_BUCKET`
- `RESEND_API_KEY`
- `LEADS_FROM_EMAIL` or `RESEND_FROM_EMAIL`
- `XPS_ESTIMATE_RECIPIENT`, defaulting to `jeremy@shopxps.com`

Service-role credentials must stay server-only and must never be exposed through `NEXT_PUBLIC_` variables.

## Auth Plan

### Current Blocker

Supabase Auth password login is currently blocked by a live auth error:

`500: Database error querying schema`

The inspected auth log shows password token requests failing because Supabase Auth hits a `confirmation_token` scan error for the connected user row. The row for `strategicmindsadvisory@gmail.com` exists and is email-confirmed, but the `confirmation_token` value is null. Repairing auth data or auth schema is a production database action and must remain approval-gated.

### Temporary Model

Use no-password temporary entry for now:

- Collect full name, email, phone, and ZIP.
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
- Storage bucket permission changes
- Production Vercel promotion
- Payment processor activation
- SMS activation
- Customer messaging automation
- Cron/workflow production launch
- Domain or DNS changes

## Validation Checklist

Before production release:

- Home page loads and no floor visualizer route/link is visible.
- Hero form routes to `/digital-estimator` with prefilled name/email/phone/ZIP/project type.
- Homepage 15% estimator routes to the same Digital Bid page.
- `/customer-portal` temporary intake routes to the Digital Bid page.
- `/digital-estimator` accepts multiple uploads and all required fields.
- `/api/leads` returns success and verifies Supabase persistence/email notification when environment variables are configured.
- `/job-tracker` communicates the complete post-estimate workflow.
- Supabase Auth password failure is not exposed to customers.
- Email-link portal is implemented only after Supabase auth repair and redirect URL configuration.

## Next Implementation Phase

1. Verify Vercel environment variables for Supabase and Resend.
2. Run a controlled test lead submission with a small test image.
3. Confirm the notification reaches `jeremy@shopxps.com`.
4. Approve a Supabase auth repair plan.
5. Implement email magic-link portal access.
6. Add customer/job relationship tables only after the MVP lead/proposal/payment flow is proven.
7. Promote the validated preview to production after owner approval.
