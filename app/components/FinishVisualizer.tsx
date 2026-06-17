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

const flakeChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-12-epoxy-flake-color-chart.png?v=1781666861";
const metallicChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-xtreme-metallic-color-chart.webp?v=1781668409";
const quartzChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-quartz-sand-epoxy-color-chart.webp?v=1781668402";

const flakeAreas = {
  col1: "6.6%",
  col2: "38.3%",
  col3: "70.0%",
  row1: "16.9%",
  row2: "36.3%",
  row3: "55.9%",
  row4: "75.3%",
  width: "25.7%",
  height: "11.4%"
};

const metallicAreas = {
  col1: "12.55%",
  col2: "27.95%",
  col3: "43.45%",
  col4: "58.90%",
  col5: "74.25%",
  row1: "15.10%",
  row2: "28.42%",
  row3: "41.82%",
  row4: "64.48%",
  row5: "77.94%",
  width: "14.50%",
  height: "11.15%"
};

const quartzAreas = {
  col1: "10.10%",
  col2: "38.00%",
  col3: "66.00%",
  row1: "25.05%",
  row2: "48.15%",
  row3: "71.50%",
  width: "23.95%",
  height: "18.45%"
};

function area(left: string, top: string, width: string, height: string): ChartArea {
  return { left, top, width, height };
}

const flakeOptions: ChartOption[] = [
  { name: "Gravel", code: "FB-414", palette: ["#23303a", "#6f7f87", "#c9d0d2", "#f3f1e8"], area: area(flakeAreas.col1, flakeAreas.row1, flakeAreas.width, flakeAreas.height) },
  { name: "Outback", code: "FB-517", palette: ["#2d2118", "#7d583a", "#c99e68", "#efe2c7"], area: area(flakeAreas.col2, flakeAreas.row1, flakeAreas.width, flakeAreas.height) },
  { name: "Quicksilver", code: "FB-424", palette: ["#111a1c", "#566164", "#a8b2b1", "#f0f2ef"], area: area(flakeAreas.col3, flakeAreas.row1, flakeAreas.width, flakeAreas.height) },
  { name: "Safari", code: "FB-504", palette: ["#292517", "#776543", "#c7b27b", "#f3e7c2"], area: area(flakeAreas.col1, flakeAreas.row2, flakeAreas.width, flakeAreas.height) },
  { name: "Wombat", code: "FB-616", palette: ["#1d1f1f", "#6d6a60", "#aaa596", "#e4ddcf"], area: area(flakeAreas.col2, flakeAreas.row2, flakeAreas.width, flakeAreas.height) },
  { name: "Stonehenge", code: "FB-427", palette: ["#14191d", "#7b898c", "#ccd7d7", "#f2f5ed"], area: area(flakeAreas.col3, flakeAreas.row2, flakeAreas.width, flakeAreas.height) },
  { name: "Rapids", code: "FB-506", palette: ["#173343", "#4b8aa0", "#bdc7bd", "#d8caa7"], area: area(flakeAreas.col1, flakeAreas.row3, flakeAreas.width, flakeAreas.height) },
  { name: "Creekbed", code: "FB-716", palette: ["#272016", "#756241", "#bda16a", "#e7d4ad"], area: area(flakeAreas.col2, flakeAreas.row3, flakeAreas.width, flakeAreas.height) },
  { name: "Domino", code: "FB-411", palette: ["#050505", "#ffffff", "#8f989f", "#d8dde1"], area: area(flakeAreas.col3, flakeAreas.row3, flakeAreas.width, flakeAreas.height) },
  { name: "Shoreline", code: "FB-421", palette: ["#172a34", "#738990", "#c4c8b9", "#e8ddc2"], area: area(flakeAreas.col1, flakeAreas.row4, flakeAreas.width, flakeAreas.height) },
  { name: "Orbit", code: "FB-310", palette: ["#111821", "#5d6e77", "#bdc8d2", "#eef3f6"], area: area(flakeAreas.col2, flakeAreas.row4, flakeAreas.width, flakeAreas.height) },
  { name: "Snowfall", code: "FB-602", palette: ["#4b5754", "#87938f", "#c9d1cc", "#f5f7f1"], area: area(flakeAreas.col3, flakeAreas.row4, flakeAreas.width, flakeAreas.height) }
];

