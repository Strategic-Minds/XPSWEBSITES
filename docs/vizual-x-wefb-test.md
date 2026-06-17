# Vizual-X xpswebsites-wefb Preview Test

## Purpose

This branch mirrors the Strategic-Minds/VIZUALIZER invention into XPSWEBSITES without replacing the current enterprise visualizer.

## Safe Preview Route

- App route: `/vizual-x`
- Style search API: `/api/vizual-x/style-search`
- Floor detection API: `/api/vizual-x/detect-floor`
- AI render API: `/api/vizual-x/render-floor`

The existing `/visualizer` route is intentionally untouched.

## Source Baseline

- Vercel project: `xpswebsites-wefb`
- Green production source branch: `auto-builder/enterprise-floor-visualizer`
- Green production source commit: `1cceb523aa48d0acd9575fafb540ee860afc2733`
- Test branch: `auto-builder/vizual-x-wefb-test-20260617`
- Source invention repo: `Strategic-Minds/VIZUALIZER`

## Environment Contract

The fallback preview works without OpenAI keys for upload, manual floor outline, fallback style cards, local texture preview, and PNG download.

Live AI functions require these Vercel environment variables in Preview before full validation:

```env
OPENAI_API_KEY=
OPENAI_VISION_MODEL=gpt-5.5
OPENAI_SEARCH_MODEL=gpt-5.5
OPENAI_IMAGE_MODEL=gpt-image-1.5
MAX_IMAGE_BYTES=12000000
```

Model names and image-edit payload compatibility must be verified against current official OpenAI docs before production promotion.

## Preview Validation Checklist

1. Open `/vizual-x` on the branch preview URL.
2. Confirm the production home page still renders normally.
3. Confirm `/visualizer` still renders the existing enterprise visualizer.
4. Upload JPG, PNG, and WEBP floor photos.
5. Tap points on the floor photo and confirm polygon masking works.
6. Click `Find 3 floor styles` with no OpenAI key and confirm fallback cards appear.
7. Click `Outline floor` with no OpenAI key and confirm conservative fallback detection appears.
8. Click `Download preview` and confirm a PNG downloads.
9. After Preview env vars are approved and configured, run style search, floor detection, and render with a real customer-style sample photo.
10. Confirm generated images are labeled and treated as visual approximations, not installation guarantees.

## Gates

Do not promote this branch to production, change production aliases, relink Vercel projects, add production env vars, or wire quote/CRM automation until preview validation passes and the operator approves the next gate.
