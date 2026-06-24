import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { InstantChatWidget } from "./components/InstantChatWidget";
import "./globals.css";
import "./client-dashboard.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://phoenixepoxypros.com"),
  title: "Phoenix Epoxy Pros | Phoenix Epoxy Floor Quotes",
  description: "Quote-first Phoenix epoxy floor website for garage floors, commercial floors, patios, outdoor spaces, floor repair, polished concrete, and XPS-connected digital estimator inquiries.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "PEP Portal" },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "PEP Portal",
  },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: { title: "Phoenix Epoxy Pros", description: "Phoenix epoxy floor estimates, project photo upload, digital bid intake, and XPS connected services.", type: "website" }
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="PEP Portal" />
      </head>
      <body>
        {children}
        <InstantChatWidget />
      </body>
    </html>
  );
}
