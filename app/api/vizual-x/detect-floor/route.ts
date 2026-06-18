import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_IMAGE_BYTES = 12_000_000;

function imageSize(dataUrl: string) {
  return Buffer.byteLength((dataUrl || "").split(",")[1] || "", "base64");
}

function outputText(response: any) {
  if (typeof response.output_text === "string") return response.output_text;

  return (response.output || [])
    .flatMap((item: any) => (item.content || []).map((content: any) => content.text).filter(Boolean))
    .join("\n");
}

function fallback() {
  return {
    polygon: [
      { x: 0.08, y: 0.62 },
      { x: 0.92, y: 0.62 },
      { x: 0.98, y: 0.96 },
      { x: 0.02, y: 0.96 }
    ],
    confidence: 0.42,
    label: "Estimated lower floor area",
    notes: "OpenAI floor detection was unavailable, so Vizzy used a conservative lower-room estimate.",
    mode: "fallback"
  };
}

export async function POST(request: NextRequest) {
  try {
    const { imageDataUrl } = await request.json();

    if (!imageDataUrl) {
      return NextResponse.json({ error: "Missing imageDataUrl." }, { status: 400 });
    }

    if (imageSize(imageDataUrl) > Number(process.env.MAX_IMAGE_BYTES || MAX_IMAGE_BYTES)) {
      return NextResponse.json({ error: "Image is too large." }, { status: 413 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ ...fallback(), warning: "OPENAI_API_KEY is not configured." });
    }

    const schema = {
      type: "object",
      additionalProperties: false,
      required: ["polygon", "confidence", "label", "notes"],
      properties: {
        polygon: {
          type: "array",
          minItems: 4,
          maxItems: 12,
          items: {
            type: "object",
            additionalProperties: false,
            required: ["x", "y"],
            properties: {
              x: { type: "number", minimum: 0, maximum: 1 },
              y: { type: "number", minimum: 0, maximum: 1 }
            }
          }
        },
        confidence: { type: "number", minimum: 0, maximum: 1 },
        label: { type: "string", maxLength: 120 },
        notes: { type: "string", maxLength: 300 }
      }
    };

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_VISION_MODEL || "gpt-5.5",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Identify the visible floor surface in this room photo. Return only a conservative normalized polygon. Exclude walls, cabinets, baseboards, furniture, rugs, people, vehicles, reflections, and vertical surfaces."
              },
              { type: "input_image", image_url: imageDataUrl, detail: "high" }
            ]
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "floor_detection",
            schema,
            strict: true
          }
        }
      })
    });

    const result = await response.json();
    if (!response.ok) {
      return NextResponse.json({ ...fallback(), warning: result.error?.message || "OpenAI floor detection failed." });
    }

    return NextResponse.json({ ...JSON.parse(outputText(result)), mode: "ai" });
  } catch (error: any) {
    return NextResponse.json({ ...fallback(), warning: error.message || "Floor detection failed." });
  }
}
