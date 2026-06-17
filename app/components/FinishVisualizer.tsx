"use client";

import { CSSProperties, useMemo, useState } from "react";

type FlakeOption = {
  name: string;
  code: string;
  rank: string;
  palette: [string, string, string, string];
  area: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

type FinishStyle = CSSProperties & Record<string, string>;

const flakeChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-12-epoxy-flake-color-chart.png?v=1781666861";
const chartBoards = ["board-a", "board-b", "board-c"];

const flakeOptions: FlakeOption[] = [
  { name: "Gravel", code: "FB-414", rank: "01", palette: ["#23303a", "#6f7f87", "#c9d0d2", "#f3f1e8"], area: { left: "5.0%", top: "15.7%", width: "28.9%", height: "17.3%" } },
  { name: "Outback", code: "FB-517", rank: "02", palette: ["#2d2118", "#7d583a", "#c99e68", "#efe2c7"], area: { left: "36.8%", top: "15.7%", width: "28.9%", height: "17.3%" } },
  { name: "Quicksilver", code: "FB-424", rank: "03", palette: ["#111a1c", "#566164", "#a8b2b1", "#f0f2ef"], area: { left: "68.4%", top: "15.7%", width: "28.9%", height: "17.3%" } },
  { name: "Safari", code: "FB-504", rank: "04", palette: ["#292517", "#776543", "#c7b27b", "#f3e7c2"], area: { left: "5.0%", top: "35.2%", width: "28.9%", height: "17.3%" } },
  { name: "Wombat", code: "FB-616", rank: "05", palette: ["#1d1f1f", "#6d6a60", "#aaa596", "#e4ddcf"], area: { left: "36.8%", top: "35.2%", width: "28.9%", height: "17.3%" } },
  { name: "Stonehenge", code: "FB-427", rank: "06", palette: ["#14191d", "#7b898c", "#ccd7d7", "#f2f5ed"], area: { left: "68.4%", top: "35.2%", width: "28.9%", height: "17.3%" } },
  { name: "Rapids", code: "FB-506", rank: "07", palette: ["#173343", "#4b8aa0", "#bdc7bd", "#d8caa7"], area: { left: "5.0%", top: "54.6%", width: "28.9%", height: "17.3%" } },
  { name: "Creekbed", code: "FB-716", rank: "08", palette: ["#272016", "#756241", "#bda16a", "#e7d4ad"], area: { left: "36.8%", top: "54.6%", width: "28.9%", height: "17.3%" } },
  { name: "Domino", code: "FB-411", rank: "09", palette: ["#050505", "#ffffff", "#8f989f", "#d8dde1"], area: { left: "68.4%", top: "54.6%", width: "28.9%", height: "17.3%" } },
  { name: "Shoreline", code: "FB-421", rank: "10", palette: ["#172a34", "#738990", "#c4c8b9", "#e8ddc2"], area: { left: "5.0%", top: "74.1%", width: "28.9%", height: "17.3%" } },
  { name: "Orbit", code: "FB-310", rank: "11", palette: ["#111821", "#5d6e77", "#bdc8d2", "#eef3f6"], area: { left: "36.8%", top: "74.1%", width: "28.9%", height: "17.3%" } },
  { name: "Snowfall", code: "FB-602", rank: "12", palette: ["#4b5754", "#87938f", "#c9d1cc", "#f5f7f1"], area: { left: "68.4%", top: "74.1%", width: "28.9%", height: "17.3%" } }
];

function finishStyle(option: FlakeOption): FinishStyle {
  return {
    "--tone-a": option.palette[0],
    "--tone-b": option.palette[1],
    "--tone-c": option.palette[2],
    "--tone-d": option.palette[3]
  };
}

function hotspotStyle(option: FlakeOption): CSSProperties {
  return option.area;
}

export function FinishVisualizer() {
  const [selectedName, setSelectedName] = useState(flakeOptions[0].name);
  const [selectedBoard, setSelectedBoard] = useState(0);

  const selectedOption = useMemo(
    () => flakeOptions.find((option) => option.name === selectedName) ?? flakeOptions[0],
    [selectedName]
  );

  function selectFlake(option: FlakeOption, boardIndex: number) {
    setSelectedName(option.name);
    setSelectedBoard(boardIndex);
  }

  return (
    <>
      <section className="floor-visualizer-strip" id="visualizer" aria-label="Floor visualizer">
        <div className="visualizer-copy">
          <span className="visualizer-kicker">Floor Visualizer by Torginol</span>
          <h2>See Your Floor Before You Build It.</h2>
          <p>Pick a finish below, compare flake colors, then open the visualizer to preview the look in a real garage or commercial space.</p>
          <div className="visualizer-actions">
            <a className="blue-button" href="https://torginol.com/design" target="_blank" rel="noreferrer">Try Floor Visualizer</a>
            <a className="blue-button outline" href="#color-chart">Explore Flake Chart</a>
          </div>
        </div>
        <div className="visualizer-preview" style={finishStyle(selectedOption)} aria-label={`${selectedOption.name} flake preview`}>
          <div className="visualizer-garage" aria-hidden="true">
            <div className="visualizer-wall" />
            <div className="visualizer-floor" />
          </div>
          <div className="visualizer-caption">
            <strong>{selectedOption.name}</strong>
            <span>{selectedOption.code}</span>
          </div>
        </div>
      </section>

      <section className="xps-flake-chart-section" id="color-chart" aria-label="Interactive XPS flake color chart">
        <div className="xps-flake-info">
          <span className="xps-flake-kicker">Flake</span>
          <h2>Top 12 Epoxy Flake Colors</h2>
          <p>Tap a chart card to open a clean popup square. The chart itself stays clear with no hover color over the image.</p>
          <div className="selected-flake-card" style={finishStyle(selectedOption)} aria-live="polite">
            <span>Selected Flake</span>
            <strong>{selectedOption.name}</strong>
            <small>{selectedOption.code} / Rank {selectedOption.rank}</small>
            <div className="selected-flake-swatch" aria-hidden="true" />
          </div>
          <a className="blue-button" href="#estimate">Get Quote With {selectedOption.name}</a>
        </div>

        <div className="xps-chart-board">
          <div className="xps-chart-board-grid">
            {chartBoards.map((board, boardIndex) => (
              <div className="xps-chart-frame" key={board}>
                <img src={flakeChartImage} alt="XPS top 12 epoxy flake colors chart" />
                {flakeOptions.map((option) => {
                  const isSelected = boardIndex === selectedBoard && option.name === selectedOption.name;

                  return (
                    <button
                      key={`${board}-${option.name}`}
                      type="button"
                      className={`xps-chart-hotspot ${isSelected ? "selected" : ""}`}
                      style={hotspotStyle(option)}
                      aria-pressed={isSelected}
                      aria-label={`Select ${option.name} ${option.code}`}
                      onClick={() => selectFlake(option, boardIndex)}
                    />
                  );
                })}
                {boardIndex === selectedBoard && (
                  <div className="xps-color-popup" style={finishStyle(selectedOption)} aria-hidden="true">
                    <div className="xps-color-popup-square" />
                    <strong>{selectedOption.name}</strong>
                    <span>{selectedOption.code}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
