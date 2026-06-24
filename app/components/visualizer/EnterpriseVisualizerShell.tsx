"use client";

import { useMemo, useRef, useState } from "react";
import { finishOptions, getDefaultFinish, type FinishFamilyId, type FinishOption } from "../../data/finish-options";
import { ExportAndQuotePanel } from "./ExportAndQuotePanel";
import { FloorRenderCanvas } from "./FloorRenderCanvas";
import { ImageUploader, validatePreviewFile } from "./ImageUploader";
import { MaterialPicker } from "./MaterialPicker";
import { PreviewControls } from "./PreviewControls";
import { ValidationBadge } from "./ValidationBadge";
import type { FeatureFlags, MaskPoint, QuotePreviewPayload, UploadedPreview, VisualizerControlsState } from "./types";

type EnterpriseVisualizerShellProps = {
  flags: FeatureFlags;
};

const defaultControls: VisualizerControlsState = {
  opacity: 72,
  gloss: 34,
  textureScale: 100,
  textureAngle: 18,
  glitterSize: "fine",
  flakeSize: "medium",
  flakeCoverage: 72,
  flakeLightPercent: 35,
  flakeMidPercent: 40,
  flakeDarkPercent: 25,
  mixerColorOne: "#6d4510",
  mixerColorTwo: "#dfad31",
  mixerColorThree: "#f2d167",
  metallicPattern: "marble",
  metallicIntensity: 62
};

