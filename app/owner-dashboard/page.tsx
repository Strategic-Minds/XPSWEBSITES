// app/owner-dashboard/page.tsx — Executive metrics, 70-city map, crew performance
import { DashboardShell, StatTile, StatusBadge } from '@/components/DashboardShell';

const cityData = [
  { city: 'Phoenix, AZ', status: 'live', leads: 47, revenue: '$84,200', conversion: '34%' },
  { city: 'Scottsdale, AZ', status: 'in_progress', leads: 12, revenue: '$28,400', conversion: '41%' },
  { city: 'Tempe, AZ', status: 'in_progress', leads: 8, revenue: '$18,900', conversion: '38%' },
  { city: 'Mesa, AZ', status: 'planned', leads: 0, revenue: '$0', conversion: '—' },
  { city: 'Glendale, AZ', status: 'planned', leads: 0, revenue: '$0', conversion: '—' },
  { city: 'Chandler, AZ', status: 'planned', leads: 0, revenue: '$0', conversion: '—' },
];

const crewData = [
  { name: 'Crew A', jobsCompleted: 18, avgRating: '4.9', callbacks: 0 },
  { name: 'Crew B', jobsCompleted: 14, avgRating: '4.7', callbacks: 1 },
  { name: 'Crew C', jobsCompleted: 11, avgRating: '4.8', callbacks: 0 },
];

export default function OwnerDashboard() {
  return (
    <DashboardShell role="owner" userName="Jeremy Bensen" currentPath="/owner-dashboard">
      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatTile label="Revenue MTD" value="$84,200" color="gold" />
        <StatTile label="Revenue YTD" value="$342,800" color="gold" />
        <StatTile label="New Leads" value="47" sub="this month" color="blue" />
        <StatTile label="Conversion Rate" value="34%" color="green" />
        <StatTile label="Avg Response" value="3.2 hrs" sub="submission → proposal" />
        <StatTile label="Jobs Complete" value="43" sub="this month" color="green" />
        <StatTile label="Backlog" value="12" sub="scheduled jobs" />
        <StatTile label="Cities Live" value="1" sub="of 70 target" color="gold" />
      </div>

      {/* 70-City Expansion */}
      <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e0dc', background: '#111214', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>70-City Expansion Map</h2>
          <span style={{ fontSize: 13, color: '#c9a227', fontWeight: 700 }}>1 Live / 2 In Progress / 67 Planned</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#f8f7f4' }}>
                {['City', 'Status', 'Leads', 'Revenue', 'Conversion'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cityData.map((c, i) => (
                <tr key={c.city} style={{ borderTop: '1px solid #f0ede8', background: i % 2 === 0 ? '#fff' : '#fdfcfb' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{c.city}</td>
                  <td style={{ padding: '12px 16px' }}><StatusBadge status={c.status} /></td>
                  <td style={{ padding: '12px 16px', color: '#4a4a4a' }}>{c.leads}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#16a34a' }}>{c.revenue}</td>
                  <td style={{ padding: '12px 16px' }}>{c.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Crew Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
        {crewData.map((crew) => (
          <div key={crew.name} style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{crew.name}</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Jobs Done</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#c9a227' }}>{crew.jobsCompleted}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Avg Rating</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>⭐ {crew.avgRating}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Callbacks</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: crew.callbacks > 0 ? '#dc2626' : '#16a34a' }}>{crew.callbacks}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