const metallicOptions: ChartOption[] = [
  { name: "Arizona Gold", palette: ["#6d4510", "#b97818", "#dfad31", "#f2d167"], area: area(metallicAreas.col1, metallicAreas.row1, metallicAreas.width, metallicAreas.height) },
  { name: "Autumn Blaze", palette: ["#5a2117", "#9e432c", "#c66e41", "#e19a64"], area: area(metallicAreas.col2, metallicAreas.row1, metallicAreas.width, metallicAreas.height) },
  { name: "Cappuccino", palette: ["#2a1d13", "#5b3b20", "#8a6537", "#b48c54"], area: area(metallicAreas.col3, metallicAreas.row1, metallicAreas.width, metallicAreas.height) },
  { name: "Caribbean Blue", palette: ["#142b64", "#214fb0", "#426ccd", "#7894d8"], area: area(metallicAreas.col4, metallicAreas.row1, metallicAreas.width, metallicAreas.height) },
  { name: "Chestnut", palette: ["#2b130d", "#5b2717", "#7f3b20", "#a35b36"], area: area(metallicAreas.col5, metallicAreas.row1, metallicAreas.width, metallicAreas.height) },
  { name: "Copper", palette: ["#5b331a", "#946234", "#b6864e", "#d4b07c"], area: area(metallicAreas.col1, metallicAreas.row2, metallicAreas.width, metallicAreas.height) },
  { name: "Galaxy Blue", palette: ["#24444b", "#477c83", "#76a7ad", "#a7ced1"], area: area(metallicAreas.col2, metallicAreas.row2, metallicAreas.width, metallicAreas.height) },
  { name: "Merlot", palette: ["#4a0f28", "#8a1742", "#bd285b", "#de5e85"], area: area(metallicAreas.col3, metallicAreas.row2, metallicAreas.width, metallicAreas.height) },
  { name: "Purple Haze", palette: ["#443144", "#73556d", "#9a788f", "#c7abbc"], area: area(metallicAreas.col4, metallicAreas.row2, metallicAreas.width, metallicAreas.height) },
  { name: "Quick Silver", palette: ["#4b4f4f", "#8b9290", "#c2c6c3", "#f1f1ef"], area: area(metallicAreas.col5, metallicAreas.row2, metallicAreas.width, metallicAreas.height) },
  { name: "Sterling", palette: ["#6e7473", "#9fa4a3", "#cfd2d1", "#f5f5f3"], area: area(metallicAreas.col1, metallicAreas.row3, metallicAreas.width, metallicAreas.height) },
  { name: "Tuscan Sun", palette: ["#714019", "#a8662c", "#d49552", "#efc27e"], area: area(metallicAreas.col2, metallicAreas.row3, metallicAreas.width, metallicAreas.height) },
  { name: "Blurple", palette: ["#1e2d4f", "#425481", "#69759a", "#9da5bb"], area: area(metallicAreas.col1, metallicAreas.row4, metallicAreas.width, metallicAreas.height) },
  { name: "Burlywood", palette: ["#3f291a", "#735131", "#9a7a50", "#c9ae82"], area: area(metallicAreas.col2, metallicAreas.row4, metallicAreas.width, metallicAreas.height) },
  { name: "Celestial Blue", palette: ["#183040", "#315a6f", "#5e8190", "#99b5bd"], area: area(metallicAreas.col3, metallicAreas.row4, metallicAreas.width, metallicAreas.height) },
  { name: "Cerulean Blue", palette: ["#1d5c64", "#43858d", "#72aeb3", "#aad6d9"], area: area(metallicAreas.col4, metallicAreas.row4, metallicAreas.width, metallicAreas.height) },
  { name: "Cinnabar", palette: ["#4b160b", "#8c321a", "#b14b29", "#d77951"], area: area(metallicAreas.col5, metallicAreas.row4, metallicAreas.width, metallicAreas.height) },
  { name: "Mango Tango", palette: ["#5b2a0d", "#9b551b", "#c8812a", "#e7b456"], area: area(metallicAreas.col1, metallicAreas.row5, metallicAreas.width, metallicAreas.height) },
  { name: "Mayan Gold", palette: ["#7a4a16", "#aa7627", "#d3a441", "#f0ce79"], area: area(metallicAreas.col2, metallicAreas.row5, metallicAreas.width, metallicAreas.height) },
  { name: "Onyx", palette: ["#050505", "#1a1f1f", "#444b4a", "#7e8584"], area: area(metallicAreas.col3, metallicAreas.row5, metallicAreas.width, metallicAreas.height) },
  { name: "Perfect Storm", palette: ["#27302c", "#4c645b", "#759081", "#b7c7b7"], area: area(metallicAreas.col4, metallicAreas.row5, metallicAreas.width, metallicAreas.height) },
  { name: "Sequoia", palette: ["#321916", "#5d322c", "#80514b", "#a87870"], area: area(metallicAreas.col5, metallicAreas.row5, metallicAreas.width, metallicAreas.height) }
];

