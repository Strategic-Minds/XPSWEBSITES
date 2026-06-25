"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home",               href: "/",                           section: "Main" },
  { label: "About Us",           href: "/about-us",                   section: "Main" },
  { label: "Gallery",            href: "/gallery",                    section: "Main" },
  { label: "Contact Us",         href: "/contact-us",                 section: "Main" },
  { label: "Start Digital Bid",  href: "/digital-estimator",          section: "Get Started" },
  { label: "Design Center",      href: "/design",                     section: "Get Started" },
  { label: "Color Charts",       href: "/#color-chart",               section: "Get Started" },
  { label: "My Dashboard",       href: "/customer-portal/dashboard",  section: "Client Portal" },
  { label: "Sign In",            href: "/customer-portal",            section: "Client Portal" },
  { label: "Admin Dashboard",    href: "/admin-dashboard",            section: "Operations" },
  { label: "Owner Dashboard",    href: "/owner-dashboard",            section: "Operations" },
  { label: "Crew Dashboard",     href: "/crew-dashboard",             section: "Operations" },
  { label: "Ops Command Center", href: "/ops",                        section: "Operations" },
];

const SECTIONS = ["Main", "Get Started", "Client Portal", "Operations"];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [open]);

  // HAMBURGER — 100% inline styles, cannot be overridden by any CSS file
  const btnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    width: 48,
    height: 48,
    padding: "10px 12px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
    position: "relative",
    zIndex: 9999,
  };

  const barBase: React.CSSProperties = {
    display: "block",
    height: 2,
    width: 22,
    background: "#ffffff",
    borderRadius: 2,
    transformOrigin: "center",
    transition: "transform .22s ease, opacity .2s ease",
    flexShrink: 0,
  };

  const backdropStyle: React.CSSProperties = {
    display: open ? "block" : "none",
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.65)",
    zIndex: 10000,
    cursor: "pointer",
  };

  const drawerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    right: 0,
    width: "min(320px, 88vw)",
    height: "100dvh",
    background: "#050505",
    zIndex: 10001,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overscrollBehavior: "contain",
    transform: open ? "translateX(0)" : "translateX(100%)",
    transition: "transform .28s cubic-bezier(.4,0,.2,1)",
    boxShadow: "-8px 0 40px rgba(0,0,0,.6)",
  };

  return (
    <>
      {/* HAMBURGER BUTTON — inline styles only */}
      <button
        ref={btnRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        style={btnStyle}
        onPointerDown={(e) => { e.stopPropagation(); setOpen(v => !v); }}
      >
        <span style={{ ...barBase, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
        <span style={{ ...barBase, opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }} />
        <span style={{ ...barBase, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
      </button>

      {/* BACKDROP */}
      <div style={backdropStyle} onPointerDown={() => setOpen(false)} aria-hidden="true" />

      {/* DRAWER */}
      <nav style={drawerStyle} aria-label="Site navigation" role="dialog" aria-modal="true">
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,.1)", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, background:"#F6B800", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:"#000", flexShrink:0 }}>
              PEP
            </div>
            <span style={{ color:"#fff", fontWeight:900, fontSize:14 }}>Phoenix Epoxy Pros</span>
          </div>
          <button
            style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,.1)", border:"none", color:"#fff", fontSize:16, display:"grid", placeItems:"center", cursor:"pointer", flexShrink:0 }}
            onPointerDown={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Nav Sections */}
        <div style={{ flex:1, overflowY:"auto" }}>
          {SECTIONS.map(section => (
            <div key={section}>
              <p style={{ padding:"14px 20px 4px", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:".12em", color:"rgba(255,255,255,.3)", margin:0 }}>
                {section}
              </p>
              {NAV_LINKS.filter(l => l.section === section).map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onPointerDown={() => setOpen(false)}
                  style={{
                    display:"flex",
                    alignItems:"center",
                    padding:"12px 20px",
                    color: pathname === link.href ? "#F6B800" : "rgba(255,255,255,.8)",
                    fontWeight:700,
                    fontSize:14,
                    textDecoration:"none",
                    borderLeft: pathname === link.href ? "3px solid #F6B800" : "3px solid transparent",
                    background: pathname === link.href ? "rgba(246,184,0,.07)" : "transparent",
                    WebkitTapHighlightColor:"transparent",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Footer CTAs */}
        <div style={{ padding:20, borderTop:"1px solid rgba(255,255,255,.1)", display:"flex", flexDirection:"column", gap:10, flexShrink:0 }}>
          <a
            href="/digital-estimator"
            onPointerDown={() => setOpen(false)}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"13px 20px", background:"#F6B800", color:"#000", fontWeight:900, fontSize:14, borderRadius:6, textDecoration:"none" }}
          >
            Start Digital Bid →
          </a>
          <a
            href="https://wa.me/17722090266"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"11px 20px", background:"#25d366", color:"#fff", fontWeight:900, fontSize:13, borderRadius:6, textDecoration:"none" }}
          >
            📱 WhatsApp Us
          </a>
          <a
            href="tel:17722090266"
            onPointerDown={() => setOpen(false)}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"11px 20px", background:"rgba(255,255,255,.07)", color:"#fff", fontWeight:700, fontSize:13, borderRadius:6, textDecoration:"none", border:"1px solid rgba(255,255,255,.12)" }}
          >
            📞 772-209-0266
          </a>
        </div>
      </nav>
    </>
  );
}
