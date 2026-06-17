"use client";

import { CSSProperties, useMemo, useState } from "react";

type ChartKey = "flake" | "metallic" | "quartz";
type Texture = "flake" | "metallic" | "quartz";

type ChartOption = {
  name: string;
  detail: string;
  bestFor: string;
  palette: [string, string, string, string];
  texture: Texture;
};

type ChartSystem = {
  key: ChartKey;
  label: string;
  headline: string;
  summary: string;
  chartNote: string;
  chartImage?: string;
  chartAlt?: string;
  options: ChartOption[];
};

const flakeChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-12-epoxy-flake-color-chart.webp?v=1780952839";
const metallicReferenceImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-marble-epoxy-floor.webp?v=1780952466";

const chartSystems: ChartSystem[] = [
  {
    key: "flake",
    label: "Flake",
    headline: "Top 12 epoxy flake color chart",
    summary: "Clickable XPS flake options based on the Nashville Resin Worx color-chart section.",
    chartNote: "Source chart: XPS Top 12 Epoxy Flake Color Chart.",
    chartImage: flakeChartImage,
    chartAlt: "XPS top 12 epoxy flake color chart",
    options: [
      { name: "Domino", detail: "Black, white, and gray full broadcast blend.", bestFor: "Modern garages", palette: ["#111111", "#ffffff", "#8f8f8f", "#d8d8d8"], texture: "flake" },
      { name: "Nightfall", detail: "Dark charcoal and gray flake blend.", bestFor: "Shops and tool rooms", palette: ["#050505", "#262626", "#595959", "#9c9c9c"], texture: "flake" },
      { name: "Gravel", detail: "Balanced mid-gray blend for clean neutral floors.", bestFor: "Everyday garages", palette: ["#3f3f3f", "#787878", "#bfbfbf", "#f4f4f4"], texture: "flake" },
      { name: "Tuxedo", detail: "High-contrast black and white flake look.", bestFor: "Showpiece garages", palette: ["#000000", "#ffffff", "#333333", "#eeeeee"], texture: "flake" },
      { name: "Shoreline", detail: "Light gray, white, and warm neutral stone tones.", bestFor: "Bright homes", palette: ["#d7d2c8", "#ffffff", "#a9a9a9", "#6f6b62"], texture: "flake" },
      { name: "Wombat", detail: "Warm gray and taupe blend with softer contrast.", bestFor: "Residential garages", palette: ["#4b4944", "#8d8277", "#c8c2b8", "#eee9df"], texture: "flake" },
      { name: "Saddle Tan", detail: "Tan and stone blend for desert-style homes.", bestFor: "Phoenix garages", palette: ["#715536", "#c7a46d", "#efe4c8", "#3b3026"], texture: "flake" },
      { name: "Cabin Fever", detail: "Brown, tan, and black cabin-style blend.", bestFor: "Warm interiors", palette: ["#181818", "#735640", "#cdb18a", "#f1e4d0"], texture: "flake" },
      { name: "Outback", detail: "Earth-tone gray, black, and tan blend.", bestFor: "Workshops", palette: ["#232323", "#836c4c", "#d0c7b0", "#5c5145"], texture: "flake" },
      { name: "Biscuit", detail: "Light tan, cream, and soft stone finish.", bestFor: "Light floors", palette: ["#f0dfc0", "#c8ac79", "#8a7152", "#fff7e5"], texture: "flake" },
      { name: "Custom Blend", detail: "Custom XPS blend direction for branded floors.", bestFor: "Custom projects", palette: ["#050505", "#f6b800", "#f1f1f1", "#7d7d7d"], texture: "flake" },
      { name: "Chestnut", detail: "Deep brown and tan flake blend.", bestFor: "Warm-tone spaces", palette: ["#2b1810", "#6d3f22", "#b98b55", "#ead5b0"], texture: "flake" }
    ]
  },
  {
    key: "metallic",
    label: "Metallic",
    headline: "Metallic epoxy color direction",
    summary: "Marble-style metallic directions for statement interior floors and showroom spaces.",
    chartNote: "Use these as direction choices before confirming real pigment samples.",
    chartImage: metallicReferenceImage,
    chartAlt: "Metallic marble epoxy floor reference",
    options: [
      { name: "White Marble", detail: "White and gray marble-style movement.", bestFor: "Interior feature floors", palette: ["#ffffff", "#d8d8d8", "#8f8f8f", "#f6f6f6"], texture: "metallic" },
      { name: "Steel Silver", detail: "Silver movement with a polished industrial feel.", bestFor: "Showrooms", palette: ["#f2f2f2", "#b7bec3", "#ffffff", "#626b73"], texture: "metallic" },
      { name: "Graphite", detail: "Dark gray motion with deep contrast.", bestFor: "Retail and offices", palette: ["#111111", "#3b3b3b", "#858585", "#d2d2d2"], texture: "metallic" },
      { name: "Blue Metallic", detail: "Blue resin movement with high visual impact.", bestFor: "Feature spaces", palette: ["#092b43", "#0a6f8e", "#42d9ff", "#d9f7ff"], texture: "metallic" },
      { name: "Copper Flow", detail: "Warm copper and dark resin movement.", bestFor: "Bars and studios", palette: ["#1d120c", "#7c3f21", "#c57b3a", "#f1c08a"], texture: "metallic" },
      { name: "Smoke Pearl", detail: "Soft gray pearl movement with a clean finish.", bestFor: "Professional interiors", palette: ["#262626", "#666666", "#b8b8b8", "#eeeeee"], texture: "metallic" }
    ]
  },
  {
    key: "quartz",
    label: "Quartz",
    headline: "Quartz broadcast color direction",
    summary: "Traction-focused quartz directions for wet, commercial, and heavy-use floors.",
    chartNote: "Quartz choices are shown separately from decorative flake so the right system is easier to compare.",
    options: [
      { name: "Cobblestone", detail: "Balanced gray quartz broadcast.", bestFor: "Shops and walkways", palette: ["#3a3a36", "#77776f", "#c2c0b6", "#ededdf"], texture: "quartz" },
      { name: "Flint", detail: "Dark gray quartz for high-use spaces.", bestFor: "Industrial floors", palette: ["#161616", "#424242", "#777777", "#c5c5c5"], texture: "quartz" },
      { name: "Blue Moon", detail: "Cool blue-gray quartz blend.", bestFor: "Wet areas", palette: ["#1c3444", "#577383", "#9fb4bd", "#e0e8eb"], texture: "quartz" },
      { name: "Limestone", detail: "Light tan quartz that keeps the room bright.", bestFor: "Patios and restrooms", palette: ["#eee4c7", "#c2a878", "#827156", "#fff7df"], texture: "quartz" },
      { name: "Mojave", detail: "Warm desert quartz for Arizona spaces.", bestFor: "Phoenix patios", palette: ["#3d2c20", "#856441", "#c9a66e", "#ead8b9"], texture: "quartz" },
      { name: "Sandstone", detail: "Neutral tan quartz with strong texture potential.", bestFor: "Commercial entries", palette: ["#5f4a32", "#a98355", "#d8c09a", "#f2e6cf"], texture: "quartz" }
    ]
  }
];

