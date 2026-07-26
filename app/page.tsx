import { PhoenixLeadForm } from './components/phoenix-lead-form';

const services = [
  ['Garage Floors', 'High-build flake systems engineered for Arizona garages, shops, and utility spaces.'],
  ['Commercial Floors', 'Durable seamless coatings for retail, warehouses, restaurants, and service facilities.'],
  ['Patios & Outdoors', 'Slip-resistant UV-aware systems selected for Phoenix heat and outdoor living.'],
  ['Interior Floors', 'Metallic, solid-color, and decorative systems for polished residential interiors.'],
  ['Concrete Surfaces', 'Polished concrete, stains, overlayments, countertops, and surface restoration.'],
];

const benefits = [
  ['Arizona-ready', 'System selection considers heat, UV exposure, abrasion, and concrete condition.'],
  ['Easy to maintain', 'Seamless surfaces reduce grout lines, dust traps, and difficult cleanup.'],
  ['Built for value', 'A professional floor can improve appearance, usability, and property presentation.'],
  ['Custom finishes', 'Choose flake, metallic, solid, stain, glitter, quartz, and polished looks.'],
];

const serviceAreas = ['Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Chandler', 'Gilbert', 'Glendale', 'Peoria', 'Surprise', 'Avondale', 'Goodyear', 'Fountain Hills'];

export default function HomePage() {
  return (
    <main className="national-site phoenix-market" id="top">
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="National Epoxy Pros Phoenix home">
          <span className="phoenix-mark" aria-hidden="true">◆</span>
          <span><strong>National Epoxy Pros</strong><small>Phoenix, Arizona</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">Services</a><a href="#results">Results</a><a href="#benefits">Why Epoxy</a><a href="#colors">Floor Options</a><a href="#areas">Service Areas</a>
        </nav>
        <a className="header-cta" href="#digital-bid">Get a Free Quote</a>
      </header>

      <section className="hero phoenix-hero">
        <div className="hero-image" aria-hidden="true"><div className="desert-window" /><div className="garage-floor" /></div>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Powered by XPS · Phoenix Metro Installation Network</p>
          <h1>Arizona&apos;s premier epoxy flooring, built to last.</h1>
          <p className="hero-lede">Transform garages, commercial spaces, patios, interiors, and concrete surfaces with high-performance systems designed for Arizona living.</p>
          <div className="hero-actions"><a className="button primary" href="#digital-bid">Get a Free Quote</a><a className="button secondary" href="#results">View Our Work</a><a className="button quiet" href="tel:+18779586408">Call (877) 958-6408</a></div>
          <div className="trust-row"><span>Arizona-ready systems</span><span>Residential warranties</span><span>Fast installation paths</span><span>70+ location network</span></div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-lead centered"><p className="eyebrow">Our Epoxy Flooring Services</p><h2>One local experience. A national supply backbone.</h2></div>
        <div className="service-icon-grid">{services.map(([title, copy], index) => <article key={title}><span className="service-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p><a href="#digital-bid">Start quote</a></article>)}</div>
      </section>

      <section className="results-section" id="results">
        <div className="result-copy"><p className="eyebrow">Real Results</p><h2>Real transformation.</h2><p>Preparation, repair, coating selection, broadcast density, and finish quality all matter. The Phoenix team follows a documented path from surface review to final walkthrough.</p><a className="button primary" href="#digital-bid">Plan My Floor</a></div>
        <div className="transformation-grid"><article><span>Before</span><div className="floor before-floor" /><strong>Worn garage concrete</strong></article><article><span>After</span><div className="floor after-floor" /><strong>Broadcast flake finish</strong></article><article><span>Premium</span><div className="floor metallic-floor" /><strong>Metallic interior system</strong></article></div>
      </section>

      <section className="benefits-section" id="benefits">
        <div className="benefit-grid">{benefits.map(([title, copy]) => <article key={title}><span>✓</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <aside className="sunset-quote"><p className="eyebrow">Get Your Free Quote Today</p><h2>Built for your floor and your timeline.</h2><p>Share the size, condition, finish, and ZIP code. This controlled Preview validates the complete request path without sending a live customer message.</p><a className="button primary" href="#digital-bid">Start My Quote</a></aside>
      </section>

      <section className="colors-section" id="colors">
        <div className="section-lead centered"><p className="eyebrow">Popular Color & Finish Options</p><h2>Design the surface before installation.</h2></div>
        <div className="flake-grid"><div className="flake chrome"><span>Chrome</span></div><div className="flake nightfall"><span>Nightfall</span></div><div className="flake saddle"><span>Saddle Tan</span></div><div className="flake gravel"><span>Gravel</span></div><div className="flake domino"><span>Domino</span></div><div className="flake cabin"><span>Cabin Fever</span></div><div className="flake tuxedo"><span>Tuxedo</span></div><div className="flake hazelnut"><span>Hazelnut</span></div></div>
        <div className="center-actions"><a className="button dark" href="https://xtremepolishingsystems.com/pages/flake-visualizer" target="_blank" rel="noopener noreferrer">Open XPS Visualizer</a><a className="button outline-dark" href="https://xtremepolishingsystems.com/pages/color-charts" target="_blank" rel="noopener noreferrer">View Color Charts</a></div>
      </section>

      <section className="app-band" id="digital-bid">
        <div className="bid-copy"><p className="eyebrow">Phoenix Digital Bid</p><h2>Tell us what the floor needs.</h2><p>This golden-path pilot proves that the approved visual, workbook controls, working interface, validation endpoint, Git branch, Preview deployment, and evidence receipts can move together as one pipeline.</p><div className="route-box"><span>Current brand</span><strong>National Epoxy Pros</strong><span>Market</span><strong>Phoenix, Arizona</strong><span>Production state</span><strong>Locked pending approval</strong></div></div>
        <PhoenixLeadForm />
      </section>

      <section className="testimonial-section"><p className="eyebrow">What Customers Value</p><blockquote>“The floor should feel intentional, durable, and easy to live with. That starts with preparation and ends with a clean final walkthrough.”</blockquote><span>National Epoxy Pros quality standard</span></section>

      <section className="locations-section" id="areas">
        <div className="location-copy"><p className="eyebrow">Proudly Serving the Phoenix Metro Area</p><h2>Local project routing backed by XPS.</h2><div className="area-grid">{serviceAreas.map(area => <span key={area}>{area}</span>)}</div><div className="contact-grid"><a href="tel:+18779586408">Call (877) 958-6408</a><a href="mailto:leads@nationalepoxypros.com">Email the Lead Team</a></div></div>
        <div className="phoenix-map" aria-label="Stylized Phoenix metro service map"><span className="map-pin">●</span><strong>Phoenix</strong><small>Metro service network</small></div>
      </section>

      <section className="financing-band"><div><p className="eyebrow">Flexible Project Paths</p><h2>Install, supply, training, and business support.</h2></div><a className="button primary" href="https://xtremepolishingsystems.com" target="_blank" rel="noopener noreferrer">Explore XPS</a></section>

      <footer><span><strong>National Epoxy Pros</strong> · Phoenix</span><span>Powered by Xtreme Polishing Systems</span><span><a href="tel:+18779586408">(877) 958-6408</a></span><span><a href="mailto:support@nationalepoxypros.com">support@nationalepoxypros.com</a></span></footer>
    </main>
  );
}
