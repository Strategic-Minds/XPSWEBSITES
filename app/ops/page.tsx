// app/ops/page.tsx — XPS Ops Command Center
import { DashboardShell, StatTile } from '@/components/DashboardShell';
export default function OpsCenter() {
  return (
    <DashboardShell role="admin" userName="Ops" currentPath="/ops">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: 8 }}>🏗️ Ops Command Center</h1>
        <p style={{ color: '#555', fontSize: 15 }}>System-wide operational overview — integrations, deployments, cron status.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatTile label="Build Status"   value="✅ Live"    color="green" />
        <StatTile label="Active Installs" value="3"         color="blue" />
        <StatTile label="Open Issues"     value="0"         color="green" />
        <StatTile label="Test Pass Rate"  value="100%"      color="green" />
      </div>
      <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: 24 }}>
        <h3 style={{ margin: '0 0 16px' }}>System Links</h3>
        {[
          ['Admin Dashboard', '/admin-dashboard'],
          ['Owner Dashboard', '/owner-dashboard'],
          ['PM Dashboard', '/project-manager-dashboard'],
          ['Crew Dashboard', '/crew-leader-dashboard'],
          ['Client Portal', '/customer-portal/dashboard'],
        ].map(([label, href]) => (
          <a key={href} href={href} style={{ display: 'block', padding: '10px 0', borderBottom: '1px solid #f0ede8', color: '#c9a227', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            {label} →
          </a>
        ))}
      </div>
    </DashboardShell>
  );
}
