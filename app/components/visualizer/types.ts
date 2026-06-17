import type { FinishOption } from "../../data/finish-options";

export type MaskPoint = {
  x: number;
  y: number;
};

export type UploadedPreview = {
  url: string;
  name: string;
  size: number;
  type: string;
};

export type VisualizerControlsState = {
  opacity: number;
  gloss: number;
  textureScale: number;
  textureAngle: number;
  glitterSize: "fine" | "chunky";
};

export type QuotePreviewPayload = {
  previewDataUrl: string;
  finish: FinishOption;
  controls: VisualizerControlsState;
  imageName: string;
  preparedAt: string;
};

export type FeatureFlags = {
  aiSegmentation: boolean;
  scenes3d: boolean;
  quoteUpload: boolean;
  customBlend: boolean;
  analytics: boolean;
  debugOverlay: boolean;
};
