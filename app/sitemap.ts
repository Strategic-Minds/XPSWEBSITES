import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://xpswebsites.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about-us", "/contact-us", "/gallery", "/digital-estimator", "/customer-portal"];
  return pages.map((url) => ({
    url: base + url,
    lastModified: new Date(),
    changeFrequency: url === "/" ? "daily" : "weekly",
    priority: url === "/" ? 1.0 : url.includes("estimate") || url.includes("digital") ? 0.9 : 0.7,
  }));
}
