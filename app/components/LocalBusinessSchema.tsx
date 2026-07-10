export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://xpswebsites.vercel.app/#national-epoxy-pros",
    "name": "National Epoxy Pros",
    "description": "National epoxy, polished concrete, decorative concrete, and digital bid system serving local markets through the National Epoxy Pros network.",
    "url": "https://xpswebsites.vercel.app",
    "telephone": "+18779586408",
    "email": "support@nationalepoxypros.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2200 NW 32nd St #700",
      "addressLocality": "Pompano Beach",
      "addressRegion": "FL",
      "postalCode": "33069",
      "addressCountry": "US"
    },
    "areaServed": "United States",
    "serviceType": ["Garage Epoxy", "Metallic Epoxy", "Commercial Flooring", "Polished Concrete", "Polyaspartic Coatings", "Decorative Concrete"],
    "priceRange": "$$",
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "07:00", "closes": "19:00" }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
