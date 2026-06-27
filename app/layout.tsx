import type { Metadata } from "next";
import { LocalBusinessSchema } from "./components/LocalBusinessSchema";
import "./globals.css";
import "./xps-flake-chart-lock.css";

export const metadata: Metadata = {
  title: "Phoenix Epoxy Pros | Professional Epoxy Floors & Polished Concrete AZ",
  description: "Professional epoxy garage floors, metallic epoxy, and polished concrete in Phoenix. XPS certified. 4.9★ rated. Free estimates.",
  metadataBase: new URL("https://xpswebsites.vercel.app"),
  openGraph: {
    title: "Phoenix Epoxy Pros | Epoxy Floors Phoenix AZ",
    description: "Transform your garage with professional epoxy floors. Phoenix's top-rated flooring specialists.",
    type: "website",
    url: "https://xpswebsites.vercel.app",
    siteName: "Phoenix Epoxy Pros",
    locale: "en_US",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Phoenix Epoxy Pros" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phoenix Epoxy Pros",
    description: "Professional epoxy flooring in Phoenix AZ",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  alternates: { canonical: "https://xpswebsites.vercel.app" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <LocalBusinessSchema />
      </head>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
