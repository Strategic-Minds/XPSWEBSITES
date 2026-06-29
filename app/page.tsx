import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "National Epoxy Pros | Premium Epoxy, Polished Concrete & Digital Bids",
  description:
    "National Epoxy Pros is a premium epoxy, polished concrete, decorative concrete, countertop, and overlay digital bid app powered by XPS, America's #1 Epoxy Super Store.",
  openGraph: {
    title: "National Epoxy Pros | Powered by XPS",
    description:
      "Epoxy will change your life. Start a digital bid, find an XPS Xpress location, use the XPS visualizer, and explore premium floor systems.",
    url: "https://xpswebsites.vercel.app",
    siteName: "National Epoxy Pros",
    images: [{ url: "https://xpswebsites.vercel.app/national-epoxy-hero.svg", width: 1200, height: 630 }],
  },
};

const systems = [
  {
    name: "Epoxy Flake Floors",
    className: "flake",
    copy: "Dense broadcast flake systems for garages, shops, utility rooms, and commercial spaces.",
    href: "#digital-bid",
  },
  {
    name: "Metallic Epoxy",
    className: "metallic",
    copy: "Luxury pearlescent movement for showrooms, salons, retail interiors, basements, bars, and lobbies.",
    href: "#digital-bid",
  },
  {
    name: "Polished Concrete",
    className: "polished",
    copy: "Densified, reflective concrete for retail, warehouses, showrooms, and long-life commercial floors.",
    href: "#digital-bid",
  },
  {
    name: "Stained Concrete",
    className: "stained",
    copy: "Mottled, translucent decorative concrete for patios, restaurants, interiors, and warm stone-tone looks.",
    href: "#digital-bid",
  },
  {
    name: "Countertops & Overlayments",
    className: "countertop",
    copy: "Concrete countertop coatings, microtoppings, resurfacing, and specialty decorative systems.",
    href: "#digital-bid",
  },
];

const colorFamilies = [
  "XPS vinyl flake blends",
  "XPS metallic pigments",
  "XPS solid epoxy base coats",
  "XPS concrete dye and stain colors",
  "XPS glitter additive colors",
];

const dashboardTabs = [
  ["Customer", "Upload photos, confirm finish, track bid status"],
  ["Crew Leader", "Review prep, surface condition, materials, and install notes"],
  ["Owner", "Track leads, close rate, XPS routing, and revenue pipeline"],
  ["Supervisor", "Monitor QA, approvals, blockers, and release readiness"],
];

const seoPages = [
  "garage epoxy floors",
  "metallic epoxy floors",
  "polished concrete floors",
  "stained concrete patios",
  "concrete countertops",
  "microtopping overlayments",
  "epoxy floor training",
  "XPS Xpress locations",
  "open an epoxy store",
  "epoxy startup package",
  "epoxy floor cost",
  "decorative concrete near me",
];

