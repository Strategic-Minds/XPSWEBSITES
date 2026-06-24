# Validation, Governance, And Release Plan

## Required Validation Evidence

- `/visualizer` loads.
- Desktop screenshot.
- Mobile screenshot around 390px width.
- PWA manifest remains available.
- Upload accepts JPEG, PNG, WebP.
- Upload rejects unsupported files.
- Manual mask can be created.
- Undo, redo, clear, and restart work.
- Flake, Metallic, Quartz, Concrete Stain/Dye, and Metallic Glitter each have at least one selectable option.
- Canvas pixels change after finish selection.
- Export produces an image.
- Quote handoff prepares preview metadata without default storage.
- AI assist is disabled safely when not configured.
- Homepage remains visually unchanged.
- `npm run build` passes.

## Material Gates

Concrete Stain/Dye must include:

- Source chart acknowledgement.
- `INTERIOR ONLY` caveat where appropriate.
- Translucent dye/stain rendering style.

Metallic Glitter must include:

- Fine and Chunky availability note.
- Sparkle particle rendering.
- Finish-family selection separate from Metallic epoxy.

## AI Gates

AI segmentation must prove:

- Feature flag controls access.
- Unsupported file types are rejected.
- Large files are blocked or downscaled.
- No original photo persistence by default.
- Manual fallback remains available.
- Low-confidence output can be corrected or discarded.

## 3D Gates

3D must prove:

- Scene is nonblank.
- Scene is full-bleed or unframed, not a decorative preview card.
- Mobile and desktop screenshots are captured.
- Disabling the flag falls back to 2D without breaking export.

## Release Gates

Gate 1: Branch created.
Gate 2: Builder docs committed.
Gate 3: Enterprise route implemented behind flags.
Gate 4: Manual visualizer flow passes.
Gate 5: AI fallback proven.
Gate 6: Vercel cron route present.
Gate 7: Vercel Agent or equivalent validation review passes.
Gate 8: User approves standalone route.
Gate 9: User approves homepage embed.
Gate 10: User approves production promotion.

## Rollback

If visualizer route fails:

- Set `VISUALIZER_ENTERPRISE_ENABLED=false`.
- Route falls back to the existing `FinishVisualizer`.

If AI fails:

- Set `NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED=false`.
- Keep manual masking.

If 3D fails:

- Set `NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED=false`.
- Keep 2D canvas rendering.

If quote upload fails:

- Set `NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED=false`.
- Keep local export and manual quote preparation.

## Final Handoff Required

- Branch name.
- Preview URL.
- Files changed.
- Build/test results.
- Screenshots or Playwright evidence.
- Remaining blockers.
- Recommendation: ready to embed, needs revision, or needs advanced AI phase.
