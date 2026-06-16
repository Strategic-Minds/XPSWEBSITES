# XPSWEBSITES

Autonomous website factory starter for Xtreme Polishing Systems connected local market sites.

The first location is Phoenix Epoxy Pros. The repo is scaffolded from the Nashville Resin Worx reference pattern and split into:

- `apps/phoenix-epoxy-pros-site`: public funnel website PWA
- `apps/phoenix-job-ops-app`: separate customer/company job operations PWA
- `packages/factory-config`: reusable location, brand, asset, and owner-input configuration
- `packages/backend-template`: backend records, estimating, timeline, and receipt template logic
- `factory`: Auto Builder packets, manifests, location configs, and readiness checklists
- `docs`: builder, branding, backend, and owner handoff documentation

## Current Default Inputs

- Business name: Phoenix Epoxy Pros
- Phone: 772-209-0266
- Email: JEREMY@SHOPXPS.COM
- Logo: placeholder
- Images: placeholder
- Reference repo: https://github.com/Strategic-Minds/NASHVILLERESINWORX
- Phoenix Drive packet: https://drive.google.com/drive/folders/1wdvro-T90CqXjcLtyACFXnlJ9vOqxuTk

## Auto Builder Handoff

Use this repo as the code source after switching the Auto Builder operating context to:

- repository: `Strategic-Minds/XPSWEBSITES`
- first location: `phoenix-epoxy-pros`
- website app path: `apps/phoenix-epoxy-pros-site`
- customer app path: `apps/phoenix-job-ops-app`
- Drive folder: `001_PHOENIX_EPOXY_PROS`
- validation checklist: `factory/checklists/pre-generation-readiness.md`

## Local Validation

```bash
npm run validate
```

This checks required factory files, PWA manifests, placeholder files, and app-level validation scripts without requiring live integrations.

Full production builds require dependencies and environment variables from `.env.example`.
