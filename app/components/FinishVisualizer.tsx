"use client";

import { CSSProperties, useMemo, useState } from "react";

type FinishKey = "flake" | "metallic" | "quartz";
type Texture = "flake" | "metallic" | "quartz";

type FinishOption = {
  name: string;
  code: string;
  detail: string;
  bestFor: string;
  palette: [string, string, string, string];
  texture: Texture;
};

type FinishSystem = {
  key: FinishKey;
  label: string;
  headline: string;
  summary: string;
  performance: string;
  surfaceUse: string;
  options: FinishOption[];
};

const finishSystems: FinishSystem[] = [
  {
    key: "flake",
    label: "Flake",
    headline: "Full-broadcast flake systems",
    summary: "The everyday garage, patio, shop, and utility-room finish. It adds texture, hides concrete imperfections, and gives the floor a clean stone-like look.",
    performance: "Textured, durable, easy to clean, and usually the best first choice for Phoenix garages.",
    surfaceUse: "Garages, patios, shops, warehouses, laundry rooms, and high-use residential concrete.",
    options: [
      { name: "Domino", code: "XPS-F01", detail: "Black, white, and gray with a clean garage look.", bestFor: "Modern garages", palette: ["#111111", "#ffffff", "#8f8f8f", "#d8d8d8"], texture: "flake" },
      { name: "Nightfall", code: "XPS-F02", detail: "Charcoal-heavy blend for a darker floor.", bestFor: "Tool rooms and shops", palette: ["#050505", "#272727", "#5e5e5e", "#a8a8a8"], texture: "flake" },
      { name: "Gravel", code: "XPS-F03", detail: "Mid-gray blend that works with most garage colors.", bestFor: "Neutral garages", palette: ["#3f3f3f", "#787878", "#bfbfbf", "#f4f4f4"], texture: "flake" },
      { name: "Tuxedo", code: "XPS-F04", detail: "High contrast black and white blend.", bestFor: "Clean high-contrast spaces", palette: ["#000000", "#ffffff", "#333333", "#eeeeee"], texture: "flake" },
      { name: "Shoreline", code: "XPS-F05", detail: "Light gray, tan, and white for a softer finish.", bestFor: "Bright garages", palette: ["#d7d2c8", "#ffffff", "#a9a9a9", "#6f6b62"], texture: "flake" },
      { name: "Saddle Tan", code: "XPS-F06", detail: "Warm tan and stone tones for desert palettes.", bestFor: "Arizona homes", palette: ["#715536", "#c7a46d", "#efe4c8", "#3b3026"], texture: "flake" }
    ]
  },
  {
    key: "metallic",
    label: "Metallic",
    headline: "Metallic epoxy feature floors",
    summary: "A decorative, high-movement finish with depth and shine. Best when the project calls for a custom statement floor instead of a standard garage broadcast.",
    performance: "High visual movement, smoother feel, and more custom layout control than flake.",
    surfaceUse: "Showrooms, offices, salons, retail spaces, interior rooms, and specialty residential floors.",
    options: [
      { name: "Pearl Silver", code: "XPS-M01", detail: "Bright silver movement with a clean polished look.", bestFor: "Showrooms", palette: ["#f2f2f2", "#b7bec3", "#ffffff", "#626b73"], texture: "metallic" },
      { name: "Graphite Flow", code: "XPS-M02", detail: "Dark gray motion with a high-end industrial feel.", bestFor: "Retail and offices", palette: ["#111111", "#3b3b3b", "#858585", "#d2d2d2"], texture: "metallic" },
      { name: "Cobalt Blue", code: "XPS-M03", detail: "Blue metallic motion for a bold custom floor.", bestFor: "Feature rooms", palette: ["#092b43", "#0a6f8e", "#42d9ff", "#d9f7ff"], texture: "metallic" },
      { name: "Copper Drift", code: "XPS-M04", detail: "Warm copper and dark resin movement.", bestFor: "Bars and studios", palette: ["#1d120c", "#7c3f21", "#c57b3a", "#f1c08a"], texture: "metallic" },
      { name: "White Marble", code: "XPS-M05", detail: "Soft marble-style movement for decorative interiors.", bestFor: "Interior statement floors", palette: ["#ffffff", "#d9d9d9", "#9d9d9d", "#f6f6f6"], texture: "metallic" },
      { name: "Smoke Pearl", code: "XPS-M06", detail: "Subtle smoke movement with a refined gray finish.", bestFor: "Professional spaces", palette: ["#262626", "#666666", "#b8b8b8", "#eeeeee"], texture: "metallic" }
    ]
  },
  {
    key: "quartz",
    label: "Quartz",
    headline: "Quartz broadcast systems",
    summary: "A heavier-duty broadcast system with small colored quartz granules. It is built for traction, impact resistance, wet areas, and commercial traffic.",
    performance: "More aggressive texture, high traction, strong durability, and excellent wet-area performance.",
    surfaceUse: "Commercial kitchens, restrooms, locker rooms, patios, walkways, shops, and heavy-traffic spaces.",
    options: [
      { name: "Blue Moon", code: "QZ-01", detail: "Cool blue-gray quartz for clean commercial spaces.", bestFor: "Wet areas", palette: ["#1c3444", "#577383", "#9fb4bd", "#e0e8eb"], texture: "quartz" },
      { name: "Cobblestone", code: "QZ-02", detail: "Balanced gray quartz with a practical stone look.", bestFor: "Walkways and shops", palette: ["#3a3a36", "#77776f", "#c2c0b6", "#ededdf"], texture: "quartz" },
      { name: "Flint", code: "QZ-03", detail: "Dark gray quartz for high-use service areas.", bestFor: "Industrial floors", palette: ["#161616", "#424242", "#777777", "#c5c5c5"], texture: "quartz" },
      { name: "Limestone", code: "QZ-04", detail: "Light tan quartz that keeps a space brighter.", bestFor: "Patios and restrooms", palette: ["#eee4c7", "#c2a878", "#827156", "#fff7df"], texture: "quartz" },
      { name: "Mojave", code: "QZ-05", detail: "Warm desert quartz for Arizona exterior and utility spaces.", bestFor: "Phoenix patios", palette: ["#3d2c20", "#856441", "#c9a66e", "#ead8b9"], texture: "quartz" },
      { name: "Sandstone", code: "QZ-06", detail: "Neutral tan quartz with strong traction potential.", bestFor: "Commercial entries", palette: ["#5f4a32", "#a98355", "#d8c09a", "#f2e6cf"], texture: "quartz" }
    ]
  }
];

