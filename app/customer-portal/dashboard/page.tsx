"use client";
import { useState } from "react";
import { DashboardShell } from "../../components/DashboardShell";
import { COLOR_CHARTS } from "../../lib/color-charts";

const STEPS = [
  { num: 1, label: "Bid Submitted",    sub: "Complete",        state: "done"   },
  { num: 2, label: "Estimator Review", sub: "In Progress",     state: "active" },
  { num: 3, label: "Proposal Sent",    sub: "Next",            state: ""       },
  { num: 4, label: "Approve & Pay",    sub: "After Proposal",  state: ""       },
  { num: 5, label: "Install Scheduled",sub: "After Payment",   state: ""       },
];

const CHECKLIST = [
  { label: "Contact info submitted",        done: true  },
  { label: "Photos uploaded",               done: true  },
  { label: "Floor measurements provided",   done: true  },
  { label: "Finish & color selected",       done: false, active: true },
  { label: "Proposal received",             done: false },
  { label: "Proposal approved",             done: false },
  { label: "Deposit payment completed",     done: false },
  { label: "Install date confirmed",        done: false },
  { label: "Pre-install prep done",         done: false },
  { label: "Installation complete",         done: false },
  { label: "Final walkthrough & sign-off",  done: false },
  { label: "Warranty issued",               done: false },
];

