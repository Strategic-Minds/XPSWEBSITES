"use client";

import { FormEvent, useState } from "react";

const SUPABASE_URL = "https://prhppuuwcnmfdhwsagug.supabase.co";
const SUPABASE_AUTH_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByaHBwdXV3Y25tZmRod3NhZ3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTc3NTUsImV4cCI6MjA5Mzg3Mzc1NX0.c80sEMbJG_-bG4Zgto1ltZyWgVz4eNEmMC69-Ei_CiQ";

type PortalSession = {
  email: string;
  accessToken: string;
};

type LoginState = "idle" | "signing-in" | "signed-in" | "error";

const trackerItems = [
  ["Estimate", "Digital Estimator package received and ready for review."],
  ["Finish", "Color-chart selections and visualizer notes stay attached to the job."],
  ["Schedule", "Prep, install, topcoat, inspection, and care-guide checkpoints live here."],
  ["Warranty", "Warranty details, closeout photos, and maintenance instructions stay organized." ]
];

function authErrorMessage(result: Record<string, unknown>) {
  const raw = String(result.error_description || result.msg || result.error || "Portal sign-in failed.");

  if (raw.toLowerCase().includes("api key")) {
    return "Portal connection is using an invalid Supabase public key. Refresh the preview after deployment finishes, then try again.";
  }

  return raw;
}

export default function CustomerPortalPreviewPage() {
  const [loginState, setLoginState] = useState<LoginState>("idle");
  const [session, setSession] = useState<PortalSession | null>(null);
  const [message, setMessage] = useState("Use the portal credentials assigned to your project account.");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginState("signing-in");
    setMessage("Checking Supabase portal access...");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_AUTH_KEY,
          Authorization: `Bearer ${SUPABASE_AUTH_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.access_token) {
        throw new Error(authErrorMessage(result));
      }

      setSession({ email, accessToken: result.access_token });
      setLoginState("signed-in");
      setMessage("Signed in. Job tracker preview is unlocked.");
    } catch (error) {
      setLoginState("error");
      setMessage(error instanceof Error ? error.message : "Portal sign-in failed.");
    }
  }

  function signOut() {
    setSession(null);
    setLoginState("idle");
    setMessage("Use the portal credentials assigned to your project account.");
  }

  return (
    <main className="portal-login-page">
      <header className="portal-login-header">
        <a href="/" aria-label="Back to Phoenix Epoxy Pros">
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" />
        </a>
        <a className="portal-home-link" href="/">Back to website</a>
      </header>

      <section className="portal-login-hero" aria-label="Customer portal sign in">
        <div className="portal-login-copy">
          <span className="section-kicker">Customer Job Tracker</span>
          <h1>Track your floor from estimate to warranty.</h1>
          <p>
            Sign in to view estimate status, uploaded floor images, finish selections, schedule checkpoints, warranty
            information, care guides, messages, and next required actions in one branded project portal.
          </p>
          <div className="portal-proof-row" aria-label="Portal highlights">
            <span>Immediate tracking</span>
            <span>Finish approvals</span>
            <span>Warranty records</span>
          </div>
        </div>

        <div className="portal-login-panel">
          {!session ? (
            <form onSubmit={handleSubmit}>
              <p className="portal-panel-eyebrow">Supabase sign in</p>
              <h2>Open Job Tracker</h2>
              <label className="portal-field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label className="portal-field">
                <span>Password</span>
                <input name="password" type="password" autoComplete="current-password" required />
              </label>
              <button className="gold-button" type="submit" disabled={loginState === "signing-in"}>
                {loginState === "signing-in" ? "Signing in..." : "Sign In"}
              </button>
              <p className={`portal-login-status ${loginState}`} aria-live="polite">{message}</p>
            </form>
          ) : (
            <div className="portal-session-card">
              <p className="portal-panel-eyebrow">Signed in</p>
              <h2>Welcome back</h2>
              <p>{session.email}</p>
              <button className="gold-button" type="button" onClick={signOut}>Sign Out</button>
            </div>
          )}
        </div>
      </section>

      <section className="portal-tracker-preview" aria-label="Job tracker preview">
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
