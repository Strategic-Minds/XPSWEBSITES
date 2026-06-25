"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_GROUPS = [
  {
    group: "Pages",
    links: [
      { label: "Home",           href: "/" },
      { label: "Gallery",        href: "/gallery" },
      { label: "About Us",       href: "/about-us" },
      { label: "Contact Us",     href: "/contact-us" },
      { label: "Design Center",  href: "/design" },
      { label: "Color Charts",   href: "/#color-chart" },
      { label: "Digital Bid",    href: "/digital-estimator" },
    ],
  },
  {
    group: "Client Portal",
    links: [
      { label: "My Dashboard",   href: "/customer-portal/dashboard" },
      { label: "Sign In",        href: "/customer-portal" },
      { label: "Job Tracker",    href: "/job-tracker" },
    ],
  },
  {
    group: "Operations",
    links: [
      { label: "Admin Dashboard",  href: "/admin-dashboard" },
      { label: "Owner Dashboard",  href: "/owner-dashboard" },
      { label: "Crew Dashboard",   href: "/crew-dashboard" },
      { label: "Ops Center",       href: "/ops" },
    ],
  },
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("Pages");
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* HAMBURGER — inline styles only, immune to CSS wars */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(v => !v); }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          width: 48,
          height: 48,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
          zIndex: 9999,
          position: "relative",
          padding: "10px 12px",
        }}
      >
        <span style={{ display:"block", height:2, width:22, background:"#fff", borderRadius:2, transformOrigin:"center", transition:"transform .2s ease, opacity .2s ease", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
        <span style={{ display:"block", height:2, width:22, background:"#fff", borderRadius:2, transition:"opacity .2s ease", opacity: open ? 0 : 1 }} />
        <span style={{ display:"block", height:2, width:22, background:"#fff", borderRadius:2, transformOrigin:"center", transition:"transform .2s ease", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
      </button>

      {/* BACKDROP */}
      {open && (
        <div
          onPointerDown={() => setOpen(false)}
          aria-hidden="true"
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.7)", zIndex:10000, cursor:"pointer" }}
        />
      )}

      {/* DRAWER */}
      <nav
        aria-label="Site navigation"
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(300px, 86vw)",
          height: "100dvh",
          background: "#0a0a0a",
          zIndex: 10001,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overscrollBehavior: "contain",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .26s cubic-bezier(.4,0,.2,1)",
          boxShadow: "-12px 0 48px rgba(0,0,0,.7)",
        }}
      >
        {/* Drawer header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 20px", borderBottom:"1px solid rgba(255,255,255,.08)", flexShrink:0 }}>
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" style={{ height:40, width:"auto" }} />
          <button
            onPointerDown={() => setOpen(false)}
            aria-label="Close menu"
            style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,.1)", border:"none", color:"#fff", fontSize:16, display:"grid", placeItems:"center", cursor:"pointer", flexShrink:0 }}
          >✕</button>
        </div>

        {/* Grouped nav with dropdowns */}
        <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
          {NAV_GROUPS.map(({ group, links }) => (
            <div key={group} style={{ borderBottom:"1px solid rgba(255,255,255,.05)" }}>
              {/* Group header — tap to expand/collapse */}
              <button
                onPointerDown={() => setExpanded(e => e === group ? null : group)}
                style={{
                  width:"100%",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-between",
                  padding:"13px 20px",
                  background:"transparent",
                  border:"none",
                  cursor:"pointer",
                  color: expanded === group ? "#F6B800" : "rgba(255,255,255,.5)",
                  fontSize:10,
                  fontWeight:900,
                  textTransform:"uppercase",
                  letterSpacing:".14em",
                  WebkitTapHighlightColor:"transparent",
                }}
              >
                <span>{group}</span>
                <span style={{ fontSize:14, transition:"transform .2s", transform: expanded === group ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
              </button>

              {/* Dropdown links */}
              {expanded === group && (
                <div style={{ paddingBottom:4 }}>
                  {links.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      onPointerDown={() => setOpen(false)}
                      style={{
                        display:"flex",
                        alignItems:"center",
                        padding:"11px 20px 11px 28px",
                        color: pathname === link.href ? "#F6B800" : "rgba(255,255,255,.82)",
                        fontWeight:700,
                        fontSize:14,
                        textDecoration:"none",
                        borderLeft: pathname === link.href ? "3px solid #F6B800" : "3px solid transparent",
                        background: pathname === link.href ? "rgba(246,184,0,.06)" : "transparent",
                        WebkitTapHighlightColor:"transparent",
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,.08)", display:"flex", flexDirection:"column", gap:10, flexShrink:0 }}>
          <a
            href="/digital-estimator"
            onPointerDown={() => setOpen(false)}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"13px 20px", background:"#F6B800", color:"#000", fontWeight:900, fontSize:14, borderRadius:6, textDecoration:"none", textTransform:"uppercase", letterSpacing:".04em" }}
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
            style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"10px 20px", background:"rgba(255,255,255,.06)", color:"rgba(255,255,255,.8)", fontWeight:700, fontSize:13, borderRadius:6, textDecoration:"none", border:"1px solid rgba(255,255,255,.1)" }}
          >
            📞 772-209-0266
          </a>
        </div>
      </nav>
    </>
  );
}
