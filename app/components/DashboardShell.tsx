"use client";
export { COLOR_CHARTS } from "../lib/color-charts";
import type { ReactNode } from "react";

// ─── SHARED COLOR CHARTS (same source as homepage FinishVisualizer) ───────────


// ─── SIDEBAR CONFIG PER ROLE ──────────────────────────────────────────────────
const SIDEBARS = {
  admin: [
    { label: "Dashboard",    href: "/admin-dashboard",   icon: "▦" },
    { label: "All Leads",    href: "/admin-dashboard",   icon: "👥" },
    { label: "Proposals",    href: "/admin-dashboard",   icon: "📋" },
    { label: "Messages",     href: "/admin-dashboard",   icon: "💬" },
    { label: "Schedule",     href: "/admin-dashboard",   icon: "📅" },
    { label: "Active Jobs",  href: "/admin-dashboard",   icon: "🔧" },
    { label: "Crew Board",   href: "/crew-dashboard",    icon: "👷" },
    { label: "Owner View",   href: "/owner-dashboard",   icon: "📊" },
    { label: "Settings",     href: "#",                  icon: "⚙️" },
  ],
  owner: [
    { label: "Overview",     href: "/owner-dashboard",   icon: "▦" },
    { label: "Revenue",      href: "/owner-dashboard",   icon: "💰" },
    { label: "Conversion",   href: "/owner-dashboard",   icon: "📈" },
    { label: "Locations",    href: "/owner-dashboard",   icon: "🏙️" },
    { label: "Operations",   href: "/admin-dashboard",   icon: "⚙️" },
    { label: "Crew Board",   href: "/crew-dashboard",    icon: "👷" },
    { label: "Settings",     href: "#",                  icon: "🔧" },
  ],
  crew: [
    { label: "My Jobs",      href: "/crew-dashboard",    icon: "▦" },
    { label: "Today's Jobs", href: "/crew-dashboard",    icon: "📋" },
    { label: "Schedule",     href: "/crew-dashboard",    icon: "📅" },
    { label: "Photos",       href: "/crew-dashboard",    icon: "📷" },
    { label: "Change Orders",href: "/crew-dashboard",    icon: "✏️" },
    { label: "Messages",     href: "/crew-dashboard",    icon: "💬" },
    { label: "Settings",     href: "#",                  icon: "⚙️" },
  ],
  customer: [
    { label: "My Dashboard", href: "/customer-portal/dashboard", icon: "▦" },
    { label: "Project Status",href: "/customer-portal/dashboard",icon: "📋" },
    { label: "Color Charts", href: "/customer-portal/dashboard#colors", icon: "🎨" },
    { label: "Floor Design", href: "/customer-portal/dashboard#design", icon: "🖼️" },
    { label: "Documents",    href: "/customer-portal/dashboard", icon: "📄" },
    { label: "Messages",     href: "/customer-portal/dashboard", icon: "💬" },
    { label: "WhatsApp",     href: "https://wa.me/17722090266",  icon: "📱" },
  ],
  installer: [
    { label: "Command Center", href: "/ops",     icon: "▦" },
    { label: "Jobs",           href: "/ops",     icon: "📋" },
    { label: "Schedule",       href: "/ops",     icon: "📅" },
    { label: "Customers",      href: "/ops",     icon: "👥" },
    { label: "Reports",        href: "/ops",     icon: "📊" },
    { label: "Photos",         href: "/ops",     icon: "📷" },
    { label: "Settings",       href: "#",        icon: "⚙️" },
  ],
};

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
function ShellStyles() {
  return (
    <style>{`
      .ds-shell { display:flex; flex-direction:column; min-height:100vh; background:#f4f5f6; font-family:Arial,Helvetica,sans-serif; }
      .ds-header { position:sticky; top:0; z-index:30; display:flex; align-items:center; justify-content:space-between; gap:20px; min-height:68px; padding:10px clamp(16px,3vw,40px); background:#050505; color:#fff; box-shadow:0 4px 20px rgba(0,0,0,.3); }
      .ds-header-logo { display:flex; align-items:center; gap:10px; }
      .ds-header-logo img { height:44px; width:auto; }
      .ds-header-role { font-size:.72rem; font-weight:900; text-transform:uppercase; letter-spacing:.08em; color:#f6b800; border:1px solid #f6b800; padding:3px 10px; border-radius:4px; }
      .ds-header-user { font-size:.84rem; font-weight:700; color:rgba(255,255,255,.7); }
      .ds-header-cta { display:inline-flex; align-items:center; gap:8px; padding:8px 18px; background:linear-gradient(180deg,#ffd75a,#f6b800); color:#050505; font-weight:900; font-size:.84rem; border-radius:6px; text-decoration:none; border:none; cursor:pointer; white-space:nowrap; }
      .ds-body { display:flex; flex:1; }
      .ds-sidebar { width:220px; min-height:100%; flex-shrink:0; background:#050505; padding:24px 0; display:flex; flex-direction:column; gap:2px; }
      .ds-sidebar-section { padding:10px 20px 4px; font-size:.62rem; font-weight:900; text-transform:uppercase; letter-spacing:.1em; color:rgba(255,255,255,.3); margin-top:8px; }
      .ds-sidebar a { display:flex; align-items:center; gap:10px; padding:9px 20px; color:rgba(255,255,255,.7); font-size:.84rem; font-weight:700; text-decoration:none; border-left:3px solid transparent; transition:all .15s; }
      .ds-sidebar a:hover { background:rgba(255,255,255,.06); color:#fff; }
      .ds-sidebar a.active { color:#f6b800; background:rgba(246,184,0,.1); border-left-color:#f6b800; }
      .ds-main { flex:1; padding:clamp(18px,3vw,36px); display:flex; flex-direction:column; gap:22px; overflow-x:hidden; }
      .ds-kpi-row { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:14px; }
      .ds-kpi { background:#fff; border:1px solid #e2e6e8; border-radius:8px; padding:18px 20px; }
      .ds-kpi-label { font-size:.68rem; font-weight:900; text-transform:uppercase; color:#888; margin:0 0 6px; }
      .ds-kpi-value { font-size:1.8rem; font-weight:900; margin:0 0 3px; color:#050505; }
      .ds-kpi-sub { font-size:.72rem; color:#888; margin:0; }
      .ds-card { background:#fff; border:1px solid #e2e6e8; border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,.06); }
      .ds-card-head { display:flex; align-items:center; justify-content:space-between; padding:18px 22px 14px; border-bottom:1px solid #f0f2f3; }
      .ds-card-title { font-size:1rem; font-weight:900; text-transform:uppercase; letter-spacing:.04em; margin:0; }
      .ds-card-body { padding:22px; }
      .ds-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:8px 18px; border-radius:6px; font-size:.82rem; font-weight:900; cursor:pointer; text-decoration:none; border:1px solid #d4d4d4; background:#fff; color:#050505; white-space:nowrap; }
      .ds-btn.gold { background:linear-gradient(180deg,#ffd75a,#f6b800); border-color:#e2a500; color:#050505; box-shadow:0 6px 18px rgba(246,184,0,.22); }
      .ds-btn.dark { background:#050505; border-color:#050505; color:#fff; }
      .ds-btn.whatsapp { background:#25d366; border-color:#1ebe5d; color:#fff; }
      .ds-table { width:100%; border-collapse:collapse; }
      .ds-table th { text-align:left; padding:8px 14px; font-size:.68rem; font-weight:900; text-transform:uppercase; color:#888; border-bottom:2px solid #e8eaec; }
      .ds-table td { padding:12px 14px; font-size:.86rem; border-bottom:1px solid #f0f2f3; }
      .ds-badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:999px; font-size:.68rem; font-weight:900; text-transform:uppercase; }
      .ds-badge.green { background:#d1fae5; color:#065f46; }
      .ds-badge.blue  { background:#dbeafe; color:#1e40af; }
      .ds-badge.amber { background:#fef3c7; color:#92400e; }
      .ds-badge.red   { background:#fee2e2; color:#991b1b; }
      .ds-timeline { display:grid; grid-template-columns:repeat(5,1fr); gap:8px; text-align:center; }
      .ds-timeline-step { display:flex; flex-direction:column; align-items:center; gap:6px; font-size:.72rem; font-weight:800; color:#888; }
      .ds-timeline-step.done .ds-bubble { background:#25a84a; border-color:#25a84a; color:#fff; }
      .ds-timeline-step.active .ds-bubble { background:#f6b800; border-color:#f6b800; color:#050505; }
      .ds-bubble { display:grid; place-items:center; width:38px; height:38px; border-radius:999px; border:2px solid #d4d4d4; background:#fff; font-weight:900; font-size:.84rem; }
      .ds-color-charts { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:18px; }
      .ds-color-chart-card { border:1px solid #e2e6e8; border-radius:8px; overflow:hidden; background:#fff; }
      .ds-color-chart-card img { width:100%; display:block; }
      .ds-color-chart-info { padding:12px 16px; }
      .ds-color-chart-info h3 { margin:0 0 4px; font-size:.88rem; font-weight:900; text-transform:uppercase; }
      .ds-color-chart-info p { margin:0; font-size:.78rem; color:#888; }
      .ds-floor-designer { display:grid; grid-template-columns:1fr 1fr; gap:0; min-height:340px; border:1px solid #e2e6e8; border-radius:8px; overflow:hidden; }
      .ds-floor-preview { background:linear-gradient(135deg,#1a1a1a,#2d2d2d); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:#fff; padding:30px; }
      .ds-floor-preview img { width:100%; max-height:220px; object-fit:cover; border-radius:6px; }
      .ds-floor-upload { background:#fff; padding:28px; display:flex; flex-direction:column; gap:16px; justify-content:center; }
      .ds-drop-zone { min-height:130px; border:2px dashed #d4d4d4; border-radius:8px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; color:#888; font-size:.84rem; font-weight:800; cursor:pointer; transition:border-color .2s; padding:20px; text-align:center; }
      .ds-drop-zone:hover { border-color:#f6b800; color:#050505; }
      .ds-step-list { display:flex; flex-direction:column; gap:10px; }
      .ds-step { display:grid; grid-template-columns:36px 1fr; gap:12px; align-items:start; padding:12px; border-radius:7px; border:1px solid #e8eaec; }
      .ds-step.done { background:#f0fdf4; border-color:#bbf7d0; }
      .ds-step.active { background:#fffbeb; border-color:#fde68a; }
      .ds-step-num { display:grid; place-items:center; width:34px; height:34px; border-radius:999px; background:#e9e9e9; font-weight:900; font-size:.84rem; flex-shrink:0; }
      .ds-step.done .ds-step-num { background:#25a84a; color:#fff; }
      .ds-step.active .ds-step-num { background:#f6b800; color:#050505; }
      .ds-step-info strong { display:block; font-size:.86rem; font-weight:900; margin-bottom:3px; }
      .ds-step-info span { font-size:.78rem; color:#888; }
      @media(max-width:768px) {
        .ds-sidebar { display:none; }
        .ds-floor-designer { grid-template-columns:1fr; }
        .ds-kpi-row { grid-template-columns:1fr 1fr; }
      }
    `}</style>
  );
}

