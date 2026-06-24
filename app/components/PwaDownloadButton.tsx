"use client";
import { useState, useEffect } from "react";

type Platform = "android" | "ios" | "desktop";

const ANDROID_STEPS = [
  { num: 1, text: "Tap the 3-dot menu in Chrome (top right)" },
  { num: 2, text: "Select \"Add to Home Screen\"" },
  { num: 3, text: "Tap \"Install\" to confirm" },
  { num: 4, text: "Opens directly to your project dashboard" },
];

const IOS_STEPS = [
  { num: 1, text: "Tap the Share button (⬆️) at the bottom of Safari" },
  { num: 2, text: "Scroll down and tap \"Add to Home Screen\"" },
  { num: 3, text: "Name it \"PEP Portal\" then tap Add" },
  { num: 4, text: "Opens directly to your project dashboard" },
];

export function PwaDownloadButton({ variant = "gold" }: { variant?: "gold" | "dark" | "outline" }) {
  const [ready, setReady] = useState(false);
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;
    if (standalone) { setInstalled(true); return; }

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (isIOS) { setPlatform("ios"); setReady(true); }
    else if (isAndroid) { setPlatform("android"); }
    else { setPlatform("desktop"); setReady(true); }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setReady(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleClick() {
    if (platform === "android" && deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === "accepted") { setInstalled(true); setReady(false); }
      return;
    }
    setShowModal(true);
  }

  const btnBase: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "12px 22px", borderRadius: 10,
    fontWeight: 900, fontSize: ".9rem",
    border: "none", cursor: "pointer", letterSpacing: ".02em",
  };

  const btnStyle: React.CSSProperties =
    variant === "dark"
      ? { ...btnBase, background: "#050505", color: "#fff", border: "1px solid #333" }
      : variant === "outline"
      ? { ...btnBase, background: "transparent", color: "#f6b800", border: "2px solid #f6b800" }
      : { ...btnBase, background: "linear-gradient(180deg,#ffd75a,#f6b800)", color: "#050505", boxShadow: "0 6px 20px rgba(246,184,0,.3)" };

  const platformLabel =
    platform === "ios" ? "Add to iPhone" :
    platform === "android" ? "Install on Android" :
    "Install App";

  const platformIcon =
    platform === "ios" ? "🍎" :
    platform === "android" ? "🤖" : "📱";

  if (installed) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: ".84rem", color: "#25a84a", fontWeight: 800 }}>
        ✓ App Installed
      </span>
    );
  }

  if (!ready) return null;

  const steps = platform === "ios" ? IOS_STEPS : ANDROID_STEPS;

  return (
    <>
      <button style={btnStyle} onClick={handleClick} aria-label="Install Phoenix Epoxy Pros app">
        {platformIcon} {platformLabel}
      </button>

      {showModal && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "28px 24px 36px", width: "100%", maxWidth: 480, boxShadow: "0 -8px 40px rgba(0,0,0,.3)" }}>
            <div style={{ width: 40, height: 4, borderRadius: 99, background: "#e0e0e0", margin: "0 auto 22px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: "linear-gradient(180deg,#ffd75a,#f6b800)", display: "grid", placeItems: "center", fontSize: "1.8rem", flexShrink: 0, boxShadow: "0 4px 12px rgba(246,184,0,.35)" }}>
                🏗️
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#050505" }}>Phoenix Epoxy Pros</div>
                <div style={{ fontSize: ".76rem", color: "#888" }}>Project Portal — Free</div>
              </div>
              <button onClick={() => setShowModal(false)} style={{ marginLeft: "auto", background: "#f4f4f4", border: "none", borderRadius: 999, width: 32, height: 32, fontSize: "1rem", cursor: "pointer", flexShrink: 0 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              {steps.map(({ num, text }) => (
                <div key={num} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, flexShrink: 0, background: num === 4 ? "linear-gradient(180deg,#ffd75a,#f6b800)" : "#f4f5f6", display: "grid", placeItems: "center", fontWeight: 900, fontSize: ".82rem", color: "#050505" }}>
                    {num < 4 ? num : "🚀"}
                  </div>
                  <p style={{ margin: 0, fontSize: ".86rem", color: "#444" }}>{text}</p>
                </div>
              ))}
            </div>
            <button
              style={{ width: "100%", padding: "14px", borderRadius: 12, background: "linear-gradient(180deg,#ffd75a,#f6b800)", border: "none", fontWeight: 900, fontSize: "1rem", color: "#050505", cursor: "pointer", boxShadow: "0 6px 20px rgba(246,184,0,.25)" }}
              onClick={() => setShowModal(false)}
            >
              Got it — I&apos;ll add it now ✓
            </button>
          </div>
        </div>
      )}
    </>
  );
}
