import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RecolorPayload = {
  image?: string;
  chartId?: string;
  chartTitle?: string;
  option?: {
    name?: string;
    code?: string;
    palette?: string[];
  };
};

type OpenAIImageResponse = {
  data?: Array<{
    b64_json?: string;
    url?: string;
  }>;
  error?: {
    message?: string;
  };
};

function finishSource(chartId?: string) {
  switch (chartId) {
    case "flake":
      return "Xtreme Polishing Systems (XPS) and Torginol full-broadcast epoxy flake finish";
    case "metallic":
      return "Xtreme Polishing Systems (XPS) decorative metallic epoxy pigment finish";
    case "quartz":
      return "Xtreme Polishing Systems (XPS) quartz broadcast aggregate finish";
    case "solid":
      return "Xtreme Polishing Systems (XPS) solid color epoxy base coat";
    case "glitter":
      return "Xtreme Polishing Systems (XPS) glitter additive finish";
    case "stain":
      return "Ameripolish concrete dye and stain color direction distributed through XPS";
    default:
      return "XPS decorative concrete and epoxy floor finish";
  }
}

function buildPrompt(payload: RecolorPayload) {
  const optionName = payload.option?.name || "selected chart color";
  const optionCode = payload.option?.code ? ` (${payload.option.code})` : "";
  const chartTitle = payload.chartTitle || payload.chartId || "floor color chart";
  const palette = payload.option?.palette?.length ? payload.option.palette.join(", ") : "the selected chart palette";
  const source = finishSource(payload.chartId);

  return [
    `Edit the uploaded image as a floor coating preview for ${optionName}${optionCode} from ${chartTitle}.`,
    `Use ${source} as the product/color context and use these palette references: ${palette}.`,
    "Identify the floor surface in the image and change only that floor surface color and finish.",
    "Preserve the original floor geometry, seams, texture, cracks, reflections, lighting, shadows, camera angle, perspective, room layout, walls, objects, vehicles, cabinets, people, logos, and any text.",
    "Do not add objects, remove objects, change wall colors, change furniture, change shape, alter perspective, or stylize the photo.",
    "Keep the result photorealistic and proportional to the selected color chart sample."
  ].join(" ");
}

function parseDataUrl(image: string) {
  const match = image.match(/^data:(image\/(?:png|jpe?g|webp));base64,([a-z0-9+/=\s]+)$/i);

  if (!match) {
    throw new Error("Upload must be a PNG, JPG, JPEG, or WEBP data URL.");
  }

  return {
    mime: match[1].toLowerCase().replace("image/jpg", "image/jpeg"),
    base64: match[2].replace(/\s+/g, "")
  };
}

function fileNameForMime(mime: string) {
  if (mime === "image/webp") {
    return "floor-upload.webp";
  }

  if (mime === "image/jpeg") {
    return "floor-upload.jpg";
  }

  return "floor-upload.png";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RecolorPayload;

    if (!payload.image) {
      return NextResponse.json({ message: "Missing image upload." }, { status: 400 });
    }

    const prompt = buildPrompt(payload);

    if (process.env.VISUALIZER_AI_RECOLOR_ENABLED !== "true") {
      return NextResponse.json({
        mode: "prompt-ready",
        message: "AI recolor prompt is ready, but live image editing is disabled until VISUALIZER_AI_RECOLOR_ENABLED is approved.",
        prompt
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        mode: "prompt-ready",
        message: "AI recolor is enabled but OPENAI_API_KEY is not configured.",
        prompt
      }, { status: 501 });
    }

    const { mime, base64 } = parseDataUrl(payload.image);
    const imageBytes = Buffer.from(base64, "base64");

    if (imageBytes.byteLength > 50 * 1024 * 1024) {
      return NextResponse.json({ message: "Uploaded image is larger than the 50MB edit limit." }, { status: 413 });
    }

    const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
    const imageBlob = new Blob([Uint8Array.from(imageBytes)], { type: mime });
    const form = new FormData();
    form.append("model", model);
    form.append(model === "gpt-image-2" ? "image[]" : "image", imageBlob, fileNameForMime(mime));
    form.append("prompt", prompt);
    form.append("size", process.env.OPENAI_IMAGE_SIZE || "auto");

    if (process.env.OPENAI_IMAGE_QUALITY) {
      form.append("quality", process.env.OPENAI_IMAGE_QUALITY);
    }

    if (process.env.OPENAI_IMAGE_FORMAT) {
      form.append("output_format", process.env.OPENAI_IMAGE_FORMAT);
    }

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      body: form
    });

    const result = (await response.json()) as OpenAIImageResponse;

    if (!response.ok) {
      return NextResponse.json({
        mode: "ai-recolor",
        message: result.error?.message || "OpenAI image edit failed.",
        prompt
      }, { status: response.status });
    }

    const image = result.data?.[0]?.b64_json;
    const url = result.data?.[0]?.url;

    if (!image && !url) {
      return NextResponse.json({
        mode: "ai-recolor",
        message: "OpenAI image edit finished without returning an image.",
        prompt
      }, { status: 502 });
    }

    return NextResponse.json({
      mode: "ai-recolor",
      image,
      url,
      prompt
    });
  } catch (error) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unable to prepare floor recolor request."
    }, { status: 400 });
  }
}
