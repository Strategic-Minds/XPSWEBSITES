import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./approved-hero.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://phoenixepoxypros.com"),
  title: "Phoenix Epoxy Pros | Phoenix Epoxy Floor Quotes",
  description: "Quote-first Phoenix epoxy floor website for garage floors, commercial floors, patios, outdoor spaces, floor repair, polished concrete, and XPS-connected training inquiries.",
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Phoenix Epoxy Pros",
    description: "Phoenix epoxy floor estimates, project photo upload, visualizer handoff, and XPS connected services.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark light"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