// ─── SHARED HEADER ────────────────────────────────────────────────────────────
function DsHeader({ role, user }: { role: string; user: string }) {
  return (
    <header className="ds-header">
      <div className="ds-header-logo">
        <a href="/"><img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" /></a>
        <span className="ds-header-role">{role}</span>
      </div>
      <span className="ds-header-user">{user}</span>
      <a className="ds-header-cta" href="/">← Home</a>
    </header>
  );
}

// ─── SHARED SIDEBAR ───────────────────────────────────────────────────────────
function DsSidebar({ role, active }: { role: keyof typeof SIDEBARS; active: string }) {
  const items = SIDEBARS[role];
  return (
    <nav className="ds-sidebar">
      <div className="ds-sidebar-section">{role.toUpperCase()}</div>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={item.label === active ? "active" : ""}
          target={item.href.startsWith("https://wa.me") ? "_blank" : undefined}
          rel={item.href.startsWith("https://wa.me") ? "noopener noreferrer" : undefined}
        >
          <span>{item.icon}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

// ─── EXPORTED SHELL WRAPPER ───────────────────────────────────────────────────
export function DashboardShell({
  role,
  roleLabel,
  user,
  active,
  children,
}: {
  role: keyof typeof SIDEBARS;
  roleLabel: string;
  user: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="ds-shell">
      <ShellStyles />
      <DsHeader role={roleLabel} user={user} />
      <div className="ds-body">
        <DsSidebar role={role} active={active} />
        <main className="ds-main">{children}</main>
      </div>
    </div>
  );
}

export { ShellStyles, DsHeader, DsSidebar };