const quartzOptions: ChartOption[] = [
  { name: "Limestone Quartz", palette: ["#b7bdbd", "#d5dada", "#f1f2ef", "#8e999a"], area: area(quartzAreas.col1, quartzAreas.row1, quartzAreas.width, quartzAreas.height) },
  { name: "Slate Quartz", palette: ["#9aa7ac", "#c6d2d7", "#e8ecea", "#647278"], area: area(quartzAreas.col2, quartzAreas.row1, quartzAreas.width, quartzAreas.height) },
  { name: "Flint Quartz", palette: ["#81898d", "#b3babf", "#d7dadd", "#4d585d"], area: area(quartzAreas.col3, quartzAreas.row1, quartzAreas.width, quartzAreas.height) },
  { name: "Evening Quartz", palette: ["#5e6868", "#8a9491", "#c1c6bd", "#e7e5d6"], area: area(quartzAreas.col1, quartzAreas.row2, quartzAreas.width, quartzAreas.height) },
  { name: "Cobblestone Quartz", palette: ["#aaa3a0", "#d5cfca", "#eee9df", "#85807c"], area: area(quartzAreas.col2, quartzAreas.row2, quartzAreas.width, quartzAreas.height) },
  { name: "Mojave Quartz", palette: ["#b6a994", "#d7cbb8", "#eee1cb", "#8d806c"], area: area(quartzAreas.col3, quartzAreas.row2, quartzAreas.width, quartzAreas.height) },
  { name: "Sandstone Quartz", palette: ["#9f917c", "#c7b9a2", "#e8ddc8", "#756854"], area: area(quartzAreas.col1, quartzAreas.row3, quartzAreas.width, quartzAreas.height) },
  { name: "Blue Moon Quartz", palette: ["#7ca4b3", "#a9c7d3", "#d4e3e7", "#557584"], area: area(quartzAreas.col2, quartzAreas.row3, quartzAreas.width, quartzAreas.height) },
  { name: "Brick Quartz", palette: ["#8b4d42", "#b87868", "#d6a293", "#64322c"], area: area(quartzAreas.col3, quartzAreas.row3, quartzAreas.width, quartzAreas.height) }
];

const chartBoards: ChartBoard[] = [
  { id: "flake", width: 1536, height: 2048, image: flakeChartImage, alt: "XPS top 12 epoxy flake color chart", options: flakeOptions },
  { id: "metallic", width: 1275, height: 1650, image: metallicChartImage, alt: "XPS Xtreme metallic color chart", options: metallicOptions },
  { id: "quartz", width: 1583, height: 2048, image: quartzChartImage, alt: "XPS quartz sand system color chart", options: quartzOptions }
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
        <div className="xps-chart-board">
          <div className="xps-chart-board-grid">
            {chartBoards.map((board) => {
              const boardIsActive = selectedSample?.boardId === board.id;

              return (
                <div className={`xps-chart-frame ${boardIsActive ? "active" : ""}`} key={board.id}>
                  <div className="xps-chart-image-shell">
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
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
