"use client";

import { CSSProperties, useMemo, useState } from "react";

type ChartId = "flake" | "metallic" | "quartz";

type ChartArea = {
  left: string;
  top: string;
  width: string;
  height: string;
};

type ChartOption = {
  name: string;
  code?: string;
  palette: [string, string, string, string];
  area: ChartArea;
};

type ChartBoard = {
  id: ChartId;
  width: number;
  height: number;
  image: string;
  alt: string;
  options: ChartOption[];
};

type SelectedSample = {
  boardId: ChartId;
  optionName: string;
} | null;

type FinishStyle = CSSProperties & Record<string, string>;

const flakeChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-flake-colors-approved.png?v=1781670774";
const metallicChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-metallic-colors-standardized.png?v=1781670766";
const quartzChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-quartz-colors-standardized.png?v=1781670783";

const chartAreas = {
  col1: "6.64%",
  col2: "38.35%",
  col3: "70.05%",
  row1: "16.94%",
  row2: "36.38%",
  row3: "55.81%",
  row4: "75.24%",
  width: "25.65%",
  height: "11.23%"
};

function area(left: string, top: string, width = chartAreas.width, height = chartAreas.height): ChartArea {
  return { left, top, width, height };
}

function gridArea(index: number): ChartArea {
  const columns = [chartAreas.col1, chartAreas.col2, chartAreas.col3];
  const rows = [chartAreas.row1, chartAreas.row2, chartAreas.row3, chartAreas.row4];
  return area(columns[index % 3], rows[Math.floor(index / 3)]);
}

const flakeOptions: ChartOption[] = [
  { name: "Gravel", code: "FB-414", palette: ["#23303a", "#6f7f87", "#c9d0d2", "#f3f1e8"], area: gridArea(0) },
  { name: "Outback", code: "FB-517", palette: ["#2d2118", "#7d583a", "#c99e68", "#efe2c7"], area: gridArea(1) },
  { name: "Quicksilver", code: "FB-424", palette: ["#111a1c", "#566164", "#a8b2b1", "#f0f2ef"], area: gridArea(2) },
  { name: "Safari", code: "FB-504", palette: ["#292517", "#776543", "#c7b27b", "#f3e7c2"], area: gridArea(3) },
  { name: "Wombat", code: "FB-616", palette: ["#1d1f1f", "#6d6a60", "#aaa596", "#e4ddcf"], area: gridArea(4) },
  { name: "Stonehenge", code: "FB-427", palette: ["#14191d", "#7b898c", "#ccd7d7", "#f2f5ed"], area: gridArea(5) },
  { name: "Rapids", code: "FB-506", palette: ["#173343", "#4b8aa0", "#bdc7bd", "#d8caa7"], area: gridArea(6) },
  { name: "Creekbed", code: "FB-716", palette: ["#272016", "#756241", "#bda16a", "#e7d4ad"], area: gridArea(7) },
  { name: "Domino", code: "FB-411", palette: ["#050505", "#ffffff", "#8f989f", "#d8dde1"], area: gridArea(8) },
  { name: "Shoreline", code: "FB-421", palette: ["#172a34", "#738990", "#c4c8b9", "#e8ddc2"], area: gridArea(9) },
  { name: "Orbit", code: "FB-310", palette: ["#111821", "#5d6e77", "#bdc8d2", "#eef3f6"], area: gridArea(10) },
  { name: "Snowfall", code: "FB-602", palette: ["#4b5754", "#87938f", "#c9d1cc", "#f5f7f1"], area: gridArea(11) }
];

