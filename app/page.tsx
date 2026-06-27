import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phoenix Epoxy Pros | Premium Epoxy Floors Built to Last",
  description: "High-performance epoxy, concrete coatings, and polished floors for homes, businesses, and industrial spaces. 70+ locations. XPS certified. Start your digital bid.",
  metadataBase: new URL("https://xpswebsites.vercel.app"),
  openGraph: {
    title: "Phoenix Epoxy Pros | Premium Floors Built to Last",
    description: "High-performance epoxy and polished concrete. Backed by America's #1 Epoxy Super Store.",
    type: "website",
    url: "https://xpswebsites.vercel.app",
  },
};

export default function HomePage() {
  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "#050505", color: "#fff", overflowX: "hidden" }}>

      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <div style={{ background: "#111", borderBottom: "1px solid #222", padding: "8px 24px", display: "flex", alignItems: "center", gap: "24px", fontSize: "11px", color: "#ccc", flexWrap: "wrap" }}>
        {[
          "⚡ POWERED BY XTREME POLISHING SYSTEMS",
          "🏆 AMERICA'S #1 EPOXY SUPER STORE",
          "📍 70+ LOCATIONS NATIONWIDE",
          "✅ CERTIFIED TRAINERS",
          "🏭 MANUFACTURERS WITH 30+ YEARS OF EXPERIENCE",
        ].map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
            {i > 0 && <span style={{ color: "#f6b800", margin: "0 4px" }}>|</span>}
            {item}
          </span>
        ))}
      </div>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{ background: "#050505", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <polygon points="18,2 34,32 2,32" fill="#f6b800" opacity="0.9"/>
            <polygon points="18,8 30,30 6,30" fill="#050505"/>
            <polygon points="18,14 26,28 10,28" fill="#f6b800" opacity="0.7"/>
          </svg>
          <div>
            <div style={{ fontWeight: 900, fontSize: "16px", letterSpacing: "2px", color: "#fff", lineHeight: 1 }}>PHOENIX</div>
            <div style={{ fontSize: "10px", color: "#f6b800", letterSpacing: "3px" }}>EPOXY PROS</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "28px", fontSize: "13px", fontWeight: 600 }}>
          {["SERVICES", "FLOOR SYSTEMS", "DESIGN CENTER", "VISUALIZER", "RESOURCES", "ABOUT", "REVIEWS", "CONTACT"].map(item => (
            <a key={item} href="#" style={{ color: "#ccc", textDecoration: "none", letterSpacing: "0.5px" }}
              onMouseOver={e => (e.currentTarget.style.color = "#f6b800")}
              onMouseOut={e => (e.currentTarget.style.color = "#ccc")}>
              {item}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="/digital-estimator" style={{ background: "#f6b800", color: "#000", padding: "10px 20px", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", borderRadius: "4px", textDecoration: "none", whiteSpace: "nowrap" }}>
            START MY DIGITAL BID →
          </a>
          <a href="tel:4808008246" style={{ color: "#f6b800", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
            ☎ (480) 800-8246
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "600px",
        background: "linear-gradient(to right, #050505 45%, transparent 75%), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80') center right / cover no-repeat",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "80px 64px", position: "relative"
      }}>
        <div style={{ maxWidth: "560px" }}>
          <h1 style={{ fontFamily: "Impact, Arial Black, sans-serif", fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 0.9, fontWeight: 900, margin: "0 0 16px", letterSpacing: "-1px", textTransform: "uppercase" }}>
            <span style={{ color: "#fff", display: "block" }}>PREMIUM FLOORS.</span>
            <span style={{ color: "#fff", display: "block" }}>BUILT TO LAST.</span>
            <span style={{ color: "#f6b800", display: "block" }}>BUILT BY PHOENIX.</span>
          </h1>
          <p style={{ color: "#ccc", fontSize: "16px", lineHeight: 1.6, margin: "16px 0 24px", maxWidth: "380px" }}>
            High-performance epoxy, concrete coatings,<br/>and polished floors for homes, businesses,<br/>and industrial spaces.
          </p>
          {["Durable. Beautiful. Easy to Maintain.", "Installed by Certified Professionals", "Backed by America's #1 Epoxy Super Store"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ccc", fontSize: "14px", marginBottom: "8px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#f6b800" opacity="0.2"/><path d="M4 8l3 3 5-5" stroke="#f6b800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {item}
            </div>
          ))}
          <div style={{ display: "flex", gap: "16px", marginTop: "32px", flexWrap: "wrap" }}>
            <a href="/digital-estimator" style={{ background: "#f6b800", color: "#000", padding: "14px 28px", fontWeight: 800, fontSize: "14px", letterSpacing: "1px", borderRadius: "4px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              START MY DIGITAL BID →
            </a>
            <a href="/services" style={{ border: "2px solid #fff", color: "#fff", padding: "14px 28px", fontWeight: 700, fontSize: "14px", borderRadius: "4px", textDecoration: "none", letterSpacing: "0.5px" }}>
              EXPLORE FLOOR SYSTEMS
            </a>
          </div>
        </div>

        {/* Stats row — bottom right of hero */}
        <div style={{ position: "absolute", bottom: "32px", right: "64px", display: "flex", gap: "4px" }}>
          {[
            { icon: "📍", stat: "70+", label: "LOCATIONS\nNATIONWIDE" },
            { icon: "👥", stat: "", label: "MONTHLY\nCREW TRAINING\nPROGRAM" },
            { icon: "🛡", stat: "", label: "BUILT ON\nXPS STANDARDS\nNATIONWIDE" },
            { icon: "⚡", stat: "", label: "FASTER\nDIGITAL\nESTIMATE" },
            { icon: "📞", stat: "", label: "FAST RESPONSE\nNO PHONE TAG\nEVER" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(0,0,0,0.85)", border: "1px solid #333", padding: "16px 14px", textAlign: "center", minWidth: "90px" }}>
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>{item.icon}</div>
              {item.stat && <div style={{ color: "#f6b800", fontWeight: 900, fontSize: "18px" }}>{item.stat}</div>}
              <div style={{ color: "#aaa", fontSize: "9px", letterSpacing: "0.5px", lineHeight: 1.4, whiteSpace: "pre-line" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GOLD BANNER ───────────────────────────────────────────────────── */}
      <div style={{ background: "#f6b800", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ color: "#000", fontWeight: 800, fontSize: "14px", letterSpacing: "1px", margin: 0 }}>
          GET 15% OFF YOUR PROJECT WITH OUR DIGITAL BID SYSTEM • FAST • EASY • ACCURATE
        </p>
        <a href="/digital-estimator" style={{ background: "#000", color: "#f6b800", padding: "10px 20px", fontWeight: 800, fontSize: "12px", letterSpacing: "1px", borderRadius: "3px", textDecoration: "none", whiteSpace: "nowrap" }}>
          GET MY 15% ESTIMATE →
        </a>
      </div>

      {/* ── FLOOR SYSTEMS GRID ───────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "48px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0", maxWidth: "1200px", margin: "0 auto" }}>

          {/* Before/After image */}
          <div style={{ gridColumn: "1", position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: "6px" }}>
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Epoxy floor after" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "#f6b800", color: "#000", fontSize: "11px", fontWeight: 800, padding: "4px 10px", letterSpacing: "1px" }}>BEFORE</div>
            <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "#000", color: "#fff", fontSize: "11px", fontWeight: 800, padding: "4px 10px", letterSpacing: "1px" }}>AFTER</div>
          </div>

          {/* Floor system cards */}
          {[
            { title: "TOP FLAKE", sub: "FLOOR SYSTEMS", desc: "Decorative, slip-resistant,\nand built to last.", link: "VIEW FLAKE COLORS →", dots: ["#8B7355","#6B5B45","#4A4035","#2C2C2C","#1a1a1a"] },
            { title: "METALLIC", sub: "EPOXY FLOORS", desc: "High-gloss, custom\nmetallic finishes.", link: "EXPLORE METALLICS →", dots: ["#C0C0C0","#A8A8A8","#888","#666","#444"] },
            { title: "SOLID COLOR", sub: "EPOXY FLOORS", desc: "Clean, modern, and\nseamless looks.", link: "VIEW SOLID COLORS →", dots: ["#1a1a1a","#333","#888","#C0C0C0","#f6b800"] },
            { title: "DESIGN", sub: "CENTER", desc: "Visualize your floor\nbefore you buy.", link: "START DESIGNING →", dots: ["#f6b800","#D4A000","#8B7355","#E8DCC8","#C4B49A"] },
          ].map((card, i) => (
            <div key={i} style={{ padding: "28px 24px", borderLeft: "1px solid #eee" }}>
              <div style={{ fontSize: "11px", color: "#888", fontWeight: 700, letterSpacing: "1px", marginBottom: "2px" }}>{card.title}</div>
              <div style={{ fontSize: "15px", fontWeight: 900, color: "#000", letterSpacing: "0.5px", marginBottom: "12px", textTransform: "uppercase" }}>{card.sub}</div>
              <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                {card.dots.map((c, j) => (
                  <div key={j} style={{ width: "28px", height: "28px", borderRadius: "50%", background: c, border: "2px solid #eee" }} />
                ))}
              </div>
              <p style={{ color: "#555", fontSize: "13px", lineHeight: 1.5, margin: "0 0 12px", whiteSpace: "pre-line" }}>{card.desc}</p>
              <a href="#" style={{ color: "#f6b800", fontWeight: 700, fontSize: "12px", letterSpacing: "0.5px", textDecoration: "none" }}>{card.link}</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7-STEP PROCESS + TRUST ───────────────────────────────────────── */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#111" }}>

        {/* 7-Step Digital Bid */}
        <div style={{ padding: "48px 40px", borderRight: "1px solid #222" }}>
          <h2 style={{ color: "#fff", fontFamily: "Impact, sans-serif", fontSize: "22px", letterSpacing: "1px", marginBottom: "32px", textAlign: "center" }}>
            THE SIMPLE 7-STEP DIGITAL BID PROCESS
          </h2>
          <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "0" }}>
            {[
              { num: "01", label: "ENTER INFO", desc: "Takes 60 seconds" },
              { num: "02", label: "PREFILL ESTIMATE", desc: "We gather your project details" },
              { num: "03", label: "PICK FINISH", desc: "Select system and color" },
              { num: "04", label: "VISUALIZER", desc: "See your floor direction" },
              { num: "05", label: "UPLOAD PHOTOS", desc: "Your photos. Our system." },
              { num: "06", label: "SUBMIT BID", desc: "Get your 15% discount" },
              { num: "07", label: "DASHBOARD", desc: "Track every step in one place" },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>
                <div style={{ textAlign: "center", minWidth: "72px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "2px solid #f6b800", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", color: "#f6b800", fontSize: "16px" }}>
                    {["📋","👤","🎨","🖥","📷","✅","📊"][i]}
                  </div>
                  <div style={{ color: "#f6b800", fontSize: "10px", fontWeight: 700 }}>{step.num}</div>
                  <div style={{ color: "#fff", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3px", marginTop: "2px" }}>{step.label}</div>
                  <div style={{ color: "#666", fontSize: "9px", marginTop: "2px", lineHeight: 1.3 }}>{step.desc}</div>
                </div>
                {i < 6 && <div style={{ color: "#f6b800", fontSize: "18px", marginTop: "12px", opacity: 0.5 }}>→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals */}
        <div style={{ padding: "48px 40px" }}>
          <h2 style={{ color: "#fff", fontFamily: "Impact, sans-serif", fontSize: "22px", letterSpacing: "1px", marginBottom: "8px", textAlign: "center" }}>
            TRUSTED BY THOUSANDS OF HOMEOWNERS & BUSINESSES
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", marginBottom: "28px" }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: "#f6b800", fontSize: "22px" }}>★</span>)}
            <span style={{ color: "#fff", fontWeight: 700, marginLeft: "8px", fontSize: "14px" }}>5-Star Rated</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" }}>
            {[
              { icon: "👥", stat: "10,000+", label: "PROJECTS\nCOMPLETED" },
              { icon: "🛡", stat: "", label: "LICENSED &\nINSURED\nProfessional crews\nyou can trust" },
              { icon: "📍", stat: "70+", label: "LOCATIONS\nNATIONWIDE" },
              { icon: "🏆", stat: "", label: "BACKED BY\nXPS STANDARDS\nNational systems.\nLocal teams." },
              { icon: "⚡", stat: "", label: "FAST RESPONSE\nNO PHONE TAG\nWe respect your\ntime" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>{item.icon}</div>
                {item.stat && <div style={{ color: "#f6b800", fontWeight: 900, fontSize: "22px", lineHeight: 1 }}>{item.stat}</div>}
                <div style={{ color: "#888", fontSize: "9px", letterSpacing: "0.5px", lineHeight: 1.4, whiteSpace: "pre-line", marginTop: "4px" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: "#000", borderTop: "2px solid #f6b800", padding: "40px 48px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <polygon points="18,2 34,32 2,32" fill="#f6b800" opacity="0.9"/>
              <polygon points="18,8 30,30 6,30" fill="#050505"/>
            </svg>
            <div>
              <div style={{ fontWeight: 900, fontSize: "14px", color: "#fff", letterSpacing: "2px" }}>PHOENIX EPOXY PROS</div>
              <div style={{ fontSize: "10px", color: "#f6b800" }}>POWERED BY XTREME POLISHING SYSTEMS</div>
            </div>
          </div>
          <p style={{ color: "#666", fontSize: "13px", lineHeight: 1.7, maxWidth: "300px" }}>
            High-performance epoxy floors, concrete coatings, and polished concrete for Phoenix homes and businesses. XPS certified. Backed by 30+ years of manufacturing expertise.
          </p>
          <a href="tel:4808008246" style={{ color: "#f6b800", fontWeight: 700, fontSize: "16px", textDecoration: "none", display: "block", marginTop: "16px" }}>☎ (480) 800-8246</a>
        </div>
        {[
          { title: "FLOOR SYSTEMS", links: ["Top Flake Epoxy","Metallic Epoxy","Solid Color","Polished Concrete","Industrial Coatings"] },
          { title: "COMPANY", links: ["About Us","Our Process","Reviews","Careers","Locations"] },
          { title: "GET STARTED", links: ["Start My Digital Bid","Design Center","Visualizer","Request Quote","Contact Us"] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ color: "#f6b800", fontWeight: 800, fontSize: "11px", letterSpacing: "2px", marginBottom: "16px" }}>{col.title}</div>
            {col.links.map(link => (
              <a key={link} href="#" style={{ display: "block", color: "#666", fontSize: "13px", marginBottom: "10px", textDecoration: "none" }}>{link}</a>
            ))}
          </div>
        ))}
      </footer>
      <div style={{ background: "#000", borderTop: "1px solid #111", padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ color: "#444", fontSize: "12px", margin: 0 }}>© 2026 Phoenix Epoxy Pros. Powered by Xtreme Polishing Systems.</p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy Policy","Terms of Service","Sitemap"].map(l => (
            <a key={l} href="#" style={{ color: "#444", fontSize: "12px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>

    </div>
  );
}
