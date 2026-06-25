"use client";
import { useState, FormEvent } from "react";

export default function ClientPortalSignIn() {
  const [email, setEmail]     = useState("");
  const [code, setCode]       = useState("");
  const [err, setErr]         = useState("");
  const [info, setInfo]       = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(""); setInfo(""); setLoading(true);
    try {
      const res = await fetch("/api/auth/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: code.trim() }),
      });
      const data = await res.json();

      if (data.code_sent) {
        setCodeSent(true);
        setInfo("Access code sent to your phone via SMS. Enter it below.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setErr(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      const from = new URLSearchParams(window.location.search).get("from");
      window.location.href = from || "/customer-portal/dashboard";
    } catch {
      setErr("Connection error. Try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100dvh", background: "#050505",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', system-ui, sans-serif", padding: 24,
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
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
            Track Your Project
          </h1>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 13, margin: "0 0 28px" }}>
            {codeSent
              ? "We texted your access code. Enter it below to continue."
              : "Enter your email and the access code we sent you by SMS."}
          </p>

          {info && (
            <div style={{ color: "#4ade80", fontSize: 13, marginBottom: 18, padding: "10px 14px", background: "rgba(74,222,128,.08)", borderRadius: 6, border: "1px solid rgba(74,222,128,.2)" }}>
              {info}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>
              Email Address
            </label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email" required
              style={{
                width: "100%", padding: "12px 14px", marginBottom: 18,
                background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 8, color: "#fff", fontSize: 14, boxSizing: "border-box", outline: "none",
              }}
            />

            <label style={{ display: "block", color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>
              Access Code
            </label>
            <input
              type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder={codeSent ? "Enter the code from your SMS" : "e.g. AB3X9K2M"}
              autoComplete="one-time-code" required
              style={{
                width: "100%", padding: "12px 14px", marginBottom: 8,
                background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 8, color: "#fff", fontSize: 14,
                fontFamily: "monospace", letterSpacing: ".1em",
                boxSizing: "border-box", outline: "none",
              }}
            />
            <div style={{ color: "rgba(255,255,255,.25)", fontSize: 11, marginBottom: 20 }}>
              Don't have a code? Submit your email first — we'll text it to the number on your estimate.
            </div>

            {err && (
              <div style={{ color: "#f87171", fontSize: 13, marginBottom: 16, padding: "10px 14px", background: "rgba(248,113,113,.08)", borderRadius: 6, border: "1px solid rgba(248,113,113,.2)" }}>
                {err}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "14px", marginTop: 4,
                background: loading ? "rgba(246,184,0,.5)" : "#F6B800",
                color: "#000", fontWeight: 900, fontSize: 14,
                border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer",
                textTransform: "uppercase", letterSpacing: ".05em",
              }}
            >
              {loading ? "Checking…" : codeSent ? "Enter Portal →" : "Access My Project →"}
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <a href="/digital-estimator" style={{ color: "#F6B800", fontSize: 13, textDecoration: "none" }}>
              No account yet? Start a Digital Bid →
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
