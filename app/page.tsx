import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "National Epoxy Pros | Digital Epoxy Floor Bids",
  description:
    "Start a National Epoxy Pros digital bid, explore XPS floor systems, and connect with certified epoxy pros nationwide.",
  openGraph: {
    title: "National Epoxy Pros | Digital Epoxy Floor Bids",
    description: "Certified epoxy floor systems nationwide, powered by Xtreme Polishing Systems.",
    url: "https://xpswebsites.vercel.app",
    siteName: "National Epoxy Pros",
    images: [{ url: "https://xpswebsites.vercel.app/national-epoxy-hero.svg", width: 1200, height: 630 }],
  },
};

const floorSystems = [
  {
    name: "Flake Systems",
    className: "flake",
    description: "Durable, decorative, slip-resistant systems for garages, shops, and service spaces.",
  },
  {
    name: "Metallic Epoxy",
    className: "metallic",
    description: "High-gloss movement and one-of-one depth for showpiece interiors.",
  },
  {
    name: "Quartz Systems",
    className: "quartz",
    description: "Textured, tough, and made for high-traffic commercial environments.",
  },
  {
    name: "Solid Colors",
    className: "solid",
    description: "Clean, seamless finishes for utility, warehouse, retail, and modern workspaces.",
  },
  {
    name: "Stain & Glitter",
    className: "stain",
    description: "Custom character for decorative concrete and specialty floors.",
  },
];

const colorNames = ["Shoreline", "Domino", "Midnight", "Gold Rush", "Granite", "Saddle", "Stone Blue", "Arctic"];