const metallicOptions: ChartOption[] = [
  { name: "Arizona Gold", palette: ["#6d4510", "#b97818", "#dfad31", "#f2d167"], area: gridArea(0) },
  { name: "Autumn Blaze", palette: ["#5a2117", "#9e432c", "#c66e41", "#e19a64"], area: gridArea(1) },
  { name: "Cappuccino", palette: ["#2a1d13", "#5b3b20", "#8a6537", "#b48c54"], area: gridArea(2) },
  { name: "Caribbean Blue", palette: ["#142b64", "#214fb0", "#426ccd", "#7894d8"], area: gridArea(3) },
  { name: "Chestnut", palette: ["#2b130d", "#5b2717", "#7f3b20", "#a35b36"], area: gridArea(4) },
  { name: "Copper", palette: ["#5b331a", "#946234", "#b6864e", "#d4b07c"], area: gridArea(5) },
  { name: "Galaxy Blue", palette: ["#24444b", "#477c83", "#76a7ad", "#a7ced1"], area: gridArea(6) },
  { name: "Merlot", palette: ["#4a0f28", "#8a1742", "#bd285b", "#de5e85"], area: gridArea(7) },
  { name: "Purple Haze", palette: ["#443144", "#73556d", "#9a788f", "#c7abbc"], area: gridArea(8) },
  { name: "Quick Silver", palette: ["#4b4f4f", "#8b9290", "#c2c6c3", "#f1f1ef"], area: gridArea(9) },
  { name: "Sterling", palette: ["#6e7473", "#9fa4a3", "#cfd2d1", "#f5f5f3"], area: gridArea(10) },
  { name: "Tuscan Sun", palette: ["#714019", "#a8662c", "#d49552", "#efc27e"], area: gridArea(11) }
];

const quartzOptions: ChartOption[] = [
  { name: "Limestone", code: "Quartz", palette: ["#b7bdbd", "#d5dada", "#f1f2ef", "#8e999a"], area: gridArea(0) },
  { name: "Slate", code: "Quartz", palette: ["#9aa7ac", "#c6d2d7", "#e8ecea", "#647278"], area: gridArea(1) },
  { name: "Flint", code: "Quartz", palette: ["#81898d", "#b3babf", "#d7dadd", "#4d585d"], area: gridArea(2) },
  { name: "Evening", code: "Quartz", palette: ["#5e6868", "#8a9491", "#c1c6bd", "#e7e5d6"], area: gridArea(3) },
  { name: "Cobblestone", code: "Quartz", palette: ["#aaa3a0", "#d5cfca", "#eee9df", "#85807c"], area: gridArea(4) },
  { name: "Mojave", code: "Quartz", palette: ["#b6a994", "#d7cbb8", "#eee1cb", "#8d806c"], area: gridArea(5) },
  { name: "Sandstone", code: "Quartz", palette: ["#9f917c", "#c7b9a2", "#e8ddc8", "#756854"], area: gridArea(6) },
  { name: "Blue Moon", code: "Quartz", palette: ["#7ca4b3", "#a9c7d3", "#d4e3e7", "#557584"], area: gridArea(7) },
  { name: "Brick", code: "Quartz", palette: ["#8b4d42", "#b87868", "#d6a293", "#64322c"], area: gridArea(8) }
];

const chartBoards: ChartBoard[] = [
  { id: "flake", width: 1536, height: 2048, image: flakeChartImage, alt: "XPS top 12 epoxy flake color chart", options: flakeOptions },
  { id: "metallic", width: 1536, height: 2048, image: metallicChartImage, alt: "XPS top metallic colors chart", options: metallicOptions },
  { id: "quartz", width: 1536, height: 2048, image: quartzChartImage, alt: "XPS top quartz colors chart", options: quartzOptions }
];

function finishStyle(option: ChartOption): FinishStyle {
  return {
    "--tone-a": option.palette[0],
    "--tone-b": option.palette[1],
    "--tone-c": option.palette[2],
    "--tone-d": option.palette[3]
  };
}

function hotspotStyle(option: ChartOption): CSSProperties {
  return option.area;
}

function popupStyle(chart: ChartBoard, option: ChartOption): CSSProperties {
  const left = parseFloat(option.area.left);
  const top = parseFloat(option.area.top);
  const width = parseFloat(option.area.width);
  const height = parseFloat(option.area.height);
  const cropWidth = (width / 100) * chart.width;
  const cropHeight = (height / 100) * chart.height;

  return {
    left: `${left + width / 2}%`,
    top: `${top + height / 2}%`,
    aspectRatio: `${cropWidth} / ${cropHeight}`
  };
}

function popupImageStyle(option: ChartOption): CSSProperties {
  const left = parseFloat(option.area.left);
  const top = parseFloat(option.area.top);
  const width = parseFloat(option.area.width);
  const height = parseFloat(option.area.height);

  return {
    width: `${100 / width * 100}%`,
    height: `${100 / height * 100}%`,
    left: `-${left / width * 100}%`,
    top: `-${top / height * 100}%`
  };
}

