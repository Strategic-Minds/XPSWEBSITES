import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://xpswebsites.vercel.app";
  const pages = ["/", "/about", "/contact", "/services", "/gallery", "/digital-estimator", "/get-quote", "/customer-portal"];
  return pages.map((url) => ({
    url: base + url,
    lastModified: new Date(),
    changeFrequency: url === "/" ? "daily" : "weekly",
    priority: url === "/" ? 1.0 : url.includes("estimate") || url.includes("quote") ? 0.9 : 0.7,
  }));
}
