"use client";
import { useEffect, useState } from "react";
import { DashboardShell } from "../../components/DashboardShell";
import { COLOR_CHARTS } from "../../lib/color-charts";

const STATUS_STEPS: Record<string, number> = {
  new: 1, proposal_sent: 2, deposit_paid: 3,
  scheduled: 4, in_progress: 4, completed: 5,
};

const STEP_LABELS = [
  { num: 1, label: "Bid Submitted",     sub: "Your request is in" },
  { num: 2, label: "Proposal Sent",     sub: "Review & approve"  },
  { num: 3, label: "Deposit Paid",      sub: "Lock your date"    },
  { num: 4, label: "Install Day",       sub: "We come to you"    },
  { num: 5, label: "Project Complete",  sub: "Enjoy your floor!" },
];

export default function ClientDashboardPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeColor, setActiveColor] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/client").then(r => {
      if (r.status === 401) { window.location.href = "/customer-portal?from=/customer-portal/dashboard"; return null; }
      return r.json();
    }).then(d => {
      if (d) { setData(d); setLoading(false); }
    }).catch(() => { setError("Failed to load your project. Try refreshing."); setLoading(false); });
  }, []);

  const lead = data?.lead as Record<string, unknown> | null;
  const job  = data?.job  as Record<string, unknown> | null;
  const timeline = (data?.timeline as Record<string, unknown>[]) || [];
  const name = (data?.name as string) || lead?.full_name as string || "there";
  const firstName = name?.split(" ")[0];

  const currentStatus = (job?.status || lead?.status || "new") as string;
  const currentStep = STATUS_STEPS[currentStatus] || 1;

  if (loading) return (
    <DashboardShell role="client" roleLabel="Client" user="Loading…" active="My Project">
      <div style={{ textAlign: "center", padding: 60, color: "#555" }}>Loading your project…</div>
    </DashboardShell>
  );

  if (error) return (
    <DashboardShell role="client" roleLabel="Client" user="Error" active="My Project">
      <div style={{ textAlign: "center", padding: 60, color: "#ef4444" }}>{error}</div>
    </DashboardShell>
  );

  return (
    <DashboardShell role="client" roleLabel="Portal" user={`${firstName} — Client Portal`} active="My Project">

      {/* WELCOME */}
      <div className="ds-card" style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#111 100%)", border: "1px solid #f6b800" }}>
        <div className="ds-card-body" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "#f6b800" }}>Welcome Back</p>
            <h1 style={{ margin: "0 0 6px", fontSize: "1.4rem", fontWeight: 900 }}>Hey {firstName} 👋</h1>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#888" }}>
              {currentStatus === "new" && "Your digital bid was received. Our estimator is reviewing your project."}
              {currentStatus === "proposal_sent" && "Your proposal is ready! Review it below and approve to lock your date."}
              {currentStatus === "deposit_paid" && "Deposit received! Your install is scheduled. Get ready for a new floor."}
              {currentStatus === "in_progress" && "🔨 Your install is happening today! Our crew is on site."}
              {currentStatus === "scheduled" && "Your install date is confirmed. We'll see you soon!"}
              {currentStatus === "completed" && "🎉 Your floor is done! Thank you for choosing Phoenix Epoxy Pros."}
            </p>
            <a href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer" className="ds-btn gold" style={{ fontSize: 13 }}>💬 Message Us on WhatsApp</a>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0 0 4px", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#555" }}>Project ID</p>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "#f6b800" }}>{job?.project_number as string || "Pending"}</p>
          </div>
        </div>
      </div>

      {/* KPI ROW — client view */}
      <div className="ds-kpi-row">
        {[
          { label: "Project Type",    value: (lead?.project_type as string) || "Garage Floor",   sub: "Requested service" },
          { label: "System",          value: (job?.finish_system as string) || "Estimating",     sub: "Selected finish" },
          { label: "Your Discount",   value: (lead?.coupon_claimed ? "15% OFF" : "Ask us!"),     sub: "Digital bid savings" },
          { label: "Est. Timeline",   value: currentStatus === "new" ? "Proposal in 24h" : currentStatus === "completed" ? "Complete ✅" : (job?.install_date as string) || "TBD", sub: "Install date" },
        ].map(({ label, value, sub }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value" style={{ fontSize: "1rem" }}>{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* PROJECT TIMELINE */}
      <div className="ds-card">
        <div className="ds-card-head"><h2 className="ds-card-title">📍 Your Project Timeline</h2></div>
        <div className="ds-card-body">
          <div className="ds-timeline">
            {STEP_LABELS.map(step => {
              const state = step.num < currentStep ? "done" : step.num === currentStep ? "active" : "";
              return (
                <div key={step.num} className={`ds-timeline-step ${state}`}>
                  <div className="ds-bubble">{state === "done" ? "✓" : step.num}</div>
                  <div className="ds-timeline-step-info">
                    <strong>{step.label}</strong>
                    <span>{step.num === currentStep ? "← You are here" : step.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* JOB DETAILS (if scheduled or beyond) */}
      {job && currentStep >= 3 && (
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">📋 Job Details</h2></div>
          <div className="ds-card-body">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[
                ["System",       job.finish_system as string],
                ["Color",        (job.selected_color as string) || "TBD"],
                ["Square Feet",  `${job.square_footage} sqft`],
                ["Install Date", (job.install_date as string) || "TBD"],
                ["Total Price",  `$${(job.total_price as number)?.toLocaleString()}`],
                ["Balance Due",  `$${(job.balance_amount as number)?.toLocaleString()}`],
              ].map(([k, v]) => (
                <div key={k}>
                  <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#555" }}>{k}</p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COLOR CHART */}
      <div className="ds-card">
        <div className="ds-card-head"><h2 className="ds-card-title">🎨 Browse Color Options</h2></div>
        <div className="ds-card-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {COLOR_CHARTS.slice(0, 8).map(c => (
              <div key={c.name} onClick={() => setActiveColor(c.name)} style={{ cursor: "pointer", borderRadius: 8, overflow: "hidden", border: `2px solid ${activeColor === c.name ? "#f6b800" : "transparent"}`, transition: "border-color .2s" }}>
                <div style={{ height: 60, background: c.hex }} />
                <div style={{ padding: "6px 8px", background: "#111" }}>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: activeColor === c.name ? "#f6b800" : "#ccc" }}>{c.name}</p>
                </div>
              </div>
            ))}
          </div>
          {activeColor && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(246,184,0,.08)", borderRadius: 6, border: "1px solid rgba(246,184,0,.2)" }}>
              <p style={{ margin: 0, fontSize: 13, color: "#f6b800" }}>You selected: <strong>{activeColor}</strong> — Message us to lock this in!</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="ds-card" style={{ background: "#f6b800", border: "none" }}>
        <div className="ds-card-body" style={{ textAlign: "center", padding: "28px 24px" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "1.2rem", fontWeight: 900, color: "#000" }}>Questions? We reply fast.</h2>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "rgba(0,0,0,.7)" }}>Our team is available 7 days a week via WhatsApp.</p>
          <a href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer" style={{ background: "#000", color: "#f6b800", padding: "12px 28px", borderRadius: 8, fontWeight: 900, fontSize: 14, textDecoration: "none", display: "inline-block" }}>Message Us →</a>
        </div>
      </div>

    </DashboardShell>
  );
}
