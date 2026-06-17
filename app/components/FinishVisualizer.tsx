"use client";

import { CSSProperties, useMemo, useState } from "react";

type ChartId = "flake" | "metallic" | "quartz" | "solid" | "glitter" | "stain";
type ChartKind = "image" | "generated";

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
  kind: ChartKind;
  title: string;
  subtitle: string;
  width?: number;
  height?: number;
  image?: string;
  alt?: string;
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

function colorOption(name: string, code: string | undefined, palette: [string, string, string, string]): ChartOption {
  return { name, code, palette, area: gridArea(0) };
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

const solidOptions: ChartOption[] = [
  colorOption("White", "FLV-0060", ["#f2f0ec", "#ffffff", "#d7d7d1", "#f9f8f4"]),
  colorOption("Light Gray", "FLV-2000", ["#c9ced1", "#dce1e2", "#aeb5ba", "#f4f5f4"]),
  colorOption("Medium Gray", "FLV-2010", ["#aaaeb4", "#c0c3c8", "#868b91", "#e2e3e4"]),
  colorOption("Cement Gray", "FLV-2040", ["#9aa5ad", "#b4bdc4", "#76828a", "#d7dce0"]),
  colorOption("Natural Gray", "FLV-2030", ["#a5a9ae", "#c2c5c8", "#85898f", "#e0e1e2"]),
  colorOption("Warm Gray", "FLV-2020", ["#aaa9a2", "#c5c3ba", "#85847c", "#e2e0d7"]),
  colorOption("Dark Gray", "FLV-2060", ["#7d858b", "#969da3", "#5e666b", "#c7ccd0"]),
  colorOption("Charcoal", "FLV-2070", ["#626a70", "#7d858b", "#42494f", "#b2b8bc"]),
  colorOption("Black", "FLV-9990", ["#101115", "#2d2f34", "#000000", "#73767c"]),
  colorOption("Beige", "FLV-1000", ["#d1b6a7", "#e4cdbc", "#b49280", "#f0ded2"]),
  colorOption("Tan", "FLV-1020", ["#aa9682", "#c2ae9a", "#887562", "#ddccbc"]),
  colorOption("Khaki", "FLV-1050", ["#a59282", "#bca998", "#827061", "#d8c8b8"]),
  colorOption("Toffee", "FLV-1080", ["#908780", "#aaa19a", "#6e6661", "#cfc7c0"]),
  colorOption("Safety Yellow", "FLV-6010", ["#f3b407", "#ffc728", "#cf9300", "#ffe08a"]),
  colorOption("Mint Green", "FLV-5000", ["#bdd8d8", "#d0e7e5", "#92b5b6", "#effafa"]),
  colorOption("Kelly Green", "FLV-5030", ["#7ea247", "#97ba5e", "#5e7e2f", "#c4dc90"]),
  colorOption("Bright Green", "FLV-5050", ["#08a37c", "#24bd96", "#007c5e", "#80d7c2"]),
  colorOption("Forest Green", "FLV-5080", ["#527765", "#6f927d", "#385948", "#a3bcae"]),
  colorOption("Light Blue", "FLV-7000", ["#9bc9da", "#b6dcec", "#72a8bd", "#d8f0f7"]),
  colorOption("Neutral Blue", "FLV-7040", ["#6d8aa0", "#86a3b9", "#4d6a80", "#b9cedc"]),
  colorOption("Deep Blue", "FLV-7070", ["#14085e", "#2a197b", "#07022d", "#6251b1"]),
  colorOption("Brick Red", "FLV-8070", ["#8d3933", "#a94e45", "#64241f", "#d28d83"]),
  colorOption("Safety Red", "FLV-8320", ["#bd2530", "#dc3d4a", "#8f1520", "#ee8990"])
];

const glitterOptions: ChartOption[] = [
  colorOption("Clear Radiance", "Glitter", ["#f7fbff", "#cfdbe6", "#ffffff", "#eff6ff"]),
  colorOption("Silver Sparkle", "Glitter", ["#bcc7d4", "#f4f7fb", "#7e8b98", "#d9e2eb"]),
  colorOption("Azalea", "Glitter", ["#c1167e", "#f04bb0", "#7e064b", "#ff94d6"]),
  colorOption("Red Dragon", "Glitter", ["#b6203c", "#eb5368", "#7d0d22", "#ff9aa6"]),
  colorOption("Victorian Red", "Glitter", ["#9b1d22", "#c4484d", "#661014", "#e49a94"]),
  colorOption("Red Hots", "Glitter", ["#bd2744", "#e45b73", "#7e1029", "#f5a2b0"]),
  colorOption("Rusty Penny", "Glitter", ["#a65a37", "#ce835b", "#6b2d17", "#e3ae8b"]),
  colorOption("Orange Citrus", "Glitter", ["#b7633d", "#df8b5e", "#7b381d", "#f2b88e"]),
  colorOption("True Copper", "Glitter", ["#b06a49", "#dc9b75", "#753c24", "#f0c6a6"]),
  colorOption("Storybrooke Brown", "Glitter", ["#60453c", "#8b6c61", "#2f211d", "#b89d91"]),
  colorOption("Peach Fuzz", "Glitter", ["#c08c62", "#e3ba8a", "#8a5832", "#f2d5ab"]),
  colorOption("Nutmeg", "Glitter", ["#9a7149", "#c19964", "#6a4829", "#dfc08b"]),
  colorOption("Desert Sand", "Glitter", ["#b4935b", "#d4bb7e", "#806336", "#ead8aa"]),
  colorOption("Sandstone Gold", "Glitter", ["#b79c54", "#dcc677", "#806d2f", "#f1dda0"]),
  colorOption("Crown", "Glitter", ["#c8a428", "#f0cf48", "#806410", "#ffe17c"]),
  colorOption("Sunstruck Gold", "Glitter", ["#d0aa1b", "#f5d43d", "#92730c", "#ffe982"])
];

const stainOptions: ChartOption[] = [
  colorOption("Gold", "Ameripolish", ["#b98222", "#dca947", "#795213", "#edc872"]),
  colorOption("Sand", "Ameripolish", ["#ccb58e", "#e0c9a3", "#9d8057", "#f1dfbe"]),
  colorOption("Raw Sienna", "Ameripolish", ["#ad6e2c", "#ce8e4c", "#7a4216", "#e7b77e"]),
  colorOption("Terra Cotta", "Ameripolish", ["#a04b32", "#c76d51", "#67301e", "#e19a82"]),
  colorOption("Caramel", "Ameripolish", ["#b46f2d", "#d9934f", "#7d4215", "#e7b67c"]),
  colorOption("Mahogany", "Ameripolish", ["#673020", "#8b4b38", "#3d1a10", "#b48272"]),
  colorOption("Saddle Brown", "Ameripolish", ["#6c3f22", "#9a6843", "#3f2413", "#c49c72"]),
  colorOption("Burnt Sienna", "Ameripolish", ["#8e4a23", "#b36c3c", "#5b2b13", "#d79a6a"]),
  colorOption("Chestnut", "Ameripolish", ["#6f3d22", "#9a6040", "#422113", "#c79370"]),
  colorOption("Walnut", "Ameripolish", ["#55351f", "#7c563a", "#2f1e12", "#ad8665"]),
  colorOption("Chocolate Brown", "Ameripolish", ["#3e291e", "#604232", "#221710", "#987667"]),
  colorOption("Sepia", "Ameripolish", ["#4b3c2a", "#74634b", "#292013", "#a9977a"]),
  colorOption("Maroon", "Ameripolish", ["#60233a", "#8d435d", "#381020", "#bb7c93"]),
  colorOption("Eggplant", "Ameripolish", ["#3d253f", "#67476a", "#221326", "#9a7aa0"]),
  colorOption("Slate Blue", "Ameripolish", ["#556d7a", "#7892a1", "#344651", "#adc1cb"]),
  colorOption("Patriot Blue", "Ameripolish", ["#203a6b", "#42659a", "#101d39", "#7f9dc5"]),
  colorOption("Turquoise", "Ameripolish", ["#0f9a91", "#35c0b6", "#08645f", "#8be0d9"]),
  colorOption("Green", "Ameripolish", ["#4f8a41", "#72aa5d", "#2d5725", "#aad293"]),
  colorOption("Pine Green", "Ameripolish", ["#23563e", "#3f765a", "#123223", "#7eaa91"]),
  colorOption("Forest Green", "Ameripolish", ["#183e2d", "#355e48", "#0b2117", "#73917f"]),
  colorOption("Midnight Black", "Ameripolish", ["#141414", "#333333", "#000000", "#777777"]),
  colorOption("Black", "Ameripolish", ["#050505", "#242424", "#000000", "#646464"]),
  colorOption("Gray", "Ameripolish", ["#737778", "#969b9c", "#4b4f50", "#c4c8c9"]),
  colorOption("Red", "Ameripolish", ["#9e2430", "#c94653", "#64131b", "#e28b95"])
];

const chartBoards: ChartBoard[] = [
  {
    id: "flake",
    kind: "image",
    title: "Top Flake Colors",
    subtitle: "Full-broadcast flake finish options.",
    width: 1536,
    height: 2048,
    image: flakeChartImage,
    alt: "XPS top 12 epoxy flake color chart",
    options: flakeOptions
  },
  {
    id: "metallic",
    kind: "image",
    title: "Top Metallic Colors",
    subtitle: "Decorative metallic epoxy finish options.",
    width: 1536,
    height: 2048,
    image: metallicChartImage,
    alt: "XPS top metallic colors chart",
    options: metallicOptions
  },
  {
    id: "quartz",
    kind: "image",
    title: "Top Quartz Colors",
    subtitle: "Quartz texture finish options.",
    width: 1536,
    height: 2048,
    image: quartzChartImage,
    alt: "XPS top quartz colors chart",
    options: quartzOptions
  },
  {
    id: "solid",
    kind: "generated",
    title: "Solid Color Epoxy Base Coats",
    subtitle: "Solid color epoxy is typically used as the base coat during the application process.",
    options: solidOptions
  },
  {
    id: "glitter",
    kind: "generated",
    title: "Top Glitter Additives",
    subtitle: "Glitter is an additive, but it can also be used to create an overall sparkle look.",
    options: glitterOptions
  },
  {
    id: "stain",
    kind: "generated",
    title: "Concrete Dye & Stain Colors",
    subtitle: "Concrete dye and stain options for polished or decorative concrete color direction.",
    options: stainOptions
  }
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
  const chartWidth = chart.width ?? 1536;
  const chartHeight = chart.height ?? 2048;
  const left = parseFloat(option.area.left);
  const top = parseFloat(option.area.top);
  const width = parseFloat(option.area.width);
  const height = parseFloat(option.area.height);
  const cropWidth = (width / 100) * chartWidth;
  const cropHeight = (height / 100) * chartHeight;

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
                  <div className="xps-chart-image-shell" data-chart={board.id} onPointerLeave={() => clearSample(board)}>
                    {board.kind === "image" ? (
                      <>
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
                      </>
                    ) : (
                      <div className="xps-generated-chart" data-chart={board.id}>
                        <div className="xps-generated-topbar">
                          <span>Color Charts</span>
                          <span className="xps-generated-icon" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
                        </div>
                        <div className="xps-generated-content">
                          <h3>{board.title}</h3>
                          <p>{board.subtitle}</p>
                          <div className="xps-generated-swatches">
                            {board.options.map((option) => {
                              const selected = isSelected(board, option);

                              return (
                                <button
                                  key={`${board.id}-${option.name}`}
                                  type="button"
                                  className={`xps-generated-swatch ${selected ? "selected" : ""}`}
                                  style={finishStyle(option)}
                                  aria-pressed={selected}
                                  aria-label={`Enlarge ${option.name}${option.code ? ` ${option.code}` : ""}`}
                                  onClick={() => selectSample(board, option)}
                                >
                                  <span className="xps-swatch-tile" aria-hidden="true" />
                                  <span className="xps-swatch-label">
                                    <strong>{option.name}</strong>
                                    {option.code ? <small>{option.code}</small> : null}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        {board.options.map((option) => (
                          isSelected(board, option) ? (
                            <div
                              className={`xps-generated-popup ${board.id}`}
                              style={finishStyle(option)}
                              aria-label={`${option.name} enlarged sample`}
                              key={`${board.id}-${option.name}-popup`}
                            >
                              <span className="xps-color-popup-label">{option.name}</span>
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}
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
