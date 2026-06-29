# XPSWEBSITES

Autonomous website factory starter for Xtreme Polishing Systems connected market sites.

The active location brand is now National Epoxy Pros. This replaces the legacy Phoenix Epoxy Pros naming while keeping the same digital bid, visualizer, design center, production-readiness, lead-routing, and QA operating model.

## Current Default Inputs

- Business name: National Epoxy Pros
- Powered by: Xtreme Polishing Systems Supply, America's #1 Epoxy Super Store
- Phone: (877) 958-6408
- WhatsApp Business: 555-600-0743
- Support email: support@nationalepoxypros.com
- Digital bid leads: leads@nationalepoxypros.com
- Outbound sales: sales@nationalepoxypros.com
- Corporate address: 2200 NW 32nd St #700, Pompano Beach, FL 33069
- Service footprint: 70+ locations nationwide
- Visualizer: https://xtremepolishingsystems.com/pages/flake-visualizer
- Current Drive packet: https://drive.google.com/drive/folders/1WqWwuctqRBvWYLRPxP6aquTUIVicY5Je

## Production-Readiness Drive Artifacts

The Phoenix legacy folder remains the source for prior plans, canonical docs, visualizer rules, color charts, and automation strategy. New work should transform those patterns into National Epoxy Pros without copying protected third-party assets.

- Legacy plan and canonical docs: Phoenix Epoxy Pros - LAGACY
- National workspace: NATIONAL EPOXY PROS
- Approved canonical docs: APPROVED CANICAL DOCS
- Color charts: COLOR CHARTS
- Floor imagery: FLOOR IMAGES

## Scaffold Contents

The production-ready scaffold package is intended to contain:

- `app`: public National Epoxy Pros funnel website
- `app/components`: structured data and shared site components
- `packages/factory-config`: reusable location, brand, asset, and owner-input configuration
- `packages/backend-template`: backend records, estimating, timeline, and receipt template logic
- `supabase/migrations`: Supabase database schema with SMS consent/status lead fields
- `schemas`: automation receipt schema and event map
- `tests/e2e`: Playwright owner-preview tests
- `.github/workflows`: validation workflows
- `factory`: Auto Builder packets, manifests, location configs, and readiness checklists
- `docs`: builder, branding, backend, legal, receipt, and owner handoff documentation

## Lead Routing

- Digital bid forms should route to `leads@nationalepoxypros.com`.
- Customer support should route to `support@nationalepoxypros.com`.
- Outbound sales workflows should route to `sales@nationalepoxypros.com`.
- Phone CTAs should use `(877) 958-6408`.
- WhatsApp CTAs should use `555-600-0743`.

## Twilio SMS Setup

Set these variables in Vercel or the approved Auto Builder vault before production launch:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_MESSAGING_SERVICE_SID` or `TWILIO_FROM_PHONE_NUMBER`
- `TWILIO_OWNER_NOTIFY_TO`
- `TWILIO_ENABLE_CUSTOMER_SMS=true` after SMS consent language is approved
- `TWILIO_STATUS_CALLBACK_URL` if delivery callbacks are required

Do not store live Twilio credentials in Drive or Git.

## Auto Builder Handoff

Use this repo as the control repo and ingest the National Epoxy Pros package after switching Auto Builder to:

- repository: `Strategic-Minds/XPSWEBSITES`
- active brand: `national-epoxy-pros`
- website app path: `app`
- Drive folder: `NATIONAL EPOXY PROS`
- legacy source folder: `Phoenix Epoxy Pros - LAGACY`
- validation standard: browser-first visual QA, form routing checks, mobile and desktop pass, no legacy Phoenix public copy

## Local Validation After Materialization

```bash
npm run validate
```

This checks the Next.js build and enterprise autonomy checks when dependencies are available.

Full production builds require dependencies and environment variables from `.env.example`. Do not store live secrets in Drive or Git.
