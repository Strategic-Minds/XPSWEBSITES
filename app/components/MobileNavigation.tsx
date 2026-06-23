'use client';
import { useState } from 'react';

const phoneHref = 'tel:16027303499';

const navLinks = [
  ['🏠', 'Home', '/'],
  ['📋', 'Get a Bid', '/digital-estimator'],
  ['🎨', 'Floor Visualizer', '/visualizer'],
  ['🖼️', 'Gallery', '/gallery'],
  ['📞', 'About Us', '/about-us'],
  ['✉️', 'Contact', '/contact-us'],
];

const dashLinks = [
  ['👤', 'Client Portal', '/customer-portal/dashboard'],
  ['👑', 'Owner Dashboard', '/owner-dashboard'],
  ['🛡️', 'Admin Dashboard', '/admin-dashboard'],
  ['🔨', 'Crew Leader', '/crew-leader-dashboard'],
  ['📦', 'Project Manager', '/project-manager-dashboard'],
  ['🏗️', 'Ops Center', '/ops'],
];

export function MobileNavigation({ active = '' }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .mn-trigger{display:flex;flex-direction:column;justify-content:center;gap:5px;width:42px;height:42px;padding:8px;background:none;border:none;cursor:pointer;z-index:200}
        .mn-trigger span{display:block;height:2px;background:#fff;border-radius:2px;transition:all .25s}
        .mn-trigger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
        .mn-trigger.open span:nth-child(2){opacity:0}
        .mn-trigger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
        .mn-overlay{display:none;position:fixed;inset:0;z-index:100}
        .mn-overlay.open{display:flex;flex-direction:column}
        .mn-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.55)}
        .mn-panel{position:relative;width:min(85vw,320px);height:100%;background:#0a0a0a;color:#fff;overflow-y:auto;display:flex;flex-direction:column;padding:0 0 32px}
        .mn-header{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #222;min-height:72px}
        .mn-logo{font-size:16px;font-weight:900;color:#f6b800;text-decoration:none}
        .mn-close{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:4px 8px}
        .mn-cta{margin:16px 20px 8px}
        .mn-cta a{display:flex;align-items:center;justify-content:center;min-height:48px;background:linear-gradient(180deg,#ffd75a,#f6b800);color:#111;font-weight:900;font-size:15px;border-radius:8px;text-decoration:none}
        .mn-phone{display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px;margin:0 20px 8px;border:1px solid #333;border-radius:8px;color:#fff;font-weight:700;font-size:14px;text-decoration:none}
        .mn-section{padding:20px 20px 0}
        .mn-label{font-size:10px;font-weight:900;letter-spacing:.12em;text-transform:uppercase;color:#f6b800;margin-bottom:12px}
        .mn-link{display:flex;align-items:center;gap:12px;min-height:48px;padding:0 12px;border-radius:8px;font-size:15px;font-weight:700;color:#fff;text-decoration:none}
        .mn-link:hover,.mn-link.active{background:#1a1a1a;color:#f6b800}
        .mn-icon{font-size:18px;width:24px;text-align:center}
        .mn-divider{height:1px;background:#1e1e1e;margin:16px 20px}
      `}</style>

      <button
        className={'mn-trigger' + (open ? ' open' : '')}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span /><span /><span />
      </button>

      <div className={'mn-overlay' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="mn-backdrop" onClick={() => setOpen(false)} />
        <nav className="mn-panel" aria-label="Site navigation">
          <div className="mn-header">
            <a className="mn-logo" href="/" onClick={() => setOpen(false)}>Phoenix Epoxy Pros</a>
            <button className="mn-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
          </div>
          <div className="mn-cta">
            <a href="/digital-estimator" onClick={() => setOpen(false)}>🏷️ Get 15% Off — Free Digital Bid</a>
          </div>
          <a href={phoneHref} className="mn-phone">📞 (602) 730-3499 — Call Now</a>
          <div className="mn-section">
            <div className="mn-label">Navigation</div>
            {navLinks.map(([icon, label, href]) => (
              <a key={href} href={href} className={'mn-link' + (active === label ? ' active' : '')} onClick={() => setOpen(false)}>
                <span className="mn-icon">{icon}</span>{label}
              </a>
            ))}
          </div>
          <div className="mn-divider" />
          <div className="mn-section">
            <div className="mn-label">Dashboards & Portals</div>
            {dashLinks.map(([icon, label, href]) => (
              <a key={href} href={href} className={'mn-link' + (active === label ? ' active' : '')} onClick={() => setOpen(false)}>
                <span className="mn-icon">{icon}</span>{label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
