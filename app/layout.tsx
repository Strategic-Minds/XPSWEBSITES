import type { Metadata } from "next";
import { LocalBusinessSchema } from "./components/LocalBusinessSchema";
import "./globals.css";

export const metadata: Metadata = {
  title: "National Epoxy Pros | Certified Epoxy Floors Nationwide",
  description:
    "National Epoxy Pros provides certified epoxy floor systems nationwide, powered by Xtreme Polishing Systems. Start a digital bid, use the XPS visualizer, or speak with a floor specialist.",
  metadataBase: new URL("https://xpswebsites.vercel.app"),
  openGraph: {
    title: "National Epoxy Pros | Certified Epoxy Floors Nationwide",
    description:
      "Premium epoxy floor systems, digital bids, design center guidance, and XPS-powered nationwide installation support.",
    type: "website",
    url: "https://xpswebsites.vercel.app",
    siteName: "National Epoxy Pros",
    locale: "en_US",
    images: [{ url: "/national-epoxy-hero.svg", width: 1200, height: 630, alt: "National Epoxy Pros epoxy floor visual" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Epoxy Pros",
    description: "Certified epoxy floor systems nationwide, powered by Xtreme Polishing Systems.",
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
        <meta name="theme-color" content="#050505" />
        <LocalBusinessSchema />
      </head>
      <body>{children}</body>
    </html>
  );
}