function getSystem(key: ChartKey) {
  return chartSystems.find((system) => system.key === key) ?? chartSystems[0];
}

function getOptionStyle(option: ChartOption): CSSProperties {
  return {
    "--tone-a": option.palette[0],
    "--tone-b": option.palette[1],
    "--tone-c": option.palette[2],
    "--tone-d": option.palette[3]
  } as CSSProperties;
}

export function FinishVisualizer() {
  const [activeKey, setActiveKey] = useState<ChartKey>("flake");
  const [selectedName, setSelectedName] = useState(chartSystems[0].options[0].name);

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
    <section className="nrw-chart-section" id="color-chart" aria-label="Interactive color chart and floor visualizer">
      <div className="nrw-color-panel">
        <h2>Explore Color Charts</h2>
        <div className="nrw-tabs" aria-label="Color chart categories">
          {chartSystems.map((system) => (
            <button
              key={system.key}
              type="button"
              className={system.key === activeKey ? "active" : ""}
              aria-pressed={system.key === activeKey}
              onClick={() => selectSystem(system.key)}
            >
              {system.label}
            </button>
          ))}
        </div>
        <div className="nrw-mini-visualizer" style={getOptionStyle(selectedOption)}>
          <span className={`nrw-mini-floor nrw-mini-${selectedOption.texture}`} aria-hidden="true" />
          <div className="nrw-mini-copy">
            <span>{activeSystem.label}</span>
            <strong>{selectedOption.name}</strong>
            <p>{selectedOption.detail}</p>
          </div>
        </div>
        <div className="nrw-chip-grid" aria-label={`${activeSystem.label} options`}>
          {activeSystem.options.map((option) => (
            <button
              key={option.name}
              type="button"
              className={`nrw-chip nrw-chip-${option.texture} ${option.name === selectedOption.name ? "selected" : ""}`}
              style={getOptionStyle(option)}
              onClick={() => setSelectedName(option.name)}
            >
              <span>{option.name}</span>
            </button>
          ))}
        </div>
        <div className="nrw-visualizer-callout">
          <strong>Floor Visualizer by Torginol</strong>
          <p>Choose a finish here, then open the manufacturer visualizer for full room planning.</p>
          <a className="gold-button" href="https://torginol.com/design" target="_blank" rel="noreferrer">Try Floor Visualizer</a>
        </div>
      </div>

      <figure className="nrw-reference-panel">
        <span className="section-kicker">Selected chart</span>
        <h3>{activeSystem.headline}</h3>
        {activeSystem.chartImage ? (
          <img src={activeSystem.chartImage} alt={activeSystem.chartAlt ?? activeSystem.headline} />
        ) : (
          <div className="nrw-quartz-board" aria-hidden="true">
            {activeSystem.options.map((option) => (
              <span key={option.name} style={getOptionStyle(option)} />
            ))}
          </div>
        )}
        <figcaption>{activeSystem.chartNote}</figcaption>
      </figure>

      <aside className="nrw-proof-panel">
        <h3>Pick the finish direction first.</h3>
        <p>{activeSystem.summary}</p>
        <ul>
          <li>Flake for garages and everyday durability</li>
          <li>Metallic for statement interior floors</li>
          <li>Quartz for traction-heavy or commercial spaces</li>
        </ul>
      </aside>
    </section>
  );
}