export default function HomePage() {
  return (
    <main className="national-site" id="top">
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="National Epoxy Pros home">
          <img src="/national-epoxy-pros-logo.svg" alt="National Epoxy Pros" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#digital-bid">Digital Bid</a>
          <a href="#systems">Floors</a>
          <a href="#visualizer">Visualizer</a>
          <a href="#dashboards">Dashboards</a>
          <a href="#locations">Locations</a>
        </nav>
        <a className="header-cta" href="#digital-bid">Install App / Start Bid</a>
      </header>

      <section className="hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Powered by XPS - America's #1 Epoxy Super Store</p>
          <h1>Epoxy will change your life.</h1>
          <p className="hero-lede">
            Premium digital bids for epoxy flake, metallic epoxy, polished concrete, stained concrete,
            countertops, and overlayments, connected to the XPS nationwide supply network.
          </p>
          <form className="location-lookup" action="https://xtremepolishingsystems.com/pages/locations" method="get">
            <label htmlFor="heroZip">Find an XPS Xpress location near you</label>
            <div>
              <input id="heroZip" name="zip" inputMode="numeric" autoComplete="postal-code" placeholder="Enter ZIP code" />
              <button type="submit">Find Location</button>
            </div>
          </form>
          <div className="hero-actions">
            <a className="button primary" href="#digital-bid">Start Digital Bid</a>
            <a className="button secondary" href="https://xtremepolishingsystems.com/pages/flake-visualizer" target="_blank" rel="noopener noreferrer">
              Open XPS Visualizer
            </a>
            <a className="button quiet" href="tel:+18779586408">Call (877) 958-6408</a>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="XPS lead generation proof">
        <div><strong>70+</strong><span>XPS Xpress satellite locations</span></div>
        <div><strong>XPS</strong><span>America's #1 Epoxy Super Store</span></div>
        <div><strong>24 hr</strong><span>digital bid response target</span></div>
        <div><strong>PWA</strong><span>branded app install path</span></div>
      </section>

      <section className="app-band" id="digital-bid">
        <div className="bid-copy">
          <p className="eyebrow">Actual Digital Bid Page</p>
          <h2>Quote the floor, route the lead, then move the customer into a dashboard.</h2>
          <p>
            Every request packages location, finish, square footage, concrete condition, color-chart family,
            project notes, and urgency for the National Epoxy Pros lead team.
          </p>
          <div className="route-box">
            <span>Lead inbox</span><strong>leads@nationalepoxypros.com</strong>
            <span>AI operations</span><strong>ai@autobuilderos.com</strong>
          </div>
        </div>
        <form className="digital-bid-form" action="mailto:leads@nationalepoxypros.com" method="post" encType="text/plain">
          <div className="form-grid two">
            <label>Full name<input name="name" autoComplete="name" required /></label>
            <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
          </div>
          <div className="form-grid two">
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Project ZIP<input name="zip" inputMode="numeric" autoComplete="postal-code" required /></label>
          </div>
          <div className="form-grid three">
            <label>Approx. square feet<input name="squareFeet" inputMode="numeric" placeholder="650" /></label>
            <label>
              Floor system
              <select name="finish">
                <option>Epoxy flake</option>
                <option>Metallic epoxy</option>
                <option>Polished concrete</option>
                <option>Stained concrete</option>
                <option>Concrete countertop</option>
                <option>Concrete overlayment</option>
              </select>
            </label>
            <label>
              Timeline
              <select name="timeline">
                <option>ASAP</option>
                <option>Within 30 days</option>
                <option>1-3 months</option>
                <option>Planning / budgeting</option>
              </select>
            </label>
          </div>
          <div className="form-grid two">
            <label>
              Color chart family
              <select name="colorChart">
                {colorFamilies.map((family) => <option key={family}>{family}</option>)}
              </select>
            </label>
            <label>
              Existing surface
              <select name="surface">
                <option>Bare concrete</option>
                <option>Old coating needs removal</option>
                <option>Cracks or spalling</option>
                <option>Tile, VCT, carpet, or glue</option>
                <option>Countertop or vertical surface</option>
              </select>
            </label>
          </div>
          <label>
            Project notes
            <textarea name="notes" rows={4} placeholder="Tell us about the floor, desired look, photos, moisture concerns, or business package interest." />
          </label>
          <div className="form-actions">
            <button type="submit">Send Digital Bid Request</button>
            <a href="https://xtremepolishingsystems.com/pages/color-charts" target="_blank" rel="noopener noreferrer">View XPS Color Charts</a>
          </div>
        </form>
      </section>

      <section className="systems-section" id="systems">
        <div className="section-lead">
          <p className="eyebrow">Premium Finish Library</p>
          <h2>Dedicated floor pages for search, education, and conversion.</h2>
          <p>Each finish routes the customer toward a digital bid, the XPS visualizer, color charts, training, products, or business-package interest.</p>
        </div>
        <div className="system-grid premium">
          {systems.map((system) => (
            <article key={system.name}>
              <div className={`swatch ${system.className}`} />
              <h3>{system.name}</h3>
              <p>{system.copy}</p>
              <a href={system.href}>Start bid</a>
            </article>
          ))}
        </div>
      </section>

      <section className="visualizer-section" id="visualizer">
        <div className="visualizer-stage" aria-hidden="true">
          <div className="visualizer-floor" />
          <span>Visualizer + Color Charts</span>
        </div>
        <div className="visualizer-copy">
          <p className="eyebrow">Design Before You Buy</p>
          <h2>Use XPS color charts and visualizer links inside the bid path.</h2>
          <p>
            Customers can explore flake blends, metallic pigments, solid epoxy colors, glitter additives,
            concrete dye and stain colors, then submit the exact family they want quoted.
          </p>
          <div className="link-cluster">
            <a href="https://xtremepolishingsystems.com/pages/flake-visualizer" target="_blank" rel="noopener noreferrer">Flake Visualizer</a>
            <a href="https://xtremepolishingsystems.com/pages/color-charts" target="_blank" rel="noopener noreferrer">Color Charts</a>
            <a href="https://xtremepolishingsystems.com/pages/metallic-epoxy-colors" target="_blank" rel="noopener noreferrer">Metallic Colors</a>
            <a href="https://xtremepolishingsystems.com/pages/epoxy-flake-colors" target="_blank" rel="noopener noreferrer">Flake Colors</a>
          </div>
        </div>
      </section>

      <section className="dashboards" id="dashboards">
        <div className="section-lead">
          <p className="eyebrow">App Dashboards</p>
          <h2>One premium interface, four operational views.</h2>
        </div>
        <div className="dashboard-shell">
          <aside className="dashboard-nav" aria-label="Dashboard roles">
            {dashboardTabs.map(([role]) => <span key={role}>{role}</span>)}
          </aside>
          <div className="dashboard-panel">
            <div className="dashboard-topline">
              <span>Owner Dashboard</span>
              <strong>Lead engine active</strong>
            </div>
            <div className="dashboard-grid">
              {dashboardTabs.map(([role, detail]) => (
                <div key={role}>
                  <span>{role}</span>
                  <strong>{detail}</strong>
                </div>
              ))}
            </div>
            <div className="timeline">
              <span className="done">Lead captured</span>
              <span className="active">Design review</span>
              <span>Bid sent</span>
              <span>Install scheduled</span>
            </div>
          </div>
        </div>
      </section>

      <section className="xps-funnel">
        <div className="section-lead">
          <p className="eyebrow">Lead Generation Helper For XPS</p>
          <h2>Capture the entire journey: floor buyer, DIY buyer, trainee, contractor, and store owner.</h2>
        </div>
        <div className="funnel-grid">
          <a href="#digital-bid"><strong>Get a Floor Installed</strong><span>Digital bid, finish selection, project routing</span></a>
          <a href="https://xtremepolishingsystems.com" target="_blank" rel="noopener noreferrer"><strong>Buy Products</strong><span>Epoxy coatings, grinders, tooling, stains, dyes, supplies</span></a>
          <a href="https://xtremepolishingsystems.com/pages/how-to-videos" target="_blank" rel="noopener noreferrer"><strong>Learn The Trade</strong><span>How-to videos, tutorials, polishing education</span></a>
          <a href="https://xtremepolishingsystems.com/pages/open-an-epoxy-store" target="_blank" rel="noopener noreferrer"><strong>Start A Business</strong><span>XPS Xpress, business packages, coaching, support</span></a>
        </div>
      </section>

      <section className="seo-directory">
        <div className="section-lead">
          <p className="eyebrow">SEO Expansion Scaffold</p>
          <h2>64-page organic structure staged around the concrete coatings market.</h2>
        </div>
        <div className="page-grid">
          {seoPages.map((page) => <a key={page} href="#digital-bid">{page}</a>)}
        </div>
      </section>

      <section className="asset-library">
        <div>
          <p className="eyebrow">AI Image Asset Library</p>
          <h2>Universal creative intake for National Epoxy Pros, Auto Builder OS, and Strategic Minds Advisory.</h2>
          <p>GPT agents, Base44 agents, and future AI teammates use <strong>ai@autobuilderos.com</strong> as the unified creative intake mailbox.</p>
        </div>
        <div className="asset-steps">
          <span>Inbox</span>
          <span>Raw generation</span>
          <span>Metadata</span>
          <span>QA approval</span>
          <span>Website / social / ads / dashboard export</span>
        </div>
      </section>

      <section className="locations-section" id="locations">
        <div className="location-copy">
          <p className="eyebrow">70+ Location Network</p>
          <h2>Route every visitor to an installer, XPS Xpress store, product path, or business path.</h2>
          <p>
            Corporate source: Xtreme Polishing Systems Supply, 2200 NW 32nd St #700, Pomp Beach, FL 33069.
            Phone: (877) 958-6408.
          </p>
          <div className="contact-grid">
            <a href="tel:+18779586408">Call (877) 958-6408</a>
            <a href="https://wa.me/15556000743" target="_blank" rel="noopener noreferrer">WhatsApp 555-600-0743</a>
            <a href="mailto:support@nationalepoxypros.com">Support</a>
            <a href="mailto:sales@nationalepoxypros.com">Sales</a>
          </div>
        </div>
        <form className="locator-card" action="https://xtremepolishingsystems.com/pages/locations" method="get">
          <h3>Location Lookup</h3>
          <label>ZIP code<input name="zip" inputMode="numeric" autoComplete="postal-code" /></label>
          <button type="submit">Find XPS Xpress Near Me</button>
          <a href="https://xtremepolishingsystems.com/pages/locations" target="_blank" rel="noopener noreferrer">Open XPS location directory</a>
        </form>
      </section>

      <section className="mobile-install">
        <div>
          <p className="eyebrow">Branded Mobile Home Screen Button</p>
          <h2>Install National Epoxy Pros as a field-ready app.</h2>
        </div>
        <a className="button primary" href="#digital-bid">Download National Epoxy Pros App</a>
      </section>

      <footer>
        <span>National Epoxy Pros</span>
        <span>Powered by XPS - America's #1 Epoxy Super Store</span>
        <span>EpoxyWillChangeYourLife.com</span>
        <span>ai@autobuilderos.com</span>
      </footer>
    </main>
  );
}
