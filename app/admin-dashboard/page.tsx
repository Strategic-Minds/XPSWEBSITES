// app/admin-dashboard/page.tsx
// XPS Admin Dashboard — lead pipeline, proposals, comms, WhatsApp, integrations
import { DashboardShell, StatTile, StatusBadge } from '@/components/DashboardShell';
import { BRAND } from '@/lib/tokens';

// Demo data — replaced by live Supabase data once auth + env confirmed
const demoLeads = [
  { id: '1', name: 'Mike Torres', projectType: 'Garage Floors', zip: '85001', status: 'new', score: 'hot', submitted: '2026-06-23', asap: true, finish: 'Flake — Gravel', sqft: '650' },
  { id: '2', name: 'Sandra Wells', projectType: 'Commercial Floors', zip: '85254', status: 'in_progress', score: 'warm', submitted: '2026-06-22', asap: false, finish: 'Metallic — Arizona Gold', sqft: '2,400' },
  { id: '3', name: 'Derek Chan', projectType: 'Patios & Outdoor', zip: '85281', status: 'new', score: 'warm', submitted: '2026-06-22', asap: false, finish: 'Quartz — Limestone', sqft: '320' },
  { id: '4', name: 'Rachel Moore', projectType: 'Garage Floors', zip: '85308', status: 'sent', score: 'hot', submitted: '2026-06-21', asap: true, finish: 'Flake — Domino', sqft: '500' },
  { id: '5', name: 'James Kim', projectType: 'Floor Repair', zip: '85226', status: 'new', score: 'cold', submitted: '2026-06-21', asap: false, finish: 'TBD', sqft: '180' },
];

const integrationStatus = [
  { name: 'Supabase DB', status: 'check', ok: false, note: 'Auth repair pending' },
  { name: 'Resend Email', status: 'check', ok: false, note: 'API key needed' },
  { name: 'WhatsApp (Twilio)', status: 'check', ok: false, note: 'TWILIO_ACCOUNT_SID needed' },
  { name: 'Google Drive', status: 'ok', ok: true, note: 'Connected' },
  { name: 'GitHub', status: 'ok', ok: true, note: 'Connected' },
  { name: 'Vercel Cron', status: 'check', ok: false, note: 'CRON_SECRET needed' },
];

export default function AdminDashboard() {
  return (
    <DashboardShell role="admin" userName="Jeremy Bensen" currentPath="/admin-dashboard">
      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatTile label="New Leads" value={demoLeads.filter(l => l.status === 'new').length} sub="today" color="gold" />
        <StatTile label="Hot Leads" value={demoLeads.filter(l => l.score === 'hot').length} color="red" />
        <StatTile label="Proposals Out" value={demoLeads.filter(l => l.status === 'sent').length} color="blue" />
        <StatTile label="Avg Score" value="72" sub="out of 100" color="green" />
        <StatTile label="ASAP Requests" value={demoLeads.filter(l => l.asap).length} color="red" />
      </div>

      {/* Lead Pipeline Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, marginBottom: 28, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e0dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Lead Pipeline</h2>
          <a href="/digital-estimator" style={{ fontSize: 13, color: '#c9a227', fontWeight: 600, textDecoration: 'none' }}>+ New Lead</a>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f8f7f4' }}>
                {['Name', 'Project', 'ZIP', 'Sq Ft', 'Finish', 'Submitted', 'Score', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demoLeads.map((lead, i) => (
                <tr key={lead.id} style={{ borderTop: '1px solid #f0ede8', background: i % 2 === 0 ? '#fff' : '#fdfcfb' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>
                    {lead.asap && <span style={{ background: '#fef3c7', color: '#d97706', fontSize: 10, fontWeight: 700, padding: '1px 4px', borderRadius: 3, marginRight: 6 }}>ASAP</span>}
                    {lead.name}
                  </td>
                  <td style={{ padding: '12px', color: '#4a4a4a' }}>{lead.projectType}</td>
                  <td style={{ padding: '12px', color: '#888' }}>{lead.zip}</td>
                  <td style={{ padding: '12px', color: '#888' }}>{lead.sqft} sf</td>
                  <td style={{ padding: '12px', fontSize: 13 }}>{lead.finish}</td>
                  <td style={{ padding: '12px', color: '#888', fontSize: 13 }}>{lead.submitted}</td>
                  <td style={{ padding: '12px' }}><StatusBadge status={lead.score} /></td>
                  <td style={{ padding: '12px' }}><StatusBadge status={lead.status} /></td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ background: '#c9a227', color: '#111', border: 'none', borderRadius: 4, padding: '4px 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Review</button>
                      <button style={{ background: '#111214', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>Send Proposal</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row: Integrations + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Integration Status */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e0dc' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Integration Status</h3>
          </div>
          <div style={{ padding: '4px 0' }}>
            {integrationStatus.map((intg) => (
              <div key={intg.name} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #f5f4f0' }}>
                <span style={{ fontSize: 16, marginRight: 10 }}>{intg.ok ? '✅' : '⚠️'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{intg.name}</div>
                  <div style={{ fontSize: 12, color: intg.ok ? '#16a34a' : '#d97706' }}>{intg.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e0dc' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Quick Actions</h3>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Review New Leads', href: '#leads', icon: '🔔' },
              { label: 'Send Proposal', href: '/proposal-system', icon: '📋' },
              { label: 'Check Google Calendar', href: `https://calendar.google.com/calendar/r`, icon: '📅' },
              { label: 'View WhatsApp Log', href: '/admin-dashboard/whatsapp', icon: '📱' },
              { label: 'Owner Dashboard', href: '/owner-dashboard', icon: '◈' },
              { label: 'Go to Homepage', href: '/', icon: '🏠' },
            ].map((a) => (
              <a key={a.label} href={a.href} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                background: '#f8f7f4', borderRadius: 6, textDecoration: 'none',
                color: '#0a0b0c', fontSize: 14, fontWeight: 500,
                border: '1px solid #e8e6e2', transition: 'background 0.15s',
              }}>
                <span>{a.icon}</span>{a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
