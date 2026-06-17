"use client";

import { CSSProperties, useMemo, useState } from "react";

type ChartKey = "flake" | "metallic" | "quartz";

type FinishOption = {
  name: string;
  detail: string;
  bestFor: string;
  palette: [string, string, string, string];
};

type FinishSystem = {
  key: ChartKey;
  label: string;
  tabLabel: string;
  headline: string;
  summary: string;
  options: FinishOption[];
};

type FinishStyle = CSSProperties & Record<string, string>;

const finishSystems: FinishSystem[] = [
  {
    key: "flake",
    label: "Flake",
    tabLabel: "Flake",
    headline: "Explore Flake Color Charts",
    summary: "Full-broadcast flake systems are the core garage-floor finish for Phoenix homes, shops, and everyday concrete spaces.",
    options: [
      { name: "Domino", detail: "Black, white, and gray full-broadcast blend.", bestFor: "Modern garages", palette: ["#111111", "#ffffff", "#8f8f8f", "#d8d8d8"] },
      { name: "Nightfall", detail: "Dark charcoal and gray flake blend.", bestFor: "Shops and tool rooms", palette: ["#050505", "#262626", "#595959", "#9c9c9c"] },
      { name: "Gravel", detail: "Balanced mid-gray blend for clean neutral floors.", bestFor: "Everyday garages", palette: ["#3f3f3f", "#787878", "#bfbfbf", "#f4f4f4"] },
      { name: "Tuxedo", detail: "High-contrast black and white flake look.", bestFor: "Showpiece garages", palette: ["#000000", "#ffffff", "#333333", "#eeeeee"] },
      { name: "Shoreline", detail: "Light gray, white, and warm neutral stone tones.", bestFor: "Bright homes", palette: ["#d7d2c8", "#ffffff", "#a9a9a9", "#6f6b62"] },
      { name: "Wombat", detail: "Warm gray and taupe blend with softer contrast.", bestFor: "Residential garages", palette: ["#4b4944", "#8d8277", "#c8c2b8", "#eee9df"] },
      { name: "Saddle Tan", detail: "Tan and stone blend for desert-style homes.", bestFor: "Phoenix garages", palette: ["#715536", "#c7a46d", "#efe4c8", "#3b3026"] },
      { name: "Cabin Fever", detail: "Brown, tan, and black cabin-style blend.", bestFor: "Warm interiors", palette: ["#181818", "#735640", "#cdb18a", "#f1e4d0"] },
      { name: "Outback", detail: "Earth-tone gray, black, and tan blend.", bestFor: "Workshops", palette: ["#232323", "#836c4c", "#d0c7b0", "#5c5145"] },
      { name: "Biscuit", detail: "Light tan, cream, and soft stone finish.", bestFor: "Light floors", palette: ["#f0dfc0", "#c8ac79", "#8a7152", "#fff7e5"] },
      { name: "Custom Blend", detail: "Custom XPS blend direction for branded floors.", bestFor: "Custom projects", palette: ["#050505", "#f6b800", "#f1f1f1", "#7d7d7d"] },
      { name: "Chestnut", detail: "Deep brown and tan flake blend.", bestFor: "Warm-tone spaces", palette: ["#2b1810", "#6d3f22", "#b98b55", "#ead5b0"] }
    ]
  },
  {
    key: "metallic",
    label: "Metallic Epoxy",
    tabLabel: "Metallic Epoxy",
    headline: "Explore Metallic Epoxy",
    summary: "Metallic epoxy is the decorative path for interior feature floors, showrooms, offices, studios, and statement spaces.",
    options: [
      { name: "White Marble", detail: "White and gray marble-style movement.", bestFor: "Interior feature floors", palette: ["#ffffff", "#d8d8d8", "#8f8f8f", "#f6f6f6"] },
      { name: "Steel Silver", detail: "Silver movement with a polished industrial feel.", bestFor: "Showrooms", palette: ["#f2f2f2", "#b7bec3", "#ffffff", "#626b73"] },
      { name: "Graphite", detail: "Dark gray motion with deep contrast.", bestFor: "Retail and offices", palette: ["#111111", "#3b3b3b", "#858585", "#d2d2d2"] },
      { name: "Blue Metallic", detail: "Blue resin movement with high visual impact.", bestFor: "Feature spaces", palette: ["#092b43", "#0a6f8e", "#42d9ff", "#d9f7ff"] },
      { name: "Copper Flow", detail: "Warm copper and dark resin movement.", bestFor: "Bars and studios", palette: ["#1d120c", "#7c3f21", "#c57b3a", "#f1c08a"] },
      { name: "Smoke Pearl", detail: "Soft gray pearl movement with a clean finish.", bestFor: "Professional interiors", palette: ["#262626", "#666666", "#b8b8b8", "#eeeeee"] }
    ]
  },
  {
    key: "quartz",
    label: "Quartz",
    tabLabel: "Quartz",
    headline: "Explore Quartz Broadcast",
    summary: "Quartz broadcast systems are the traction-first option for wet, commercial, industrial, and high-use concrete floors.",
    options: [
      { name: "Cobblestone", detail: "Balanced gray quartz broadcast.", bestFor: "Shops and walkways", palette: ["#3a3a36", "#77776f", "#c2c0b6", "#ededdf"] },
      { name: "Flint", detail: "Dark gray quartz for high-use spaces.", bestFor: "Industrial floors", palette: ["#161616", "#424242", "#777777", "#c5c5c5"] },
      { name: "Blue Moon", detail: "Cool blue-gray quartz blend.", bestFor: "Wet areas", palette: ["#1c3444", "#577383", "#9fb4bd", "#e0e8eb"] },
      { name: "Limestone", detail: "Light tan quartz that keeps the room bright.", bestFor: "Patios and restrooms", palette: ["#eee4c7", "#c2a878", "#827156", "#fff7df"] },
      { name: "Mojave", detail: "Warm desert quartz for Arizona spaces.", bestFor: "Phoenix patios", palette: ["#3d2c20", "#856441", "#c9a66e", "#ead8b9"] },
      { name: "Sandstone", detail: "Neutral tan quartz with strong texture potential.", bestFor: "Commercial entries", palette: ["#5f4a32", "#a98355", "#d8c09a", "#f2e6cf"] }
    ]
  }
];

