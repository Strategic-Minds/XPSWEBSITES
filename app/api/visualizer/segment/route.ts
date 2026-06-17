export const dynamic = "force-dynamic";

type SegmentResponse = {
  ok: boolean;
  enabled: boolean;
  mode: "disabled" | "manual_fallback" | "suggested_polygon";
  confidence: number;
  polygon: { x: number; y: number }[];
  message: string;
};

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const defaultMaxBytes = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const enabled = process.env.VISUALIZER_AI_ENABLED === "true" || process.env.NEXT_PUBLIC_VISUALIZER_AI_SEGMENTATION_ENABLED === "true";

  if (!enabled) {
    return Response.json(segmentFallback("AI segmentation is disabled. Use manual masking."));
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return Response.json(segmentFallback("AI segmentation expects multipart image upload."), { status: 400 });
  }

  const form = await request.formData();
  const file = form.get("image");

  if (!(file instanceof File)) {
    return Response.json(segmentFallback("No image was provided."), { status: 400 });
  }

  const maxBytes = Number(process.env.VISUALIZER_AI_MAX_BYTES ?? defaultMaxBytes);
  if (!acceptedTypes.has(file.type)) {
    return Response.json(segmentFallback("Unsupported image type."), { status: 415 });
  }

  if (file.size > maxBytes) {
    return Response.json(segmentFallback("Image is too large for AI segmentation."), { status: 413 });
  }

  // Enterprise placeholder: provider integration is intentionally approval-gated.
  // The client still has a local heuristic assist and manual fallback.
  const response: SegmentResponse = {
    ok: true,
    enabled: true,
    mode: "suggested_polygon",
    confidence: 0.42,
    polygon: [
      { x: 0.18, y: 0.56 },
      { x: 0.82, y: 0.56 },
      { x: 0.96, y: 0.94 },
      { x: 0.04, y: 0.94 }
    ],
    message: "Provider not configured yet. Returned a conservative editable floor-plane suggestion."
  };

  return Response.json(response);
}

function segmentFallback(message: string): SegmentResponse {
  return {
    ok: true,
    enabled: false,
    mode: "manual_fallback",
    confidence: 0,
    polygon: [],
    message
  };
}
