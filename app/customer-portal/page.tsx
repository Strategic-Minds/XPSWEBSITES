"use client";

import { FormEvent, useState } from "react";

type IntakeState = "idle" | "saving" | "ready" | "error";

const trackerItems = [
  ["Estimate", "Start with your contact details, then answer the job questions on the Digital Estimator page."],
  ["Upload", "Attach current floor photos, measurements, existing covering details, and finish preferences."],
  ["Discount", "Your 15% digital estimator coupon stays attached to the request."],
  ["24 Hours", "The estimate, warranty information, and job tracker setup path are delivered by email." ]
];

export default function CustomerPortalPreviewPage() {
  const [intakeState, setIntakeState] = useState<IntakeState>("idle");
  const [message, setMessage] = useState("Enter your contact details to start the Digital Estimator flow.");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIntakeState("saving");
    setMessage("Opening your estimator intake...");

    const formData = new FormData(event.currentTarget);
    const lead = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      zipCode: String(formData.get("zipCode") || "").trim(),
      asapServiceRequested: formData.get("asapServiceRequested") === "yes" ? "yes" : "no"
    };

    if (!lead.fullName || !lead.email || !lead.phone || !lead.zipCode) {
      setIntakeState("error");
      setMessage("Name, email, phone, and ZIP code are required.");
      return;
    }

    window.sessionStorage.setItem("xpsEstimatorLead", JSON.stringify(lead));
    const params = new URLSearchParams(lead);
    setIntakeState("ready");
    window.location.assign(`/digital-estimator?${params.toString()}`);
  }

  return (
    <main className="portal-login-page">
      <header className="portal-login-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <a className="portal-home-link" href="/">Back to website</a>
      </header>

      <section className="portal-login-hero" aria-label="Digital estimator intake">
        <div className="portal-login-copy">
          <span className="section-kicker">15% Digital Estimator</span>
          <h1>Start the estimate without a password.</h1>
          <p>
            This temporary portal entry collects the basics, then moves you into the Digital Estimator where your floor
            images, measurements, color selections, warranty path, and job tracker setup stay connected.
          </p>
          <div className="portal-proof-row" aria-label="Estimator highlights">
            <span>15% coupon</span>
            <span>24-hour estimate</span>
            <span>ASAP request</span>
            <span>Job tracker setup</span>
          </div>
        </div>

        <div className="portal-login-panel portal-intake-panel">
          <form onSubmit={handleSubmit}>
            <p className="portal-panel-eyebrow">Temporary customer entry</p>
            <h2>Open Digital Estimator</h2>
            <label className="portal-field">
              <span>Full Name</span>
              <input name="fullName" type="text" autoComplete="name" required />
            </label>
            <label className="portal-field">
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label className="portal-field">
              <span>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" required />
            </label>
            <label className="portal-field">
              <span>ZIP Code</span>
              <input name="zipCode" type="text" inputMode="numeric" autoComplete="postal-code" required />
            </label>
            <label className="asap-check">
              <input name="asapServiceRequested" type="checkbox" value="yes" />
              <span>Request ASAP service</span>
            </label>
            <button className="gold-button" type="submit" disabled={intakeState === "saving"}>
              {intakeState === "saving" ? "Opening..." : "Continue"}
            </button>
            <p className={`portal-login-status ${intakeState}`} aria-live="polite">{message}</p>
          </form>
        </div>
      </section>

      <section className="portal-tracker-preview" aria-label="Digital estimator preview">
        <div className="portal-tracker-board">
          {trackerItems.map(([title, text], index) => (
            <article key={title} className="portal-tracker-item">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