function getSystem(key: ChartKey) {
  return finishSystems.find((system) => system.key === key) ?? finishSystems[0];
}

function finishStyle(option: FinishOption): FinishStyle {
  return {
    "--tone-a": option.palette[0],
    "--tone-b": option.palette[1],
    "--tone-c": option.palette[2],
    "--tone-d": option.palette[3]
  };
}

export function FinishVisualizer() {
  const [activeKey, setActiveKey] = useState<ChartKey>("flake");
  const [selectedName, setSelectedName] = useState(finishSystems[0].options[0].name);

  const activeSystem = getSystem(activeKey);
  const selectedOption = useMemo(
    () => activeSystem.options.find((option) => option.name === selectedName) ?? activeSystem.options[0],
    [activeSystem, selectedName]
  );

  function selectSystem(key: ChartKey) {
    const nextSystem = getSystem(key);
    setActiveKey(key);
    setSelectedName(nextSystem.options[0].name);
  }

  return (
    <section className="market-section phoenix-finish-section nashville-chart-lock" id="color-chart" aria-label="Interactive color chart and floor visualizer">
      <div className="color-panel">
        <h2>Explore Color Charts</h2>
        <div className="tabs" role="tablist" aria-label="Color chart categories">
          {finishSystems.map((system) => (
            <button
              key={system.key}
              type="button"
              role="tab"
              className={system.key === activeKey ? "active" : ""}
              aria-selected={system.key === activeKey}
              onClick={() => selectSystem(system.key)}
            >
              {system.tabLabel}
            </button>
          ))}
        </div>
        <div className="chip-grid" aria-label={`${activeSystem.label} options`}>
          {activeSystem.options.map((option, index) => (
            <button
              key={option.name}
              type="button"
              className={`flake-chip chip-${index % 6} ${option.name === selectedOption.name ? "selected" : ""}`}
              style={finishStyle(option)}
              aria-pressed={option.name === selectedOption.name}
              onClick={() => setSelectedName(option.name)}
            >
              <span>{option.name}</span>
            </button>
          ))}
        </div>
        <a className="blue-button" href="#estimate">View Full Color Charts</a>
        <div className="visualizer-block">
          <strong>Floor Visualizer by Torginol</strong>
          <p>See your space before you build it.</p>
          <a className="blue-button outline" href="https://torginol.com/design" target="_blank" rel="noreferrer">Try Floor Visualizer</a>
        </div>
      </div>

      <div className="product-panel">
        <h2>{activeSystem.headline}</h2>
        <div className="product-list">
          <article>
            <span className="product-orb" style={finishStyle(selectedOption)} aria-hidden="true" />
            <strong>{selectedOption.name}</strong>
            <span>{selectedOption.detail}</span>
          </article>
          <article>
            <span className="product-orb orb-system" style={finishStyle(selectedOption)} aria-hidden="true" />
            <strong>{activeSystem.label}</strong>
            <span>{selectedOption.bestFor}</span>
          </article>
          <article>
            <span className="product-orb orb-topcoat" style={finishStyle(selectedOption)} aria-hidden="true" />
            <strong>Topcoat</strong>
            <span>Confirm sheen and texture</span>
          </article>
        </div>
        <a className="blue-button" href="#estimate">Get Finish Guidance</a>
      </div>

      <div className="proof-panel">
        <h2><span>{activeSystem.options.length}</span> Finish Choices</h2>
        <p>{activeSystem.summary}</p>
        <ul>
          <li>Pick flake, metallic epoxy, or quartz</li>
          <li>Click a color to preview the selected finish</li>
          <li>Confirm real samples before installation</li>
          <li>Match texture, traffic, sheen, and use case</li>
        </ul>
        <div className="experience-seal">{activeSystem.options.length}<small>{activeSystem.label} Options</small></div>
        <h3>{selectedOption.name}</h3>
        <div className="cert-row">
          <span>{selectedOption.bestFor}</span>
          <span>Sample Review</span>
          <span>Prep Plan</span>
          <span>Topcoat</span>
        </div>
      </div>
    </section>
  );
}
