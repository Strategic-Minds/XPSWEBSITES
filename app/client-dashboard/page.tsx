"use client";

import { useEffect, useMemo, useState } from "react";

type DashboardLead = {
  fullName?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  address?: string;
  projectType?: string;
  floorMeasurements?: string;
  existingFloorCovering?: string;
  concreteCondition?: string;
  desiredFinish?: string;
  desiredColor?: string;
  asapServiceRequested?: string;
  asapNotes?: string;
  preferredTimeline?: string;
  submittedAt?: string;
  score?: string;
};

const dashboardSteps = [
  ["01", "Digital Bid Received", "Your contact details, floor information, finish choices, notes, and uploads are now attached to this estimate request."],
  ["02", "Estimator Review", "Jeremy reviews the photos, measurements, existing floor, concrete condition, finish, color direction, and ASAP request if selected."],
  ["03", "Proposal By Email", "Your proposal is prepared with scope, warranty information, the 15% Digital Estimator coupon, and next-step instructions."],
  ["04", "Payment Link", "After proposal approval, the payment link is sent before temporary Job Tracker access is released."],
  ["05", "Tracker Access", "After payment, the project can move into schedule, progress photos, documents, warranty, and care instructions."
  ]
];

function readStoredDashboard() {
  try {
    const stored = window.sessionStorage.getItem("xpsClientDashboard");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function formatDate(value?: string) {
  if (!value) return "Just submitted";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just submitted";
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function ClientDashboardPage() {
  const [lead, setLead] = useState<DashboardLead>({});

  useEffect(() => {
    const storedLead = readStoredDashboard();
    const params = new URLSearchParams(window.location.search);
    setLead({
      ...storedLead,
      fullName: params.get("fullName") || storedLead.fullName || "Your project",
      email: params.get("email") || storedLead.email || "",
      phone: params.get("phone") || storedLead.phone || "",
      zipCode: params.get("zipCode") || storedLead.zipCode || "",
      projectType: params.get("projectType") || storedLead.projectType || "Digital Bid",
      asapServiceRequested: params.get("asap") || storedLead.asapServiceRequested || "no"
    });
  }, []);

  const isAsap = lead.asapServiceRequested === "yes";
  const statusLabel = isAsap ? "ASAP Review Requested" : "Estimator Review Queued";
  const submittedAt = useMemo(() => formatDate(lead.submittedAt), [lead.submittedAt]);

  return (
    <main className="portal-login-page client-dashboard-page">
      <header className="portal-login-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <a className="portal-home-link" href="/digital-estimator">Update bid details</a>
      </header>

      <section className="client-dashboard-hero" aria-label="Client dashboard">
        <div className="client-dashboard-copy">
          <span className="section-kicker">Client Dashboard</span>
          <h1>Your Digital Bid is in the tracker.</h1>
          <p>
            This temporary dashboard keeps the next step clear while your estimate is reviewed. Your proposal, warranty information,
            payment link, and job tracker access continue by email after review and approval.
          </p>
          <div className="portal-proof-row" aria-label="Dashboard status">
            <span>{statusLabel}</span>
            <span>15% coupon attached</span>
            <span>24-hour estimate path</span>
          </div>
        </div>

        <aside className="client-dashboard-card">
          <span className={`job-tracker-status-pill ${isAsap ? "asap" : ""}`}>{statusLabel}</span>
          <h2>{lead.fullName || "Your Project"}</h2>
          <dl>
            <dt>Submitted</dt>
            <dd>{submittedAt}</dd>
            <dt>Project</dt>
            <dd>{lead.projectType || "Digital Bid"}</dd>
            <dt>Email</dt>
            <dd>{lead.email || "Provided in the estimator"}</dd>
            <dt>Phone</dt>
            <dd>{lead.phone || "Provided in the estimator"}</dd>
            <dt>ZIP</dt>
            <dd>{lead.zipCode || "Provided in the estimator"}</dd>
          </dl>
        </aside>
      </section>

      <section className="client-dashboard-summary" aria-label="Submitted project summary">
        <article>
          <span className="section-kicker">Estimate Package</span>
          <h2>What we received</h2>
          <div className="client-dashboard-grid">
            <p><strong>Address</strong><span>{lead.address || "Included if entered on the estimator."}</span></p>
            <p><strong>Measurements</strong><span>{lead.floorMeasurements || "Included if entered on the estimator."}</span></p>
            <p><strong>Existing Floor</strong><span>{lead.existingFloorCovering || "Included if selected."}</span></p>
            <p><strong>Concrete Condition</strong><span>{lead.concreteCondition || "Included if selected."}</span></p>
            <p><strong>Desired Finish</strong><span>{lead.desiredFinish || "Included if selected."}</span></p>
            <p><strong>Desired Color</strong><span>{lead.desiredColor || "Included if selected."}</span></p>
          </div>
        </article>

        <aside className="client-dashboard-asap-card">
          <span className="section-kicker">ASAP Service</span>
          <h2>{isAsap ? "Flagged for urgent review" : "Standard review"}</h2>
          <p>
            {isAsap
              ? "Your request is marked ASAP. We will use your photos, notes, and contact details to prioritize follow-up."
              : "Need faster service? Use instant chat and mark the message as ASAP so the request is routed with urgency."}
          </p>
          {lead.asapNotes ? <p className="client-dashboard-note"><strong>ASAP note:</strong> {lead.asapNotes}</p> : null}
        </aside>
      </section>

      <section className="client-dashboard-timeline" aria-label="Next steps timeline">
        <div>
          <span className="section-kicker">Next Steps</span>
          <h2>From bid to tracked job</h2>
        </div>
        <ol className="job-tracker-timeline">
          {dashboardSteps.map(([number, title, text]) => (
            <li key={title}>
              <strong>{number} / {title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
