import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { LocalBusinessSchema } from "./components/LocalBusinessSchema";
import "./globals.css";
import "./approved-hero.css";
import "./phoenix-final-revision.css";
import "./nashville-chart-template.css";
import "./phoenix-recovery.css";
import "./phoenix-hero-lock.css";
import "./phoenix-approved-template.css";
import "./phoenix-nashville-chart-lock.css";
import "./xps-flake-chart-lock.css";
import "./portal-sign-in.css";
import "./xps-home-revision.css";
import "./digital-estimator-intake.css";
import "./client-dashboard.css";
import "./branded-pages.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xpswebsites.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "National Epoxy Pros | Epoxy Floor Quotes & Digital Bids",
  description: "Quote-first National Epoxy Pros website for garage floors, commercial floors, patios, outdoor spaces, floor repair, polished concrete, and XPS-connected digital estimator inquiries.",
  manifest: "/manifest.webmanifest",
  applicationName: "National Epoxy Pros",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "National Epoxy Pros",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "National Epoxy Pros",
  },
  icons: {
    apple: [
      { url: "/icons/national-epoxy-pros-icon.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    icon: [
      { url: "/icons/national-epoxy-pros-icon.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "National Epoxy Pros",
    description: "National epoxy floor estimates, project photo upload, digital bid intake, and XPS-connected services.",
    type: "website",
    url: siteUrl,
    siteName: "National Epoxy Pros",
    images: [{ url: "/images/national-epoxy-pros-logo-header.svg", width: 1774, height: 443, alt: "National Epoxy Pros" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "National Epoxy Pros",
    description: "National epoxy floor estimates, digital bid intake, finish selection, proposal handoff, and project tracking.",
    images: ["/images/national-epoxy-pros-logo-header.svg"],
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/national-epoxy-pros-icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="National Epoxy Pros" />
        <LocalBusinessSchema />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
