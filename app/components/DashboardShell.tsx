// app/components/DashboardShell.tsx
// Shared shell used by ALL 4 dashboards — black sidebar, gold active, white content
"use client";
import { useState } from 'react';
import { BRAND, ROUTES } from '@/lib/tokens';

export type DashboardRole = 'client' | 'admin' | 'owner' | 'crew' | 'pm';

interface NavItem { label: string; href: string; icon: string; badge?: number; }

const NAV_BY_ROLE: Record<DashboardRole, NavItem[]> = {
  client: [
    { label: 'My Project', href: ROUTES.customerDashboard, icon: '◈' },
    { label: 'Project Detail', href: `${ROUTES.customerPortal}/projects`, icon: '📋' },
    { label: 'Documents', href: `${ROUTES.customerPortal}/documents`, icon: '📄' },
    { label: 'Photos', href: `${ROUTES.customerPortal}/photos`, icon: '📸' },
    { label: 'Schedule', href: `${ROUTES.customerPortal}/schedule`, icon: '📅' },
    { label: 'Warranty', href: `${ROUTES.customerPortal}/warranty`, icon: '🛡' },
    { label: 'Messages', href: `${ROUTES.customerPortal}/messages`, icon: '💬' },
  ],
  admin: [
    { label: 'Lead Pipeline', href: ROUTES.adminDashboard, icon: '⚡' },
    { label: 'Proposals', href: `${ROUTES.adminDashboard}/proposals`, icon: '📋' },
    { label: 'Communications', href: `${ROUTES.adminDashboard}/comms`, icon: '💬' },
    { label: 'Schedule', href: `${ROUTES.adminDashboard}/schedule`, icon: '📅' },
    { label: 'Active Jobs', href: `${ROUTES.adminDashboard}/jobs`, icon: '🔨' },
    { label: 'WhatsApp Log', href: `${ROUTES.adminDashboard}/whatsapp`, icon: '📱' },
    { label: 'Integrations', href: `${ROUTES.adminDashboard}/integrations`, icon: '🔌' },
  ],
  owner: [
    { label: 'Overview', href: ROUTES.ownerDashboard, icon: '◈' },
    { label: 'Revenue', href: `${ROUTES.ownerDashboard}/revenue`, icon: '💰' },
    { label: 'Pipeline', href: `${ROUTES.ownerDashboard}/pipeline`, icon: '📈' },
    { label: 'Crew', href: `${ROUTES.ownerDashboard}/crew`, icon: '👷' },
    { label: '70 Cities', href: `${ROUTES.ownerDashboard}/cities`, icon: '🗺' },
    { label: 'Reports', href: `${ROUTES.ownerDashboard}/reports`, icon: '📊' },
  ],
  crew: [
    { label: "Today's Job", href: ROUTES.crewDashboard, icon: '🔨' },
    { label: 'Photos', href: `${ROUTES.crewDashboard}/photos`, icon: '📸' },
    { label: 'Change Orders', href: `${ROUTES.crewDashboard}/change-orders`, icon: '⚠️' },
    { label: 'Color Approvals', href: `${ROUTES.crewDashboard}/color-approvals`, icon: '🎨' },
    { label: 'Signatures', href: `${ROUTES.crewDashboard}/signatures`, icon: '✍️' },
    { label: 'Walkthrough', href: `${ROUTES.crewDashboard}/walkthrough`, icon: '✅' },
  ],
  pm: [
    { label: 'Pipeline', href: ROUTES.pmDashboard, icon: '📋' },
    { label: 'Schedule', href: `${ROUTES.pmDashboard}/schedule`, icon: '📅' },
    { label: 'Resources', href: `${ROUTES.pmDashboard}/resources`, icon: '👷' },
    { label: 'Blockers', href: `${ROUTES.pmDashboard}/blockers`, icon: '⚠️' },
    { label: 'Handoff', href: `${ROUTES.pmDashboard}/handoff`, icon: '🤝' },
  ],
};

