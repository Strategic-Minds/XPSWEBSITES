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
  repair: "https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-repair.webp?v=1781648616"
};

const services = [
  {
    title: "Garage Floors",
    image: images.garage,
    summary: "Flake systems, polyaspartic topcoats, and garage-ready finish planning.",
    detail: "Most homeowners start here. Send photos, square footage, and finish direction for a rough estimate."
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

const processSteps = [
  ["1", "Estimate Intake", "Send contact details, ZIP code, and project type."],
  ["2", "Surface Review", "We check coating history, cracks, stains, moisture risk, and prep needs."],
  ["3", "Finish Direction", "Choose flake, decorative concrete, polished concrete, or repair-first options."],
  ["4", "Proposal", "Receive next-step pricing direction and scheduling requirements after review."],
  ["5", "Install Prep", "Grinding, cleaning, patching, masking, and material planning happen before coating."],
  ["6", "Final Walkthrough", "Confirm finish quality, care notes, and follow-up items before closeout."]
];

const gallery = [
  { title: "Garage Floors", image: images.garage },
  { title: "Commercial Floors", image: images.commercial },
  { title: "Outdoor Spaces", image: images.patio },
  { title: "Concrete Repair", image: images.repair }
];

const reviewCards = [
  ["Google", "Photo-first estimates make the first conversation faster."],
  ["Facebook", "Send the surface condition, timeline, and inspiration before scheduling."],
  ["Yelp", "A guided quote flow helps avoid vague pricing and missed prep details."]
];

export default function HomePage() {
  return (
    <main className="phoenix-site">
      <header className="site-header">
        <a className="header-logo" href="#home" aria-label="Phoenix Epoxy Pros home">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#before-after">Before / After</a>
          <a href="#reviews">Reviews</a>
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
            <img src="/images/logo-panel.webp" alt="" />
          </div>
          <PhoenixLeadForm />
        </div>

        <nav className="mobile-action-rail" aria-label="Mobile quick actions">
          <a href="#before-after"><span className="action-icon">B/A</span>Before / After</a>
          <a href="#reviews"><span className="action-icon">REV</span>Reviews</a>
          <a href={phoneHref}><span className="action-icon">CALL</span>Call</a>
        </nav>
      </section>

      <section className="mobile-steps" aria-label="Mobile estimate steps">
        <SectionIntro kicker="Start here" title="Four taps to get moving" />
        <div className="app-step-list">
          <a href="#estimate"><span>1</span><strong>Pick Your Surface</strong><small>Garage, commercial, patio, repair, or decorative concrete.</small></a>
          <a href="#estimate"><span>2</span><strong>Send Details</strong><small>Share your name, phone, email, ZIP code, and project type.</small></a>
          <a href="#process"><span>3</span><strong>Review The Process</strong><small>Understand prep, coating, topcoat, and walkthrough steps.</small></a>
          <a href="/customer-portal"><span>4</span><strong>Open Portal</strong><small>Preview job tracking, documents, messages, and care guides.</small></a>
        </div>
      </section>

      <section className="trust-band" aria-label="Estimate benefits">
        <p><strong>Digital intake</strong><span>Contact details, ZIP code, and project type in one flow.</span></p>
        <p><strong>Rough estimate path</strong><span>Better inputs create a cleaner first quote conversation.</span></p>
        <p><strong>Project guidance</strong><span>Choose services, finishes, and next steps without starting over.</span></p>
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
          {processSteps.map(([number, title, text]) => (
            <article className="process-card" key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
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

      <section className="market-section" id="visualizer">
        <div className="color-panel">
          <span className="section-kicker">Color direction</span>
          <h2>Explore finish families before you quote.</h2>
          <div className="chip-grid">
            {["Domino", "Nightfall", "Gravel", "Tuxedo", "Shoreline", "Wombat", "Saddle", "Outback"].map((color, index) => (
              <span className={`flake-chip chip-${index % 4}`} key={color}>{color}</span>
            ))}
          </div>
          <a className="dark-button" href="/visualizer">Open Floor Visualizer</a>
        </div>
        <div className="portal-teaser" id="portal">
          <span className="section-kicker">Customer portal</span>
          <h2>Your project in your pocket.</h2>
          <ul>
            <li>Track proposal and scheduling steps.</li>
            <li>Keep project messages and documents in one place.</li>
            <li>Preview warranty and care-guide handoff.</li>
            <li>Keep the next project action easy to find.</li>
          </ul>
          <a className="gold-button" href="/customer-portal">Open Portal Preview</a>
        </div>
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
          <p>Phoenix epoxy floor estimates, visualizer direction, and customer project portal.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#gallery">Gallery</a>
          <a href="/visualizer">Visualizer</a>
          <a href="/customer-portal">Customer Portal</a>
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
