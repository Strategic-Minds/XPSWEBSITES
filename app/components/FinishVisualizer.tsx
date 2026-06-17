"use client";

import { CSSProperties, useMemo, useState } from "react";

type ChartId = "flake" | "metallic" | "quartz" | "solid" | "glitter" | "stain";

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
  title: string;
  subtitle: string;
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
const solidChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-solid-color-epoxy-base-coats.png?v=1781680330";
const glitterChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-glitter-additive-colors.png?v=1781680348";
const stainChartImage = "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-concrete-dye-stain-colors.png?v=1781680338";

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

function chartArea(left: string, top: string, width: string, height: string): ChartArea {
  return { left, top, width, height };
}

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

const solidOptions: ChartOption[] = [
  { name: "White", code: "FLV-0060", palette: ["#8a8a87", "#efeeea", "#f4f3f0", "#ffffff"], area: chartArea("5.34%", "16.02%", "19.60%", "7.23%") },
  { name: "Beige", code: "FLV-1000", palette: ["#7f7266", "#dcc5b1", "#e3cebb", "#ffffed"], area: chartArea("28.58%", "16.02%", "19.60%", "7.23%") },
  { name: "Tan", code: "FLV-1020", palette: ["#6e6458", "#bfae99", "#c8b9a5", "#fee9cf"], area: chartArea("51.82%", "16.02%", "19.60%", "7.23%") },
  { name: "Khaki", code: "FLV-1050", palette: ["#665b4d", "#b19e86", "#bbaa94", "#edd5b8"], area: chartArea("75.07%", "16.02%", "19.60%", "7.23%") },
  { name: "Toffee", code: "FLV-1080", palette: ["#625f58", "#a9a499", "#b4afa5", "#e3ddcf"], area: chartArea("5.34%", "28.91%", "19.60%", "7.23%") },
  { name: "Light Gray", code: "FLV-2000", palette: ["#767b7a", "#cdd5d4", "#d5dcdc", "#ffffff"], area: chartArea("28.58%", "28.91%", "19.60%", "7.23%") },
  { name: "Medium Gray", code: "FLV-2010", palette: ["#6b6e6f", "#babfc1", "#c4c8ca", "#f8feff"], area: chartArea("51.82%", "28.91%", "19.60%", "7.23%") },
  { name: "Warm Gray", code: "FLV-2020", palette: ["#6b6d65", "#babdaf", "#c4c6ba", "#f8fceb"], area: chartArea("75.07%", "28.91%", "19.60%", "7.23%") },
  { name: "Natural Gray", code: "FLV-2030", palette: ["#6a6d6e", "#b7bcbe", "#c1c5c7", "#f4fbfd"], area: chartArea("5.34%", "41.80%", "19.60%", "7.23%") },
  { name: "Cement Gray", code: "FLV-2040", palette: ["#5f6568", "#a5afb5", "#b0babf", "#deebf2"], area: chartArea("28.58%", "41.80%", "19.60%", "7.23%") },
  { name: "Battleship Gray", code: "FLV-2050", palette: ["#585e62", "#98a3a9", "#a4aeb4", "#cedce3"], area: chartArea("51.82%", "41.80%", "19.60%", "7.23%") },
  { name: "Dark Gray", code: "FLV-2060", palette: ["#545859", "#92999b", "#9fa5a7", "#c7cfd2"], area: chartArea("75.07%", "41.80%", "19.60%", "7.23%") },
  { name: "Charcoal", code: "FLV-2070", palette: ["#394042", "#636f72", "#747f81", "#8c9b9f"], area: chartArea("5.34%", "54.69%", "19.60%", "7.23%") },
  { name: "Mint Green", code: "FLV-5000", palette: ["#76837d", "#cde2d9", "#d5e8e0", "#ffffff"], area: chartArea("28.58%", "54.69%", "19.60%", "7.23%") },
  { name: "Kelly Green", code: "FLV-5030", palette: ["#4e692d", "#88b64f", "#96c061", "#baf373"], area: chartArea("51.82%", "54.69%", "19.60%", "7.23%") },
  { name: "Bright Green", code: "FLV-5050", palette: ["#266849", "#42b57e", "#55bf8c", "#63f2ae"], area: chartArea("75.07%", "54.69%", "19.60%", "7.23%") },
  { name: "Forest Green", code: "FLV-5080", palette: ["#344738", "#5a7b62", "#6b8a73", "#81aa8b"], area: chartArea("5.34%", "67.58%", "19.60%", "7.23%") },
  { name: "Safety Yellow", code: "FLV-6010", palette: ["#8c6d0c", "#f3bd15", "#f8c62c", "#fffc2c"], area: chartArea("28.58%", "67.58%", "19.60%", "7.23%") },
  { name: "Light Blue", code: "FLV-7000", palette: ["#698188", "#b6e0eb", "#c0e7f1", "#f3ffff"], area: chartArea("51.82%", "67.58%", "19.60%", "7.23%") },
  { name: "Neutral Blue", code: "FLV-7040", palette: ["#3e5060", "#6b8aa7", "#7b97b2", "#96bde1"], area: chartArea("75.07%", "67.58%", "19.60%", "7.23%") },
  { name: "Deep Blue", code: "FLV-7070", palette: ["#1e3f50", "#346e8a", "#487e97", "#529abd"], area: chartArea("5.34%", "80.47%", "19.60%", "7.23%") },
  { name: "Safety Red", code: "FLV-8320", palette: ["#712c2f", "#c34c52", "#cc5e64", "#ff7077"], area: chartArea("28.58%", "80.47%", "19.60%", "7.23%") },
  { name: "Brick Red", code: "FLV-8070", palette: ["#452e2f", "#785052", "#876264", "#a67577"], area: chartArea("51.82%", "80.47%", "19.60%", "7.23%") },
  { name: "Black", code: "FLV-9990", palette: ["#2b2f30", "#4b5254", "#5e6466", "#6f777a"], area: chartArea("75.07%", "80.47%", "19.60%", "7.23%") }
];

