"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const phone = "772-209-0266";
const phoneHref = "tel:17722090266";

const NAV_LINKS = [
  // Main Pages
  { label: "Home",                href: "/",                          section: "Main" },
  { label: "About Us",            href: "/about-us",                  section: "Main" },
  { label: "Gallery",             href: "/gallery",                   section: "Main" },
  { label: "Contact Us",          href: "/contact-us",                section: "Main" },
  // Get Started
  { label: "Start Digital Bid",   href: "/digital-estimator",         section: "Get Started" },
  { label: "Design Center",       href: "/design",                    section: "Get Started" },
  { label: "Color Charts",        href: "/#color-chart",              section: "Get Started" },
  // Portal
  { label: "My Dashboard",        href: "/customer-portal/dashboard", section: "Client Portal" },
  // Internal Ops (visible to all for demo)
  { label: "Admin Dashboard",     href: "/admin-dashboard",           section: "Operations" },
  { label: "Owner Dashboard",     href: "/owner-dashboard",           section: "Operations" },
  { label: "Crew Dashboard",      href: "/crew-dashboard",            section: "Operations" },
  { label: "Installer App",       href: "/installer",                 section: "Operations" },
  { label: "Ops Command Center",  href: "/ops",                       section: "Operations" },
];

const SECTIONS = ["Main", "Get Started", "Client Portal", "Operations"];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <style>{`
        .mnav-btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 1001;
          position: relative;
        }
        .mnav-btn span {
          display: block;
          height: 2px;
          width: 100%;
          background: #fff;
          border-radius: 2px;
          transition: all .22s ease;
          transform-origin: center;
        }
        .mnav-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .mnav-btn.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .mnav-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mnav-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.6);
          z-index: 1002;
          cursor: pointer;
        }
        .mnav-backdrop.open { display: block; }

        .mnav-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: min(320px, 88vw);
          height: 100vh;
          background: #050505;
          z-index: 1003;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform .28s cubic-bezier(.4,0,.2,1);
          box-shadow: -8px 0 32px rgba(0,0,0,.5);
        }
        .mnav-drawer.open { transform: translateX(0); }

        .mnav-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,255,255,.1);
          flex-shrink: 0;
        }
        .mnav-head img { height: 38px; width: auto; }
        .mnav-close {
          background: rgba(255,255,255,.1);
          border: none;
          color: #fff;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.1rem;
          display: grid;
          place-items: center;
        }
        .mnav-close:hover { background: rgba(255,255,255,.2); }

        .mnav-section-label {
          padding: 14px 20px 6px;
          font-size: .6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: rgba(255,255,255,.3);
        }

        .mnav-link {
          display: flex;
          width: 100%;
          align-items: center;
          padding: 11px 20px;
          color: rgba(255,255,255,.82);
          font-size: .9rem;
          font-weight: 700;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: all .15s;
        }
        .mnav-link:hover {
          background: rgba(255,255,255,.06);
          color: #fff;
          border-left-color: #f6b800;
        }
        .mnav-link.active {
          color: #f6b800;
          border-left-color: #f6b800;
          background: rgba(246,184,0,.08);
        }

        .mnav-footer {
          margin-top: auto;
          padding: 20px;
          border-top: 1px solid rgba(255,255,255,.1);
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
        }
        .mnav-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 20px;
          background: linear-gradient(180deg,#ffd75a,#f6b800);
          color: #050505;
          font-weight: 900;
          font-size: .9rem;
          border-radius: 6px;
          text-decoration: none;
        }
        .mnav-call {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255,255,255,.07);
          color: #fff;
          font-weight: 700;
          font-size: .88rem;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,.12);
        }
        .mnav-wa {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          background: #25d366;
          color: #fff;
          font-weight: 900;
          font-size: .88rem;
          border-radius: 6px;
          text-decoration: none;
        }

        @media(min-width: 900px) {
          .mnav-btn { display: none; }
        }
      `}</style>

      {/* Hamburger button */}
      <button
        className={`mnav-btn ${open ? "open" : ""}`}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Backdrop */}
      <div
        className={`mnav-backdrop ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav className={`mnav-drawer ${open ? "open" : ""}`} aria-label="Site navigation">
        <div className="mnav-head">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
          <button className="mnav-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
        </div>

        {SECTIONS.map((section) => {
          const links = NAV_LINKS.filter(l => l.section === section);
          return (
            <div key={section}>
              <p className="mnav-section-label">{section}</p>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`mnav-link ${pathname === link.href ? "active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          );
        })}

        <div className="mnav-footer">
          <a className="mnav-cta" href="/digital-estimator" onClick={() => setOpen(false)}>
            Start Digital Bid →
          </a>
          <a className="mnav-wa" href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer">
            📱 WhatsApp Us
          </a>
          <a className="mnav-call" href={phoneHref} onClick={() => setOpen(false)}>
            📞 {phone}
          </a>
        </div>
      </nav>
    </>
  );
}
