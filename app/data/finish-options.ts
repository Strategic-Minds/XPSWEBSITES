export type FinishFamilyId = "flake" | "metallic" | "quartz" | "concrete-stain" | "metallic-glitter" | "liquid-pigment";

export type TextureKind = "flake" | "metallic" | "quartz" | "stain" | "glitter" | "pigment";

export type FinishFamily = {
  id: FinishFamilyId;
  label: string;
  description: string;
  texture: TextureKind;
  notes?: string;
};

export type FinishOption = {
  id: string;
  family: FinishFamilyId;
  name: string;
  code?: string;
  palette: string[];
  texture: TextureKind;
  notes?: string;
  availability?: string;
};

export const finishFamilies: FinishFamily[] = [
  {
    id: "flake",
    label: "Flake",
    description: "Full-broadcast epoxy flake with layered chip texture.",
    texture: "flake"
  },
  {
    id: "metallic",
    label: "Metallic",
    description: "Decorative metallic epoxy with flowing pearlescent movement.",
    texture: "metallic"
  },
  {
    id: "quartz",
    label: "Quartz",
    description: "Dense quartz texture for durable, grippy floor systems.",
    texture: "quartz"
  },
  {
    id: "concrete-stain",
    label: "Concrete Stain/Dye",
    description: "Translucent polished-concrete dye and stain color direction.",
    texture: "stain",
    notes: "Source chart is marked INTERIOR ONLY. Verify install suitability before quoting."
  },
  {
    id: "metallic-glitter",
    label: "Metallic Glitter",
    description: "Fine or chunky metallic glitter additive for sparkle effects.",
    texture: "glitter",
    notes: "Source chart lists Metallic Glitter as available in Fine and Chunky."
  },
  {
    id: "liquid-pigment",
    label: "Liquid Pigment",
    description: "Chromaflo liquid color pigment direction for pigmented resin systems.",
    texture: "pigment",
    notes: "Source chart lists FLV liquid pigments. Verify chemistry, loading rate, and install suitability before quoting."
  }
];