const glitterOptions: ChartOption[] = [
  { name: "Clear Radiance", code: "Glitter additive", palette: ["#767b81", "#cdd5df", "#d5dce6", "#ffffff"], area: chartArea("5.60%", "16.60%", "19.08%", "11.57%") },
  { name: "Silver Sparkle", code: "Glitter additive", palette: ["#606770", "#a7b2c2", "#b2bccb", "#e1eeff"], area: chartArea("28.84%", "16.60%", "19.08%", "11.57%") },
  { name: "Azalea", code: "Glitter additive", palette: ["#59213c", "#9a3a68", "#a64e78", "#d05992"], area: chartArea("52.08%", "16.60%", "19.08%", "11.57%") },
  { name: "Red Dragon", code: "Glitter additive", palette: ["#63242e", "#ab3f50", "#b65262", "#e66075"], area: chartArea("75.33%", "16.60%", "19.08%", "11.57%") },
  { name: "Victorian Red", code: "Glitter additive", palette: ["#531e1e", "#903435", "#9d4849", "#c45253"], area: chartArea("5.60%", "35.94%", "19.08%", "11.57%") },
  { name: "Red Hots", code: "Glitter additive", palette: ["#63232e", "#ab3e50", "#b65262", "#e65e75"], area: chartArea("28.84%", "35.94%", "19.08%", "11.57%") },
  { name: "Rusty Penny", code: "Glitter additive", palette: ["#522c26", "#8f4d43", "#9c5f56", "#c37165"], area: chartArea("52.08%", "35.94%", "19.08%", "11.57%") },
  { name: "Orange Citrus", code: "Glitter additive", palette: ["#63332a", "#ac594a", "#b76a5d", "#e7806d"], area: chartArea("75.33%", "35.94%", "19.08%", "11.57%") },
  { name: "True Copper", code: "Glitter additive", palette: ["#614035", "#a86f5c", "#b37f6d", "#e29b84"], area: chartArea("5.60%", "55.27%", "19.08%", "11.57%") },
  { name: "Storybrooke Brown", code: "Glitter additive", palette: ["#463431", "#7a5b55", "#896c67", "#a9827b"], area: chartArea("28.84%", "55.27%", "19.08%", "11.57%") },
  { name: "Peach Fuzz", code: "Glitter additive", palette: ["#5d4738", "#a27b61", "#ae8a72", "#daaa8a"], area: chartArea("52.08%", "55.27%", "19.08%", "11.57%") },
  { name: "Nutmeg", code: "Glitter additive", palette: ["#5c4534", "#9f775b", "#ab866c", "#d7a582"], area: chartArea("75.33%", "55.27%", "19.08%", "11.57%") },
  { name: "Desert Sand", code: "Glitter additive", palette: ["#624f26", "#aa8942", "#b59755", "#e4bb63"], area: chartArea("5.60%", "74.61%", "19.08%", "11.57%") },
  { name: "Sandstone", code: "Glitter additive", palette: ["#605243", "#a68f74", "#b19c83", "#dfc3a1"], area: chartArea("28.84%", "74.61%", "19.08%", "11.57%") },
  { name: "Gold Crown", code: "Glitter additive", palette: ["#564f30", "#958954", "#a29766", "#cabb7a"], area: chartArea("52.08%", "74.61%", "19.08%", "11.57%") },
  { name: "Sunstruck Gold", code: "Glitter additive", palette: ["#6a5c38", "#b7a062", "#c1ac73", "#f4d88b"], area: chartArea("75.33%", "74.61%", "19.08%", "11.57%") }
];

