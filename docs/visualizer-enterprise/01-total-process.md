# Enterprise Floor Visualizer Total Process

## Phase 0: Governed Discovery

Inputs:

- Existing XPSWEBSITES branch and visualizer route.
- Existing finish chart work.
- User-provided Concrete Stain/Dye chart.
- User-provided Metallic Glitter chart.
- Public Torginol/FloorWIZ benchmark.
- Vercel project target.

Outputs:

- Enterprise route map.
- Finish-family data model.
- Feature-flag plan.
- Validation gates.

## Phase 1: Branch And Docs

1. Create `auto-builder/enterprise-floor-visualizer` from `auto-builder/phoenix-nextjs-site-20260616`.
2. Commit `docs/visualizer-enterprise/` into the branch.
3. Keep homepage and approved chart layout untouched.
4. Preserve existing chart hover/clear behavior.

## Phase 2: Enterprise 2D Visualizer

1. Replace `/visualizer` with feature-flagged Enterprise V1.
2. Let users upload local photos without default server upload.
3. Validate file type and size in-browser.
4. Downscale large images before canvas work.
5. Allow manual polygon floor mask.
6. Support undo, redo, clear, and restart.
7. Render finish texture inside mask only.
8. Use original photo luminance and opacity/gloss controls to preserve realism.
9. Export final preview image.

## Phase 3: Finish Library

Required families:

- Flake
- Metallic
- Quartz
- Concrete Stain/Dye
- Metallic Glitter

Each finish should define:

- Family
- Name
- Optional code
- Palette
- Texture recipe
- Availability notes

## Phase 4: AI Assist

AI segmentation is an enhancement, not the dependency. It must:

- Be disabled unless the feature flag is enabled.
- Have strict image type and size limits.
- Avoid module-scope SDK initialization.
- Avoid storing or logging raw customer image data.
- Fall back to manual masking every time.
- Return confidence and allow user correction.

## Phase 5: 3D And Perspective

Staged path:

1. 2D canvas compositing.
2. Perspective plane editing.
3. WebGL/Three.js showroom scenes.
4. Optional prebuilt garage, patio, commercial, and interior scenes.
5. Optional material close-up preview.

3D is not a blocker for the first enterprise branch landing; it is a gated enhancement.

## Phase 6: Quote Integration

1. User exports preview.
2. User clicks `Use With Quote`.
3. System prepares quote metadata and preview.
4. Original photo remains local unless user consents.
5. Consent-gated upload or CRM attachment is added only after storage/CRM approval.

## Phase 7: Vercel Workflow And 5-Minute Cron

Cron monitor:

- Route: `/api/cron/enterprise-visualizer-validation`
- Schedule: `*/5 * * * *`
- Authorization: `CRON_SECRET`
- Vercel cron runs against production and schedules are UTC.

Preview validation should also run through deployment checks, manual route invocation, GitHub checks, or Vercel Agent review because cron alone does not validate preview deployments.

## Phase 8: Vercel Agent Validation

Agent role:

- Review PR changes.
- Investigate failed preview validations.
- Check route behavior, privacy, accessibility, performance, and homepage non-regression.
- Produce evidence-backed readiness status.

Agent must not promote production, approve itself, mutate billing, train on customer images, or persist photos without consent.

## Phase 9: Release Gates

Gate A: Docs committed.
Gate B: Enterprise route behind flags.
Gate C: Manual upload/mask/render/export passes.
Gate D: Material family coverage passes.
Gate E: AI fallback proven.
Gate F: Cron route and workflow receipts pass.
Gate G: Vercel Agent review passes.
Gate H: User review approves homepage embed.
Gate I: Production promotion approved.

## Phase 10: Operation And Optimization

Track:

- Upload started.
- Mask completed.
- AI mask accepted/rejected.
- Finish selected.
- Export generated.
- Quote handoff clicked.
- Quote submitted.
- Runtime errors.
- Validation status.

Use the data to improve finish recommendations, quote conversion, and sales handoff quality.
