export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://xpswebsites.vercel.app/#national-epoxy-pros",
    name: "National Epoxy Pros",
    description:
      "Premium epoxy, polished concrete, decorative concrete, countertop, and overlay digital bids powered by Xtreme Polishing Systems Supply.",
    url: "https://xpswebsites.vercel.app",
    telephone: "+18779586408",
    email: "support@nationalepoxypros.com",
    slogan: "Powered by XPS - America's #1 Epoxy Super Store",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2200 NW 32nd St #700",
      addressLocality: "Pompano Beach",
      addressRegion: "FL",
      postalCode: "33069",
      addressCountry: "US",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Xtreme Polishing Systems Supply",
      telephone: "+18779586408",
      url: "https://xtremepolishingsystems.com",
    },
    areaServed: "United States",
    serviceType: [
      "Epoxy flake floors",
      "Metallic epoxy floors",
      "Polished concrete",
      "Stained concrete",
      "Concrete countertops",
      "Concrete overlayments",
      "Epoxy floor training",
      "XPS Xpress location routing",
    ],
    priceRange: "$$",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+18779586408",
        contactType: "customer support",
        email: "support@nationalepoxypros.com",
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        contactType: "digital bid leads",
        email: "leads@nationalepoxypros.com",
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@nationalepoxypros.com",
        areaServed: "US",
      },
      {
        "@type": "ContactPoint",
        contactType: "AI operations",
        email: "ai@autobuilderos.com",
        areaServed: "US",
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
