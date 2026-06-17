"use client";

import type { VisualizerControlsState } from "./types";

type PreviewControlsProps = {
  controls: VisualizerControlsState;
  canUndo: boolean;
  canRedo: boolean;
  canClear: boolean;
  onControlsChange: (controls: VisualizerControlsState) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClearMask: () => void;
  onRestart: () => void;
};

export function PreviewControls({ controls, canUndo, canRedo, canClear, onControlsChange, onUndo, onRedo, onClearMask, onRestart }: PreviewControlsProps) {
  return (
    <section className="ev-panel" aria-label="Preview controls">
      <div>
        <p className="ev-kicker">Step 4</p>
        <h2>Tune Preview</h2>
      </div>
      <ControlSlider label="Opacity" min={20} max={100} value={controls.opacity} onChange={(opacity) => onControlsChange({ ...controls, opacity })} />
      <ControlSlider label="Wet Look" min={0} max={100} value={controls.gloss} onChange={(gloss) => onControlsChange({ ...controls, gloss })} />
      <ControlSlider label="Texture Scale" min={40} max={180} value={controls.textureScale} onChange={(textureScale) => onControlsChange({ ...controls, textureScale })} />
      <ControlSlider label="Texture Angle" min={0} max={180} value={controls.textureAngle} onChange={(textureAngle) => onControlsChange({ ...controls, textureAngle })} />
      <div className="ev-segmented" role="group" aria-label="Glitter particle size">
        <button className={controls.glitterSize === "fine" ? "active" : ""} onClick={() => onControlsChange({ ...controls, glitterSize: "fine" })} type="button">Fine</button>
        <button className={controls.glitterSize === "chunky" ? "active" : ""} onClick={() => onControlsChange({ ...controls, glitterSize: "chunky" })} type="button">Chunky</button>
      </div>
      <div className="ev-control-row">
        <button disabled={!canUndo} onClick={onUndo} type="button">Undo</button>
        <button disabled={!canRedo} onClick={onRedo} type="button">Redo</button>
        <button disabled={!canClear} onClick={onClearMask} type="button">Clear</button>
        <button onClick={onRestart} type="button">Restart</button>
      </div>
    </section>
  );
}

type ControlSliderProps = {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

function ControlSlider({ label, min, max, value, onChange }: ControlSliderProps) {
  return (
    <label className="ev-slider">
      <span>{label}</span>
      <input min={min} max={max} type="range" value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <strong>{value}</strong>
    </label>
  );
}
