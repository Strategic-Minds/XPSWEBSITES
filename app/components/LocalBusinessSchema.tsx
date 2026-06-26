export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://xpswebsites.vercel.app",
    "name": "Phoenix Epoxy Pros",
    "description": "XPS-certified epoxy and polished concrete floor specialists serving Phoenix, Scottsdale, Tempe, Mesa, and surrounding cities.",
    "url": "https://xpswebsites.vercel.app",
    "telephone": "+17722090266",
    "email": "info@phoenixepoxypros.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Phoenix",
      "addressRegion": "AZ",
      "postalCode": "85001",
      "addressCountry": "US"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 33.4484, "longitude": -112.0740 },
    "areaServed": ["Phoenix","Scottsdale","Tempe","Mesa","Chandler","Gilbert","Glendale","Peoria"],
    "serviceType": ["Garage Epoxy","Metallic Epoxy","Commercial Flooring","Polished Concrete","Polyaspartic Coatings"],
    "priceRange": "$$",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" },
    "sameAs": ["https://www.facebook.com/phoenixepoxypros","https://www.instagram.com/phoenixepoxypros"],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "07:00", "closes": "19:00" }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
