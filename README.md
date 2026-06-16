# XPSWEBSITES

Autonomous website factory starter for Xtreme Polishing Systems connected local market sites.

The first location is Phoenix Epoxy Pros. The scaffold is based on the Nashville Resin Worx reference pattern and is packaged for Auto Builder ingestion.

## Current Default Inputs

- Business name: Phoenix Epoxy Pros
- Phone: 772-209-0266
- Email: JEREMY@SHOPXPS.COM
- Logo: placeholder
- Images: placeholder
- Reference repo: https://github.com/Strategic-Minds/NASHVILLERESINWORX
- Phoenix Drive packet: https://drive.google.com/drive/folders/1wdvro-T90CqXjcLtyACFXnlJ9vOqxuTk
- Readiness checklist: https://docs.google.com/spreadsheets/d/1WbzhWAbXYBXXBlqn7GsgKcfkPvl0gHcbwSt3VyOHiK4
- Full scaffold package: https://drive.google.com/file/d/1hWYcvKMk4NRJiMfpOLZzRmtJ4w9hsz4F/view?usp=drivesdk

## Scaffold Contents

The full scaffold package contains:

- `apps/phoenix-epoxy-pros-site`: public funnel website PWA
- `apps/phoenix-job-ops-app`: separate customer/company job operations PWA
- `packages/factory-config`: reusable location, brand, asset, and owner-input configuration
- `packages/backend-template`: backend records, estimating, timeline, and receipt template logic
- `factory`: Auto Builder packets, manifests, location configs, and readiness checklists
- `docs`: builder, branding, backend, and owner handoff documentation

## Auto Builder Handoff

Use this repo as the control repo and ingest the scaffold package after switching Auto Builder to:

- repository: `Strategic-Minds/XPSWEBSITES`
- first location: `phoenix-epoxy-pros`
- website app path: `apps/phoenix-epoxy-pros-site`
- customer app path: `apps/phoenix-job-ops-app`
- Drive folder: `001_PHOENIX_EPOXY_PROS`
- validation checklist: `factory/checklists/pre-generation-readiness.md`

## Local Validation After Materialization

```bash
npm run validate
```

This checks required factory files, PWA manifests, placeholder files, and app-level validation scripts without requiring live integrations.

Full production builds require dependencies and environment variables from `.env.example`.