export function EnterpriseVisualizerShell({ flags }: EnterpriseVisualizerShellProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [uploadedImage, setUploadedImage] = useState<UploadedPreview | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [maskPoints, setMaskPoints] = useState<MaskPoint[]>([]);
  const [maskHistory, setMaskHistory] = useState<MaskPoint[][]>([]);
  const [redoStack, setRedoStack] = useState<MaskPoint[][]>([]);
  const [activeFamily, setActiveFamily] = useState<FinishFamilyId>("flake");
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>(getDefaultFinish());
  const [controls, setControls] = useState<VisualizerControlsState>(defaultControls);
  const [preparedQuote, setPreparedQuote] = useState<QuotePreviewPayload | null>(null);
  const [aiMessage, setAiMessage] = useState<string | null>(null);

  const canExport = Boolean(uploadedImage && maskPoints.length >= 3);

  const statusText = useMemo(() => {
    if (!uploadedImage) return "Upload a photo to begin.";
    if (maskPoints.length < 3) return "Add at least three floor points.";
    return `${selectedFinish.name} is rendering inside the selected floor area.`;
  }, [maskPoints.length, selectedFinish.name, uploadedImage]);

  function commitMask(nextPoints: MaskPoint[]) {
    setMaskHistory((history) => [...history, maskPoints]);
    setMaskPoints(nextPoints);
    setRedoStack([]);
    setPreparedQuote(null);
  }

  function handleUpload(file: File) {
    const validationError = validatePreviewFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploadError(null);
    if (uploadedImage?.url) {
      URL.revokeObjectURL(uploadedImage.url);
    }
    setUploadedImage({ url: URL.createObjectURL(file), name: file.name, size: file.size, type: file.type });
    setMaskPoints([]);
    setMaskHistory([]);
    setRedoStack([]);
    setPreparedQuote(null);
    setAiMessage(null);
  }

  function handleFamilyChange(family: FinishFamilyId) {
    const nextFinish = finishOptions.find((option) => option.family === family) ?? selectedFinish;
    setActiveFamily(family);
    setSelectedFinish(nextFinish);
    setPreparedQuote(null);
  }

  function handleUndo() {
    if (maskHistory.length === 0) return;
    const previous = maskHistory[maskHistory.length - 1];
    setRedoStack((stack) => [maskPoints, ...stack]);
    setMaskPoints(previous);
    setMaskHistory((history) => history.slice(0, -1));
    setPreparedQuote(null);
  }

  function handleRedo() {
    if (redoStack.length === 0) return;
    const [next, ...rest] = redoStack;
    setMaskHistory((history) => [...history, maskPoints]);
    setMaskPoints(next);
    setRedoStack(rest);
    setPreparedQuote(null);
  }

  function handleClearMask() {
    if (maskPoints.length === 0) return;
    commitMask([]);
  }

  function handleRestart() {
    setMaskPoints([]);
    setMaskHistory([]);
    setRedoStack([]);
    setControls(defaultControls);
    setPreparedQuote(null);
    setAiMessage(null);
  }

  function handleMovePoint(index: number, point: MaskPoint) {
    setMaskPoints((points) => points.map((currentPoint, currentIndex) => (currentIndex === index ? point : currentPoint)));
    setPreparedQuote(null);
  }

  function handleAiAssist() {
    if (!uploadedImage) {
      setAiMessage("Upload a photo before using AI assist.");
      return;
    }
    if (!flags.aiSegmentation) {
      setAiMessage("AI segmentation is currently disabled. Manual masking is active and safe to use.");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const suggestedMask = [
      { x: canvas.width * 0.18, y: canvas.height * 0.56 },
      { x: canvas.width * 0.82, y: canvas.height * 0.56 },
      { x: canvas.width * 0.96, y: canvas.height * 0.94 },
      { x: canvas.width * 0.04, y: canvas.height * 0.94 }
    ];
    commitMask(suggestedMask);
    setAiMessage("AI assist suggested a starting floor outline. Drag any yellow point to refine the floor edge.");
  }

  function exportCanvas() {
    const canvas = canvasRef.current;
    if (!canvas || !canExport) return null;
    return canvas.toDataURL("image/png");
  }

  return (
    <div className="enterprise-visualizer">
      <style>{enterpriseVisualizerStyles}</style>
      <header className="ev-header">
        <a href="/" className="ev-back">Back to Phoenix Epoxy Pros</a>
        <div>
          <p className="ev-kicker">Enterprise Floor Visualizer</p>
          <h1>See Your Floor Before You Build It.</h1>
          <p>{statusText}</p>
        </div>
        <ValidationBadge flags={flags} hasImage={Boolean(uploadedImage)} maskPointCount={maskPoints.length} canExport={canExport} />
      </header>

      <div className="ev-workspace">
        <aside className="ev-sidebar">
          <ImageUploader uploadedImage={uploadedImage} error={uploadError} onUpload={handleUpload} />
          <section className="ev-panel" aria-label="Mask tools">
            <p className="ev-kicker">Step 2</p>
            <h2>Mark Floor Area</h2>
            <p className="ev-muted">Click points around the floor. Drag yellow points to refine the mask. Three or more points render the finish.</p>
            <div className="ev-control-row">
              <button onClick={handleAiAssist} type="button">AI Assist</button>
              <button disabled={maskPoints.length === 0} onClick={handleClearMask} type="button">Clear Mask</button>
            </div>
            {aiMessage ? <p className="ev-note">{aiMessage}</p> : null}
          </section>
          <MaterialPicker activeFamily={activeFamily} selectedFinish={selectedFinish} onFamilyChange={handleFamilyChange} onFinishChange={setSelectedFinish} />
        </aside>

        <main className="ev-stage" aria-label="Floor preview stage">
          <FloorRenderCanvas canvasRef={canvasRef} imageUrl={uploadedImage?.url ?? null} maskPoints={maskPoints} selectedFinish={selectedFinish} controls={controls} onAddPoint={(point) => commitMask([...maskPoints, point])} onMovePoint={handleMovePoint} />
        </main>

        <aside className="ev-sidebar ev-sidebar-right">
          <PreviewControls controls={controls} canUndo={maskHistory.length > 0} canRedo={redoStack.length > 0} canClear={maskPoints.length > 0} onControlsChange={setControls} onUndo={handleUndo} onRedo={handleRedo} onClearMask={handleClearMask} onRestart={handleRestart} />
          <ExportAndQuotePanel canExport={canExport} finish={selectedFinish} controls={controls} imageName={uploadedImage?.name ?? "uploaded-floor"} onExport={exportCanvas} onQuotePrepared={setPreparedQuote} preparedQuote={preparedQuote} quoteUploadEnabled={flags.quoteUpload} />
        </aside>
      </div>
    </div>
  );
}

const enterpriseVisualizerStyles = `
.enterprise-visualizer {
  min-height: 100vh;
  background: #090909;
  color: #f7f2de;
  padding: 18px;
}
.ev-header {
  display: grid;
  grid-template-columns: minmax(160px, 220px) minmax(0, 1fr) auto;
  gap: 18px;
  align-items: end;
  max-width: 1680px;
  margin: 0 auto 18px;
}
.ev-back,
.ev-panel button,
.ev-upload-target {
  border: 1px solid rgba(246, 210, 27, .32);
  background: #151515;
  color: #f7f2de;
  text-decoration: none;
}
.ev-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 14px;
  font-weight: 800;
}
.ev-header h1 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 4.6rem);
  line-height: .94;
  letter-spacing: 0;
}
.ev-header p {
  margin: 8px 0 0;
  color: rgba(247, 242, 222, .76);
}
.ev-kicker {
  margin: 0 0 7px !important;
  color: #f6d21b !important;
  font-size: .76rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}
.ev-workspace {
  display: grid;
  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr) minmax(280px, 340px);
  gap: 18px;
  max-width: 1680px;
  margin: 0 auto;
  align-items: start;
}
.ev-sidebar {
  display: grid;
  gap: 14px;
}
.ev-stage {
  min-width: 0;
}
.ev-panel {
  background: #111111;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 20px 52px rgba(0, 0, 0, .22);
}
.ev-panel h2 {
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 1.05rem;
  line-height: 1.1;
}
.ev-muted,
.ev-note,
.ev-file-note,
.ev-error {
  margin: 8px 0 0;
  color: rgba(247, 242, 222, .72);
  font-size: .86rem;
  line-height: 1.35;
}
.ev-note {
  color: #f3cf4a;
}
.ev-error {
  color: #ff9a9a;
}
.ev-upload-target {
  display: grid;
  gap: 6px;
  padding: 16px;
  border-style: dashed;
  border-radius: 8px;
  cursor: pointer;
}
.ev-upload-target input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  opacity: 0;
  pointer-events: none;
}
.ev-upload-target span {
  font-weight: 900;
}
.ev-upload-target small {
  color: rgba(247, 242, 222, .62);
}
.ev-family-tabs,
.ev-control-row,
.ev-segmented {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ev-family-tabs button,
.ev-control-row button,
.ev-segmented button {
  min-height: 38px;
  border-radius: 7px;
  padding: 0 11px;
  cursor: pointer;
  font-weight: 850;
}
.ev-family-tabs button.active,
.ev-segmented button.active,
.ev-control-row button:hover:not(:disabled) {
  background: #f6d21b;
  color: #090909;
}
.ev-panel button:disabled {
  cursor: not-allowed;
  opacity: .45;
}
.ev-material-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}
.ev-material {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  min-height: 58px;
  padding: 8px !important;
  text-align: left;
}
.ev-material.active {
  border-color: #f6d21b;
  box-shadow: 0 0 0 2px rgba(246, 210, 27, .18);
}
.ev-material-swatch {
  display: block;
  width: 44px;
  height: 42px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,.2);
}
.ev-material strong,
.ev-material small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ev-material small {
  color: rgba(247, 242, 222, .64);
}
.ev-canvas-frame {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #121212;
  border: 1px solid rgba(255,255,255,.12);
  min-height: 520px;
}
.ev-canvas-frame canvas {
  display: block;
  width: 100%;
  height: auto;
  min-height: 520px;
  cursor: crosshair;
  touch-action: none;
}
.ev-canvas-help {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  background: rgba(0,0,0,.68);
  color: #ffffff;
  font-weight: 800;
}
.ev-control-block {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,.1);
}
.ev-control-subhead {
  margin: 0 0 8px;
  color: #fff;
  font-size: .86rem;
  font-weight: 900;
  text-transform: uppercase;
}
.ev-slider {
  display: grid;
  grid-template-columns: 1fr minmax(110px, 1.3fr) 42px;
  gap: 10px;
  align-items: center;
  margin-top: 12px;
}
.ev-slider span,
.ev-slider strong {
  font-size: .86rem;
}
.ev-slider input {
  width: 100%;
  accent-color: #f6d21b;
}
.ev-color-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 10px;
}
.ev-color-input {
  display: grid;
  gap: 5px;
  font-size: .76rem;
  font-weight: 800;
  color: rgba(247, 242, 222, .74);
}
.ev-color-input input {
  width: 100%;
  min-height: 34px;
  padding: 0;
  border: 1px solid rgba(255,255,255,.16);
  background: transparent;
}
.ev-quote-ready {
  display: grid;
  gap: 4px;
  margin-top: 12px;
  padding: 12px;
  border-radius: 7px;
  background: rgba(246, 210, 27, .12);
  border: 1px solid rgba(246, 210, 27, .34);
}
.ev-quote-ready small {
  color: rgba(247,242,222,.72);
}
.ev-validation {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
.ev-validation span {
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 999px;
  padding: 7px 10px;
  font-size: .76rem;
  font-weight: 900;
}
.ev-validation .ok {
  background: rgba(79, 196, 112, .2);
  color: #aef0bf;
}
.ev-validation .pending {
  background: rgba(246, 210, 27, .15);
  color: #f6d21b;
}
.ev-validation .muted {
  color: rgba(247,242,222,.54);
}
@media (max-width: 1180px) {
  .ev-workspace {
    grid-template-columns: minmax(260px, 340px) minmax(0, 1fr);
  }
  .ev-sidebar-right {
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 760px) {
  .enterprise-visualizer {
    padding: 12px;
  }
  .ev-header,
  .ev-workspace,
  .ev-sidebar-right {
    grid-template-columns: 1fr;
  }
  .ev-header {
    align-items: start;
  }
  .ev-validation {
    justify-content: flex-start;
  }
  .ev-canvas-frame,
  .ev-canvas-frame canvas {
    min-height: 390px;
  }
  .ev-material-grid,
  .ev-color-grid {
    grid-template-columns: 1fr;
  }
  .ev-slider {
    grid-template-columns: 1fr;
    gap: 5px;
  }
}
`;
