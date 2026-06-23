// app/customer-portal/dashboard/page.tsx — M02 Client Dashboard
'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardShell } from '@/components/DashboardShell';
import { BRAND } from '@/lib/tokens';

const WORKFLOW = [
  { key: 'submitted',  label: 'Request Submitted', desc: 'Your photos, measurements, and finish selection have been received.', icon: '✅' },
  { key: 'review',     label: 'Under Review',      desc: 'Jeremy is personally reviewing your project package.',              icon: '🔍' },
  { key: 'proposal',   label: 'Proposal Sent',     desc: 'Check your email for your detailed scope, pricing, and warranty.',   icon: '📋' },
  { key: 'payment',    label: 'Payment',           desc: 'A secure payment link has been sent after your proposal is signed.', icon: '💳' },
  { key: 'tracker',   label: 'Job Tracker Access', desc: 'Your personal project tracker is now live — track everything here.', icon: '🔑' },
];

function ClientDashboardContent() {
  const params = useSearchParams();
  const [leadName, setLeadName] = useState('');
  const [leadId,   setLeadId]   = useState('');
  const activeStep = 1; // 0-indexed: "Under Review" = step 1

  useEffect(() => {
    setLeadName(params.get('name') || sessionStorage.getItem('xps_customer_name') || '');
    setLeadId(  params.get('lead') || sessionStorage.getItem('xps_lead_id') || '');
    if (params.get('name')) sessionStorage.setItem('xps_customer_name', params.get('name')!);
    if (params.get('lead')) sessionStorage.setItem('xps_lead_id', params.get('lead')!);
  }, [params]);

  const firstName = leadName.split(' ')[0] || 'there';

  return (
    <DashboardShell role="client" userName={leadName || 'Client'} currentPath="/customer-portal/dashboard">
      {/* Welcome Card */}
      <div style={{ background: '#111214', borderRadius: 12, padding: '28px 24px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p style={{ color: '#9ca3af', fontSize: 14, margin: '0 0 6px' }}>Welcome back,</p>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 900, margin: '0 0 8px' }}>
            {leadName ? `${firstName}!` : 'Your Project Portal'}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 15, margin: 0, maxWidth: 480 }}>
            Your epoxy floor project is in good hands. Jeremy reviews all incoming requests personally.
          </p>
          {leadId && <p style={{ color: '#555', fontSize: 12, marginTop: 6 }}>Project ID: {leadId}</p>}
        </div>
        <a href="/digital-estimator" style={{ background: '#c9a227', color: '#111', fontWeight: 800, fontSize: 15, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}>
          📋 Update My Project
        </a>
      </div>

      {/* Workflow Tracker */}
      <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: '#c9a227', margin: '0 0 6px' }}>Project Status</p>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 24px' }}>Your 5-Step Journey</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {WORKFLOW.map((step, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            const locked = i > activeStep;
            return (
              <div key={step.key} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 0', borderBottom: i < WORKFLOW.length - 1 ? '1px solid #f0ede8' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, background: done ? '#c9a227' : active ? '#111214' : '#f0ede8', color: done || active ? '#fff' : '#bbb', fontWeight: 800 }}>
                  {done ? '✓' : step.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: locked ? '#bbb' : '#0a0b0c' }}>{step.label}</span>
                    {done   && <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>Complete</span>}
                    {active && <span style={{ background: '#c9a22720', color: '#c9a227', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>In Progress</span>}
                  </div>
                  <p style={{ fontSize: 14, color: locked ? '#ccc' : '#555', margin: 0, lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Proposal Status',    value: 'Being Prepared',    sub: 'Estimate within 24 hours',   icon: '📋', color: '#2563eb' },
          { label: 'Payment',            value: 'Pending Proposal',  sub: 'Link sent after approval',   icon: '💳', color: '#6b7280' },
          { label: 'Job Tracker',        value: 'Unlocks at Payment',sub: 'Track your floor live',       icon: '🔑', color: '#6b7280' },
          { label: 'Warranty',           value: 'Lifetime Coverage', sub: 'Issued at job completion',   icon: '🛡', color: '#16a34a' },
        ].map(card => (
          <div key={card.label} style={{ background: '#fff', border: '1.5px solid #e2e0dc', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{card.icon}</div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#888', margin: '0 0 4px' }}>{card.label}</p>
            <p style={{ fontWeight: 800, fontSize: '1.1rem', margin: '0 0 4px', color: card.color }}>{card.value}</p>
            <p style={{ fontSize: 13, color: '#888', margin: 0 }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Contact + Help */}
      <div style={{ background: '#111214', borderRadius: 12, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <p style={{ color: '#9ca3af', fontSize: 14, margin: '0 0 4px' }}>Questions about your project?</p>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: 0 }}>Jeremy is available Mon–Sat · 8am–6pm</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={BRAND.phoneHref} style={{ background: '#c9a227', color: '#111', fontWeight: 800, fontSize: 14, padding: '11px 20px', borderRadius: 8, textDecoration: 'none' }}>📞 Call Now</a>
          <a href={BRAND.emailHref} style={{ border: '2px solid #333', color: '#ccc', fontWeight: 700, fontSize: 14, padding: '10px 20px', borderRadius: 8, textDecoration: 'none' }}>✉️ Email</a>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function ClientDashboard() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading your portal…</div>}>
      <ClientDashboardContent />
    </Suspense>
  );
}
