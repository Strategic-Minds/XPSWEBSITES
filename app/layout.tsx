// app/layout.tsx
import type { Metadata } from 'next';
import { BRAND, COLORS } from '@/lib/tokens';
import './globals.css';
import './approved-hero.css';
import './phoenix-approved-template.css';
import './phoenix-hero-lock.css';
import './phoenix-final-revision.css';
import './xps-flake-chart-lock.css';

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${BRAND.name} | #1 Epoxy Floor Coating Company in Phoenix, AZ`,
    template: `%s | ${BRAND.name}`,
  },
  description: 'Phoenix Epoxy Pros delivers premium epoxy floor coatings for garages, commercial spaces, patios, and concrete repair. Get a free digital estimate in minutes. 15% off when you bid online.',
  keywords: ['epoxy floor coating Phoenix', 'garage floor epoxy Phoenix AZ', 'commercial epoxy flooring Phoenix', 'concrete coating Phoenix', 'floor coating company Phoenix'],
  openGraph: {
    title: `${BRAND.name} | #1 Epoxy Floor Coating — Phoenix, AZ`,
    description: 'Premium garage, commercial & outdoor epoxy floor systems. Digital bid system. Job tracker. 15% off online.',
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/images/hero-garage-approved.webp', width: 1200, height: 630, alt: 'Phoenix Epoxy Pros — Epoxy Floor Coating' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | Epoxy Floor Coatings`,
    description: 'Premium epoxy floors in Phoenix, AZ. Digital bid, job tracker, 15% off.',
    images: ['/images/hero-garage-approved.webp'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BRAND.siteUrl },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BRAND.name,
  description: 'Premium epoxy floor coating company serving Phoenix, AZ and surrounding areas.',
  url: BRAND.siteUrl,
  telephone: BRAND.phone,
  email: BRAND.emailHref.replace('mailto:', ''),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Phoenix',
    addressRegion: 'AZ',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 33.4484, longitude: -112.0740 },
  areaServed: [
    'Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Glendale', 'Peoria',
    'Chandler', 'Gilbert', 'Surprise', 'Goodyear', 'Avondale', 'Paradise Valley',
  ],
  serviceType: ['Epoxy Floor Coating', 'Garage Floor Coating', 'Commercial Floor Coating', 'Concrete Polishing'],
  priceRange: '$$',
  openingHours: 'Mo-Sa 07:00-18:00',
  hasMap: 'https://maps.google.com/?q=Phoenix+Epoxy+Pros',
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content={COLORS.headerBg} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Google Analytics — add NEXT_PUBLIC_GA4_ID to enable */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA4_ID}');` }} />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
