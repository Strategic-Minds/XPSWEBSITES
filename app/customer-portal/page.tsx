"use client";

import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient, hasSupabaseBrowserConfig } from "../../lib/supabase-browser";

const trackerHighlights = [
  "Project status from estimate to final walkthrough",
  "Finish selections, warranty notes, and care guidance in one place",
  "Estimate, proposal, schedule, photo, and message history after setup"
];

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function CustomerPortalSignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("Use the email and password issued to your project or owner account.");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    setMessage("Checking portal access...");

    try {
      if (!hasSupabaseBrowserConfig()) {
        throw new Error("Portal auth is not configured yet.");
      }

      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      setSubmitState("sent");
      setMessage("Sign-in approved. Opening the job tracker dashboard...");
      window.location.assign("/customer-portal/dashboard");
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "Sign-in failed. Please check the email and password.");
    }
  }

  return (
    <main className="portal-signin-page">
      <header className="portal-signin-header">
        <a className="header-logo" href="/" aria-label="Phoenix Epoxy Pros home">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <nav aria-label="Portal support navigation">
          <a href="/">Home</a>
          <a href="/#estimate">Digital Estimator</a>
          <a href="tel:17722090266">Call</a>
        </nav>
      </header>

      <section className="portal-signin-hero" aria-labelledby="portal-sign-in-title">
        <div className="portal-signin-media" aria-hidden="true">
          <img src="/images/hero-garage-approved.webp?v=approved-final-20260617" alt="" />
        </div>
        <div className="portal-signin-copy">
          <p className="eyebrow">Customer job tracker</p>
          <h1 id="portal-sign-in-title">Portal Sign In</h1>
          <p>
            Track your project from the moment the digital estimator is submitted: estimate status, finish choices,
            scheduling notes, warranty details, documents, and client messages stay organized behind this secure entry.
          </p>
          <ul>
            {trackerHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form className="estimate-card portal-signin-card" aria-label="Customer portal sign in" onSubmit={handleSubmit}>
          <div className="form-head">
            <span>Secure project access</span>
            <h2>Sign In</h2>
            <p>Supabase Auth is active for this temporary portal lane.</p>
          </div>
          <label className="form-field">
            <span>Email Address</span>
            <input
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="form-field">
            <span>Password</span>
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button className="gold-button form-submit" type="submit" disabled={submitState === "sending"}>
            {submitState === "sending" ? "Signing In..." : "Sign In"}
          </button>
          <p className={`form-status ${submitState}`} aria-live="polite">
            {message}
          </p>
        </form>
      </section>

      <section className="portal-proof-strip" aria-label="Job tracker benefits">
        <article>
          <strong>Immediate Tracking</strong>
          <span>Every digital estimator submission can become a tracked job record from day one.</span>
        </article>
        <article>
          <strong>Clear Handoff</strong>
          <span>Photos, measurements, finish preferences, estimates, and warranty details stay connected.</span>
        </article>
        <article>
          <strong>Client Confidence</strong>
          <span>Clients see what is happening next instead of waiting for scattered calls and messages.</span>
        </article>
      </section>
    </main>
  );
}
