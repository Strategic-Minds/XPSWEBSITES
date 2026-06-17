# Pixel-Perfect Frontend Automation Packet

Generated: 2026-06-17
Branch: `auto-builder/enterprise-floor-visualizer`
Repo: `Strategic-Minds/XPSWEBSITES`
Target: Phoenix Epoxy Pros / XPS Enterprise Visualizer PWA and desktop system

## Current Status

The uploaded mockups are now the locked frontend source truth for the next frontend automation pass. They are not moodboards. They are pixel-target acceptance targets for desktop and PWA/mobile implementation.

Live preview verification from the current enterprise deployment shows:

- `/` exists and partially overlaps the public quote/landing concept, but it is not yet pixel-matched to the uploaded quote landing mockup.
- `/visualizer` exists, but it is a dark enterprise shell and does not match the uploaded light-mode Floor Design Center mockup.
- `/customer-portal` exists, but it is a placeholder and does not match the uploaded customer dashboard or project-detail mockups.
- Installer PWA, project-detail, quote-center, and command-center screens are not verified as implemented routes.

## Source Truth

### Uploaded Mockup Baselines

Baseline folder: https://drive.google.com/drive/folders/1RlIkclW2H8Cm1q-cpc26HGQ1XkTnujES

| ID | Uploaded source | Durable baseline | Required screen |
| --- | --- | --- | --- |
| M01 | `01-ChatGPT-Image-Jun-17-2026-02_46_10-AM-3-1-.png` | https://drive.google.com/file/d/1jSPQkDWKC0QEGHbRcYy6Mzywats-F_Eq/view?usp=drivesdk | Floor Design Center desktop and mobile |
| M02 | `02-ChatGPT-Image-Jun-17-2026-02_46_10-AM-4-1-.png` | https://drive.google.com/file/d/1LdpQnLGCfkp6Cf7EqMDhnYKJlIbxzAHE/view?usp=drivesdk | Customer Dashboard desktop and mobile |
| M03 | `03-ChatGPT-Image-Jun-17-2026-02_46_11-AM-5-1-.png` | https://drive.google.com/file/d/145qhM_-ZX2X5tiuud2rX0wC7P0xLiVbZ/view?usp=drivesdk | Customer Project Detail desktop and mobile |
| M04 | `04-ChatGPT-Image-Jun-17-2026-02_46_11-AM-6-1-.png` | https://drive.google.com/file/d/1dJHhlFHKISMcT8QCbF4X3lK1CefBrM8Z/view?usp=drivesdk | Installer PWA / Job Tracker and desktop command center |
| M05 | `05-ChatGPT-Image-Jun-17-2026-02_46_10-AM-1-1-.png` | https://drive.google.com/file/d/1IWN4yr8BI1Iik35xqugF3zd8LH7Vp_yj/view?usp=drivesdk | Public quote landing desktop and mobile |
| M06 | `06-ChatGPT-Image-Jun-17-2026-02_46_10-AM-2-1-.png` | https://drive.google.com/file/d/1U8tZoGw7HS2M4PquQ5Q7e0ke0FuLjTFN/view?usp=drivesdk | Project Design and Quote Center desktop and mobile |

All uploaded mockups are 1491 x 1055 PNGs and include both desktop and phone layouts in the same reference image.

## System Boundary

### Frontend Must Build

- Public quote landing experience.
- Floor Design Center experience.
- Project Design and Quote Center workflow.
- Customer dashboard.
- Customer project-detail tracking screen.
- Installer PWA / job tracker.
- Desktop operations command center shell.
- Shared Phoenix/XPS design system tokens.
- Light-mode primary UI with black/gold brand header and high-contrast CTA behavior.
- Mobile/PWA bottom navigation and install-friendly layout behavior.

### Backend Must Support Without Going Live

- Mock/demo data adapters for all screens.
- Feature-flagged API contracts for leads, projects, documents, photos, quote attachments, messages, schedule, warranty, and installer job updates.
- CRM sync adapter pointed to the approved Google Sheet only when write credentials are approved.
- Storage adapter disabled until preview/quote file storage is approved.
- Browser-worker validation route and evidence receipt schema.

## Route Map

| Screen | Required route | Current state | Implementation rule |
| --- | --- | --- | --- |
| Public quote landing | `/` plus optional `/quote` alias | `/` exists but is not pixel-matched | Rebuild homepage sections to match M05 without breaking existing lead form behavior. |
| Floor Design Center | `/design` and/or `/floor-design-center`; `/visualizer` can deep-link to interactive visualizer | `/visualizer` exists but dark shell | Implement M01 as the discovery/catalog layer; interactive visualizer opens from product cards. |
| Project Design and Quote Center | `/quote/design` or `/project-design-quote` | Not verified | Implement M06 upload + stepper + summary + consent flow. |
| Customer Dashboard | `/customer-portal/dashboard` and `/customer-portal` redirect | `/customer-portal` placeholder | Replace placeholder with M02 dashboard shell using mock project data. |
| Customer Project Detail | `/customer-portal/projects/[projectId]` | Not verified | Implement M03 with project progress, install details, photos, docs, payment, color approval. |
| Installer PWA | `/installer` and `/installer/jobs/[jobId]` | Not verified | Implement M04 mobile-first job tracker, checklists, signatures, offline-first PWA surface. |
| Operations Command Center | `/ops` or `/admin/command-center` behind locked access | Not verified | Implement M04 desktop command center shell with demo data only until auth is approved. |

