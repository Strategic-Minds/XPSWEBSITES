import type { MetadataRoute } from "next";

const base = "https://xpswebsites.vercel.app";

const routes = [
  "/",
  "/#digital-bid",
  "/#systems",
  "/#visualizer",
  "/#dashboards",
  "/#locations",
  "/#contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : route.includes("digital-bid") ? 0.95 : 0.75,
  }));
}
