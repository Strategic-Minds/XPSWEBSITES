import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://xpswebsites.vercel.app";
  const pages = ["/", "#systems", "#digital-bid", "#visualizer", "#design-center", "#gallery", "#locations", "#contact"];

  return pages.map((url) => ({
    url: url.startsWith("#") ? `${base}/${url}` : base + url,
    lastModified: new Date(),
    changeFrequency: url === "/" ? "daily" : "weekly",
    priority: url === "/" ? 1.0 : url.includes("digital-bid") ? 0.9 : 0.7,
  }));
}