export default function CustomerDashboardPage() {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  function handleFloorUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
  }

  return (
    <DashboardShell role="customer" roleLabel="Customer Portal" user="Jason L." active="My Dashboard">

      {/* ── WELCOME + TIMELINE ── */}
      <div className="ds-card">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 0, minHeight: 200 }}>
          {/* Welcome */}
          <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
            <p style={{ margin: 0, fontSize: ".72rem", fontWeight: 900, textTransform: "uppercase", color: "#888" }}>Welcome back</p>
            <h1 style={{ margin: 0, fontSize: "1.8rem", fontWeight: 900 }}>Jason!</h1>
            <p style={{ margin: 0, fontSize: ".84rem", color: "#666" }}>Your project is in estimator review. We'll have your proposal ready within 24 hours.</p>
            <a className="ds-btn gold" href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8, width: "fit-content" }}>
              📱 WhatsApp Us
            </a>
          </div>
          {/* Project photo */}
          <div style={{ background: "#111", overflow: "hidden" }}>
            <img src="https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581" alt="Your project" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .85 }} />
          </div>
          {/* Status */}
          <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: 10, background: "#fffbeb", borderLeft: "1px solid #e2e6e8" }}>
            <p style={{ margin: 0, fontSize: ".68rem", fontWeight: 900, textTransform: "uppercase", color: "#f6b800" }}>Current Status</p>
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 900 }}>Estimator Review</h2>
            <p style={{ margin: 0, fontSize: ".78rem", color: "#666" }}>Next action: watch email for your proposal + 15% coupon within 24 hrs.</p>
            <a className="ds-btn dark" href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer" style={{ marginTop: 4, fontSize: ".76rem" }}>
              Ask a Question
            </a>
          </div>
        </div>
      </div>

      {/* ── 5-STEP PROGRESS TIMELINE ── */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Your Project Timeline</h2>
        </div>
        <div className="ds-card-body">
          <div className="ds-timeline">
            {STEPS.map((step) => (
              <div key={step.num} className={`ds-timeline-step ${step.state}`}>
                <div className="ds-bubble">{step.state === "done" ? "✓" : step.num}</div>
                <span style={{ fontWeight: 900, color: step.state === "active" ? "#050505" : undefined }}>{step.label}</span>
                <span style={{ fontSize: ".66rem", color: step.state === "active" ? "#f6b800" : "#aaa" }}>{step.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI ROW ── */}
      <div className="ds-kpi-row">
        {[
          { label: "Project ID",       value: "PXP-2024-0587",      sub: "Keep for reference" },
          { label: "System Type",      value: "Full Broadcast",     sub: "Garage Floor" },
          { label: "Discount",         value: "15% OFF",            sub: "Digital bid coupon attached" },
          { label: "Estimate ETA",     value: "24 hrs",             sub: "Proposal by email" },
        ].map(({ label, value, sub }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value" style={{ fontSize: "1.2rem" }}>{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── FLOOR DESIGNER + CHECKLIST ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18 }}>

        {/* Floor Designer */}
        <div className="ds-card">
          <div className="ds-card-head">
            <h2 className="ds-card-title">Floor Designer</h2>
            <span style={{ fontSize: ".78rem", color: "#888" }}>Upload your floor — choose a finish</span>
          </div>
          <div className="ds-floor-designer">
            {/* Preview side */}
            <div className="ds-floor-preview">
              {previewSrc ? (
                <img src={previewSrc} alt="Your floor preview" />
              ) : selectedChart ? (
                <img src={selectedChart} alt="Selected color chart" style={{ maxHeight: 200, objectFit: "contain" }} />
              ) : (
                <>
                  <div style={{ width: 80, height: 80, borderRadius: 8, background: "rgba(246,184,0,.15)", display: "grid", placeItems: "center", fontSize: "2rem" }}>🖼️</div>
                  <p style={{ margin: 0, fontSize: ".84rem", color: "rgba(255,255,255,.6)", textAlign: "center" }}>Upload your current floor or select a color chart below</p>
                </>
              )}
            </div>
            {/* Upload side */}
            <div className="ds-floor-upload">
              <h3 style={{ margin: 0, fontSize: ".9rem", fontWeight: 900, textTransform: "uppercase" }}>Upload Your Floor</h3>
              <label className="ds-drop-zone" htmlFor="floor-upload">
                <span style={{ fontSize: "1.6rem" }}>📎</span>
                <span>Tap to attach floor photos</span>
                <span style={{ fontSize: ".72rem" }}>JPG, PNG, HEIC — multiple files OK</span>
                <input id="floor-upload" type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleFloorUpload} />
              </label>
              <p style={{ margin: 0, fontSize: ".76rem", color: "#888" }}>Your photos are sent directly to Jeremy for the estimate review.</p>
              <a className="ds-btn gold" href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer">
                📱 Send via WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Project Checklist */}
        <div className="ds-card">
          <div className="ds-card-head">
            <h2 className="ds-card-title">Your Checklist</h2>
          </div>
          <div className="ds-card-body" style={{ padding: "16px" }}>
            <div className="ds-step-list">
              {CHECKLIST.map((item, i) => (
                <div key={i} className={`ds-step ${item.done ? "done" : item.active ? "active" : ""}`}>
                  <div className="ds-step-num">{item.done ? "✓" : i + 1}</div>
                  <div className="ds-step-info">
                    <strong>{item.label}</strong>
                    <span>{item.done ? "Complete" : item.active ? "Action needed" : "Pending"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── COLOR CHARTS (same source as homepage) ── */}
      <div className="ds-card" id="colors">
        <div className="ds-card-head">
          <h2 className="ds-card-title">Choose Your Color</h2>
          <span style={{ fontSize: ".78rem", color: "#888" }}>Click a chart to preview in the Floor Designer above</span>
        </div>
        <div className="ds-card-body">
          <div className="ds-color-charts">
            {COLOR_CHARTS.map((chart) => (
              <div
                key={chart.id}
                className="ds-color-chart-card"
                style={{ cursor: "pointer", outline: selectedChart === chart.image ? "3px solid #f6b800" : "none" }}
                onClick={() => setSelectedChart(chart.image)}
              >
                <img src={chart.image} alt={chart.alt} />
                <div className="ds-color-chart-info">
                  <h3>{chart.title}</h3>
                  <p>{chart.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: ".76rem", color: "#888" }}>
            Due to screen differences, colors may vary slightly in person. Sealer may give a &quot;wet look&quot; that enriches the color.
          </p>
        </div>
      </div>

      {/* ── WHATSAPP BANNER ── */}
      <div style={{ background: "#25d366", borderRadius: 8, padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <div>
          <h2 style={{ margin: 0, color: "#fff", fontSize: "1.1rem", fontWeight: 900 }}>Questions? We're on WhatsApp.</h2>
          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,.85)", fontSize: ".84rem" }}>Text us photos, questions, or update requests. Jeremy responds same day.</p>
        </div>
        <a href="https://wa.me/17722090266" target="_blank" rel="noopener noreferrer" className="ds-btn" style={{ background: "#fff", color: "#25d366", fontWeight: 900, flexShrink: 0 }}>
          Open WhatsApp →
        </a>
      </div>

    </DashboardShell>
  );
}
