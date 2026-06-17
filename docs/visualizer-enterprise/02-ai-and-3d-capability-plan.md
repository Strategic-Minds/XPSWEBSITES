# AI And 3D Capability Plan

## Goal

Build an XPS visualizer that can compete with or exceed the public Torginol/FloorWIZ benchmark by combining reliable manual masking, AI-assisted floor detection, believable material rendering, optional 3D scenes, and quote-ready export.

## Non-Negotiable Principle

Manual masking is always available. AI improves speed and quality, but the visualizer must still work if AI is disabled, rate limited, unavailable, or wrong.

## AI Capabilities

### 1. AI Floor Segmentation

- Route: `app/api/visualizer/segment/route.ts`
- Flag: `NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED=true`
- Input: JPEG, PNG, WebP only.
- Max upload size: 8 MB or lower.
- Output: mask polygon or raster mask, confidence, fallback reason.
- No original image persistence by default.

### 2. AI Mask Refinement

- User can accept, edit, or discard the AI result.
- Low-confidence output defaults back to manual mode.
- Manual edits become the final source of truth.

### 3. AI Perspective Assist

- Detect likely floor plane.
- Suggest a trapezoid/perspective outline.
- User confirms or edits before render.

### 4. AI Material Recommendation

Optional later phase:

- Ask user for garage, patio, commercial, interior, or showroom context.
- Recommend durable family and palette.
- Never replace installer consultation.

### 5. AI Quote Summary

Optional later phase:

- Summarize selected finish, exported preview, surface type, approximate dimensions if provided, and notes.
- Attach only after explicit user consent.

## 3D Capability Stack

### 2D First

- Canvas 2D compositing.
- Synthetic material textures.
- Luminance-preserving blend.
- Opacity/gloss/scale/angle controls.

### Perspective Next

- Editable floor plane.
- Texture transform by perspective plane.
- Shadow/highlight preservation.

### 3D Showroom Later

- Three.js renderer behind `NEXT_PUBLIC_VISUALIZER_3D_SCENES_ENABLED`.
- Garage, patio, commercial, and interior showroom scenes.
- Full-bleed or unframed scene, not decorative card preview.
- Playwright screenshot and canvas pixel checks required.

## Material Texture Recipes

Flake:

- Base tone plus irregular chip shapes from palette colors.
- Optional blend percentages and chip sizes.

Quartz:

- Dense fine aggregate speckle.
- Lower gloss by default.

Metallic:

- Soft flowing bands and pearlescent gradients.
- Higher wet-look/gloss response.

Concrete Stain/Dye:

- Translucent dye wash.
- Concrete mottling and subtle cloudy variation.
- Mark `INTERIOR ONLY` where appropriate from source chart.

Metallic Glitter:

- Sparkle particle overlay.
- Fine and Chunky options.
- Reflective highlight points layered over base finish.

## Privacy And Cost Controls

- No default upload.
- No customer photo storage without consent.
- No training on customer images.
- No image data in logs.
- Rate limits on AI route.
- Strict file size/type checks.
- Feature flags for every paid or sensitive capability.
- Clear privacy copy near uploader.

## Differentiation Over Benchmark

Potential XPS advantages:

- Phoenix Epoxy Pros quote handoff built directly into the visualizer.
- Concrete Stain/Dye and Metallic Glitter included as first-class families.
- Manual fallback built into the public promise.
- Validation receipts and 5-minute operational monitor.
- Feature-flagged release gates so sales can improve without risking homepage regressions.