export const finishOptions: FinishOption[] = [
  { id: "flake-gravel", family: "flake", name: "Gravel", code: "FB-414", texture: "flake", palette: ["#23303a", "#6f7f87", "#c9d0d2", "#f3f1e8"] },
  { id: "flake-outback", family: "flake", name: "Outback", code: "FB-517", texture: "flake", palette: ["#2d2118", "#7d583a", "#c99e68", "#efe2c7"] },
  { id: "flake-quicksilver", family: "flake", name: "Quicksilver", code: "FB-424", texture: "flake", palette: ["#111a1c", "#566164", "#a8b2b1", "#f0f2ef"] },
  { id: "flake-safari", family: "flake", name: "Safari", code: "FB-504", texture: "flake", palette: ["#292517", "#776543", "#c7b27b", "#f3e7c2"] },
  { id: "flake-domino", family: "flake", name: "Domino", code: "FB-411", texture: "flake", palette: ["#050505", "#ffffff", "#8f989f", "#d8dde1"] },
  { id: "flake-shoreline", family: "flake", name: "Shoreline", code: "FB-421", texture: "flake", palette: ["#172a34", "#738990", "#c4c8b9", "#e8ddc2"] },

  { id: "metallic-arizona-gold", family: "metallic", name: "Arizona Gold", texture: "metallic", palette: ["#6d4510", "#b97818", "#dfad31", "#f2d167"] },
  { id: "metallic-cappuccino", family: "metallic", name: "Cappuccino", texture: "metallic", palette: ["#2a1d13", "#5b3b20", "#8a6537", "#b48c54"] },
  { id: "metallic-caribbean-blue", family: "metallic", name: "Caribbean Blue", texture: "metallic", palette: ["#142b64", "#214fb0", "#426ccd", "#7894d8"] },
  { id: "metallic-copper", family: "metallic", name: "Copper", texture: "metallic", palette: ["#5b331a", "#946234", "#b6864e", "#d4b07c"] },
  { id: "metallic-merlot", family: "metallic", name: "Merlot", texture: "metallic", palette: ["#4a0f28", "#8a1742", "#bd285b", "#de5e85"] },
  { id: "metallic-quick-silver", family: "metallic", name: "Quick Silver", texture: "metallic", palette: ["#4b4f4f", "#8b9290", "#c2c6c3", "#f1f1ef"] },

  { id: "quartz-limestone", family: "quartz", name: "Limestone", code: "Quartz", texture: "quartz", palette: ["#b7bdbd", "#d5dada", "#f1f2ef", "#8e999a"] },
  { id: "quartz-slate", family: "quartz", name: "Slate", code: "Quartz", texture: "quartz", palette: ["#9aa7ac", "#c6d2d7", "#e8ecea", "#647278"] },
  { id: "quartz-flint", family: "quartz", name: "Flint", code: "Quartz", texture: "quartz", palette: ["#81898d", "#b3babf", "#d7dadd", "#4d585d"] },
  { id: "quartz-cobblestone", family: "quartz", name: "Cobblestone", code: "Quartz", texture: "quartz", palette: ["#aaa3a0", "#d5cfca", "#eee9df", "#85807c"] },
  { id: "quartz-mojave", family: "quartz", name: "Mojave", code: "Quartz", texture: "quartz", palette: ["#b6a994", "#d7cbb8", "#eee1cb", "#8d806c"] },
  { id: "quartz-blue-moon", family: "quartz", name: "Blue Moon", code: "Quartz", texture: "quartz", palette: ["#7ca4b3", "#a9c7d3", "#d4e3e7", "#557584"] },

  { id: "stain-gold", family: "concrete-stain", name: "Gold", code: "Ameripolish", texture: "stain", palette: ["#b98222", "#dca947", "#795213", "#edc872"], notes: "Interior only per source chart." },
  { id: "stain-raw-sienna", family: "concrete-stain", name: "Raw Sienna", code: "Ameripolish", texture: "stain", palette: ["#ad6e2c", "#ce8e4c", "#7a4216", "#e7b77e"], notes: "Interior only per source chart." },
  { id: "stain-caramel", family: "concrete-stain", name: "Caramel", code: "Ameripolish", texture: "stain", palette: ["#b46f2d", "#d9934f", "#7d4215", "#e7b67c"], notes: "Interior only per source chart." },
  { id: "stain-terra-cotta", family: "concrete-stain", name: "Terra Cotta", code: "Ameripolish", texture: "stain", palette: ["#a04b32", "#c76d51", "#67301e", "#e19a82"], notes: "Interior only per source chart." },
  { id: "stain-chocolate-brown", family: "concrete-stain", name: "Chocolate Brown", code: "Ameripolish", texture: "stain", palette: ["#3e291e", "#604232", "#221710", "#987667"], notes: "Interior only per source chart." },
  { id: "stain-patriot-blue", family: "concrete-stain", name: "Patriot Blue", code: "Ameripolish", texture: "stain", palette: ["#203a6b", "#42659a", "#101d39", "#7f9dc5"], notes: "Interior only per source chart." },
  { id: "stain-forest-green", family: "concrete-stain", name: "Forest Green", code: "Ameripolish", texture: "stain", palette: ["#183e2d", "#355e48", "#0b2117", "#73917f"], notes: "Interior only per source chart." },
  { id: "stain-midnight-black", family: "concrete-stain", name: "Midnight Black", code: "Ameripolish", texture: "stain", palette: ["#141414", "#333333", "#000000", "#777777"], notes: "Interior only per source chart." },

  { id: "glitter-clear-radiance", family: "metallic-glitter", name: "Clear Radiance", code: "Fine/Chunky", texture: "glitter", palette: ["#f7fbff", "#cfdbe6", "#ffffff", "#eff6ff"], availability: "Available in Fine and Chunky." },
  { id: "glitter-silver-sparkle", family: "metallic-glitter", name: "Silver Sparkle", code: "Fine/Chunky", texture: "glitter", palette: ["#bcc7d4", "#f4f7fb", "#7e8b98", "#d9e2eb"], availability: "Available in Fine and Chunky." },
  { id: "glitter-red-dragon", family: "metallic-glitter", name: "Red Dragon", code: "Fine/Chunky", texture: "glitter", palette: ["#b6203c", "#eb5368", "#7d0d22", "#ff9aa6"], availability: "Available in Fine and Chunky." },
  { id: "glitter-true-copper", family: "metallic-glitter", name: "True Copper", code: "Fine/Chunky", texture: "glitter", palette: ["#b06a49", "#dc9b75", "#753c24", "#f0c6a6"], availability: "Available in Fine and Chunky." },
  { id: "glitter-desert-sand", family: "metallic-glitter", name: "Desert Sand", code: "Fine/Chunky", texture: "glitter", palette: ["#b4935b", "#d4bb7e", "#806336", "#ead8aa"], availability: "Available in Fine and Chunky." },
  { id: "glitter-sunstruck-gold", family: "metallic-glitter", name: "Sunstruck Gold", code: "Fine/Chunky", texture: "glitter", palette: ["#d0aa1b", "#f5d43d", "#92730c", "#ffe982"], availability: "Available in Fine and Chunky." },

  { id: "pigment-white", family: "liquid-pigment", name: "White", code: "FLV-0060", texture: "pigment", palette: ["#f2f1e8", "#ffffff", "#cfcfc6", "#faf9f2"] },
  { id: "pigment-beige", family: "liquid-pigment", name: "Beige", code: "FLV-1000", texture: "pigment", palette: ["#c9ad82", "#e1c8a0", "#8f7450", "#f2dfbf"] },
  { id: "pigment-tan", family: "liquid-pigment", name: "Tan", code: "FLV-1020", texture: "pigment", palette: ["#b68a55", "#d4aa73", "#7b5731", "#efd0a2"] },
  { id: "pigment-khaki", family: "liquid-pigment", name: "Khaki", code: "FLV-1050", texture: "pigment", palette: ["#8f815f", "#b3a27a", "#5b513a", "#d5c7a0"] },
  { id: "pigment-toffee", family: "liquid-pigment", name: "Toffee", code: "FLV-1080", texture: "pigment", palette: ["#8f5527", "#ba7940", "#5d3217", "#dba66d"] },
  { id: "pigment-light-gray", family: "liquid-pigment", name: "Light Gray", code: "FLV-2000", texture: "pigment", palette: ["#b9bec0", "#d7dadb", "#82898c", "#f0f1ef"] },
  { id: "pigment-medium-gray", family: "liquid-pigment", name: "Medium Gray", code: "FLV-2010", texture: "pigment", palette: ["#8d9498", "#b4babd", "#5f686d", "#d4d8da"] },
  { id: "pigment-warm-gray", family: "liquid-pigment", name: "Warm Gray", code: "FLV-2020", texture: "pigment", palette: ["#8d8780", "#b3aca2", "#5e5953", "#d3cec5"] },
  { id: "pigment-natural-gray", family: "liquid-pigment", name: "Natural Gray", code: "FLV-2030", texture: "pigment", palette: ["#777b7c", "#a4a8a9", "#4d5152", "#cacdcb"] },
  { id: "pigment-cement-gray", family: "liquid-pigment", name: "Cement Gray", code: "FLV-2040", texture: "pigment", palette: ["#6f7371", "#989d9a", "#454947", "#c2c6c2"] },
  { id: "pigment-battleship-gray", family: "liquid-pigment", name: "Battleship Gray", code: "FLV-2050", texture: "pigment", palette: ["#575f63", "#7f878b", "#31383b", "#aeb5b8"] },
  { id: "pigment-dark-gray", family: "liquid-pigment", name: "Dark Gray", code: "FLV-2060", texture: "pigment", palette: ["#3f4447", "#666c70", "#202426", "#969da0"] },
  { id: "pigment-charcoal", family: "liquid-pigment", name: "Charcoal", code: "FLV-2070", texture: "pigment", palette: ["#27292a", "#505356", "#0e0f10", "#818588"] },
  { id: "pigment-mint-green", family: "liquid-pigment", name: "Mint Green", code: "FLV-5000", texture: "pigment", palette: ["#7fbf9b", "#a6d8b8", "#4c7d61", "#d0efd9"] },
  { id: "pigment-kelly-green", family: "liquid-pigment", name: "Kelly Green", code: "FLV-5030", texture: "pigment", palette: ["#1f8a43", "#49b66d", "#0d4f25", "#86d49b"] },
  { id: "pigment-bright-green", family: "liquid-pigment", name: "Bright Green", code: "FLV-5050", texture: "pigment", palette: ["#38a833", "#65d35f", "#1b6818", "#9df199"] },
  { id: "pigment-forest-green", family: "liquid-pigment", name: "Forest Green", code: "FLV-5080", texture: "pigment", palette: ["#173d2a", "#346b4a", "#082015", "#759b7f"] },
  { id: "pigment-safety-yellow", family: "liquid-pigment", name: "Safety Yellow", code: "FLV-6010", texture: "pigment", palette: ["#f0c51a", "#ffe24f", "#a98705", "#fff08a"] },
  { id: "pigment-light-blue", family: "liquid-pigment", name: "Light Blue", code: "FLV-7000", texture: "pigment", palette: ["#78a9c7", "#a8d2e8", "#416f8d", "#d1effb"] },
  { id: "pigment-neutral-blue", family: "liquid-pigment", name: "Neutral Blue", code: "FLV-7040", texture: "pigment", palette: ["#416d91", "#6f9abb", "#223d58", "#a9c7df"] },
  { id: "pigment-deep-blue", family: "liquid-pigment", name: "Deep Blue", code: "FLV-7070", texture: "pigment", palette: ["#172f68", "#315ca8", "#0a173c", "#7897cf"] },
  { id: "pigment-safety-red", family: "liquid-pigment", name: "Safety Red", code: "FLV-8320", texture: "pigment", palette: ["#b61e2e", "#de4c58", "#76101a", "#f08d95"] },
  { id: "pigment-brick-red", family: "liquid-pigment", name: "Brick Red", code: "FLV-8070", texture: "pigment", palette: ["#883123", "#b65a43", "#4f1a11", "#d9917b"] },
  { id: "pigment-black", family: "liquid-pigment", name: "Black", code: "FLV-9990", texture: "pigment", palette: ["#0c0c0c", "#2a2a2a", "#000000", "#666666"] }
];

export function getFinishOptionsByFamily(family: FinishFamilyId): FinishOption[] {
  return finishOptions.filter((option) => option.family === family);
}

export function getDefaultFinish(): FinishOption {
  return finishOptions[0];
}