## Visual System Contract

### Brand And Layout

- Primary mode: light UI.
- Header: black, full width, gold CTA, Phoenix logo left, compact high-contrast navigation.
- Accent: Phoenix gold/yellow for CTA, progress, selected tabs, active step markers, and icon highlights.
- Cards: white background, subtle borders, soft shadows, radius 8px or less.
- Avoid nested cards except repeated item lists and true panels.
- Desktop width: dense dashboard layouts with 3-column card grids where shown.
- Mobile width: phone-first stacked panels, sticky/bottom navigation, no overlapping text, no clipped cards.
- Typography: bold condensed headline treatment; body text compact, readable, and aligned to the mockups. Do not use negative letter spacing.
- Icons: use lucide or existing icon library; do not hand-roll large decorative SVGs except logo assets.

### Required Screens

#### M05 Public Quote Landing

- Black header with Phoenix logo, navigation, call, and Get Quote CTA.
- Hero with large left headline, garage floor imagery, quote form card, upload current/favorite floor controls, Start My Quote CTA, and Launch Floor Visualizer secondary CTA.
- Trust-strip items: reviews, digital quotes, e-sign contracts, project tracking, warranty.
- Before/after slider block.
- Service cards for garage, commercial, patio/outdoor, and floor repair.
- Project portal summary strip.
- Mobile: hero image first, CTA stack, compact quote form, before/after preview.

#### M01 Floor Design Center

- Left desktop filter rail with system categories, space filters, color family, finish, clear filters.
- Hero/catalog intro with garage image and featured design card.
- Product rows for flake systems, metallic epoxy, glitter floors, and later concrete stain/polished concrete/custom blends.
- Product cards include image, title, short copy, Save, Visualizer, Use for Quote.
- Mobile: header, hero, featured card, horizontal category/product card flow, bottom nav.

#### M06 Project Design And Quote Center

- Six-step quote progress bar: floor photos, inspiration, details, system, contact/SMS consent, submit.
- Upload current floor photos and inspiration upload areas with thumbnails.
- Project details card, desired floor system selection, contact/SMS consent card.
- Right project summary rail on desktop; progress summary on mobile.
- Secure/no obligation/12-hour review reassurance.
- Mobile: progressive wizard presentation; step 1 upload first, next button, progress percent.

#### M02 Customer Dashboard

- Authenticated dashboard header with dashboard, project, documents, photos, schedule, warranty, messages, support.
- Welcome card with image wedge and View My Project CTA.
- Current project status timeline.
- Next action card.
- Project overview, selected design, installer, quote/contract status, prep checklist, dates, messages, quick links, support CTA.
- Mobile: stacked cards and bottom navigation.

#### M03 Customer Project Detail

- Project title/status/address metadata.
- Left progress checklist with 15 steps and active highlighted step.
- Install details, SMS updates, crew leader, daily progress photos, documents, change order, color approval, payment status, project summary, help/support.
- Mobile: progress first, View Full Project Details CTA, install details below.

#### M04 Installer PWA And Command Center

- Mobile-first installer job list, job overview, arrival check-in, damage capture, change order, color approval, daily progress update, final walkthrough.
- Required offline-first interaction model: all forms can save locally and sync when online.
- Required capture types: photos, checklists, signatures, timestamps, customer approval states.
- Desktop command center: jobs dashboard, sidebar nav, top stats, job overview list.

## Frontend Plan

1. Build a shared `PhoenixAppShell` with desktop header and mobile top/bottom navigation variants.
2. Build a shared `PhoenixCard`, `PhoenixButton`, `StatusBadge`, `ProgressStepper`, `PhotoStrip`, `UploadDropzone`, and `SignatureBox` component library.
3. Build static/demo data fixtures first so screens render pixel-complete without live Supabase/CRM.
4. Implement each mockup as a route with matching responsive behavior.
5. Attach existing lead form behavior only where already safe; keep persistence off for quote attachments until storage is approved.
6. Replace placeholder `/customer-portal` with the real dashboard shell.
7. Keep `/visualizer` as the interactive visualizer and connect it from the Floor Design Center product cards.
8. Keep admin/ops routes locked or demo-only until auth is approved.

## Backend Plan

- `app/lib/demo-data/*`: deterministic mock data for projects, installers, jobs, documents, colors, messages, timelines.
- `app/lib/feature-flags.ts`: central frontend/backend flag reading.
- `app/api/leads`: existing lead behavior preserved.
- `app/api/visualizer/quote-attachment`: remains disabled until storage target and consent are approved.
- `app/api/installer/sync`: scaffold only; no live writes until database/storage approved.
- `app/api/customer-portal/status`: scaffold only; can return mock/demo status.
- `app/api/enterprise/status`: must report mockup implementation and validation readiness.

