"use client";

import type { FlakeSize, MetallicPattern, VisualizerControlsState } from "./types";

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
  const flakeTotal = controls.flakeLightPercent + controls.flakeMidPercent + controls.flakeDarkPercent;

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

      <div className="ev-control-block">
        <p className="ev-control-subhead">Flake Blend</p>
        <div className="ev-segmented" role="group" aria-label="Flake size">
          {(["small", "medium", "large"] as FlakeSize[]).map((size) => (
            <button className={controls.flakeSize === size ? "active" : ""} key={size} onClick={() => onControlsChange({ ...controls, flakeSize: size })} type="button">
              {size}
            </button>
          ))}
        </div>
        <ControlSlider label="Coverage" min={20} max={100} value={controls.flakeCoverage} onChange={(flakeCoverage) => onControlsChange({ ...controls, flakeCoverage })} />
        <ControlSlider label="Light %" min={0} max={100} value={controls.flakeLightPercent} onChange={(flakeLightPercent) => onControlsChange({ ...controls, flakeLightPercent })} />
        <ControlSlider label="Mid %" min={0} max={100} value={controls.flakeMidPercent} onChange={(flakeMidPercent) => onControlsChange({ ...controls, flakeMidPercent })} />
        <ControlSlider label="Dark %" min={0} max={100} value={controls.flakeDarkPercent} onChange={(flakeDarkPercent) => onControlsChange({ ...controls, flakeDarkPercent })} />
        <p className="ev-note">Blend distribution total: {flakeTotal}. Renderer normalizes this mix automatically.</p>
      </div>

      <div className="ev-control-block">
        <p className="ev-control-subhead">Metallic / Pigment Mixer</p>
        <div className="ev-color-grid">
          <ColorControl label="Color 1" value={controls.mixerColorOne} onChange={(mixerColorOne) => onControlsChange({ ...controls, mixerColorOne })} />
          <ColorControl label="Color 2" value={controls.mixerColorTwo} onChange={(mixerColorTwo) => onControlsChange({ ...controls, mixerColorTwo })} />
          <ColorControl label="Color 3" value={controls.mixerColorThree} onChange={(mixerColorThree) => onControlsChange({ ...controls, mixerColorThree })} />
        </div>
        <div className="ev-segmented" role="group" aria-label="Metallic pattern">
          {(["marble", "waves", "cloud"] as MetallicPattern[]).map((pattern) => (
            <button className={controls.metallicPattern === pattern ? "active" : ""} key={pattern} onClick={() => onControlsChange({ ...controls, metallicPattern: pattern })} type="button">
              {pattern}
            </button>
          ))}
        </div>
        <ControlSlider label="Mixer Intensity" min={0} max={100} value={controls.metallicIntensity} onChange={(metallicIntensity) => onControlsChange({ ...controls, metallicIntensity })} />
      </div>

      <div className="ev-control-block">
        <p className="ev-control-subhead">Glitter Size</p>
        <div className="ev-segmented" role="group" aria-label="Glitter particle size">
          <button className={controls.glitterSize === "fine" ? "active" : ""} onClick={() => onControlsChange({ ...controls, glitterSize: "fine" })} type="button">Fine</button>
          <button className={controls.glitterSize === "chunky" ? "active" : ""} onClick={() => onControlsChange({ ...controls, glitterSize: "chunky" })} type="button">Chunky</button>
        </div>
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

type ColorControlProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function ColorControl({ label, value, onChange }: ColorControlProps) {
  return (
    <label className="ev-color-input">
      <span>{label}</span>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
