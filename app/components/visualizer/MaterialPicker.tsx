"use client";

import { finishFamilies, finishOptions, type FinishFamilyId, type FinishOption } from "../../data/finish-options";

type MaterialPickerProps = {
  activeFamily: FinishFamilyId;
  selectedFinish: FinishOption;
  onFamilyChange: (family: FinishFamilyId) => void;
  onFinishChange: (finish: FinishOption) => void;
};

export function MaterialPicker({ activeFamily, selectedFinish, onFamilyChange, onFinishChange }: MaterialPickerProps) {
  const options = finishOptions.filter((option) => option.family === activeFamily);
  const activeFamilyDetails = finishFamilies.find((family) => family.id === activeFamily) ?? finishFamilies[0];

  return (
    <section className="ev-panel" aria-label="Choose finish">
      <div>
        <p className="ev-kicker">Step 3</p>
        <h2>Choose Finish</h2>
      </div>
      <div className="ev-family-tabs" role="tablist" aria-label="Finish families">
        {finishFamilies.map((family) => (
          <button
            aria-selected={family.id === activeFamily}
            className={family.id === activeFamily ? "active" : ""}
            key={family.id}
            onClick={() => onFamilyChange(family.id)}
            type="button"
          >
            {family.label}
          </button>
        ))}
      </div>
      <p className="ev-muted">{activeFamilyDetails.description}</p>
      {activeFamilyDetails.notes ? <p className="ev-note">{activeFamilyDetails.notes}</p> : null}
      <div className="ev-material-grid">
        {options.map((option) => (
          <button
            className={option.id === selectedFinish.id ? "ev-material active" : "ev-material"}
            key={option.id}
            onClick={() => onFinishChange(option)}
            type="button"
          >
            <span className="ev-material-swatch" style={{ background: swatchBackground(option.palette, option.texture) }} />
            <span>
              <strong>{option.name}</strong>
              {option.code ? <small>{option.code}</small> : null}
            </span>
          </button>
        ))}
      </div>
      {selectedFinish.notes ? <p className="ev-note">{selectedFinish.notes}</p> : null}
      {selectedFinish.availability ? <p className="ev-note">{selectedFinish.availability}</p> : null}
    </section>
  );
}

function swatchBackground(palette: string[], texture: FinishOption["texture"]): string {
  const [a, b, c, d] = palette;
  if (texture === "glitter") {
    return `radial-gradient(circle at 25% 25%, #fff 0 2px, transparent 3px), radial-gradient(circle at 76% 62%, #fff 0 1px, transparent 2px), linear-gradient(135deg, ${b}, ${a}, ${c})`;
  }
  if (texture === "flake" || texture === "quartz") {
    return `radial-gradient(circle at 20% 30%, ${d} 0 8%, transparent 9%), radial-gradient(circle at 75% 70%, ${c} 0 10%, transparent 11%), linear-gradient(135deg, ${a}, ${b})`;
  }
  if (texture === "metallic") {
    return `linear-gradient(120deg, ${a}, ${b} 35%, ${d} 52%, ${c} 72%, ${a})`;
  }
  return `radial-gradient(circle at 20% 20%, ${d} 0 16%, transparent 25%), linear-gradient(135deg, ${b}, ${a}, ${c})`;
}