## Repo And File Map

Preferred implementation files:

- `app/page.tsx`
- `app/visualizer/page.tsx`
- `app/design/page.tsx`
- `app/floor-design-center/page.tsx`
- `app/quote/design/page.tsx`
- `app/customer-portal/page.tsx`
- `app/customer-portal/dashboard/page.tsx`
- `app/customer-portal/projects/[projectId]/page.tsx`
- `app/installer/page.tsx`
- `app/installer/jobs/[jobId]/page.tsx`
- `app/ops/page.tsx`
- `app/components/phoenix/*`
- `app/components/visualizer/*`
- `app/lib/demo-data/*`
- `app/lib/enterprise-system.ts`
- `app/globals.css` or existing global stylesheet only if needed and scoped safely.

Avoid unrelated refactors and avoid touching production secrets, database schema, storage buckets, billing, or live messaging code in the frontend lane.

## Tool And Integration Plan

### Frontend Creation Agent

Creates the route/component implementation on a branch-safe preview lane. Owns only frontend/demo-data files unless a backend scaffold is explicitly required.

### Visualizer UX QA Agent

Checks upload, filters, cards, visualizer links, quote CTA continuity, responsive behavior, and Torginol-level simplicity.

### Torginol Benchmark Scoring Agent

Scores ease of entry, visual catalog browsing, saved selections, project/blend workflow, contact CTA clarity, and visualizer-to-quote handoff.

### Mobile Visual Regression Agent

Runs screenshots at 390x844 and 430x932 for every mockup route.

### Auto-Fix UI Agent

May produce branch-safe frontend patches for spacing, overflow, missing states, failed screenshot diffs, broken routes, and simple component regressions.

### Auto Validate / Auto Fix / Auto Heal / Auto Harden System

Runs every 5 minutes in dry-run/status mode until approved for write actions. It may:

- Detect route failures.
- Detect screenshot diff failures.
- Detect mobile overflow/clipping.
- Detect missing PWA metadata.
- Detect feature flag drift.
- Detect env readiness failures.
- Create issue/receipt/patch plans.
- Prepare branch-safe fixes.

It must not:

- Promote production.
- Merge to main.
- Mutate Vercel env.
- Execute paid AI loops without budget policy.
- Persist customer photos.
- Send email/SMS/calls/social posts.
- Apply database migrations.
- Create storage buckets.

## Validation Plan

### Screenshot Viewports

- Desktop baseline viewport: 1491x1055.
- Desktop operational viewport: 1440x1200.
- Mobile iPhone-style viewport: 390x844.
- Mobile large viewport: 430x932.

### Visual Acceptance

The goal is pixel-for-pixel match. Practical automated pass criteria:

- 0 critical layout mismatches.
- 0 overlapping or clipped text.
- 0 broken/missing required cards.
- 0 missing primary CTAs.
- 0 missing mobile bottom nav where shown.
- 0 horizontal overflow on mobile.
- Visual diff target: less than or equal to 1 percent changed pixels after normalizing dynamic images, font antialiasing, and browser chrome.
- Any deviation greater than 8px in spacing/alignment for primary sections requires auto-fix or a named exception.

### Functional Acceptance

- Quote form renders and can validate fields in preview.
- Upload dropzones accept image fixtures but do not persist customer images unless storage is approved.
- Product cards can save/select locally.
- Visualizer CTA opens `/visualizer` with selected design context.
- Project dashboard and project detail render from deterministic mock data.
- Installer PWA screens work offline with local demo state.
- PWA manifest exists and icons/theme are consistent with light-mode primary behavior.
- Browser-worker evidence includes screenshots, route status, console errors, and blocker notes.

## Required Docs And Playbooks

- This packet.
- `11-automation-validation-healing-system.md`.
- `12-env-and-integration-contract.md`.
- `15-blocker-fix-and-automation-matrix.md`.
- Browser-worker E2E receipt for each preview run.
- Production approval checklist before any production promotion.

## Blockers Or Missing Pieces

- Current `/customer-portal` is a placeholder.
- Current `/visualizer` is not the uploaded light-mode Floor Design Center.
- Installer PWA routes are not verified.
- Project Design and Quote Center route is not verified.
- Browser-worker execution remains gated by env.
- Pixel-diff tooling and baseline pull logic are not verified in repo.
- Storage for real customer previews/quote attachments remains unapproved.
- Supabase/CRM live writes remain unapproved.
- Auth/permissions for customer/admin/installer roles are not finalized.

## Next Best Prompt

Implement the pixel-perfect frontend lane on `auto-builder/enterprise-floor-visualizer` using `docs/visualizer-enterprise/14-pixel-perfect-frontend-automation-packet.md` as source truth. Build the six mockup screens with deterministic demo data, preserve existing lead behavior, keep storage/CRM/live messaging disabled, run desktop/mobile screenshot validation against the Drive baselines, and return a blocker/fix receipt.