const ROLE_LABELS: Record<DashboardRole, string> = {
  client: 'Client Portal',
  admin: 'Admin Dashboard',
  owner: 'Owner Dashboard',
  crew: 'Crew Dashboard',
  pm: 'Project Manager',
};

interface Props {
  role: DashboardRole;
  userName?: string;
  children: React.ReactNode;
  currentPath?: string;
}

export function DashboardShell({ role, userName, children, currentPath }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = NAV_BY_ROLE[role];

  return (
    <div className="dashboard-root" style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar" style={{
        width: 240, minWidth: 240, background: '#111214', color: '#fff',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0,
        height: '100vh', zIndex: 40, overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #2a2c30' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/images/logo-header.webp" alt={BRAND.name} style={{ height: 32, width: 'auto' }} />
          </a>
          <div style={{ marginTop: 8, fontSize: 11, color: '#c9a227', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {ROLE_LABELS[role]}
          </div>
          {userName && (
            <div style={{ marginTop: 4, fontSize: 13, color: '#9ca3af' }}>{userName}</div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {nav.map((item) => {
            const isActive = currentPath === item.href || currentPath?.startsWith(item.href + '/');
            return (
              <a key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                borderRadius: 6, marginBottom: 2, textDecoration: 'none', fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#c9a227' : '#d1d5db',
                background: isActive ? 'rgba(201,162,39,0.12)' : 'transparent',
                borderLeft: isActive ? '3px solid #c9a227' : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge ? (
                  <span style={{ marginLeft: 'auto', background: '#c9a227', color: '#111', fontSize: 11, fontWeight: 700, borderRadius: 10, padding: '1px 6px' }}>
                    {item.badge}
                  </span>
                ) : null}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #2a2c30' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#9ca3af', fontSize: 13 }}>
            ← Back to Site
          </a>
          <div style={{ marginTop: 8, fontSize: 11, color: '#4b5563' }}>{BRAND.phone}</div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 240, background: '#f8f7f4', minHeight: '100vh' }}>
        {/* Top bar */}
        <div style={{
          background: '#fff', borderBottom: '1px solid #e2e0dc', padding: '0 24px',
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#0a0b0c' }}>{ROLE_LABELS[role]}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={`tel:${BRAND.phone.replace(/-/g,'')}`} style={{ fontSize: 13, color: '#c9a227', fontWeight: 600, textDecoration: 'none' }}>
              {BRAND.phone}
            </a>
          </div>
        </div>
        {/* Page content */}
        <div style={{ padding: 'clamp(16px, 3vw, 32px)' }}>
          {children}
        </div>
      </main>
    </div>
  );
}

// Stat tile component shared across all dashboards
interface StatTileProps {
  label: string;
  value: string | number;
  sub?: string;
  color?: 'gold' | 'green' | 'red' | 'blue' | 'default';
}
export function StatTile({ label, value, sub, color = 'default' }: StatTileProps) {
  const valueColor = color === 'gold' ? '#c9a227' : color === 'green' ? '#16a34a' : color === 'red' ? '#dc2626' : color === 'blue' ? '#2563eb' : '#0a0b0c';
  return (
    <div style={{
      background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8,
      padding: 'clamp(16px,2vw,24px)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)', fontWeight: 800, color: valueColor, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ marginTop: 6, fontSize: 12, color: '#9ca3af' }}>{sub}</div>}
    </div>
  );
}

// Status badge
export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    new: { bg: '#f0f9ff', text: '#0369a1' },
    'in_progress': { bg: '#fffbeb', text: '#d97706' },
    complete: { bg: '#f0fdf4', text: '#15803d' },
    pending: { bg: '#f8f7f4', text: '#6b7280' },
    sent: { bg: '#eff6ff', text: '#1d4ed8' },
    paid: { bg: '#f0fdf4', text: '#15803d' },
    hot: { bg: '#fff7ed', text: '#c2410c' },
    warm: { bg: '#fffbeb', text: '#d97706' },
    cold: { bg: '#f8f7f4', text: '#6b7280' },
  };
  const c = colors[status.toLowerCase()] || { bg: '#f8f7f4', text: '#6b7280' };
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {status}
    </span>
  );
}
