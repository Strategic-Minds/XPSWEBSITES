"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "../../../lib/supabase-browser";

const projectStages = [
  ["Digital estimator", "Received", "Photos, measurements, existing covering, desired finish, and color direction are collected."],
  ["Estimator review", "24-hour SLA", "The team prepares pricing direction and warranty notes for email delivery."],
  ["Proposal", "Queued", "Scope, finish selection, and next scheduling actions are prepared for review."],
  ["Installation", "Pending", "Prep, base coat, broadcast, topcoat, cure guidance, and final walkthrough are tracked."]
];

const trackerCards = [
  ["Estimate package", "Floor images, measurements, covering type, finish preference, and selected color chart direction."],
  ["Warranty and care", "Warranty details and care instructions are attached when the estimate or proposal is finalized."],
  ["Messages", "Client questions and team updates stay attached to the project record."],
  ["Documents", "Proposal, insurance, scope, and closeout documents can live in the project folder."]
];

export default function CustomerPortalDashboardPage() {
  const [email, setEmail] = useState("Signed-in customer");
  const [accessState, setAccessState] = useState<"checking" | "authenticated" | "redirecting">("checking");

  useEffect(() => {
    let active = true;
    const supabase = createBrowserSupabaseClient();

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        setAccessState("redirecting");
        window.location.replace("/customer-portal");
        return;
      }
      setEmail(data.session.user.email || "Signed-in customer");
      setAccessState("authenticated");
    });

    return () => {
      active = false;
    };
  }, []);

  async function signOut() {
    const supabase = createBrowserSupabaseClient();
    setAccessState("redirecting");
    await supabase.auth.signOut();
    window.location.assign("/customer-portal");
  }

  if (accessState !== "authenticated") {
    return (
      <main className="portal-dashboard-page portal-dashboard-lockscreen">
        <header className="portal-dashboard-header">
          <a className="header-logo" href="/" aria-label="Phoenix Epoxy Pros home">
            <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
          </a>
          <div>
            <span>Customer portal</span>
            <strong>{accessState === "redirecting" ? "Returning to sign in" : "Checking access"}</strong>
          </div>
          <a className="dark-button" href="/customer-portal">Portal Sign In</a>
        </header>

        <section className="portal-dashboard-hero">
          <p className="eyebrow">Secure project access</p>
          <h1>{accessState === "redirecting" ? "Sign in required" : "Checking your portal session"}</h1>
          <p>
            The job tracker loads after Supabase confirms an active customer or owner session.
            Use the branded portal sign-in page to access project status, documents, warranty details, and messages.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="portal-dashboard-page">
      <header className="portal-dashboard-header">
        <a className="header-logo" href="/" aria-label="Phoenix Epoxy Pros home">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <div>
          <span>Signed in as</span>
          <strong>{email}</strong>
        </div>
        <button className="dark-button" type="button" onClick={signOut}>Sign Out</button>
      </header>

      <section className="portal-dashboard-hero">
        <p className="eyebrow">Proprietary job tracker</p>
        <h1>Project Command Center</h1>
        <p>
          This is the gated dashboard shell for estimates, project tracking, proposal handoff, warranty information,
          customer messages, and closeout documents. Live project data can be connected after the CRM/storage target is finalized.
        </p>
      </section>

      <section className="tracker-timeline" aria-label="Project stage tracker">
        {projectStages.map(([stage, status, text]) => (
          <article key={stage}>
            <span>{status}</span>
            <h2>{stage}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="tracker-card-grid" aria-label="Tracker records">
        {trackerCards.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
