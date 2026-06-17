export type FinishFamilyId = "flake" | "metallic" | "quartz" | "concrete-stain" | "metallic-glitter";

export type TextureKind = "flake" | "metallic" | "quartz" | "stain" | "glitter";

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
  { id: "glitter-sunstruck-gold", family: "metallic-glitter", name: "Sunstruck Gold", code: "Fine/Chunky", texture: "glitter", palette: ["#d0aa1b", "#f5d43d", "#92730c", "#ffe982"], availability: "Available in Fine and Chunky." }
];

export function getFinishOptionsByFamily(family: FinishFamilyId): FinishOption[] {
  return finishOptions.filter((option) => option.family === family);
}

export function getDefaultFinish(): FinishOption {
  return finishOptions[0];
}
