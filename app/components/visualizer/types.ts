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

export type FlakeSize = "small" | "medium" | "large";
export type MetallicPattern = "marble" | "waves" | "cloud";

export type VisualizerControlsState = {
  opacity: number;
  gloss: number;
  textureScale: number;
  textureAngle: number;
  glitterSize: "fine" | "chunky";
  flakeSize: FlakeSize;
  flakeCoverage: number;
  flakeLightPercent: number;
  flakeMidPercent: number;
  flakeDarkPercent: number;
  mixerColorOne: string;
  mixerColorTwo: string;
  mixerColorThree: string;
  metallicPattern: MetallicPattern;
  metallicIntensity: number;
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
