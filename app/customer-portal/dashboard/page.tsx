// app/customer-portal/dashboard/page.tsx — M02 spec, full client portal
"use client";
import { useEffect, useState } from 'react';
import { DashboardShell, StatusBadge } from '@/components/DashboardShell';
import { BRAND } from '@/lib/tokens';

type Lead = {
  fullName?: string; email?: string; phone?: string;
  projectType?: string; desiredFinish?: string; desiredColor?: string;
  address?: string; floorMeasurements?: string;
  existingFloorCovering?: string; concreteCondition?: string;
  asapRequested?: boolean; notes?: string;
  attachmentCount?: number; submittedAt?: string; leadId?: string;
};

const WORKFLOW = [
  { key: 'submitted', label: 'Request Submitted', desc: 'Photos, measurements, and finish selection received.', icon: '✅' },
  { key: 'review', label: 'Under Review', desc: 'Jeremy is reviewing your package.', icon: '🔍' },
  { key: 'proposal', label: 'Proposal Sent', desc: 'Check your email for scope, pricing, and warranty.', icon: '📋' },
  { key: 'payment', label: 'Payment', desc: 'Payment link sent after proposal approval.', icon: '💳' },
  { key: 'tracker', label: 'Job Tracker Live', desc: 'Project tracking, schedule, and progress photos.', icon: '📱' },
];

export default function ClientDashboard() {
  const [lead, setLead] = useState<Lead>({});
  const [activeStep, setActiveStep] = useState(1); // 0-indexed, step 1 = "Under Review"

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('xpsEstimatorLead') || sessionStorage.getItem('xpsLeadData');
      if (stored) setLead(JSON.parse(stored));
    } catch {}
  }, []);

  const firstName = lead.fullName?.split(' ')[0] || 'there';

  return (
    <DashboardShell role="client" userName={lead.fullName || 'Client'} currentPath="/customer-portal/dashboard">
      {/* Welcome Card */}
      <div style={{ background: '#111214', borderRadius: 8, padding: '24px 28px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: '#c9a227', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Welcome Back</div>
          <h1 style={{ margin: 0, color: '#fff', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800 }}>Hi {firstName}! Your request is in. 🎉</h1>
          <p style={{ color: '#9ca3af', margin: '8px 0 0', fontSize: 14 }}>
            Jeremy will review your project details and send your proposal within 24 hours.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href={`tel:${BRAND.phoneHref.replace('tel:','')}`} style={{ background: '#c9a227', color: '#111', padding: '10px 18px', borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            📞 Call Us
          </a>
          <a href="https://wa.me/17722090266" target="_blank" rel="noreferrer" style={{ background: '#25D366', color: '#fff', padding: '10px 18px', borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* Workflow Progress */}
      <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: '20px 24px', marginBottom: 24 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700 }}>Your Project Journey</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {WORKFLOW.map((step, i) => {
            const isComplete = i < activeStep;
            const isCurrent = i === activeStep;
            return (
              <div key={step.key} style={{ flex: '1 1 140px', minWidth: 120, padding: '14px', borderRadius: 6, border: `2px solid ${isCurrent ? '#c9a227' : isComplete ? '#16a34a' : '#e2e0dc'}`, background: isCurrent ? '#fffbeb' : isComplete ? '#f0fdf4' : '#fafaf9', position: 'relative' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{step.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: isCurrent ? '#c9a227' : isComplete ? '#16a34a' : '#888' }}>
                  {i + 1}. {step.label}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.4 }}>{step.desc}</div>
                {isCurrent && <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: '#c9a227', animation: 'pulse 1.5s infinite' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details + Uploads */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {/* Details */}
        <div style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: 20 }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700 }}>Project Details</h3>
          {[
            ['Project Type', lead.projectType || '—'],
            ['Desired Finish', lead.desiredFinish || '—'],
            ['Desired Color', lead.desiredColor || '—'],
            ['Address', lead.address || '—'],
            ['Measurements', lead.floorMeasurements ? `${lead.floorMeasurements} sq ft` : '—'],
            ['Existing Floor', lead.existingFloorCovering || '—'],
            ['Concrete Condition', lead.concreteCondition || '—'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f5f4f0', fontSize: 14 }}>
              <span style={{ color: '#888', fontWeight: 500 }}>{label}</span>
              <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Status Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Proposal Status', value: 'Under Review', note: 'Expected within 24 hours', status: 'pending', icon: '📋' },
            { label: 'Payment Status', value: 'Pending Proposal', note: 'Payment link sent after approval', status: 'pending', icon: '💳' },
            { label: 'Photos Submitted', value: `${lead.attachmentCount || 0} files`, note: 'Attached to your request', status: 'complete', icon: '📸' },
            { label: 'Job Tracker', value: 'Locked', note: 'Unlocked after payment', status: 'pending', icon: '🔒' },
          ].map((card) => (
            <div key={card.label} style={{ background: '#fff', border: '1px solid #e2e0dc', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{card.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{card.label}</span>
                  <StatusBadge status={card.status} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{card.value}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{card.note}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 15% Coupon reminder */}
        <div style={{ background: '#fffbeb', border: '2px solid #c9a227', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏷️</div>
          <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#b45309' }}>15% Digital Estimator Coupon</h3>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: '#92400e', lineHeight: 1.5 }}>
            Your 15% discount has been applied to this request. It will appear on your proposal from Jeremy.
          </p>
          <div style={{ background: '#fef3c7', borderRadius: 4, padding: '8px 12px', fontWeight: 700, fontSize: 13, color: '#92400e' }}>
            Guaranteed estimate within 24 hours by email
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