export function FinishVisualizer() {
  const [selectedSample, setSelectedSample] = useState<SelectedSample>(null);

  const selectedOption = useMemo(() => {
    if (!selectedSample) {
      return flakeOptions[0];
    }

    const selectedBoard = chartBoards.find((board) => board.id === selectedSample.boardId);
    return selectedBoard?.options.find((option) => option.name === selectedSample.optionName) ?? flakeOptions[0];
  }, [selectedSample]);

  function isSelected(board: ChartBoard, option: ChartOption) {
    return selectedSample?.boardId === board.id && selectedSample.optionName === option.name;
  }

  function selectSample(board: ChartBoard, option: ChartOption) {
    setSelectedSample({ boardId: board.id, optionName: option.name });
  }

  function clearSample(board: ChartBoard) {
    if (selectedSample?.boardId === board.id) {
      setSelectedSample(null);
    }
  }

  return (
    <>
      <section className="floor-visualizer-strip" id="visualizer" aria-label="Floor visualizer">
        <div className="visualizer-copy">
          <span className="visualizer-kicker">Floor Visualizer by Torginol</span>
          <h2>See Your Floor Before You Build It.</h2>
          <p>Tap an exact sample square below, then open the visualizer to preview the selected flake, metallic, or quartz direction.</p>
          <div className="visualizer-actions">
            <a className="blue-button" href="https://torginol.com/design" target="_blank" rel="noreferrer">Try Floor Visualizer</a>
            <a className="blue-button outline" href="#color-chart">Explore Color Charts</a>
          </div>
        </div>
        <div className="visualizer-preview" style={finishStyle(selectedOption)} aria-label={`${selectedOption.name} preview`}>
          <div className="visualizer-garage" aria-hidden="true">
            <div className="visualizer-wall" />
            <div className="visualizer-floor" />
          </div>
          <div className="visualizer-caption">
            <strong>{selectedOption.name}</strong>
            {selectedOption.code ? <span>{selectedOption.code}</span> : <span>Selected sample</span>}
          </div>
        </div>
      </section>

      <section className="xps-flake-chart-section" id="color-chart" aria-label="Interactive epoxy color charts">
        <div className="xps-custom-color-note">
          <strong>Don&apos;t see your color?</strong>
          <span>Contact us, we have many other custom colors perfect for you!</span>
        </div>
        <div className="xps-chart-board">
          <div className="xps-chart-board-grid">
            {chartBoards.map((board) => {
              const boardIsActive = selectedSample?.boardId === board.id;

              return (
                <div className={`xps-chart-frame ${boardIsActive ? "active" : ""}`} key={board.id}>
                  <div className="xps-chart-image-shell" onPointerLeave={() => clearSample(board)}>
                    <img src={board.image} alt={board.alt} />
                    {board.options.map((option) => {
                      const selected = isSelected(board, option);

                      return (
                        <button
                          key={`${board.id}-${option.name}`}
                          type="button"
                          className={`xps-chart-hotspot ${selected ? "selected" : ""}`}
                          style={hotspotStyle(option)}
                          aria-pressed={selected}
                          aria-label={`Enlarge ${option.name}${option.code ? ` ${option.code}` : ""}`}
                          onClick={() => selectSample(board, option)}
                        >
                          <span>{option.name}</span>
                        </button>
                      );
                    })}
                    {board.options.map((option) => (
                      isSelected(board, option) ? (
                        <div
                          className="xps-color-popup"
                          style={popupStyle(board, option)}
                          aria-label={`${option.name} enlarged sample`}
                          key={`${board.id}-${option.name}-popup`}
                        >
                          <img src={board.image} alt="" style={popupImageStyle(option)} aria-hidden="true" />
                          <span className="xps-color-popup-label">{option.name}</span>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="xps-chart-disclaimer">
            Due to computer screen differences, some colors may slightly differ in person, and especially when sealer is applied which may give it a &quot;wet look&quot; which enrichens the color.
          </p>
        </div>
      </section>
    </>
  );
}