function getSystem(key: FinishKey) {
  return finishSystems.find((system) => system.key === key) ?? finishSystems[0];
}

function getFloorStyle(option: FinishOption): CSSProperties {
  return {
    "--tone-a": option.palette[0],
    "--tone-b": option.palette[1],
    "--tone-c": option.palette[2],
    "--tone-d": option.palette[3]
  } as CSSProperties;
}

export function FinishVisualizer() {
  const [activeKey, setActiveKey] = useState<FinishKey>("flake");
  const [selectedName, setSelectedName] = useState(finishSystems[0].options[0].name);

  const activeSystem = getSystem(activeKey);
  const selectedOption = useMemo(
    () => activeSystem.options.find((option) => option.name === selectedName) ?? activeSystem.options[0],
    [activeSystem, selectedName]
  );

  function selectSystem(key: FinishKey) {
    const nextSystem = getSystem(key);
    setActiveKey(key);
    setSelectedName(nextSystem.options[0].name);
  }

  return (
    <section className="finish-section" id="color-chart">
      <div className="finish-head">
        <span className="section-kicker">Floor visualizer</span>
        <h2>See the finish first. Then choose the chart.</h2>
        <p>
          Start with a visible floor preview, choose Flake, Metallic, or Quartz, then compare specific blends before
          bringing the selection into the estimate.
        </p>
      </div>

      <div className="visualizer-shell" aria-label="Interactive floor finish visualizer">
        <div className="visualizer-preview">
          <div className="preview-wall" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-baseboard" aria-hidden="true" />
          <div className={`preview-floor preview-${selectedOption.texture}`} style={getFloorStyle(selectedOption)}>
            <div className="floor-shine" aria-hidden="true" />
          </div>
          <div className="preview-label">
            <span>{activeSystem.label}</span>
            <strong>{selectedOption.name}</strong>
          </div>
        </div>

        <aside className="visualizer-controls">
          <div className="system-tabs" aria-label="Finish system choices">
            {finishSystems.map((system) => (
              <button
                type="button"
                aria-pressed={system.key === activeKey}
                className={system.key === activeKey ? "active" : ""}
                key={system.key}
                onClick={() => selectSystem(system.key)}
              >
                {system.label}
              </button>
            ))}
          </div>
          <span className="section-kicker">{activeSystem.label} system</span>
          <h3>{activeSystem.headline}</h3>
          <p>{activeSystem.summary}</p>
          <dl>
            <div>
              <dt>Best use</dt>
              <dd>{activeSystem.surfaceUse}</dd>
            </div>
            <div>
              <dt>Performance</dt>
              <dd>{activeSystem.performance}</dd>
            </div>
          </dl>
          <a className="gold-button" href="https://torginol.com/design" target="_blank" rel="noreferrer">
            Open Full Visualizer
          </a>
        </aside>
      </div>

      <div className="finish-chart-layout">
        <div className="finish-chart-copy">
          <span className="section-kicker">Interactive color chart</span>
          <h3>{activeSystem.label} choices</h3>
          <p>
            Tap a blend to update the visible floor preview above. Final samples, chip size, sheen, and texture should be
            confirmed after the concrete condition is reviewed.
          </p>
        </div>
        <div className="finish-option-grid" aria-label={`${activeSystem.label} finish choices`}>
          {activeSystem.options.map((option) => (
            <button
              type="button"
              className={option.name === selectedOption.name ? "selected" : ""}
              key={option.name}
              onClick={() => setSelectedName(option.name)}
            >
              <span className={`option-swatch option-${option.texture}`} style={getFloorStyle(option)} aria-hidden="true" />
              <strong>{option.name}</strong>
              <small>{option.detail}</small>
              <em>{option.bestFor}</em>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
