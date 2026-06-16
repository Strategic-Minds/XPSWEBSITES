const services = [
  ["Garage Floors", "Flake, metallic, and high-wear garage systems for Phoenix homes."],
  ["Commercial Floors", "Durable coating and polished concrete paths for shops and facilities."],
  ["Patios & Outdoor Spaces", "Decorative concrete and coating direction for outdoor surfaces."],
  ["Floor Repair", "Crack, prep, and surface repair workflows before the coating system."]
];

const reviews = [
  ["Google", "Review link pending"],
  ["Facebook", "Owner approval pending"],
  ["Yelp", "Proof slot ready"]
];

const phone = "772-209-0266";
const phoneHref = "tel:17722090266";

export default function HomePage() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#quote">
          <span className="mark">PEP</span>
          <span>Phoenix <strong>Epoxy Pros</strong></span>
        </a>
        <nav>
          <a href="#before-after">Before / After</a>
          <a href="#reviews">Reviews</a>
          <a href={phoneHref}>Call</a>
        </nav>
        <a className="button" href="#quote-form">Get Quote</a>
      </header>

      <section className="hero" id="quote">
        <div className="hero-logo" aria-label="Phoenix Epoxy Pros">
          <span className="phoenix">Phoenix</span>
          <span className="epoxy">Epoxy Pros</span>
        </div>
        <div className="hero-image">
          <img src="/images/hero-garage.webp" alt="Finished garage epoxy floor with cabinets" />
        </div>
        <section className="hero-copy">
          <p className="eyebrow">Phoenix metro epoxy floor estimates</p>
          <h1>Phoenix Epoxy Pros</h1>
          <p>Garage floors, commercial floors, patios, outdoor spaces, repairs, polished concrete, decorative concrete, and XPS-connected training inquiries.</p>
          <div className="actions">
            <a className="button" href="#quote-form">Get Quote</a>
            <a className="button ghost" href={phoneHref}>Call {phone}</a>
          </div>
        </section>
        <EstimateForm />
      </section>

      <section className="quick" aria-label="Quick actions">
        <a href="#before-after">Before / After</a>
        <a href="#reviews">Reviews</a>
        <a href={phoneHref}>Call</a>
      </section>

      <section className="section" id="before-after">
        <div className="section-title"><span /> <h2>Before / After</h2></div>
        <div className="before-after">
          <figure className="before"><figcaption>Before</figcaption></figure>
          <figure className="after"><figcaption>After</figcaption></figure>
        </div>
      </section>

      <section className="section reviews" id="reviews">
        <div className="section-title"><span /> <h2>Reviews</h2></div>
        <div className="review-grid">
          {reviews.map(([source, status]) => (
            <article className="review-card" key={source}>
              <div className="stars">*****</div>
              <strong>{source}</strong>
              <p>{status}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title"><span /> <h2>Our Services</h2></div>
        <div className="service-grid">
          {services.map(([title, copy]) => (
            <article className="service-card" key={title}>
              <div className="tile-art"><span>XP</span></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="system">
        <div>
          <p className="eyebrow">Online estimate system</p>
          <h2>Built For Photo Intake, Coupon Qualification, And Owner Review.</h2>
          <p>Complete the questionnaire and upload floor photos to qualify for the online-estimate coupon. Estimates may take up to 48 hours; the internal automation target is under 24 hours.</p>
        </div>
        <ol>
          <li>Upload floor photos</li>
          <li>Pick project type</li>
          <li>Confirm square footage</li>
          <li>Receive estimate review</li>
          <li>Approve schedule</li>
        </ol>
      </section>

      <section className="xps">
        <div>
          <p className="eyebrow">Xtreme Polishing Systems connected</p>
          <h2>Training, Products, Visualizer, And Job App Paths Stay In The Funnel.</h2>
          <p>The site preserves the XPS connection, Torginol visualizer handoff, and customer job operations path for proposals, deposits, scheduling, approvals, photos, final walkthrough, warranty, and reviews.</p>
        </div>
        <div className="actions">
          <a className="button" href="https://torginol.com/design" target="_blank" rel="noreferrer">Open Visualizer</a>
          <a className="button ghost dark" href="https://xtremepolishingsystems.com" target="_blank" rel="noreferrer">XPS</a>
        </div>
      </section>

      <footer>
        <strong>Phoenix Epoxy Pros</strong>
        <span>Phoenix, Arizona</span>
        <p>Template language, pricing, testimonials, legal disclaimers, and production integrations require owner approval before launch.</p>
      </footer>

      <div className="mobile-bar">
        <a href={phoneHref}>Call</a>
        <a href="#quote-form">Get Quote</a>
      </div>
    </main>
  );
}

function EstimateForm() {
  return (
    <form className="quote-card" id="quote-form" action="/api/leads" method="post" encType="multipart/form-data">
      <h2>Get Quote</h2>
      <label><span>Name</span><input name="fullName" required autoComplete="name" /></label>
      <label><span>Phone</span><input name="phone" required autoComplete="tel" /></label>
      <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
      <label><span>Zip Code</span><input name="zipCode" inputMode="numeric" autoComplete="postal-code" /></label>
      <label><span>Project Type</span><select name="projectType" required defaultValue=""><option value="" disabled>Select project type</option>{services.map(([title]) => <option key={title}>{title}</option>)}</select></label>
      <label><span>Timeline</span><select name="timeline" defaultValue=""><option value="" disabled>Select timeline</option><option>ASAP</option><option>Within 30 days</option><option>Within 90 days</option><option>Planning stage</option></select></label>
      <label><span>Photos</span><input name="photos" type="file" accept="image/*" multiple /></label>
      <input className="hidden" name="budget" aria-label="Budget range" />
      <button className="button" type="submit">Get Quote</button>
      <small>15% online-estimate coupon after questionnaire and photo upload. Owner/legal approval required before production launch.</small>
    </form>
  );
}
