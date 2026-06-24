"use client";

import { useEffect, useState, type PointerEvent, type RefObject } from "react";
import type { FinishOption } from "../../data/finish-options";
import type { MaskPoint, VisualizerControlsState } from "./types";

type FloorRenderCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  imageUrl: string | null;
  maskPoints: MaskPoint[];
  selectedFinish: FinishOption;
  controls: VisualizerControlsState;
  onAddPoint: (point: MaskPoint) => void;
  onMovePoint: (index: number, point: MaskPoint) => void;
};

const maxCanvasWidth = 1600;

export function FloorRenderCanvas({ canvasRef, imageUrl, maskPoints, selectedFinish, controls, onAddPoint, onMovePoint }: FloorRenderCanvasProps) {
  const [draggingPointIndex, setDraggingPointIndex] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    if (!imageUrl) {
      canvas.width = 1200;
      canvas.height = 760;
      drawEmptyState(context, canvas.width, canvas.height);
      return;
    }

    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const scale = Math.min(1, maxCanvasWidth / image.naturalWidth);
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      drawVisualizer(context, canvas, image, maskPoints, selectedFinish, controls);
    };
    image.onerror = () => {
      if (!cancelled) {
        canvas.width = 1200;
        canvas.height = 760;
        drawEmptyState(context, canvas.width, canvas.height, "This image could not be rendered. Try another JPEG, PNG, or WebP.");
      }
    };
    image.src = imageUrl;

    return () => {
      cancelled = true;
    };
  }, [canvasRef, controls, imageUrl, maskPoints, selectedFinish]);

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas || !imageUrl) return;
    const point = getCanvasPoint(canvas, event);
    const nearbyPointIndex = findNearbyPoint(maskPoints, point, canvas.width);
    event.currentTarget.setPointerCapture(event.pointerId);

    if (nearbyPointIndex >= 0) {
      setDraggingPointIndex(nearbyPointIndex);
      return;
    }

    onAddPoint(point);
  }

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas || draggingPointIndex === null || !imageUrl) return;
    onMovePoint(draggingPointIndex, getCanvasPoint(canvas, event));
  }

  function handlePointerUp(event: PointerEvent<HTMLCanvasElement>) {
    if (draggingPointIndex !== null) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDraggingPointIndex(null);
  }

  return (
    <div className="ev-canvas-frame">
      <canvas aria-label="Floor visualizer preview canvas" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} ref={canvasRef} />
      <div className="ev-canvas-help">
        {imageUrl ? "Click around the floor edge, then drag yellow points to refine the mask." : "Upload a floor photo to begin."}
      </div>
    </div>
  );
}

function drawVisualizer(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, image: HTMLImageElement, points: MaskPoint[], finish: FinishOption, controls: VisualizerControlsState) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  if (points.length >= 3) {
    context.save();
    createMaskPath(context, points);
    context.clip();
    context.globalAlpha = controls.opacity / 100;
    context.globalCompositeOperation = finish.texture === "stain" || finish.texture === "pigment" ? "multiply" : "overlay";
    drawFinishTexture(context, canvas.width, canvas.height, finish, controls);
    context.restore();

    if (controls.gloss > 0) {
      context.save();
      createMaskPath(context, points);
      context.clip();
      context.globalAlpha = controls.gloss / 180;
      context.globalCompositeOperation = "screen";
      const gloss = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      gloss.addColorStop(0, "rgba(255,255,255,.42)");
      gloss.addColorStop(0.45, "rgba(255,255,255,.05)");
      gloss.addColorStop(1, "rgba(255,255,255,.26)");
      context.fillStyle = gloss;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.restore();
    }
  }

  drawMaskOutline(context, points);
}

