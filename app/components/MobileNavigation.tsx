"use client";

import { useEffect, useId, useState } from "react";

const phone = "772-209-0266";
const phoneHref = "tel:17722090266";

const mobileLinks = [
  { label: "Digital Bid", href: "/digital-bid", description: "Start the 15% estimator path" },
  { label: "Portal System", href: "/portal-system", description: "See the client workflow" },
  { label: "About Us", href: "/about-us", description: "XPS standards and process" },
  { label: "Contact Us", href: "/contact-us", description: "Call, email, or request service" },
  { label: "Gallery", href: "/gallery", description: "Review floor finish examples" }
];

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const drawerId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={`mobile-menu-root ${open ? "is-open" : ""}`}>
      <button
        className="mobile-menu-button"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <strong>Menu</strong>
      </button>

      {open ? <button className="mobile-menu-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}

      <nav className="mobile-menu-drawer" id={drawerId} aria-label="Mobile navigation">
        <div className="mobile-menu-drawer-head">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>Close</button>
        </div>

        <div className="mobile-menu-links">
          {mobileLinks.map((link) => (
            <a href={link.href} key={link.label} onClick={() => setOpen(false)}>
              <strong>{link.label}</strong>
              <span>{link.description}</span>
            </a>
          ))}
        </div>

        <div className="mobile-menu-actions">
          <a className="gold-button" href="/digital-estimator" onClick={() => setOpen(false)}>Start Digital Bid</a>
          <a className="mobile-menu-call" href={phoneHref} onClick={() => setOpen(false)}>
            <span className="phone-icon" aria-hidden="true" />
            Call {phone}
          </a>
        </div>
      </nav>
    </div>
  );
}
