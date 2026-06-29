export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://xpswebsites.vercel.app/#national-epoxy-pros",
    name: "National Epoxy Pros",
    description:
      "Certified epoxy floor systems, digital bids, design guidance, and nationwide service powered by Xtreme Polishing Systems Supply.",
    url: "https://xpswebsites.vercel.app",
    telephone: "+18779586408",
    email: "support@nationalepoxypros.com",
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
    },
    areaServed: "United States",
    serviceType: [
      "Garage Epoxy",
      "Metallic Epoxy",
      "Commercial Epoxy Flooring",
      "Quartz Flooring",
      "Flake Epoxy Systems",
      "Polished Concrete",
      "Polyaspartic Coatings",
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
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
