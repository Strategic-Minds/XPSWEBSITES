// app/project-manager-dashboard/page.tsx — Project Manager Dashboard
import { DashboardShell, StatTile, StatusBadge } from '@/components/DashboardShell';

const JOBS = [
  { id: 'J001', customer: 'Mike Torres', address: '1234 N 25th Ave, Phoenix', type: 'Garage', sqft: 650, crew: 'Crew A', date: '2026-06-25', status: 'scheduled', finish: 'Flake — Domino', ready: true },
  { id: 'J002', customer: 'Sandra Wells', address: '4500 E Camelback Rd, Scottsdale', type: 'Commercial', sqft: 2400, crew: 'Crew B', date: '2026-06-26', status: 'in_progress', finish: 'Metallic — AZ Gold', ready: true },
  { id: 'J003', customer: 'Derek Chan', address: '7800 W Indian School, Glendale', type: 'Patio', sqft: 320, crew: 'Unassigned', date: '2026-06-27', status: 'pending_materials', finish: 'Quartz — Limestone', ready: false },
  { id: 'J004', customer: 'Rachel Moore', address: '3300 S Mill Ave, Tempe', type: 'Garage', sqft: 500, crew: 'Crew C', date: '2026-06-28', status: 'scheduled', finish: 'Flake — Silver Storm', ready: true },
  { id: 'J005', customer: 'James Kim', address: '9200 N 43rd Ave, Peoria', type: 'Repair', sqft: 180, crew: 'Unassigned', date: 'TBD', status: 'awaiting_approval', finish: 'TBD', ready: false },
];

const BLOCKERS = [
  { id: 1, job: 'J003 — Derek Chan', issue: 'Quartz material backordered — ETA June 27', severity: 'medium' },
  { id: 2, job: 'J005 — James Kim', issue: 'Proposal not yet approved by customer', severity: 'low' },
];

const CREW_SCHEDULE = [
  { crew: 'Crew A', today: 'J001 — Mike Torres (Garage)', tomorrow: 'Off', status: 'active' },
  { crew: 'Crew B', today: 'J002 — Sandra Wells (Commercial)', tomorrow: 'J004 — Rachel Moore', status: 'active' },
  { crew: 'Crew C', today: 'Off', tomorrow: 'J004 — Rachel Moore', status: 'standby' },
];

export default function ProjectManagerDashboard() {
  return (
    <DashboardShell role="pm" userName="Project Manager" currentPath="/project-manager-dashboard">
      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatTile label="Jobs This Week" value={JOBS.length} color="blue" />
        <StatTile label="Ready to Install" value={JOBS.filter(j => j.ready).length} color="green" />
        <StatTile label="Blockers" value={BLOCKERS.length} color="red" />
        <StatTile label="Crews Active" value={CREW_SCHEDULE.filter(c => c.status === 'active').length} color="gold" />
        <StatTile label="Unassigned Jobs" value={JOBS.filter(j => j.crew === 'Unassigned').length} sub="need crew" color="red" />
      </div>

      {/* Blockers */}
      {BLOCKERS.length > 0 && (
        <div style={{ background: '#fff8ed', border: '1.5px solid #fcd34d', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: '#d97706' }}>⚠️ Active Blockers</h3>
          {BLOCKERS.map(b => (
            <div key={b.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderTop: '1px solid #fde68a' }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#0a0b0c', minWidth: 160 }}>{b.job}</span>
              <span style={{ fontSize: 13, color: '#555' }}>{b.issue}</span>
              <StatusBadge status={b.severity} />
            </div>
          ))}
        </div>
      )}

      {/* Job Schedule Table */}
      <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e0dc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>📅 Installation Schedule</h2>
          <span style={{ fontSize: 13, color: '#888' }}>Next 7 days</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f8f7f4' }}>
                {['Job ID', 'Customer', 'Address', 'Type', 'Sq Ft', 'Finish', 'Crew', 'Date', 'Status', 'Ready'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {JOBS.map((job, i) => (
                <tr key={job.id} style={{ borderTop: '1px solid #f0ede8', background: i % 2 === 0 ? '#fff' : '#fdfcfb' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#c9a227', fontSize: 13 }}>{job.id}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{job.customer}</td>
                  <td style={{ padding: '12px', fontSize: 13, color: '#555', maxWidth: 200 }}>{job.address}</td>
                  <td style={{ padding: '12px' }}>{job.type}</td>
                  <td style={{ padding: '12px', color: '#888' }}>{job.sqft} sf</td>
                  <td style={{ padding: '12px', fontSize: 13 }}>{job.finish}</td>
                  <td style={{ padding: '12px', fontWeight: job.crew === 'Unassigned' ? 700 : 400, color: job.crew === 'Unassigned' ? '#dc2626' : '#0a0b0c' }}>{job.crew}</td>
                  <td style={{ padding: '12px', fontSize: 13 }}>{job.date}</td>
                  <td style={{ padding: '12px' }}><StatusBadge status={job.status} /></td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{job.ready ? '✅' : '⚠️'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crew Schedule + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Crew Schedule */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e0dc' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>👷 Crew Assignments</h3>
          </div>
          <div>
            {CREW_SCHEDULE.map((c) => (
              <div key={c.crew} style={{ padding: '14px 20px', borderBottom: '1px solid #f5f4f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{c.crew}</span>
                  <StatusBadge status={c.status} />
                </div>
                <div style={{ fontSize: 13, color: '#555' }}>Today: {c.today}</div>
                <div style={{ fontSize: 13, color: '#888' }}>Tomorrow: {c.tomorrow}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e0dc' }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>⚡ Quick Actions</h3>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Assign Unassigned Crews', href: '#schedule', icon: '👷' },
              { label: 'View Admin Dashboard', href: '/admin-dashboard', icon: '🛡' },
              { label: 'Crew Leader View', href: '/crew-leader-dashboard', icon: '🔨' },
              { label: 'Google Calendar', href: 'https://calendar.google.com', icon: '📅' },
              { label: 'Material Orders', href: '#materials', icon: '📦' },
              { label: 'Flag a Blocker', href: '#blockers', icon: '🚩' },
            ].map(a => (
              <a key={a.label} href={a.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#f8f7f4', borderRadius: 6, textDecoration: 'none', color: '#0a0b0c', fontSize: 14, fontWeight: 500, border: '1px solid #e8e6e2' }}>
                <span>{a.icon}</span>{a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
