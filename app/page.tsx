// app/page.tsx — M05 Homepage (Phoenix Epoxy Pros)
// Server Component — canonical M05 pixel spec
import type { Metadata } from 'next';
import { BRAND, COLORS } from '@/lib/tokens';
import { MobileNavigation } from '@/components/MobileNavigation';

export const metadata: Metadata = {
  title: `${BRAND.name} | #1 Epoxy Floor Coating Company in Phoenix, AZ`,
  description: 'Phoenix Epoxy Pros — epoxy floor coatings for garages, commercial floors, patios & concrete. Free digital estimate. 15% off when you bid online.',
};

const NAV_LINKS = [
  { label: 'Digital Bid', href: '/digital-estimator' },
  { label: 'Visualizer', href: '/visualizer' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
];

const SERVICES = [
  { title: 'Garage Floor Coatings', desc: 'Transform your garage with durable flake, metallic, or solid epoxy systems backed by a lifetime warranty.', icon: '🏠', href: '/digital-estimator?type=garage' },
  { title: 'Commercial Floor Systems', desc: 'High-traffic epoxy and polyurea systems for shops, warehouses, showrooms, and retail spaces.', icon: '🏗️', href: '/digital-estimator?type=commercial' },
  { title: 'Patios & Outdoor Spaces', desc: 'UV-stable coatings designed for Phoenix heat — driveways, pool decks, covered patios, and more.', icon: '☀️', href: '/digital-estimator?type=patio' },
  { title: 'Repair & Surface Prep', desc: 'Crack fill, spall repair, and concrete grinding to ensure your new floor lasts a lifetime.', icon: '🔧', href: '/digital-estimator?type=repair' },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Submit Your Bid Online', desc: 'Fill out the digital estimator — photos, measurements, finish choice. Takes 5 minutes.' },
  { num: '02', title: 'Receive Your Proposal', desc: 'Jeremy personally reviews and sends a detailed scope, pricing, and warranty document within 24 hours.' },
  { num: '03', title: 'E-Sign & Schedule', desc: 'Approve your proposal online and select your installation date with one click.' },
  { num: '04', title: 'Prep Day (Day 1)', desc: 'Our crew preps your concrete — diamond grinding, crack repair, cleaning.' },
  { num: '05', title: 'Installation (Day 2)', desc: 'Base coat, flake / metallic broadcast, finish coats. We do it right, once.' },
  { num: '06', title: 'Final Walkthrough', desc: 'You inspect the finished floor with our crew and receive your digital warranty certificate.' },
];

const COLOR_FAMILIES = [
  {
    name: 'Flake Systems',
    desc: 'Multi-color flake broadcasts — the most popular garage finish in Phoenix.',
    colors: [
      { name: 'Domino', hex: '#2a2a2a', light: '#c8c8c8' },
      { name: 'Silver Storm', hex: '#b0b0b0', light: '#e8e8e8' },
      { name: 'Espresso', hex: '#3d2817', light: '#8b6040' },
      { name: 'Sandstone', hex: '#c4a87a', light: '#e8d5b0' },
    ],
  },
  {
    name: 'Metallic Epoxy',
    desc: 'Swirling metallic pigments for garages and commercial showrooms.',
    colors: [
      { name: 'Midnight Blue', hex: '#1a2540', light: '#5577aa' },
      { name: 'Brushed Nickel', hex: '#8a8a8a', light: '#cccccc' },
      { name: 'Copper Vein', hex: '#7a3b1e', light: '#c97050' },
      { name: 'Obsidian', hex: '#1a1a1a', light: '#555555' },
    ],
  },
  {
    name: 'Quartz & Solid',
    desc: 'Clean, uniform color for commercial floors and patio systems.',
    colors: [
      { name: 'Arctic White', hex: '#f0f0f0', light: '#ffffff' },
      { name: 'Battleship Gray', hex: '#6a6a6a', light: '#9a9a9a' },
      { name: 'Desert Tan', hex: '#c4a570', light: '#ddc090' },
      { name: 'Safety Red', hex: '#bb2222', light: '#dd5555' },
    ],
  },
];

const TRUST_ITEMS = [
  { stat: '4.9★', label: 'Avg. Rating' },
  { stat: '500+', label: 'Floors Done' },
  { stat: '24hr', label: 'Estimate Turnaround' },
  { stat: 'Lifetime', label: 'Warranty' },
  { stat: '15%', label: 'Off Online Bids' },
];

const FOOTER_LINKS = [
  { label: 'Digital Bid', href: '/digital-estimator' },
  { label: 'Floor Visualizer', href: '/visualizer' },
  { label: 'Client Portal', href: '/customer-portal/dashboard' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
];

export default function HomePage() {
  return (
    <>
      <style>{`
        /* ── RESET & BASE ── */
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter','Helvetica Neue',Arial,sans-serif;background:#f8f7f4;color:#0a0b0c;overflow-x:hidden}
        a{text-decoration:none;color:inherit}

        /* ── HEADER ── */
        .hp-header{position:sticky;top:0;z-index:100;background:#111214;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1rem,4vw,2.5rem);height:72px;border-bottom:1px solid #1e2024}
        .hp-logo{display:flex;align-items:center;gap:12px;color:#c9a227;font-weight:900;font-size:clamp(14px,2vw,18px);letter-spacing:-0.02em;white-space:nowrap}
        .hp-logo-mark{width:40px;height:40px;background:linear-gradient(135deg,#c9a227,#e8c84d);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#111;font-size:16px;flex-shrink:0}
        .hp-nav{display:flex;align-items:center;gap:clamp(12px,2vw,32px)}
        .hp-nav a{color:#ccc;font-weight:600;font-size:14px;transition:color .15s}
        .hp-nav a:hover{color:#c9a227}
        .hp-nav-cta{background:#c9a227;color:#111!important;padding:10px 20px;border-radius:6px;font-weight:800!important;font-size:14px!important;white-space:nowrap;transition:background .15s!important}
        .hp-nav-cta:hover{background:#dbb84a!important}
        .hp-phone{color:#ccc;font-size:14px;font-weight:600;display:flex;align-items:center;gap:6px}
        .hp-phone:hover{color:#c9a227}
        .hp-hamburger-wrap{display:none}
        @media(max-width:768px){
          .hp-nav,.hp-phone{display:none}
          .hp-hamburger-wrap{display:flex;align-items:center}
          .hp-logo span.text{display:none}
        }

        /* ── HERO ── */
        .hp-hero{background:#111214;padding:clamp(2.5rem,6vw,5rem) clamp(1rem,4vw,2.5rem);display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,4vw,4rem);align-items:center;max-width:1280px;margin:0 auto}
        @media(max-width:900px){.hp-hero{grid-template-columns:1fr}}
        .hp-hero-kicker{font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#c9a227;margin-bottom:16px}
        .hp-hero-h1{font-size:clamp(2.2rem,5vw,3.8rem);font-weight:900;line-height:1.08;color:#fff;margin-bottom:20px}
        .hp-hero-sub{font-size:clamp(1rem,1.5vw,1.15rem);color:#9ca3af;margin-bottom:28px;max-width:500px;line-height:1.6}
        .hp-hero-btns{display:flex;gap:14px;flex-wrap:wrap}
        .hp-btn-gold{display:inline-flex;align-items:center;justify-content:center;background:#c9a227;color:#111;font-weight:800;font-size:15px;padding:14px 28px;border-radius:8px;transition:background .15s;white-space:nowrap}
        .hp-btn-gold:hover{background:#dbb84a}
        .hp-btn-outline{display:inline-flex;align-items:center;justify-content:center;border:2px solid #444;color:#ccc;font-weight:700;font-size:14px;padding:13px 24px;border-radius:8px;transition:all .15s}
        .hp-btn-outline:hover{border-color:#c9a227;color:#c9a227}

        /* ── HERO FORM CARD ── */
        .hp-form-card{background:#fff;border-radius:12px;padding:clamp(1.5rem,3vw,2rem);box-shadow:0 8px 40px rgba(0,0,0,.25)}
        .hp-form-title{font-size:1.25rem;font-weight:800;color:#0a0b0c;margin-bottom:4px}
        .hp-form-sub{font-size:13px;color:#666;margin-bottom:20px}
        .hp-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
        @media(max-width:480px){.hp-form-grid{grid-template-columns:1fr}}
        .hp-form-input{width:100%;padding:12px 14px;border:1.5px solid #e2e0dc;border-radius:8px;font-size:15px;outline:none;transition:border-color .15s;font-family:inherit}
        .hp-form-input:focus{border-color:#c9a227}
        .hp-form-select{width:100%;padding:12px 14px;border:1.5px solid #e2e0dc;border-radius:8px;font-size:15px;background:#fff;outline:none;font-family:inherit;cursor:pointer}
        .hp-form-full{grid-column:1/-1}
        .hp-form-submit{width:100%;padding:15px;background:#c9a227;color:#111;font-weight:800;font-size:16px;border:none;border-radius:8px;cursor:pointer;margin-top:8px;transition:background .15s;font-family:inherit}
        .hp-form-submit:hover{background:#dbb84a}
        .hp-form-legal{font-size:11px;color:#999;text-align:center;margin-top:10px;line-height:1.5}
        .hp-badge{display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;color:#166534;font-size:12px;font-weight:700;padding:6px 12px;border-radius:20px;margin-bottom:16px;border:1px solid #bbf7d0}

        /* ── TRUST STRIP ── */
        .hp-trust{background:#c9a227;padding:clamp(1rem,2vw,1.5rem) clamp(1rem,4vw,2.5rem)}
        .hp-trust-inner{max-width:1280px;margin:0 auto;display:flex;justify-content:space-around;flex-wrap:wrap;gap:16px}
        .hp-trust-item{text-align:center;color:#111}
        .hp-trust-stat{font-size:clamp(1.5rem,3vw,2rem);font-weight:900;display:block;line-height:1}
        .hp-trust-label{font-size:12px;font-weight:700;opacity:.75;text-transform:uppercase;letter-spacing:.06em}

        /* ── SECTION WRAPPER ── */
        .hp-section{padding:clamp(3rem,6vw,5rem) clamp(1rem,4vw,2.5rem)}
        .hp-section-inner{max-width:1280px;margin:0 auto}
        .hp-kicker{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#c9a227;margin-bottom:10px}
        .hp-section-title{font-size:clamp(1.7rem,4vw,2.6rem);font-weight:900;line-height:1.1;margin-bottom:clamp(1rem,2vw,1.5rem)}
        .hp-section-sub{font-size:1rem;color:#555;max-width:600px;line-height:1.6}

        /* ── SERVICES GRID ── */
        .hp-services{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-top:2.5rem}
        .hp-service-card{background:#fff;border-radius:10px;padding:28px 24px;border:1.5px solid #e2e0dc;box-shadow:0 2px 12px rgba(0,0,0,.06);transition:box-shadow .2s,border-color .2s}
        .hp-service-card:hover{box-shadow:0 8px 32px rgba(0,0,0,.12);border-color:#c9a227}
        .hp-service-icon{font-size:2rem;margin-bottom:14px}
        .hp-service-title{font-size:1.1rem;font-weight:800;margin-bottom:8px}
        .hp-service-desc{font-size:14px;color:#555;line-height:1.6;margin-bottom:16px}
        .hp-service-link{font-size:13px;font-weight:700;color:#c9a227;display:inline-flex;align-items:center;gap:4px}

        /* ── PROCESS STEPS ── */
        .hp-process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:2.5rem}
        .hp-step{background:#fff;border-radius:10px;padding:24px;border:1.5px solid #e2e0dc}
        .hp-step-num{font-size:2.5rem;font-weight:900;color:#c9a227;line-height:1;margin-bottom:10px;font-variant-numeric:tabular-nums}
        .hp-step-title{font-size:1rem;font-weight:800;margin-bottom:6px}
        .hp-step-desc{font-size:13.5px;color:#555;line-height:1.6}

        /* ── COLOR CHART ── */
        .hp-color-section{background:#111214}
        .hp-color-section .hp-kicker{color:#c9a227}
        .hp-color-section .hp-section-title{color:#fff}
        .hp-color-section .hp-section-sub{color:#9ca3af}
        .hp-color-families{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-top:2.5rem}
        .hp-color-family{background:#1a1c1e;border-radius:10px;padding:24px;border:1px solid #2a2c2e}
        .hp-color-family-name{font-size:1rem;font-weight:800;color:#fff;margin-bottom:4px}
        .hp-color-family-desc{font-size:13px;color:#888;margin-bottom:16px;line-height:1.5}
        .hp-swatches{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
        .hp-swatch{border-radius:8px;overflow:hidden;aspect-ratio:1}
        .hp-swatch-top{height:55%;transition:transform .2s}
        .hp-swatch-bottom{height:45%;display:flex;align-items:center;padding:4px 6px;background:#0a0b0c}
        .hp-swatch-name{font-size:10px;color:#ccc;font-weight:600;line-height:1.2}
        .hp-color-cta{text-align:center;margin-top:2rem}

        /* ── OFFER SECTION ── */
        .hp-offer{background:linear-gradient(135deg,#c9a227 0%,#dbb84a 100%);padding:clamp(2.5rem,5vw,4rem) clamp(1rem,4vw,2.5rem)}
        .hp-offer-inner{max-width:800px;margin:0 auto;text-align:center}
        .hp-offer-badge{display:inline-flex;align-items:center;gap:8px;background:#111;color:#c9a227;font-weight:900;font-size:16px;padding:8px 20px;border-radius:20px;margin-bottom:20px}
        .hp-offer-title{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#111;margin-bottom:16px;line-height:1.1}
        .hp-offer-sub{font-size:1.05rem;color:rgba(0,0,0,.7);margin-bottom:28px;max-width:550px;margin-left:auto;margin-right:auto;line-height:1.6}
        .hp-offer-form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;max-width:480px;margin:0 auto}
        .hp-offer-input{flex:1;min-width:180px;padding:14px 16px;border:none;border-radius:8px;font-size:15px;font-family:inherit;outline:none}
        .hp-offer-btn{background:#111;color:#c9a227;font-weight:800;font-size:15px;padding:14px 24px;border:none;border-radius:8px;cursor:pointer;font-family:inherit;white-space:nowrap;transition:background .15s}
        .hp-offer-btn:hover{background:#222}

        /* ── JOB TRACKER STRIP ── */
        .hp-tracker{background:#fff;border-top:4px solid #c9a227}
        .hp-tracker-inner{max-width:1280px;margin:0 auto;padding:clamp(2.5rem,5vw,4rem) clamp(1rem,4vw,2.5rem);display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,4vw,4rem);align-items:center}
        @media(max-width:768px){.hp-tracker-inner{grid-template-columns:1fr}}
        .hp-tracker-steps{display:flex;flex-direction:column;gap:16px;margin-top:1.5rem}
        .hp-tracker-step{display:flex;align-items:flex-start;gap:14px;padding:16px;background:#f8f7f4;border-radius:8px;border:1.5px solid #e2e0dc}
        .hp-tracker-dot{width:28px;height:28px;background:#c9a227;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px;font-weight:800;color:#111}
        .hp-tracker-text strong{display:block;font-weight:700;font-size:14px;margin-bottom:2px}
        .hp-tracker-text span{font-size:13px;color:#666}
        .hp-tracker-visual{background:#111214;border-radius:12px;padding:32px;text-align:center;color:#fff}
        .hp-tracker-visual h3{font-size:1.5rem;font-weight:800;color:#c9a227;margin-bottom:8px}
        .hp-tracker-visual p{font-size:14px;color:#9ca3af;margin-bottom:20px;line-height:1.6}

        /* ── FOOTER ── */
        .hp-footer{background:#0a0b0c;color:#9ca3af;padding:clamp(3rem,5vw,4rem) clamp(1rem,4vw,2.5rem) 2rem}
        .hp-footer-inner{max-width:1280px;margin:0 auto}
        .hp-footer-top{display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem;margin-bottom:2.5rem}
        @media(max-width:768px){.hp-footer-top{grid-template-columns:1fr}}
        .hp-footer-brand{color:#c9a227;font-weight:900;font-size:1.2rem;margin-bottom:12px}
        .hp-footer-tagline{font-size:14px;line-height:1.6;margin-bottom:16px;max-width:300px}
        .hp-footer-contact a{display:block;font-size:14px;color:#9ca3af;margin-bottom:6px;transition:color .15s}
        .hp-footer-contact a:hover{color:#c9a227}
        .hp-footer-col-title{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:#c9a227;margin-bottom:14px}
        .hp-footer-links a{display:block;font-size:14px;color:#9ca3af;margin-bottom:8px;transition:color .15s}
        .hp-footer-links a:hover{color:#c9a227}
        .hp-footer-bottom{border-top:1px solid #1a1a1a;padding-top:1.5rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12px}
        .hp-footer-70{font-size:12px;color:#555;margin-top:8px}

        /* ── BEFORE/AFTER ── */
        .hp-ba{display:grid;grid-template-columns:1fr 1fr;gap:4px;border-radius:10px;overflow:hidden;margin-top:2rem}
        @media(max-width:600px){.hp-ba{grid-template-columns:1fr}}
        .hp-ba-panel{position:relative;min-height:240px;display:flex;align-items:flex-end;justify-content:center;padding:16px}
        .hp-ba-before{background:linear-gradient(135deg,#3a3a3a 0%,#5a5a5a 50%,#2a2a2a 100%)}
        .hp-ba-after{background:linear-gradient(135deg,#1a1c1e 0%,#c9a227 40%,#888 100%)}
        .hp-ba-label{background:rgba(0,0,0,.7);color:#fff;font-size:12px;font-weight:800;padding:6px 14px;border-radius:4px;letter-spacing:.08em;text-transform:uppercase}
        .hp-ba-after .hp-ba-label{background:#c9a227;color:#111}
      `}</style>

      {/* ── HEADER ── */}
      <header className="hp-header">
        <a href="/" className="hp-logo">
          <div className="hp-logo-mark">XP</div>
          <span className="text">Phoenix Epoxy Pros</span>
        </a>
        <nav className="hp-nav" aria-label="Main navigation">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
          <a href={BRAND.phoneHref} className="hp-phone">📞 {BRAND.phone}</a>
          <a href="/digital-estimator" className="hp-nav-cta">Get Free Quote</a>
        </nav>
        <div className="hp-hamburger-wrap">
          <MobileNavigation />
        </div>
      </header>

      {/* ── HERO ── */}
      <div style={{ background: '#111214' }}>
        <section className="hp-hero">
          {/* Left — Copy */}
          <div>
            <p className="hp-hero-kicker">Phoenix's #1 Epoxy Floor Contractor</p>
            <h1 className="hp-hero-h1">See Your New Floor<br />Before You Buy</h1>
            <p className="hp-hero-sub">
              Upload your current floor, pick your finish, and get a guaranteed estimate
              within 24 hours. 15% off when you bid online.
            </p>
            <div className="hp-hero-btns">
              <a href="/digital-estimator" className="hp-btn-gold">🏷️ Start My Free Bid</a>
              <a href="/visualizer" className="hp-btn-outline">🎨 Launch Visualizer</a>
            </div>
          </div>

          {/* Right — Lead Form Card */}
          <div className="hp-form-card">
            <div className="hp-badge">✅ 15% Off — Online Bids Only</div>
            <p className="hp-form-title">Get Your Digital Estimate</p>
            <p className="hp-form-sub">Takes 3 minutes. Guaranteed reply within 24 hours.</p>
            <form method="GET" action="/digital-estimator">
              <div className="hp-form-grid">
                <input className="hp-form-input" name="name" type="text" placeholder="Your Name" required />
                <input className="hp-form-input" name="phone" type="tel" placeholder="Phone" required />
                <input className="hp-form-input" name="email" type="email" placeholder="Email" required />
                <input className="hp-form-input" name="zip" type="text" placeholder="ZIP Code" required maxLength={5} />
                <select className="hp-form-select hp-form-full" name="type" defaultValue="">
                  <option value="" disabled>Project Type</option>
                  <option value="garage">Garage Floor Coating</option>
                  <option value="commercial">Commercial Floor</option>
                  <option value="patio">Patio / Outdoor</option>
                  <option value="repair">Concrete Repair</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="hp-form-submit">
                📋 Get My Free Estimate — 15% Off
              </button>
              <p className="hp-form-legal">
                No spam. No pressure. Your info is used only to prepare your estimate.
              </p>
            </form>
          </div>
        </section>
      </div>

      {/* ── TRUST STRIP ── */}
      <div className="hp-trust">
        <div className="hp-trust-inner">
          {TRUST_ITEMS.map(t => (
            <div key={t.label} className="hp-trust-item">
              <span className="hp-trust-stat">{t.stat}</span>
              <span className="hp-trust-label">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BEFORE / AFTER ── */}
      <section className="hp-section">
        <div className="hp-section-inner">
          <p className="hp-kicker">Transformation</p>
          <h2 className="hp-section-title">See the Difference</h2>
          <p className="hp-section-sub">Real Phoenix garages — before bare concrete, after XPS epoxy.</p>
          <div className="hp-ba">
            <div className="hp-ba-panel hp-ba-before">
              <span className="hp-ba-label">Before — Bare Concrete</span>
            </div>
            <div className="hp-ba-panel hp-ba-after">
              <span className="hp-ba-label">After — XPS Epoxy ✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="hp-section" style={{ background: '#fff', borderTop: '1px solid #e2e0dc' }}>
        <div className="hp-section-inner">
          <p className="hp-kicker">What We Do</p>
          <h2 className="hp-section-title">Built for Every Surface in Phoenix</h2>
          <p className="hp-section-sub">From single-car garages to 20,000 sq ft commercial floors — we install it right, once.</p>
          <div className="hp-services">
            {SERVICES.map(s => (
              <a key={s.title} href={s.href} className="hp-service-card">
                <div className="hp-service-icon">{s.icon}</div>
                <h3 className="hp-service-title">{s.title}</h3>
                <p className="hp-service-desc">{s.desc}</p>
                <span className="hp-service-link">Get a Free Bid →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="hp-section">
        <div className="hp-section-inner">
          <p className="hp-kicker">Our Process</p>
          <h2 className="hp-section-title">6 Steps to a Perfect Floor</h2>
          <p className="hp-section-sub">Transparent, digital, and built around your schedule.</p>
          <div className="hp-process-grid">
            {PROCESS_STEPS.map(s => (
              <div key={s.num} className="hp-step">
                <div className="hp-step-num">{s.num}</div>
                <h3 className="hp-step-title">{s.title}</h3>
                <p className="hp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLOR CHART ── */}
      <section className="hp-section hp-color-section">
        <div className="hp-section-inner">
          <p className="hp-kicker">Floor Systems</p>
          <h2 className="hp-section-title">Find Your Perfect Finish</h2>
          <p className="hp-section-sub">
            Flake, metallic, quartz, solid — explore our full color library and try any
            finish in the interactive visualizer.
          </p>
          <div className="hp-color-families">
            {COLOR_FAMILIES.map(fam => (
              <div key={fam.name} className="hp-color-family">
                <h3 className="hp-color-family-name">{fam.name}</h3>
                <p className="hp-color-family-desc">{fam.desc}</p>
                <div className="hp-swatches">
                  {fam.colors.map(c => (
                    <div key={c.name} className="hp-swatch">
                      <div className="hp-swatch-top" style={{ background: `linear-gradient(135deg, ${c.hex}, ${c.light})`, height: '100%', display: 'flex', alignItems: 'flex-end', padding: '6px' }}>
                        <span style={{ fontSize: 10, color: '#fff', fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,.8)' }}>{c.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="hp-color-cta">
            <a href="/visualizer" className="hp-btn-gold" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              🎨 Try All Colors in the Visualizer
            </a>
          </div>
        </div>
      </section>

      {/* ── 15% OFFER ── */}
      <section className="hp-offer" id="offer">
        <div className="hp-offer-inner">
          <div className="hp-offer-badge">🏷️ Limited-Time Offer</div>
          <h2 className="hp-offer-title">15% Off When You Bid Online</h2>
          <p className="hp-offer-sub">
            Submit your digital estimate request and automatically unlock 15% off your
            installation. No coupon code needed — the discount applies when you approve
            your proposal online.
          </p>
          <div className="hp-offer-form">
            <form method="GET" action="/digital-estimator" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              <input
                className="hp-offer-input"
                name="phone"
                type="tel"
                placeholder="Your phone number"
              />
              <button type="submit" className="hp-offer-btn">
                Get 15% Off Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── JOB TRACKER ── */}
      <section className="hp-tracker">
        <div className="hp-tracker-inner">
          <div>
            <p className="hp-kicker">Client Portal</p>
            <h2 className="hp-section-title">Track Your Project — Start to Finish</h2>
            <p className="hp-section-sub" style={{ marginBottom: '0.5rem' }}>
              Every XPS client gets a personal portal to track their job in real time.
              No calls needed.
            </p>
            <div className="hp-tracker-steps">
              {[
                ['1', 'Quote Submitted', 'Your estimate request is received and reviewed'],
                ['2', 'Proposal Sent', 'Digital scope, pricing, and warranty emailed to you'],
                ['3', 'E-Sign & Schedule', 'Approve online and lock in your install date'],
                ['4', 'Install Tracked Live', 'Before/during/after photos uploaded by crew'],
                ['5', 'Warranty Issued', 'Digital warranty cert in your portal for life'],
              ].map(([num, title, desc]) => (
                <div key={num} className="hp-tracker-step">
                  <div className="hp-tracker-dot">{num}</div>
                  <div className="hp-tracker-text">
                    <strong>{title}</strong>
                    <span>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hp-tracker-visual">
            <h3>Your Project Portal</h3>
            <p>
              Submit your bid today and get instant access to your personal client
              dashboard — proposals, photos, schedule, and warranty all in one place.
            </p>
            <a href="/digital-estimator" className="hp-btn-gold">Start My Project →</a>
            <div style={{ marginTop: 16 }}>
              <a href="/customer-portal/dashboard" style={{ fontSize: 13, color: '#666', textDecoration: 'underline' }}>
                Already a client? Sign in →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="hp-footer">
        <div className="hp-footer-inner">
          <div className="hp-footer-top">
            <div>
              <p className="hp-footer-brand">Phoenix Epoxy Pros</p>
              <p className="hp-footer-tagline">
                Phoenix's #1 epoxy floor coating contractor. Garage floors, commercial
                systems, patios, and concrete repair. Fully digital from estimate to
                warranty.
              </p>
              <div className="hp-footer-contact">
                <a href={BRAND.phoneHref}>📞 {BRAND.phone}</a>
                <a href={BRAND.emailHref}>✉️ {BRAND.email}</a>
                <a href="https://maps.google.com/?q=Phoenix+AZ" target="_blank" rel="noopener">📍 Phoenix, AZ</a>
              </div>
              <p className="hp-footer-70">
                🗺️ Serving Phoenix + 70 metro cities — Scottsdale, Tempe, Mesa,
                Glendale, Chandler, Gilbert, Peoria, Goodyear & more.
              </p>
            </div>
            <div>
              <p className="hp-footer-col-title">Quick Links</p>
              <div className="hp-footer-links">
                {FOOTER_LINKS.map(l => (
                  <a key={l.href} href={l.href}>{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="hp-footer-col-title">Dashboards & Portals</p>
              <div className="hp-footer-links">
                <a href="/customer-portal/dashboard">Client Portal</a>
                <a href="/owner-dashboard">Owner Dashboard</a>
                <a href="/admin-dashboard">Admin Dashboard</a>
                <a href="/crew-leader-dashboard">Crew Leader</a>
                <a href="/project-manager-dashboard">Project Manager</a>
              </div>
            </div>
          </div>
          <div className="hp-footer-bottom">
            <span>© {new Date().getFullYear()} Phoenix Epoxy Pros · Xtreme Polishing Systems</span>
            <span style={{ color: '#444' }}>Licensed · Insured · Warranted</span>
          </div>
        </div>
      </footer>
    </>
  );
}
