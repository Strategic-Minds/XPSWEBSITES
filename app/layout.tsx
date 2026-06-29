import type { Metadata } from "next";
import { LocalBusinessSchema } from "./components/LocalBusinessSchema";
import "./globals.css";

export const metadata: Metadata = {
  title: "National Epoxy Pros | Premium Epoxy Floors Powered by XPS",
  description:
    "National Epoxy Pros is a premium epoxy, polished concrete, decorative concrete, countertop, and overlay digital bid app powered by XPS, America's #1 Epoxy Super Store.",
  metadataBase: new URL("https://xpswebsites.vercel.app"),
  applicationName: "National Epoxy Pros",
  openGraph: {
    title: "National Epoxy Pros | Powered by XPS",
    description:
      "Epoxy will change your life. Start a digital bid, find an XPS Xpress location, use the XPS visualizer, and explore premium floor systems.",
    type: "website",
    url: "https://xpswebsites.vercel.app",
    siteName: "National Epoxy Pros",
    locale: "en_US",
    images: [{ url: "/national-epoxy-hero.svg", width: 1200, height: 630, alt: "National Epoxy Pros premium epoxy floor visual" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Epoxy Pros",
    description: "Premium epoxy and concrete floor digital bids powered by XPS.",
    images: ["/national-epoxy-hero.svg"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  alternates: { canonical: "https://xpswebsites.vercel.app" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#090909" />
        <LocalBusinessSchema />
      </head>
      <body>{children}</body>
    </html>
  );
}
