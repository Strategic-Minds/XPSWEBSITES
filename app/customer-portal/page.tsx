"use client";
import { useState, FormEvent } from "react";

export default function ClientPortalSignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [err, setErr]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || "Invalid email or password"); return; }
      const from = new URLSearchParams(window.location.search).get("from");
      window.location.href = from || "/customer-portal/dashboard";
    } catch {
      setErr("Connection error. Try again.");
    } finally { setLoading(false); }
  }

  return (
    <div style={{
      minHeight: "100dvh", background: "#050505",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', system-ui, sans-serif", padding: 24,
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" style={{ height: 52, width: "auto" }} />
          <div style={{ marginTop: 12, color: "rgba(255,255,255,.4)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".15em" }}>
            Client Portal
          </div>
        </div>

        <div style={{
          background: "#0f0f0f", border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 12, padding: "32px 28px",
        }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 6px" }}>
            Welcome Back
          </h1>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13, margin: "0 0 28px" }}>
            Sign in to track your project and approve phases
          </p>

          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>
              Email Address
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email" required
              style={{
                width: "100%", padding: "12px 14px", marginBottom: 18,
                background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 8, color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none",
              }}
            />

            <label style={{ display: "block", color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>
              Password
            </label>
            <input
              type="password" value={pass} onChange={e => setPass(e.target.value)}
              placeholder="••••••••••"
              autoComplete="current-password" required
              style={{
                width: "100%", padding: "12px 14px", marginBottom: 8,
                background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 8, color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none",
              }}
            />

            {err && (
              <div style={{ color: "#f87171", fontSize: 13, marginBottom: 16, padding: "10px 14px", background: "rgba(248,113,113,.08)", borderRadius: 6, border: "1px solid rgba(248,113,113,.2)" }}>
                {err}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "14px", marginTop: 8,
                background: loading ? "rgba(246,184,0,.5)" : "#F6B800",
                color: "#000", fontWeight: 900, fontSize: 14,
                border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer",
                textTransform: "uppercase", letterSpacing: ".05em",
              }}
            >
              {loading ? "Signing in…" : "Access My Project →"}
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <a href="/digital-estimator" style={{ color: "#F6B800", fontSize: 13, textDecoration: "none" }}>
              Don't have an account? Start a Digital Bid →
            </a>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <a href="/" style={{ color: "rgba(255,255,255,.3)", fontSize: 12, textDecoration: "none" }}>
            ← Back to main site
          </a>
        </div>
      </div>
    </div>
  );
}
