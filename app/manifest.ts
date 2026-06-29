import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "National Epoxy Pros",
    short_name: "Epoxy Pros",
    description: "Premium epoxy and decorative concrete digital bid app powered by XPS.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#070707",
    theme_color: "#090909",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/national-epoxy-pros-logo.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
    shortcuts: [
      {
        name: "Start Digital Bid",
        short_name: "Bid",
        url: "/#digital-bid",
        description: "Start a National Epoxy Pros digital bid.",
      },
      {
        name: "Find XPS Location",
        short_name: "Locations",
        url: "/#locations",
        description: "Find nearby XPS Xpress support.",
      },
    ],
  };
}
