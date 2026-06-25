// app/admin-dashboard/page.tsx
// XPS Admin Dashboard — Full M02/M03 spec
// Lead pipeline · Proposal queue · Comms center · Integration health · Quick actions
'use client';
import { useState } from 'react';
import { DashboardShell, StatTile, StatusBadge } from '@/components/DashboardShell';

// ─── Demo data ────────────────────────────────────────────────────────────────
const demoLeads = [
  { id: '1', name: 'Mike Torres',    type: 'Garage Floors',       zip: '85001', sqft: '650',   finish: 'Flake — Gravel',        submitted: '2026-06-25', score: 'hot',  status: 'new',         asap: true,  phone: '602-555-0101', email: 'mike@example.com',    note: 'Has dog, call before noon' },
  { id: '2', name: 'Sandra Wells',   type: 'Commercial Floors',   zip: '85254', sqft: '2,400', finish: 'Metallic — AZ Gold',    submitted: '2026-06-24', score: 'warm', status: 'in_progress', asap: false, phone: '480-555-0202', email: 'sandra@example.com',   note: 'Needs bid by Friday' },
  { id: '3', name: 'Derek Chan',     type: 'Patios & Outdoor',    zip: '85281', sqft: '320',   finish: 'Quartz — Limestone',    submitted: '2026-06-24', score: 'warm', status: 'new',         asap: false, phone: '480-555-0303', email: 'derek@example.com',    note: '' },
  { id: '4', name: 'Rachel Moore',   type: 'Garage Floors',       zip: '85308', sqft: '500',   finish: 'Flake — Domino',        submitted: '2026-06-23', score: 'hot',  status: 'sent',        asap: true,  phone: '623-555-0404', email: 'rachel@example.com',   note: 'Approved — awaiting payment' },
  { id: '5', name: 'James Kim',      type: 'Floor Repair',        zip: '85226', sqft: '180',   finish: 'TBD',                   submitted: '2026-06-23', score: 'cold', status: 'new',         asap: false, phone: '480-555-0505', email: 'james@example.com',    note: '' },
  { id: '6', name: 'Priya Nair',     type: 'Basement Floors',     zip: '85042', sqft: '900',   finish: 'Metallic — Midnight',   submitted: '2026-06-22', score: 'hot',  status: 'new',         asap: true,  phone: '602-555-0606', email: 'priya@example.com',    note: 'Called twice — very interested' },
  { id: '7', name: 'Carlos Vega',    type: 'Garage Floors',       zip: '85202', sqft: '440',   finish: 'Flake — Graphite',      submitted: '2026-06-22', score: 'warm', status: 'in_progress', asap: false, phone: '480-555-0707', email: 'carlos@example.com',   note: '' },
  { id: '8', name: 'Amy Chen',       type: 'Showroom Floors',     zip: '85016', sqft: '3,100', finish: 'Quartz — Arctic White', submitted: '2026-06-21', score: 'hot',  status: 'scheduled',   asap: false, phone: '602-555-0808', email: 'amy@example.com',      note: 'Job starts July 3' },
];

const proposals = [
  { id: 'P-0041', client: 'Rachel Moore',  amount: '$2,850',  sent: '2026-06-23', expires: '2026-06-30', status: 'viewed' },
  { id: 'P-0040', client: 'Amy Chen',      amount: '$18,400', sent: '2026-06-21', expires: '2026-06-28', status: 'accepted' },
  { id: 'P-0039', client: 'Carlos Vega',   amount: '$2,200',  sent: '2026-06-22', expires: '2026-06-29', status: 'pending' },
  { id: 'P-0038', client: 'Brian Foster',  amount: '$4,600',  sent: '2026-06-19', expires: '2026-06-26', status: 'expired' },
];

const commsLog = [
  { time: '10:42 AM', channel: 'WhatsApp', from: 'Mike Torres',   msg: '"When can I expect my estimate?"' },
  { time: '09:15 AM', channel: 'Email',    from: 'Sandra Wells',  msg: '"Need the proposal before Friday EOD"' },
  { time: 'Yesterday',channel: 'WhatsApp', from: 'Priya Nair',    msg: '"Just checking in on the quote"' },
  { time: 'Yesterday',channel: 'Email',    from: 'Derek Chan',    msg: '"Do you do quartz on outdoor patios?"' },
  { time: 'Jun 23',   channel: 'Call',     from: 'Rachel Moore',  msg: 'Left voicemail — approved proposal' },
];

