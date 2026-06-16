const services = [
  {
    title: "Garage Floors",
    image: "/images/services-strip-approved.webp",
    slug: "garage"
  },
  {
    title: "Commercial Floors",
    image: "/images/services-strip-approved.webp",
    slug: "commercial"
  },
  {
    title: "Patios & Outdoor Spaces",
    image: "/images/services-strip-approved.webp",
    slug: "patio"
  },
  {
    title: "Floor Repair",
    image: "/images/services-strip-approved.webp",
    slug: "repair"
  }
];

const reviews = [
  { platform: "Google", mark: "G", avatar: "A" },
  { platform: "Facebook", mark: "f", avatar: "B" },
  { platform: "Yelp", mark: "Y", avatar: "C" }
];

const phone = "772-209-0266";
const phoneHref = "tel:17722090266";

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="header-logo" href="#quote" aria-label="Phoenix Epoxy Pros home">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#before-after">Before / After</a>
          <a href="#reviews">Reviews</a>
          <a className="call-link" href={phoneHref}>Call</a>
        </nav>
        <a className="quote-button header-cta" href="#quote-form">Get Quote</a>
        <button className="menu-button" type="button" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="quote">
        <h1 className="sr-only">Phoenix Epoxy Pros</h1>
        <div className="brand-panel">
          <img src="/images/logo-panel.webp" alt="Phoenix Epoxy Pros logo" />
        </div>
        <div className="hero-photo">
          <img src="/images/hero-garage-approved.webp" alt="Finished gray flake garage epoxy floor" />
        </div>
        <EstimateForm />
      </section>

      <section className="mobile-actions" aria-label="Mobile quick actions">
        <a href="#before-after"><span className="quick-icon before-icon" />Before / After</a>
        <a href="#reviews"><span className="quick-icon review-icon" />Reviews</a>
        <a href={phoneHref}><span className="quick-icon call-icon" />Call</a>
      </section>

      <section className="proof-row" aria-label="Proof and reviews">
        <div className="before-after-block" id="before-after">
          <SectionTitle title="Before / After" />
          <img src="/images/before-after-approved.webp" alt="Before and after epoxy floor comparison" />
        </div>

        <div className="reviews-block" id="reviews">
          <SectionTitle title="Reviews" />
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.platform}>
                <div className="review-top">
                  <span className="stars" aria-label={`${review.platform} five star placeholder`}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className={`platform platform-${review.mark.toLowerCase()}`}>{review.mark}</span>
                </div>
                <span className="avatar">{review.avatar}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section">
        <SectionTitle title="Our Services" />
        <div className="services-grid">
          {services.map((service) => (
            <article className={`service-card service-${service.slug}`} key={service.title}>
              <img src={service.image} alt={`${service.title} preview`} />
              <h2>{service.title}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="conversion-note">
        <p>
          Online estimates may take up to 48 hours. Final offer language, reviews, pricing, legal disclaimers,
          and live lead integrations require owner approval before production launch.
        </p>
      </section>

      <a className="mobile-call" href={phoneHref}>Call</a>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="section-title">
      <span />
      <h2>{title}</h2>
    </div>
  );
}

function EstimateForm() {
  return (
    <form className="quote-card" id="quote-form" action="/api/leads" method="post" encType="multipart/form-data">
      <h2>Get Quote</h2>
      <Field icon="user" name="fullName" label="Name" required autoComplete="name" />
      <Field icon="phone" name="phone" label="Phone" required autoComplete="tel" />
      <Field icon="email" name="email" label="Email" type="email" required autoComplete="email" />
      <Field icon="pin" name="zipCode" label="Zip Code" inputMode="numeric" autoComplete="postal-code" />
      <label className="field select-field">
        <span className="field-icon project" aria-hidden="true" />
        <select name="projectType" required defaultValue="">
          <option value="" disabled>Project Type</option>
          {services.map((service) => <option key={service.title}>{service.title}</option>)}
        </select>
      </label>
      <input className="hidden-field" name="timeline" value="Preview request" readOnly />
      <input className="hidden-field" name="budget" value="Approved mockup template" readOnly />
      <button className="quote-button form-submit" type="submit">Get Quote</button>
    </form>
  );
}

type FieldProps = {
  icon: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric";
};

function Field({ icon, name, label, type = "text", required, autoComplete, inputMode }: FieldProps) {
  return (
    <label className="field">
      <span className={`field-icon ${icon}`} aria-hidden="true" />
      <input
        name={name}
        type={type}
        placeholder={label}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
      />
    </label>
  );
}
