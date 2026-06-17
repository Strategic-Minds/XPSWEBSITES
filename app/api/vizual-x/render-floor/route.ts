import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_IMAGE_BYTES = 12_000_000;

function dataUrlBlob(dataUrl: string) {
  const match = /^data:(?<mime>[\w/+.-]+);base64,(?<data>.+)$/u.exec(dataUrl || "");
  if (!match?.groups) throw new Error("Expected a base64 data URL.");

  const buffer = Buffer.from(match.groups.data, "base64");
  return { mime: match.groups.mime, buffer, size: buffer.byteLength };
}

function bytes(buffer: Buffer) {
  return new Uint8Array(buffer);
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI rendering is not configured yet. Add OPENAI_API_KEY in Vercel." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const image = dataUrlBlob(body.imageDataUrl);
    const mask = dataUrlBlob(body.maskDataUrl);

    if (
      image.size > Number(process.env.MAX_IMAGE_BYTES || MAX_IMAGE_BYTES) ||
      mask.size > Number(process.env.MAX_IMAGE_BYTES || MAX_IMAGE_BYTES)
    ) {
      return NextResponse.json({ error: "Image is too large." }, { status: 413 });
    }

    const style = body.style?.prompt || "";
    const finish = body.finish?.prompt || "Replace only the masked floor with a glossy white swirl metallic epoxy floor.";
    const prompt = [
      finish,
      style,
      "Edit only the masked floor area. Preserve walls, cabinets, furniture, baseboards, shadows, lighting, and camera perspective. Make it photorealistic. Do not add people, logos, text, watermarks, or unrelated objects."
    ].join(" ");

    const form = new FormData();
    form.append("model", process.env.OPENAI_IMAGE_MODEL || "gpt-image-1.5");
    form.append("prompt", prompt);
    form.append("size", "1536x1024");
    form.append("image[]", new Blob([bytes(image.buffer)], { type: image.mime }), "customer-floor.png");
    form.append("mask", new Blob([bytes(mask.buffer)], { type: mask.mime }), "floor-mask.png");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: form
    });

    const result = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: result.error?.message || "OpenAI image edit failed." }, { status: response.status });
    }

    const base64 = result.data?.[0]?.b64_json;
    const url = result.data?.[0]?.url;

    return NextResponse.json({
      image: base64 ? `data:image/png;base64,${base64}` : url,
      model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1.5"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Invalid render request." }, { status: 400 });
  }
}