const integrations = [
  { name: 'Google Drive',        ok: true,  note: 'Connected · 17 folder synced' },
  { name: 'GitHub',              ok: true,  note: 'Connected · branch up to date' },
  { name: 'Supabase DB',         ok: false, note: 'Auth repair pending — 500 on token query' },
  { name: 'Resend Email',        ok: false, note: 'RESEND_API_KEY not set in Vercel' },
  { name: 'WhatsApp (Twilio)',   ok: false, note: 'TWILIO_ACCOUNT_SID needed' },
  { name: 'Vercel Deploy',       ok: true,  note: 'Auto-deploy on push · preview live' },
  { name: 'Stripe / Payments',   ok: false, note: 'Not yet configured' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const SCORE_COLOR: Record<string, string> = { hot: '#ef4444', warm: '#f59e0b', cold: '#6b7280' };
const STATUS_LABELS: Record<string, string> = {
  new: 'New', in_progress: 'In Progress', sent: 'Proposal Sent', scheduled: 'Scheduled', closed: 'Closed',
};
const STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6', in_progress: '#f59e0b', sent: '#8b5cf6', scheduled: '#10b981', closed: '#6b7280',
};

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ background: color + '18', color, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, textTransform: 'capitalize', whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'leads' | 'proposals' | 'comms' | 'integrations'>('leads');
  const [selectedLead, setSelectedLead] = useState<typeof demoLeads[0] | null>(null);
  const [filterScore, setFilterScore] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = demoLeads.filter(l => {
    if (filterScore !== 'all' && l.score !== filterScore) return false;
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.zip.includes(search)) return false;
    return true;
  });

  const newCount       = demoLeads.filter(l => l.status === 'new').length;
  const hotCount       = demoLeads.filter(l => l.score === 'hot').length;
  const proposalOut    = demoLeads.filter(l => l.status === 'sent').length;
  const asapCount      = demoLeads.filter(l => l.asap).length;
  const integOk        = integrations.filter(i => i.ok).length;

  const TAB_STYLE = (t: string) => ({
    padding: '8px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600, border: 'none',
    borderBottom: activeTab === t ? '2px solid #c9a227' : '2px solid transparent',
    background: 'transparent', color: activeTab === t ? '#c9a227' : '#666',
    transition: 'all 0.15s',
  });

  return (
    <DashboardShell role="admin" userName="Jeremy Bensen" currentPath="/admin-dashboard">

      {/* ── KPI Strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 28 }}>
        <StatTile label="New Leads"        value={newCount}       sub="unreviewed"          color="blue"  />
        <StatTile label="Hot Leads"        value={hotCount}       sub="score = hot"         color="red"   />
        <StatTile label="ASAP Requests"    value={asapCount}      sub="urgent jobs"         color="red"   />
        <StatTile label="Proposals Out"    value={proposalOut}    sub="awaiting response"   color="blue"/>
        <StatTile label="Integrations"     value={`${integOk}/${integrations.length}`} sub="services OK" color={integOk === integrations.length ? 'green' : 'red'} />
        <StatTile label="Total Leads"      value={demoLeads.length} sub="all time"          color="gold"  />
      </div>

      {/* ── Quick Actions ── */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
        {[
          { label: '+ New Lead',         href: '/digital-estimator',     color: '#c9a227' },
          { label: '📋 View Proposals',  href: '#proposals',             color: '#8b5cf6' },
          { label: '💬 Open WhatsApp',   href: 'https://wa.me/',         color: '#10b981' },
          { label: '📅 Calendar',        href: 'https://calendar.google.com', color: '#3b82f6' },
          { label: '🔌 Check Env Vars',  href: 'https://vercel.com/strategic-minds-advisory/xpswebsites/settings/environment-variables', color: '#ef4444' },
        ].map(a => (
          <a key={a.label} href={a.href}
            style={{ padding: '8px 16px', background: a.color + '15', color: a.color, border: `1px solid ${a.color}40`,
              borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {a.label}
          </a>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ borderBottom: '1px solid #e2e0dc', display: 'flex', padding: '0 16px', gap: 4 }}>
          {(['leads', 'proposals', 'comms', 'integrations'] as const).map(t => (
            <button key={t} style={TAB_STYLE(t)} onClick={() => setActiveTab(t)}>
              {t === 'leads' ? `Leads (${demoLeads.length})` : t === 'proposals' ? `Proposals (${proposals.length})` : t === 'comms' ? 'Communications' : 'Integrations'}
            </button>
          ))}
        </div>

        {/* ── LEADS TAB ── */}
        {activeTab === 'leads' && (
          <div>
            {/* Filters */}
            <div style={{ padding: '14px 20px', display: 'flex', gap: 10, flexWrap: 'wrap', borderBottom: '1px solid #f0ede8', alignItems: 'center' }}>
              <input
                placeholder="Search name or ZIP…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ padding: '7px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13, width: 200 }}
              />
              <select value={filterScore} onChange={e => setFilterScore(e.target.value)}
                style={{ padding: '7px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
                <option value="all">All Scores</option>
                <option value="hot">🔥 Hot</option>
                <option value="warm">🌤 Warm</option>
                <option value="cold">❄️ Cold</option>
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                style={{ padding: '7px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: 13 }}>
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="sent">Proposal Sent</option>
                <option value="scheduled">Scheduled</option>
              </select>
              <span style={{ fontSize: 12, color: '#999', marginLeft: 'auto' }}>{filtered.length} of {demoLeads.length} leads</span>
            </div>
            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8f7f4' }}>
                    {['Name', 'Type', 'ZIP', 'Sq Ft', 'Finish', 'Date', 'Score', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <tr key={lead.id} style={{ borderTop: '1px solid #f0ede8', background: i % 2 === 0 ? '#fff' : '#fdfcfb' }}>
                      <td style={{ padding: '11px 12px', fontWeight: 600 }}>
                        {lead.asap && <span style={{ background: '#fef3c7', color: '#d97706', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 3, marginRight: 6 }}>ASAP</span>}
                        {lead.name}
                      </td>
                      <td style={{ padding: '11px 12px', color: '#555' }}>{lead.type}</td>
                      <td style={{ padding: '11px 12px', color: '#888' }}>{lead.zip}</td>
                      <td style={{ padding: '11px 12px', color: '#888' }}>{lead.sqft} sf</td>
                      <td style={{ padding: '11px 12px', color: '#555', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.finish}</td>
                      <td style={{ padding: '11px 12px', color: '#999', whiteSpace: 'nowrap' }}>{lead.submitted}</td>
                      <td style={{ padding: '11px 12px' }}>
                        <Badge label={lead.score} color={SCORE_COLOR[lead.score]} />
                      </td>
                      <td style={{ padding: '11px 12px' }}>
                        <Badge label={STATUS_LABELS[lead.status] || lead.status} color={STATUS_COLORS[lead.status] || '#888'} />
                      </td>
                      <td style={{ padding: '11px 12px', whiteSpace: 'nowrap' }}>
                        <button onClick={() => setSelectedLead(lead)}
                          style={{ padding: '4px 10px', background: '#c9a227', color: '#fff', border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', marginRight: 6 }}>
                          View
                        </button>
                        <a href={`/proposal-system?lead=${lead.id}`}
                          style={{ padding: '4px 10px', background: '#8b5cf620', color: '#8b5cf6', border: '1px solid #8b5cf640', borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>
                          Propose
                        </a>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={9} style={{ padding: 32, textAlign: 'center', color: '#999', fontSize: 14 }}>No leads match this filter.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PROPOSALS TAB ── */}
        {activeTab === 'proposals' && (
          <div>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #f0ede8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#666' }}>Track sent proposals · approve, resend, or expire</span>
              <a href="/proposal-system" style={{ padding: '7px 14px', background: '#c9a227', color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                + Create Proposal
              </a>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8f7f4' }}>
                    {['Proposal #', 'Client', 'Amount', 'Sent', 'Expires', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((p, i) => {
                    const sColor = p.status === 'accepted' ? '#10b981' : p.status === 'viewed' ? '#3b82f6' : p.status === 'expired' ? '#ef4444' : '#f59e0b';
                    return (
                      <tr key={p.id} style={{ borderTop: '1px solid #f0ede8', background: i % 2 === 0 ? '#fff' : '#fdfcfb' }}>
                        <td style={{ padding: '11px 12px', fontWeight: 700, color: '#c9a227' }}>{p.id}</td>
                        <td style={{ padding: '11px 12px', fontWeight: 600 }}>{p.client}</td>
                        <td style={{ padding: '11px 12px', fontWeight: 700 }}>{p.amount}</td>
                        <td style={{ padding: '11px 12px', color: '#999' }}>{p.sent}</td>
                        <td style={{ padding: '11px 12px', color: '#999' }}>{p.expires}</td>
                        <td style={{ padding: '11px 12px' }}><Badge label={p.status} color={sColor} /></td>
                        <td style={{ padding: '11px 12px', display: 'flex', gap: 6 }}>
                          <button style={{ padding: '4px 10px', background: '#3b82f620', color: '#3b82f6', border: '1px solid #3b82f640', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>View</button>
                          {p.status !== 'accepted' && (
                            <button style={{ padding: '4px 10px', background: '#10b98120', color: '#10b981', border: '1px solid #10b98140', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Resend</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── COMMS TAB ── */}
        {activeTab === 'comms' && (
          <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Recent Communications</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href="https://wa.me/" style={{ padding: '6px 14px', background: '#10b98120', color: '#10b981', border: '1px solid #10b98140', borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>Open WhatsApp</a>
                <a href="mailto:jeremy@shopxps.com" style={{ padding: '6px 14px', background: '#3b82f620', color: '#3b82f6', border: '1px solid #3b82f640', borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>Open Email</a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {commsLog.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: '#f8f7f4', borderRadius: 8, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 70 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: c.channel === 'WhatsApp' ? '#10b981' : c.channel === 'Email' ? '#3b82f6' : '#f59e0b' }}>
                      {c.channel}
                    </span>
                    <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{c.time}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{c.from}</div>
                    <div style={{ fontSize: 13, color: '#555' }}>{c.msg}</div>
                  </div>
                  <button style={{ marginLeft: 'auto', padding: '4px 10px', background: '#c9a22720', color: '#c9a227', border: '1px solid #c9a22740', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    Reply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── INTEGRATIONS TAB ── */}
        {activeTab === 'integrations' && (
          <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Integration Health</span>
              <a href="https://vercel.com/strategic-minds-advisory/xpswebsites/settings/environment-variables"
                target="_blank" rel="noopener"
                style={{ padding: '6px 14px', background: '#ef444420', color: '#ef4444', border: '1px solid #ef444440', borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                ⚠️ Fix Vercel Env Vars
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {integrations.map((int, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: int.ok ? '#f0fdf4' : '#fff7f7', border: `1px solid ${int.ok ? '#bbf7d0' : '#fecaca'}`, borderRadius: 8 }}>
                  <span style={{ fontSize: 18 }}>{int.ok ? '✅' : '⚠️'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{int.name}</div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{int.note}</div>
                  </div>
                  {!int.ok && (
                    <a href="https://vercel.com/strategic-minds-advisory/xpswebsites/settings/environment-variables"
                      target="_blank" rel="noopener"
                      style={{ padding: '4px 10px', background: '#ef444420', color: '#ef4444', border: '1px solid #ef444440', borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>
                      Fix
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Lead Detail Modal ── */}
      {selectedLead && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 80px rgba(0,0,0,0.3)' }}>
            {/* Modal Header */}
            <div style={{ background: '#111214', padding: '18px 24px', borderRadius: '12px 12px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 17 }}>{selectedLead.name}</div>
                <div style={{ color: '#c9a227', fontSize: 12, marginTop: 2 }}>{selectedLead.type} · {selectedLead.zip}</div>
              </div>
              <button onClick={() => setSelectedLead(null)}
                style={{ background: 'none', border: 'none', color: '#888', fontSize: 22, cursor: 'pointer', lineHeight: 1 }}>✕</button>
            </div>
            {/* Modal Body */}
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                {[
                  ['Phone', selectedLead.phone],
                  ['Email', selectedLead.email],
                  ['Square Footage', selectedLead.sqft + ' sf'],
                  ['Finish Type', selectedLead.finish],
                  ['Submitted', selectedLead.submitted],
                  ['ASAP', selectedLead.asap ? 'Yes — urgent' : 'No'],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: '#f8f7f4', borderRadius: 6, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <Badge label={selectedLead.score} color={SCORE_COLOR[selectedLead.score]} />
                <Badge label={STATUS_LABELS[selectedLead.status]} color={STATUS_COLORS[selectedLead.status]} />
              </div>
              {selectedLead.note && (
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#92400e', marginBottom: 20 }}>
                  📝 {selectedLead.note}
                </div>
              )}
              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={`/proposal-system?lead=${selectedLead.id}`}
                  style={{ flex: 1, padding: '10px 0', background: '#c9a227', color: '#fff', borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
                  📋 Create Proposal
                </a>
                <a href={`https://wa.me/${selectedLead.phone.replace(/\D/g, '')}`}
                  style={{ flex: 1, padding: '10px 0', background: '#10b98118', color: '#10b981', border: '1px solid #10b98140', borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
                  💬 WhatsApp
                </a>
                <a href={`mailto:${selectedLead.email}`}
                  style={{ flex: 1, padding: '10px 0', background: '#3b82f618', color: '#3b82f6', border: '1px solid #3b82f640', borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
                  ✉️ Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </DashboardShell>
  );
}
