export const dynamic = "force-dynamic";

type QuoteAttachmentRequest = {
  consent?: boolean;
  finishName?: string;
  finishFamily?: string;
  previewDataUrl?: string;
  imageName?: string;
};

export async function POST(request: Request) {
  const quoteUploadEnabled = process.env.VISUALIZER_QUOTE_UPLOAD_ENABLED === "true" || process.env.NEXT_PUBLIC_VISUALIZER_QUOTE_UPLOAD_ENABLED === "true";

  let payload: QuoteAttachmentRequest;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, status: "invalid_json" }, { status: 400 });
  }

  if (!payload.consent) {
    return Response.json({
      ok: false,
      status: "consent_required",
      message: "Preview upload requires explicit customer consent. Nothing was stored."
    }, { status: 403 });
  }

  if (!quoteUploadEnabled) {
    return Response.json({
      ok: true,
      status: "prepared_only",
      message: "Quote upload is disabled. The preview is prepared locally but was not stored.",
      quotePreview: {
        finishName: payload.finishName ?? null,
        finishFamily: payload.finishFamily ?? null,
        imageName: payload.imageName ?? null,
        hasPreviewData: Boolean(payload.previewDataUrl)
      }
    });
  }

  return Response.json({
    ok: false,
    status: "storage_not_configured",
    message: "Quote upload flag is enabled, but storage/CRM integration has not been approved or configured."
  }, { status: 501 });
}