function drawFinishTexture(context: CanvasRenderingContext2D, width: number, height: number, finish: FinishOption, controls: VisualizerControlsState) {
  const palette = getRenderPalette(finish, controls);
  const [a, b, c, d] = palette;
  const scale = controls.textureScale / 100;
  const angle = (controls.textureAngle * Math.PI) / 180;

  context.save();
  context.translate(width / 2, height / 2);
  context.rotate(angle);
  context.scale(scale, scale);
  const drawWidth = width / scale + 260;
  const drawHeight = height / scale + 260;
  const left = -drawWidth / 2;
  const top = -drawHeight / 2;

  if (finish.texture === "metallic") {
    drawMetallicTexture(context, left, top, drawWidth, drawHeight, palette, controls);
    context.restore();
    return;
  }

  if (finish.texture === "stain" || finish.texture === "pigment") {
    drawStainOrPigmentTexture(context, left, top, drawWidth, drawHeight, palette, controls, finish.texture);
    context.restore();
    return;
  }

  context.fillStyle = finish.texture === "quartz" ? b : a;
  context.fillRect(left, top, drawWidth, drawHeight);

  const count = getParticleCount(finish.texture, controls);
  for (let i = 0; i < count; i += 1) {
    const x = left + seeded(i, 11) * drawWidth;
    const y = top + seeded(i, 17) * drawHeight;
    const paletteColor = finish.texture === "flake" ? weightedFlakeColor(palette, controls, i) : palette[i % palette.length];
    const sizeBase = getParticleSizeBase(finish.texture, controls);
    const size = sizeBase + seeded(i, 29) * sizeBase * 1.8;
    context.globalAlpha = finish.texture === "glitter" ? 0.82 : 0.86;
    context.fillStyle = paletteColor;
    context.beginPath();
    if (finish.texture === "flake") {
      context.translate(x, y);
      context.rotate(seeded(i, 41) * Math.PI);
      context.rect(-size * 0.7, -size * 0.37, size * 1.4, size * 0.74);
      context.resetTransform();
      context.translate(width / 2, height / 2);
      context.rotate(angle);
      context.scale(scale, scale);
    } else {
      context.arc(x, y, size, 0, Math.PI * 2);
    }
    context.fill();

    if (finish.texture === "glitter") {
      context.globalAlpha = 0.72;
      context.fillStyle = "#ffffff";
      context.fillRect(x - 0.6, y - size * 1.5, 1.2, size * 3);
      context.fillRect(x - size * 1.5, y - 0.6, size * 3, 1.2);
    }
  }

  context.globalAlpha = 1;
  context.restore();
}

function drawMetallicTexture(context: CanvasRenderingContext2D, left: number, top: number, drawWidth: number, drawHeight: number, palette: string[], controls: VisualizerControlsState) {
  const [a, b, c, d] = palette;
  const gradient = context.createLinearGradient(left, top, left + drawWidth, top + drawHeight);
  gradient.addColorStop(0, a);
  gradient.addColorStop(0.24, b);
  gradient.addColorStop(0.5, d ?? b);
  gradient.addColorStop(0.72, c);
  gradient.addColorStop(1, a);
  context.fillStyle = gradient;
  context.fillRect(left, top, drawWidth, drawHeight);

  const patternCount = controls.metallicPattern === "cloud" ? 36 : controls.metallicPattern === "waves" ? 28 : 22;
  for (let i = 0; i < patternCount; i += 1) {
    context.globalAlpha = 0.08 + controls.metallicIntensity / 520;
    context.strokeStyle = i % 3 === 0 ? d : i % 2 ? c : b;
    context.lineWidth = 10 + (i % 5) * 6 + controls.metallicIntensity / 8;
    context.beginPath();
    const waveOffset = controls.metallicPattern === "waves" ? i * 46 : i * 62;
    context.moveTo(left - 80, top + waveOffset);
    context.bezierCurveTo(left + drawWidth * 0.28, top + i * 18, left + drawWidth * 0.62, top + i * 92, left + drawWidth + 80, top + i * 42);
    context.stroke();

    if (controls.metallicPattern === "cloud") {
      context.globalAlpha = 0.05 + controls.metallicIntensity / 900;
      context.fillStyle = i % 2 ? b : d;
      context.beginPath();
      context.ellipse(left + seeded(i, 61) * drawWidth, top + seeded(i, 73) * drawHeight, 90 + seeded(i, 19) * 180, 35 + seeded(i, 23) * 90, seeded(i, 31) * Math.PI, 0, Math.PI * 2);
      context.fill();
    }
  }
  context.globalAlpha = 1;
}

