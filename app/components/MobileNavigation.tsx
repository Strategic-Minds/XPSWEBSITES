"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Home",             href: "/",                          group: "Pages" },
  { label: "Gallery",          href: "/gallery",                   group: "Pages" },
  { label: "About Us",         href: "/about-us",                  group: "Pages" },
  { label: "Contact Us",       href: "/contact-us",                group: "Pages" },
  { label: "Color Charts",     href: "/#color-chart",              group: "Pages" },
  { label: "Digital Bid",      href: "/digital-estimator",         group: "Pages" },
  { label: "My Dashboard",     href: "/customer-portal/dashboard", group: "Client Portal" },
  { label: "Sign In",          href: "/customer-portal",           group: "Client Portal" },
  { label: "Admin Dashboard",  href: "/admin-dashboard",           group: "Operations" },
  { label: "Owner Dashboard",  href: "/owner-dashboard",           group: "Operations" },
  { label: "Crew Dashboard",   href: "/crew-dashboard",            group: "Operations" },
  { label: "Ops Center",       href: "/ops",                       group: "Operations" },
];

const GROUPS = ["Pages", "Client Portal", "Operations"];

const GROUP_COLORS: Record<string, string> = {
  "Pages":         "#F6B800",
  "Client Portal": "#60a5fa",
  "Operations":    "#a78bfa",
};

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── HAMBURGER BUTTON ── */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
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
        <span style={{
          display: "block", height: 2, width: 22,
          background: "#fff", borderRadius: 2,
          transition: "transform .2s, opacity .2s",
          transform: open ? "translateY(7px) rotate(45deg)" : "none",
        }} />
        <span style={{
          display: "block", height: 2, width: 22,
          background: "#fff", borderRadius: 2,
          transition: "opacity .2s",
          opacity: open ? 0 : 1,
        }} />
        <span style={{
          display: "block", height: 2, width: 22,
          background: "#fff", borderRadius: 2,
          transition: "transform .2s",
          transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
        }} />
      </button>

      {/* ── BACKDROP ── */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,.75)",
          zIndex: 10000,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .25s",
        }}
      />

      {/* ── DRAWER ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          top: 0, right: 0,
          width: "min(300px, 88vw)",
          height: "100dvh",
          background: "#0a0a0a",
          zIndex: 10001,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overscrollBehavior: "contain",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .26s cubic-bezier(.4,0,.2,1)",
          boxShadow: "-12px 0 48px rgba(0,0,0,.8)",
        }}
      >
        {/* Drawer top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          flexShrink: 0,
        }}>
          <span style={{ color: "#F6B800", fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: ".1em" }}>
            Menu
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,.1)", border: "none",
              color: "#fff", fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              WebkitTapHighlightColor: "transparent",
            }}
          >✕</button>
        </div>

        {/* Nav links grouped */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
          {GROUPS.map(group => (
            <div key={group} style={{ marginBottom: 8 }}>
              {/* Group label */}
              <div style={{
                padding: "6px 20px",
                fontSize: 10, fontWeight: 900,
                textTransform: "uppercase", letterSpacing: ".14em",
                color: GROUP_COLORS[group],
              }}>
                {group}
              </div>

              {/* Links */}
              {LINKS.filter(l => l.group === group).map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "13px 20px",
                    color: "rgba(255,255,255,.88)",
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,.04)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Footer CTAs */}
        <div style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,.08)",
          display: "flex", flexDirection: "column", gap: 10,
          flexShrink: 0,
        }}>
          <a
            href="/digital-estimator"
            onClick={() => setOpen(false)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "14px 20px",
              background: "#F6B800", color: "#000",
              fontWeight: 900, fontSize: 14,
              borderRadius: 6, textDecoration: "none",
              textTransform: "uppercase", letterSpacing: ".05em",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Start Digital Bid →
          </a>
          <a
            href="tel:17722090266"
            onClick={() => setOpen(false)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "12px 20px",
              background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.8)",
              fontWeight: 700, fontSize: 13,
              borderRadius: 6, textDecoration: "none",
              border: "1px solid rgba(255,255,255,.1)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            📞 772-209-0266
          </a>
        </div>
      </div>
    </>
  );
}
