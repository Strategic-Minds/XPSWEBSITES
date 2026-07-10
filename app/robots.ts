import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://xpswebsites.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin-dashboard", "/owner-dashboard", "/crew-dashboard", "/ops", "/ops-login"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
