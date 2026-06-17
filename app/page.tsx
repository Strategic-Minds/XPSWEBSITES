import { PhoenixLeadForm } from "./components/PhoenixLeadForm";

const phone = "772-209-0266";
const phoneHref = "tel:17722090266";
const email = "JEREMY@SHOPXPS.COM";

const images = {
  hero: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-hero.webp?v=1781648558",
  beforeAfter: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-before-after.webp?v=1781648570",
  garage: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581",
  commercial: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-commercial.webp?v=1781648591",
  patio: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-patio.webp?v=1781648601",
  repair: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-repair.webp?v=1781648616",
  flakeColorChart: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-12-epoxy-flake-color-chart.webp?v=1780952839"
};

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Color Chart", href: "#color-chart" },
  { label: "Gallery", href: "#gallery" },
  { label: "Portal", href: "#portal" }
];

const services = [
  {
    title: "Garage Floors",
    image: images.garage,
    summary: "Flake systems, polyaspartic topcoats, and garage-ready finish planning.",
    detail: "Most homeowners start here. Send photos, square footage, and finish direction for a cleaner estimate review."
  },
  {
    title: "Commercial Floors",
    image: images.commercial,
    summary: "Showrooms, shops, warehouses, and workspaces with durable coating systems.",
    detail: "Built around traffic, use case, prep needs, timeline, and long-term maintenance."
  },
  {
    title: "Patios & Outdoor Spaces",
    image: images.patio,
    summary: "Outdoor concrete coatings for patios, covered spaces, and Arizona homes.",
    detail: "Finish direction depends on sun exposure, slab condition, and traffic patterns."
  },
  {
    title: "Floor Repair",
    image: images.repair,
    summary: "Crack repair, coating removal, grinding, prep, and failed DIY recovery.",
    detail: "Photos help determine whether the project needs repair, prep, or a full coating system."
  }
];

const trustItems = [
  {
    title: "Quote-Ready Details",
    text: "Send the basics once so the first conversation starts with the right surface, location, and contact path."
  },
  {
    title: "Photo-Based Estimate Prep",
    text: "Project type, floor condition, rough size, and finish direction help shape a clearer first quote."
  },
  {
    title: "Finish & Prep Guidance",
    text: "Understand coating options, surface prep, color direction, and next steps before scheduling."
  }
];

const processSteps = [
  {
    number: "1",
    title: "Quote Intake",
    image: images.garage,
    text: "Share contact details, ZIP code, project type, size direction, and the best way to reach you."
  },
  {
    number: "2",
    title: "Photo & Surface Review",
    image: images.repair,
    text: "Review cracks, stains, existing coating, moisture concerns, and visible prep needs before pricing direction."
  },
  {
    number: "3",
    title: "Prep Plan",
    image: images.commercial,
    text: "Confirm grinding, repair, masking, cleaning, and coating removal needs so the install path is realistic."
  },
  {
    number: "4",
    title: "Color Selection",
    image: images.patio,
    text: "Choose flake, solid, decorative concrete, or repair-first direction with the color chart as the guide."
  },
  {
    number: "5",
    title: "Install & Topcoat",
    image: images.beforeAfter,
    text: "Base coat, broadcast, detail work, and topcoat finish are staged around the right system for the space."
  },
  {
    number: "6",
    title: "Walkthrough & Care",
    image: images.garage,
    text: "Confirm finish quality, cure guidance, maintenance notes, and portal handoff before closeout."
  }
];

const colorChips = [
  "Domino",
  "Nightfall",
  "Gravel",
  "Tuxedo",
  "Shoreline",
  "Wombat",
  "Saddle Tan",
  "Cabin Fever",
  "Outback",
  "Biscuit",
  "Custom Blend",
  "Chestnut"
];

const gallery = [
  { title: "Garage Floors", image: images.garage },
  { title: "Commercial Floors", image: images.commercial },
  { title: "Outdoor Spaces", image: images.patio },
  { title: "Concrete Repair", image: images.repair }
];