export default function HomePage() {
  return (
    <main className="national-site" id="top">
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="National Epoxy Pros home">
          <img src="/national-epoxy-pros-logo.svg" alt="National Epoxy Pros" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#systems">Systems</a>
          <a href="#digital-bid">Digital Bid</a>
          <a href="#visualizer">Visualizer</a>
          <a href="#locations">Locations</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href="#digital-bid">Start Your Digital Bid</a>
      </header>

      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img src="/national-epoxy-hero.svg" alt="" />
        </div>
        <div className="hero-shade" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Powered by Xtreme Polishing Systems</p>
            <h1>
              Design it. <span>See it.</span> Love it.
            </h1>
            <p className="hero-lede">
              Premium epoxy floor systems designed by you and installed by certified pros across 70+ service locations.
            </p>
            <div className="proof-list">
              <span>Certified epoxy pros</span>
              <span>Premium XPS materials</span>
              <span>24-hour bid response goal</span>
            </div>
            <div className="hero-actions">
              <a className="button primary" href="#digital-bid">Get My Digital Bid</a>
              <a className="button secondary" href="tel:+18779586408">Call (877) 958-6408</a>
            </div>
            <p className="rating-line">National Epoxy Pros is powered by Xtreme Polishing Systems Supply, America's #1 Epoxy Super Store.</p>
          </div>

          <form className="bid-card" action="mailto:leads@nationalepoxypros.com" method="post" encType="text/plain">
            <h2>Start your digital bid and save 15% off</h2>
            <label>
              Full name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" autoComplete="tel" required />
            </label>
            <button type="submit">Get My Digital Bid</button>
            <p>Lead handoff routes to leads@nationalepoxypros.com.</p>
          </form>
        </div>
      </section>

      <section className="stats-band" aria-label="Company proof points">
        <div><strong>30+</strong><span>years of XPS experience</span></div>
        <div><strong>70+</strong><span>locations nationwide</span></div>
        <div><strong>Millions</strong><span>of sq ft installed</span></div>
        <div><strong>24 hr</strong><span>digital bid response goal</span></div>
      </section>

      <section className="systems-section" id="systems">
        <div className="section-kicker">Signature Floor Systems</div>
        <div className="section-heading">
          <h2>Built for homes, garages, shops, showrooms, and commercial floors.</h2>
          <a className="text-link" href="#digital-bid">Compare systems</a>
        </div>
        <div className="system-grid">
          {floorSystems.map((system) => (
            <article key={system.name}>
              <div className={`swatch ${system.className}`} />
              <h3>{system.name}</h3>
              <p>{system.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bid-section" id="digital-bid">
        <div className="bid-copy">
          <p className="eyebrow">Digital Bid Page</p>
          <h2>Get a fast, accurate epoxy floor estimate.</h2>
          <ul>
            <li>24-hour bid response target</li>
            <li>Accurate pricing you can trust</li>
            <li>No phone tag, no delays</li>
          </ul>
          <p>
            Photos, square footage, surface condition, finish type, and timeline are routed to the National Epoxy Pros lead team.
          </p>
        </div>
        <form className="estimate-form" action="mailto:leads@nationalepoxypros.com" method="post" encType="text/plain">
          <div className="form-row">
            <label>Full name<input name="name" autoComplete="name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          </div>
          <div className="form-row">
            <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
            <label>Project zip code<input name="zip" inputMode="numeric" autoComplete="postal-code" required /></label>
          </div>
          <div className="form-row">
            <label>Approx. square feet<input name="squareFeet" inputMode="numeric" placeholder="Example: 650" /></label>
            <label>
              Desired finish
              <select name="finish">
                <option>Flake system</option>
                <option>Metallic epoxy</option>
                <option>Quartz system</option>
                <option>Solid color</option>
                <option>Stain or glitter additive</option>
              </select>
            </label>
          </div>
          <label>
            Project notes
            <textarea name="notes" rows={4} placeholder="Tell us about the floor, timeline, existing coating, cracks, or moisture concerns." />
          </label>
          <button type="submit">Send Digital Bid Request</button>
          <p className="form-note">Submissions are prepared for leads@nationalepoxypros.com.</p>
        </form>
      </section>

      <section className="visualizer-section" id="visualizer">
        <div className="visualizer-copy">
          <p className="eyebrow">Visualizer Page</p>
          <h2>Design your perfect floor in real time.</h2>
          <p>
            Explore XPS flake blends and color inspiration before your bid. The live visualizer opens directly from Xtreme Polishing Systems.
          </p>
          <div className="visualizer-actions">
            <a className="button primary" href="https://xtremepolishingsystems.com/pages/flake-visualizer" target="_blank" rel="noopener noreferrer">Start Visualizing</a>
            <a className="button secondary dark-text" href="#design-center">Open Design Center</a>
          </div>
        </div>
        <div className="visualizer-panel">
          <img src="/national-epoxy-hero.svg" alt="Glossy epoxy floor visualizer preview" />
        </div>
      </section>

      <section className="design-center" id="design-center">
        <aside className="design-tabs" aria-label="Design center categories">
          <span>Flake Systems</span>
          <span>Metallic Epoxy</span>
          <span>Quartz Finishes</span>
          <span>Solid Colors</span>
          <span>Stain & Dye</span>
        </aside>
        <div className="design-content">
          <p className="eyebrow">Design Center</p>
          <h2>Choose the system, color family, and sheen before we bid.</h2>
          <div className="color-board">
            {colorNames.map((color, index) => (
              <span key={color} className={`color-tile tone-${index}`}>{color}</span>
            ))}
          </div>
          <p className="design-note">Final selections should be matched to the approved XPS color charts in the Drive packet.</p>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-heading">
          <h2>Real projects. Real results.</h2>
          <a className="text-link" href="#digital-bid">Start yours</a>
        </div>
        <div className="gallery-grid" aria-label="Project style samples">
          <div className="gallery-tile garage" />
          <div className="gallery-tile shop" />
          <div className="gallery-tile commercial" />
          <div className="gallery-tile showroom" />
        </div>
      </section>

      <section className="locations-section" id="locations">
        <div className="locations-map" aria-hidden="true" />
        <div>
          <p className="eyebrow">70+ Locations</p>
          <h2>National reach with local service.</h2>
          <p>
            National Epoxy Pros is powered by Xtreme Polishing Systems Supply, based at 2200 NW 32nd St #700, Pompano Beach, FL 33069.
          </p>
          <div className="contact-grid">
            <a href="tel:+18779586408">Call (877) 958-6408</a>
            <a href="https://wa.me/15556000743" target="_blank" rel="noopener noreferrer">WhatsApp 555-600-0743</a>
            <a href="mailto:support@nationalepoxypros.com">support@nationalepoxypros.com</a>
            <a href="mailto:sales@nationalepoxypros.com">sales@nationalepoxypros.com</a>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Service & Contact</p>
          <h2>Ready to transform your floor?</h2>
          <p>Digital bids route to leads. Support routes to support. Outbound sales routes to sales.</p>
        </div>
        <div className="contact-actions">
          <a className="button primary" href="#digital-bid">Start Your Digital Bid</a>
          <a className="button secondary" href="mailto:support@nationalepoxypros.com">Email Support</a>
        </div>
      </section>

      <footer>
        <span>National Epoxy Pros</span>
        <span>Powered by Xtreme Polishing Systems</span>
        <span>2200 NW 32nd St #700, Pompano Beach, FL 33069</span>
      </footer>
    </main>
  );
}
