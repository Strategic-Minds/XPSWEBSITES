"use client";

import { CSSProperties, useMemo, useState } from "react";

type ChartKey = "flake" | "metallic" | "quartz";

type FinishOption = {
  name: string;
  palette: [string, string, string, string];
};

type FinishSystem = {
  key: ChartKey;
  tabLabel: string;
  options: FinishOption[];
};

type ProductItem = {
  name: string;
  detail: string;
  image: string;
};

type FinishStyle = CSSProperties & Record<string, string>;

const finishSystems: FinishSystem[] = [
  {
    key: "flake",
    tabLabel: "Flake",
    options: [
      { name: "Domino", palette: ["#111111", "#ffffff", "#8f8f8f", "#d8d8d8"] },
      { name: "Nightfall", palette: ["#050505", "#262626", "#595959", "#9c9c9c"] },
      { name: "Gravel", palette: ["#3f3f3f", "#787878", "#bfbfbf", "#f4f4f4"] },
      { name: "Tuxedo", palette: ["#000000", "#ffffff", "#333333", "#eeeeee"] },
      { name: "Shoreline", palette: ["#d7d2c8", "#ffffff", "#a9a9a9", "#6f6b62"] },
      { name: "Wombat", palette: ["#4b4944", "#8d8277", "#c8c2b8", "#eee9df"] },
      { name: "Saddle Tan", palette: ["#715536", "#c7a46d", "#efe4c8", "#3b3026"] },
      { name: "Cabin Fever", palette: ["#181818", "#735640", "#cdb18a", "#f1e4d0"] },
      { name: "Outback", palette: ["#232323", "#836c4c", "#d0c7b0", "#5c5145"] },
      { name: "Biscuit", palette: ["#f0dfc0", "#c8ac79", "#8a7152", "#fff7e5"] },
      { name: "Custom Blend", palette: ["#050505", "#f6b800", "#f1f1f1", "#7d7d7d"] },
      { name: "Chestnut", palette: ["#2b1810", "#6d3f22", "#b98b55", "#ead5b0"] }
    ]
  },
  {
    key: "metallic",
    tabLabel: "Metallic Epoxy",
    options: [
      { name: "White Marble", palette: ["#ffffff", "#d8d8d8", "#8f8f8f", "#f6f6f6"] },
      { name: "Steel Silver", palette: ["#f2f2f2", "#b7bec3", "#ffffff", "#626b73"] },
      { name: "Graphite", palette: ["#111111", "#3b3b3b", "#858585", "#d2d2d2"] },
      { name: "Blue Metallic", palette: ["#092b43", "#0a6f8e", "#42d9ff", "#d9f7ff"] },
      { name: "Copper Flow", palette: ["#1d120c", "#7c3f21", "#c57b3a", "#f1c08a"] },
      { name: "Smoke Pearl", palette: ["#262626", "#666666", "#b8b8b8", "#eeeeee"] }
    ]
  },
  {
    key: "quartz",
    tabLabel: "Quartz",
    options: [
      { name: "Cobblestone", palette: ["#3a3a36", "#77776f", "#c2c0b6", "#ededdf"] },
      { name: "Flint", palette: ["#161616", "#424242", "#777777", "#c5c5c5"] },
      { name: "Blue Moon", palette: ["#1c3444", "#577383", "#9fb4bd", "#e0e8eb"] },
      { name: "Limestone", palette: ["#eee4c7", "#c2a878", "#827156", "#fff7df"] },
      { name: "Mojave", palette: ["#3d2c20", "#856441", "#c9a66e", "#ead8b9"] },
      { name: "Sandstone", palette: ["#5f4a32", "#a98355", "#d8c09a", "#f2e6cf"] }
    ]
  }
];

const productItems: ProductItem[] = [
  {
    name: "Deep Pour Epoxy",
    detail: "River table systems",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-metallic-marble-epoxy-floor.webp?v=1780952466"
  },
  {
    name: "Countertop Epoxy",
    detail: "Kitchen and bar tops",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-concrete-countertop-outdoor-kitchen.webp?v=1780955836"
  },
  {
    name: "Metallic Pigments",
    detail: "Decorative color movement",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-blue-metallic-epoxy-garage-floor.webp?v=1780952473"
  },
  {
    name: "Polyaspartic Topcoats",
    detail: "Fast return to service",
    image: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-flake-epoxy-garage-hero.webp?v=1780952458"
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
    <>
      <section className="floor-visualizer-strip" id="visualizer" aria-label="Floor visualizer">
        <div className="visualizer-copy">
          <span className="visualizer-kicker">Floor Visualizer by Torginol</span>
          <h2>See Your Floor Before You Build It.</h2>
          <p>Pick a finish family below, compare colors, then open the visualizer to preview the look in a real garage or commercial space.</p>
          <div className="visualizer-actions">
            <a className="blue-button" href="https://torginol.com/design" target="_blank" rel="noreferrer">Try Floor Visualizer</a>
            <a className="blue-button outline" href="#color-chart">Explore Color Charts</a>
          </div>
        </div>
        <div className="visualizer-preview" style={finishStyle(selectedOption)} aria-label={`${selectedOption.name} ${activeSystem.tabLabel} preview`}>
          <div className="visualizer-garage" aria-hidden="true">
            <div className="visualizer-wall" />
            <div className="visualizer-floor" />
          </div>
          <div className="visualizer-caption">
            <strong>{selectedOption.name}</strong>
            <span>{activeSystem.tabLabel}</span>
          </div>
        </div>
      </section>

      <section className="market-section phoenix-color-chart-exact" id="color-chart" aria-label="Interactive color chart">
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
          <div className="chip-grid" aria-label={`${activeSystem.tabLabel} color options`}>
            {activeSystem.options.map((option, index) => (
              <button
                key={option.name}
                type="button"
                className={`flake-chip chip-${(index % 6) + 1} ${option.name === selectedOption.name ? "selected" : ""}`}
                style={finishStyle(option)}
                aria-pressed={option.name === selectedOption.name}
                onClick={() => setSelectedName(option.name)}
              >
                <span>{option.name}</span>
              </button>
            ))}
          </div>
          <a className="blue-button" href="#estimate">View Full Color Charts</a>
        </div>

        <div className="product-panel">
          <h2>River Tables &amp; Epoxy Products</h2>
          <div className="product-list">
            {productItems.map((item) => (
              <article key={item.name}>
                <img src={item.image} alt={item.name} />
                <strong>{item.name}</strong>
                <span>{item.detail}</span>
              </article>
            ))}
          </div>
          <a className="blue-button" href="#estimate">Shop All Products</a>
        </div>

        <div className="proof-panel">
          <h2><span>15+</span> Years Of Experience</h2>
          <p>We have completed hundreds of residential, commercial, and industrial epoxy projects across Phoenix and beyond.</p>
          <ul>
            <li>Licensed &amp; Insured</li>
            <li>Industry Certified</li>
            <li>Top Quality Materials</li>
            <li>Satisfaction Guaranteed</li>
          </ul>
          <div className="experience-seal">15+<small>Years Experience</small></div>
          <h3>Industry Certifications</h3>
          <div className="cert-row">
            <span>Polished Concrete University</span>
            <span>RetroPlate</span>
            <span>EpoxyU</span>
            <span>SureCrete</span>
          </div>
        </div>
      </section>
    </>
  );
}