const stainOptions: ChartOption[] = [
  { name: "Gold", code: "Ameripolish", palette: ["#574625", "#967941", "#a38854", "#cca862"], area: chartArea("5.34%", "16.02%", "19.60%", "7.23%") },
  { name: "Raw Sienna", code: "Ameripolish", palette: ["#554223", "#94723e", "#a18152", "#c99f5e"], area: chartArea("28.58%", "16.02%", "19.60%", "7.23%") },
  { name: "Caramel", code: "Ameripolish", palette: ["#483723", "#7d603d", "#8c7151", "#ad895d"], area: chartArea("51.82%", "16.02%", "19.60%", "7.23%") },
  { name: "Sand", code: "Ameripolish", palette: ["#4b3b29", "#826748", "#90775b", "#b3916b"], area: chartArea("75.07%", "16.02%", "19.60%", "7.23%") },
  { name: "Terra Cotta", code: "Ameripolish", palette: ["#3f2923", "#6d483d", "#7d5b51", "#996b5d"], area: chartArea("5.34%", "28.91%", "19.60%", "7.23%") },
  { name: "Mahogany", code: "Ameripolish", palette: ["#372520", "#604038", "#71534c", "#896157"], area: chartArea("28.58%", "28.91%", "19.60%", "7.23%") },
  { name: "Saddle Brown", code: "Ameripolish", palette: ["#42261c", "#724331", "#815646", "#9f654e"], area: chartArea("51.82%", "28.91%", "19.60%", "7.23%") },
  { name: "Chocolate Brown", code: "Ameripolish", palette: ["#402c22", "#6f4d3b", "#7f5f4f", "#9b715b"], area: chartArea("75.07%", "28.91%", "19.60%", "7.23%") },
  { name: "Walnut", code: "Ameripolish", palette: ["#312419", "#553f2c", "#675241", "#7b6048"], area: chartArea("5.34%", "41.80%", "19.60%", "7.23%") },
  { name: "Burnt Sienna", code: "Ameripolish", palette: ["#4f2a1b", "#894a2f", "#975d44", "#bb6d4c"], area: chartArea("28.58%", "41.80%", "19.60%", "7.23%") },
  { name: "Chestnut", code: "Ameripolish", palette: ["#4e302c", "#87534d", "#95655f", "#b97871"], area: chartArea("51.82%", "41.80%", "19.60%", "7.23%") },
  { name: "Red", code: "Ameripolish", palette: ["#4d1c1e", "#853135", "#934649", "#b64e53"], area: chartArea("75.07%", "41.80%", "19.60%", "7.23%") },
  { name: "Maroon", code: "Ameripolish", palette: ["#3c1b1b", "#693030", "#794545", "#944d4d"], area: chartArea("5.34%", "54.69%", "19.60%", "7.23%") },
  { name: "Sepia", code: "Ameripolish", palette: ["#391c1b", "#633130", "#744645", "#8c4e4d"], area: chartArea("28.58%", "54.69%", "19.60%", "7.23%") },
  { name: "Eggplant", code: "Ameripolish", palette: ["#342829", "#5b4648", "#6c595b", "#82686b"], area: chartArea("51.82%", "54.69%", "19.60%", "7.23%") },
  { name: "Turquoise", code: "Ameripolish", palette: ["#2d3f40", "#4e6d70", "#607d80", "#72999c"], area: chartArea("75.07%", "54.69%", "19.60%", "7.23%") },
  { name: "Slate Blue", code: "Ameripolish", palette: ["#313433", "#555a59", "#676b6a", "#7b8180"], area: chartArea("5.34%", "67.58%", "19.60%", "7.23%") },
  { name: "Patriot Blue", code: "Ameripolish", palette: ["#272d2d", "#444e4f", "#576061", "#667273"], area: chartArea("28.58%", "67.58%", "19.60%", "7.23%") },
  { name: "Green", code: "Ameripolish", palette: ["#373c22", "#5f683b", "#70784f", "#87925b"], area: chartArea("51.82%", "67.58%", "19.60%", "7.23%") },
  { name: "Pine Green", code: "Ameripolish", palette: ["#2c3c2f", "#4c6952", "#5e7964", "#709477"], area: chartArea("75.07%", "67.58%", "19.60%", "7.23%") },
  { name: "Forest Green", code: "Ameripolish", palette: ["#2a3028", "#495345", "#5c6558", "#6c7867"], area: chartArea("5.34%", "80.47%", "19.60%", "7.23%") },
  { name: "Gray", code: "Ameripolish", palette: ["#3f3932", "#6d6457", "#7d7569", "#998e7d"], area: chartArea("28.58%", "80.47%", "19.60%", "7.23%") },
  { name: "Black", code: "Ameripolish", palette: ["#2e2b28", "#514b45", "#635e58", "#766f67"], area: chartArea("51.82%", "80.47%", "19.60%", "7.23%") },
  { name: "Midnight Black", code: "Ameripolish", palette: ["#201f1d", "#383733", "#4c4b47", "#575651"], area: chartArea("75.07%", "80.47%", "19.60%", "7.23%") }
];

const chartBoards: ChartBoard[] = [
  {
    id: "flake",
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
    title: "Solid Color Epoxy Base Coats",
    subtitle: "Solid color epoxy is typically used as the base coat during the application process.",
    width: 1536,
    height: 2048,
    image: solidChartImage,
    alt: "XPS solid color epoxy base coat chart",
    options: solidOptions
  },
  {
    id: "glitter",
    title: "Top Glitter Additive Colors",
    subtitle: "Glitter is an additive, but it can also be used to create an overall sparkle look.",
    width: 1536,
    height: 2048,
    image: glitterChartImage,
    alt: "XPS top glitter additive color chart",
    options: glitterOptions
  },
  {
    id: "stain",
    title: "Concrete Dye & Stain Colors",
    subtitle: "Concrete dye and stain options for polished or decorative concrete color direction.",
    width: 1536,
    height: 2048,
    image: stainChartImage,
    alt: "XPS concrete dye and stain color chart",
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
                  <div className="xps-chart-image-shell" data-chart={board.id} onPointerLeave={() => clearSample(board)}>
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
