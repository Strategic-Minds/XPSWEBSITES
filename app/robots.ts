import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin-dashboard", "/owner-dashboard", "/crew-dashboard", "/ops-login"] }],
    sitemap: "https://xpswebsites.vercel.app/sitemap.xml",
  };
}
