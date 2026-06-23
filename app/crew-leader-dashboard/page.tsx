// app/crew-leader-dashboard/page.tsx — Field execution, job details, photos, change orders
"use client";
import { DashboardShell, StatusBadge } from '@/components/DashboardShell';
import { useState } from 'react';

const demoJob = {
  id: 'job-001',
  customerName: 'Mike Torres',
  address: '4821 N 32nd St, Phoenix, AZ 85008',
  mapLink: 'https://maps.google.com/?q=4821+N+32nd+St+Phoenix+AZ',
  projectType: 'Garage Floors',
  sqft: 650,
  finish: 'Flake System',
  color: 'Gravel (FB-414)',
  concreteCondition: 'Fair — some cracks',
  specialNotes: 'Customer wants cracks filled before coating. Has a drain in center.',
  status: 'in_progress',
  scheduledDate: '2026-06-24',
  crewLeader: 'You',
};

const checklist = [
  { id: 'c1', label: 'Confirm materials on truck', done: false },
  { id: 'c2', label: 'Check diamond grinder operation', done: false },
  { id: 'c3', label: 'Verify flake color — Gravel FB-414', done: false },
  { id: 'c4', label: 'Check polyaspartic topcoat supply', done: false },
  { id: 'c5', label: 'Confirm customer contact on file', done: false },
];

export default function CrewDashboard() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [photoCount, setPhotoCount] = useState(0);
  const [coMsg, setCoMsg] = useState('');

  return (
    <DashboardShell role="crew" userName="Crew Leader" currentPath="/crew-leader-dashboard">
      {/* Job Header */}
      <div style={{ background: '#111214', color: '#fff', borderRadius: 8, padding: '20px 24px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: '#c9a227', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Today's Job</div>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{demoJob.customerName}</div>
          <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 8 }}>{demoJob.projectType} — {demoJob.sqft} sq ft</div>
          <a href={demoJob.mapLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#c9a227', color: '#111', padding: '6px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            📍 Open in Maps
          </a>
        </div>
        <div style={{ textAlign: 'right' }}>
          <StatusBadge status={demoJob.status} />
          <div style={{ marginTop: 8, fontSize: 13, color: '#9ca3af' }}>{demoJob.scheduledDate}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Job Details */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: 20 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>Job Details</h3>
          {[
            ['Address', demoJob.address],
            ['Finish System', demoJob.finish],
            ['Selected Color', demoJob.color],
            ['Concrete Condition', demoJob.concreteCondition],
            ['Special Notes', demoJob.specialNotes],
          ].map(([label, val]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 14, color: '#0a0b0c' }}>{val}</div>
            </div>
          ))}
          {/* WhatsApp customer button */}
          <a href={`https://wa.me/1${demoJob.customerName.replace(/\D/g,'')}?text=Hi+${demoJob.customerName.split(' ')[0]}%2C+this+is+your+XPS+crew+leader.`}
            target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '10px 16px', borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: 14, marginTop: 12 }}>
            💬 Message Customer on WhatsApp
          </a>
        </div>

        {/* Pre-Job Checklist */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: 20 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>Pre-Job Checklist</h3>
          {checklist.map((item) => (
            <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f5f4f0', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!checks[item.id]} onChange={(e) => setChecks(p => ({ ...p, [item.id]: e.target.checked }))}
                style={{ width: 16, height: 16, accentColor: '#c9a227' }} />
              <span style={{ fontSize: 14, textDecoration: checks[item.id] ? 'line-through' : 'none', color: checks[item.id] ? '#9ca3af' : '#0a0b0c' }}>
                {item.label}
              </span>
            </label>
          ))}
          <div style={{ marginTop: 12, fontSize: 13, color: '#16a34a', fontWeight: 700 }}>
            {Object.values(checks).filter(Boolean).length}/{checklist.length} complete
          </div>
        </div>

        {/* Photo Upload */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: 20 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>Job Photos</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            {['Before', 'During', 'After'].map((stage) => (
              <label key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: '#f8f7f4', border: '2px dashed #e2e0dc', borderRadius: 6, padding: '12px 8px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: '#888' }}>
                <span style={{ fontSize: 24 }}>📷</span>
                <span>{stage}</span>
                <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={() => setPhotoCount(p => p + 1)} />
              </label>
            ))}
          </div>
          {photoCount > 0 && <div style={{ fontSize: 13, color: '#16a34a', fontWeight: 700 }}>{photoCount} photo(s) uploaded</div>}
        </div>

        {/* Change Order */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: 20 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700 }}>⚠️ Submit Change Order</h3>
          <textarea
            value={coMsg}
            onChange={(e) => setCoMsg(e.target.value)}
            placeholder="Describe the change: additional square footage, extra crack repair, different finish..."
            style={{ width: '100%', minHeight: 80, padding: 10, border: '1px solid #e2e0dc', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <input type="number" placeholder="$ Amount" style={{ flex: 1, padding: '8px 10px', border: '1px solid #e2e0dc', borderRadius: 6, fontSize: 14 }} />
            <button
              onClick={() => { if (coMsg) alert('Change order submitted to Jeremy for approval.'); }}
              style={{ background: '#c9a227', color: '#111', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