const reviewCards = [
  ["Google", "A photo-first estimate path helps the first quote conversation move faster."],
  ["Facebook", "Customers can send floor condition, timeline, and finish direction before scheduling."],
  ["Yelp", "The guided flow makes prep, color choice, and next steps easier to understand."]
];

export default function HomePage() {
  return (
    <main className="phoenix-site">
      <header className="site-header">
        <a className="header-logo" href="#home" aria-label="Phoenix Epoxy Pros home">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <nav aria-label="Main navigation">
          {navLinks.map((link) => (
            <a href={link.href} key={link.label}>{link.label}</a>
          ))}
          <a className="header-call" href={phoneHref}>Call</a>
        </nav>
        <a className="gold-button header-cta" href="#estimate">Get Quote</a>
        <span className="mobile-menu-mark" aria-hidden="true"><span /><span /><span /></span>
      </header>

      <section className="hero" id="home" aria-label="Phoenix Epoxy Pros estimate hero">
        <div className="hero-stage">
          <div className="hero-photo" aria-hidden="true">
            <img src={images.hero} alt="" />
          </div>
          <div className="hero-logo-panel" aria-hidden="true">
            <img src="/images/logo-panel.webp?v=mask-20260616" alt="" />
          </div>
          <PhoenixLeadForm />
        </div>

        <nav className="mobile-action-rail" aria-label="Mobile quick actions">
          <a href="#estimate"><span className="action-icon">01</span>Estimate</a>
          <a href="#process"><span className="action-icon">02</span>Process</a>
          <a href="#color-chart"><span className="action-icon">03</span>Colors</a>
          <a href={phoneHref}><span className="action-icon">04</span>Call</a>
        </nav>
      </section>

      <section className="mobile-steps" aria-label="Mobile estimate steps">
        <SectionIntro kicker="Start here" title="Four taps to get moving" />
        <div className="app-step-list">
          <a href="#estimate"><span>1</span><strong>Pick Your Surface</strong><small>Garage, commercial, patio, repair, or decorative concrete.</small></a>
          <a href="#estimate"><span>2</span><strong>Send The Basics</strong><small>Name, phone, email, ZIP code, and project type start the quote path.</small></a>
          <a href="#color-chart"><span>3</span><strong>Choose Direction</strong><small>Review flake colors, finish families, and visualizer options.</small></a>
          <a href="/customer-portal"><span>4</span><strong>Track Next Steps</strong><small>Preview job tracking, documents, messages, and care guides.</small></a>
        </div>
      </section>

      <section className="trust-band" aria-label="Estimate benefits">
        {trustItems.map((item) => (
          <p key={item.title}><strong>{item.title}</strong><span>{item.text}</span></p>
        ))}
      </section>

      <section className="section services-section" id="services">
        <SectionIntro kicker="Services" title="Choose the right surface path" />
        <div className="services-grid">
          {services.map((service) => (
            <a className="service-card" href="#estimate" key={service.title}>
              <img src={service.image} alt={`${service.title} project example`} />
              <div>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <small>{service.detail}</small>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="proof-section" id="before-after">
        <div className="proof-copy">
          <span className="section-kicker">Before / After</span>
          <h2>See the difference a properly prepared floor can make.</h2>
          <p>
            Surface prep, repair, coating choice, and topcoat finish all shape the final result. Start with the quote
            card so the first conversation begins with the right project type.
          </p>
          <a className="gold-button" href="#estimate">Start My Quote</a>
        </div>
        <img src={images.beforeAfter} alt="Before and after Phoenix epoxy garage floor comparison" />
      </section>

      <section className="section process-section" id="process">
        <SectionIntro kicker="Step by step" title="From first photos to final walkthrough" />
        <div className="process-grid">
          {processSteps.map((step) => (
            <article className="process-card" key={step.title}>
              <div className="process-image">
                <img src={step.image} alt={`${step.title} project stage`} />
                <span className="process-number">{step.number}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="color-chart-section" id="color-chart">
        <div className="color-chart-layout">
          <div className="color-chart-copy">
            <span className="section-kicker">Color chart</span>
            <h2>Pick the finish family before the quote call.</h2>
            <p>
              This section now uses the XPS top 12 epoxy flake chart from the approved Nashville reference. Use it as
              the starting point for color direction before final chip size, texture, sheen, and availability are
              confirmed during estimate review.
            </p>
            <div className="color-tabs" aria-label="Finish systems">
              <span>Flake</span>
              <span>Metallic</span>
              <span>Concrete Stain</span>
              <span>Polished</span>
            </div>
          </div>

          <figure className="flake-chart-panel">
            <div className="flake-chart-header">
              <span>Top 12 flake blends</span>
              <strong>XPS Epoxy Flake Color Chart</strong>
            </div>
            <img
              src={images.flakeColorChart}
              alt="XPS top 12 epoxy flake color chart with Domino, Nightfall, Gravel, Tuxedo, Shoreline, Wombat, Saddle Tan, Cabin Fever, Outback, Biscuit, Custom Blend, and Chestnut"
            />
            <figcaption>
              Shown as the early finish-selection reference. Final samples should be confirmed against the real floor,
              lighting, project scope, and material availability.
            </figcaption>
            <div className="flake-name-row" aria-label="Popular flake blend quick picks">
              {colorChips.map((color) => (
                <span key={color}>{color}</span>
              ))}
            </div>
          </figure>

          <aside className="visualizer-callout">
            <strong>Need to see it on a floor?</strong>
            <p>Open the floor visualizer, choose a direction, then bring that preference into the estimate path.</p>
            <a className="dark-button" href="/visualizer">Open Floor Visualizer</a>
          </aside>

          <aside className="portal-teaser" id="portal">
            <span className="section-kicker">Customer portal</span>
            <h2>Your project in your pocket.</h2>
            <ul>
              <li>Track proposal and scheduling steps.</li>
              <li>Keep project messages and documents in one place.</li>
              <li>Preview warranty and care-guide handoff.</li>
              <li>Keep the next project action easy to find.</li>
            </ul>
            <a className="gold-button" href="/customer-portal">Open Portal Preview</a>
          </aside>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <SectionIntro kicker="Project gallery" title="Sharp images that fill the screen" dark />
        <div className="gallery-strip">
          {gallery.map((item) => (
            <a href="#estimate" key={item.title}>
              <img src={item.image} alt={`${item.title} example`} />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
        <a className="gold-button" href="#estimate">Quote A Similar Project</a>
      </section>

      <section className="section reviews-section" id="reviews">
        <SectionIntro kicker="Reviews" title="Make the first conversation clearer" />
        <div className="review-grid">
          {reviewCards.map(([platform, text]) => (
            <article className="review-card" key={platform}>
              <div className="stars" aria-hidden="true"><span /><span /><span /><span /><span /></div>
              <h3>{platform}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq-section">
        <SectionIntro kicker="Common questions" title="Plan your epoxy floor estimate" />
        <div className="faq-grid">
          <details open>
            <summary>What should I send for an estimate?</summary>
            <p>Send the project type, rough square footage, timeline, surface condition, and clear photos of the floor.</p>
          </details>
          <details>
            <summary>Can I share photos?</summary>
            <p>Yes. After the first quote request, project photos can be used to review the real floor condition.</p>
          </details>
          <details>
            <summary>What happens after I request a quote?</summary>
            <p>The project details are reviewed so the right prep, coating system, and scheduling path can be discussed.</p>
          </details>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
          <p>Phoenix epoxy floor estimates, visualizer direction, color chart planning, and customer project portal.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#color-chart">Color Chart</a>
          <a href="#gallery">Gallery</a>
          <a href="/visualizer">Visualizer</a>
          <a href="/customer-portal">Customer Portal</a>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={phoneHref}>{phone}</a>
        </nav>
      </footer>

      <a className="mobile-call" href={phoneHref}>Call {phone}</a>
    </main>
  );
}

function SectionIntro({ kicker, title, dark = false }: { kicker: string; title: string; dark?: boolean }) {
  return (
    <div className={`section-intro ${dark ? "dark" : ""}`}>
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
    </div>
  );
}