function drawStainOrPigmentTexture(context: CanvasRenderingContext2D, left: number, top: number, drawWidth: number, drawHeight: number, palette: string[], controls: VisualizerControlsState, texture: "stain" | "pigment") {
  const [a, b, c, d] = palette;
  const gradient = context.createLinearGradient(left, top, left + drawWidth, top + drawHeight);
  gradient.addColorStop(0, b);
  gradient.addColorStop(0.52, a);
  gradient.addColorStop(1, c);
  context.fillStyle = gradient;
  context.fillRect(left, top, drawWidth, drawHeight);
  const cloudCount = texture === "pigment" ? 42 : 70;
  for (let i = 0; i < cloudCount; i += 1) {
    const x = left + seeded(i, 31) * drawWidth;
    const y = top + seeded(i, 47) * drawHeight;
    const radius = 35 + seeded(i, 83) * 95;
    context.globalAlpha = texture === "pigment" ? 0.06 + controls.metallicIntensity / 1800 : 0.09;
    context.fillStyle = i % 2 ? d : c;
    context.beginPath();
    context.ellipse(x, y, radius, radius * 0.44, seeded(i, 19) * Math.PI, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;
}

function drawMaskOutline(context: CanvasRenderingContext2D, points: MaskPoint[]) {
  if (points.length === 0) return;
  context.save();
  context.lineWidth = 3;
  context.strokeStyle = "#f6d21b";
  context.fillStyle = "#f6d21b";
  context.setLineDash(points.length >= 3 ? [] : [8, 8]);
  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  if (points.length >= 3) context.closePath();
  context.stroke();
  context.setLineDash([]);
  points.forEach((point) => {
    context.beginPath();
    context.arc(point.x, point.y, 7, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "rgba(0,0,0,.72)";
    context.lineWidth = 2;
    context.stroke();
  });
  context.restore();
}

function createMaskPath(context: CanvasRenderingContext2D, points: MaskPoint[]) {
  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  context.closePath();
}

function drawEmptyState(context: CanvasRenderingContext2D, width: number, height: number, message = "Upload a floor photo to start the enterprise visualizer.") {
  context.clearRect(0, 0, width, height);
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#111111");
  gradient.addColorStop(1, "#2a2a2a");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#f6d21b";
  context.font = "700 34px Arial, sans-serif";
  context.textAlign = "center";
  context.fillText("See Your Floor Before You Build It.", width / 2, height / 2 - 18);
  context.fillStyle = "rgba(255,255,255,.78)";
  context.font = "500 20px Arial, sans-serif";
  context.fillText(message, width / 2, height / 2 + 28);
}

function getCanvasPoint(canvas: HTMLCanvasElement, event: PointerEvent<HTMLCanvasElement>): MaskPoint {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  return { x: Math.max(0, Math.min(canvas.width, x)), y: Math.max(0, Math.min(canvas.height, y)) };
}

function findNearbyPoint(points: MaskPoint[], target: MaskPoint, canvasWidth: number) {
  const radius = Math.max(16, canvasWidth * 0.018);
  return points.findIndex((point) => Math.hypot(point.x - target.x, point.y - target.y) <= radius);
}

function getRenderPalette(finish: FinishOption, controls: VisualizerControlsState) {
  if (finish.texture === "metallic" || finish.texture === "pigment") {
    return [controls.mixerColorOne, controls.mixerColorTwo, controls.mixerColorThree, finish.palette[3] ?? controls.mixerColorTwo];
  }
  return finish.palette;
}

function getParticleCount(texture: FinishOption["texture"], controls: VisualizerControlsState) {
  if (texture === "quartz") return 520;
  if (texture === "glitter") return 180;
  if (texture === "flake") return Math.round(120 + controls.flakeCoverage * 3.4);
  return 240;
}

function getParticleSizeBase(texture: FinishOption["texture"], controls: VisualizerControlsState) {
  if (texture === "quartz") return 1.2;
  if (texture === "glitter") return controls.glitterSize === "chunky" ? 6 : 2.4;
  if (texture === "flake") {
    if (controls.flakeSize === "small") return 4.8;
    if (controls.flakeSize === "large") return 12;
    return 8;
  }
  return 8;
}

function weightedFlakeColor(palette: string[], controls: VisualizerControlsState, index: number) {
  const total = Math.max(1, controls.flakeLightPercent + controls.flakeMidPercent + controls.flakeDarkPercent);
  const lightEdge = controls.flakeLightPercent / total;
  const midEdge = lightEdge + controls.flakeMidPercent / total;
  const pick = seeded(index, 97);
  if (pick < lightEdge) return palette[3] ?? palette[0];
  if (pick < midEdge) return palette[1] ?? palette[0];
  return palette[0] ?? palette[2];
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 999 + salt * 131) * 10000;
  return value - Math.floor(value);
}
