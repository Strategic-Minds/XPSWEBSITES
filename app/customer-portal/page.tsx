"use client";
import { useState } from "react";
import { MobileNavigation } from "../components/MobileNavigation";

export default function CustomerPortalPage() {
  const [tab, setTab] = useState<"signin"|"track">("signin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 900));
    if (email === "demo@phoenixepoxypros.com" && pass === "demo2026") {
      window.location.href = "/customer-portal/dashboard";
    } else {
      setError("Incorrect email or password. Demo: demo@phoenixepoxypros.com / demo2026");
    }
    setLoading(false);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(""); setOk("");
    await new Promise(r => setTimeout(r, 900));
    if (jobId.toUpperCase().match(/^(EPX|PEP)-\d{4}-\d{3,}$/)) {
      setOk(`Job ${jobId.toUpperCase()} found — redirecting…`);
      setTimeout(() => window.location.href = `/customer-portal/projects/${jobId}`, 1400);
    } else {
      setError("Job ID not found. Format: EPX-2024-001 or PEP-2024-001 (check your confirmation email).");
    }
    setLoading(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:`
        .prt-wrap{min-height:100vh;background:#050505;display:flex;flex-direction:column;font-family:Arial,Helvetica,sans-serif;}
        .prt-header{display:flex;align-items:center;justify-content:space-between;padding:0 24px;height:68px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;}
        .prt-header a img{height:36px;width:auto;}
        .prt-header-back{color:rgba(255,255,255,.5);font-size:13px;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:6px;}
        .prt-header-back:hover{color:#fff;}

        .prt-body{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 20px;}
        .prt-card{background:#0d0d0d;border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:44px 40px;width:100%;max-width:420px;box-shadow:0 40px 80px rgba(0,0,0,.7);}
        @media(max-width:480px){.prt-card{padding:32px 24px;}}

        .prt-logo{display:flex;align-items:center;gap:12px;margin-bottom:32px;}
        .prt-logo-mark{width:40px;height:40px;background:#F6B800;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:900;color:#000;flex-shrink:0;}
        .prt-logo-name{font-size:15px;font-weight:900;color:#fff;line-height:1.2;}
        .prt-logo-sub{font-size:10px;color:#F6B800;font-weight:700;letter-spacing:.14em;text-transform:uppercase;}

        .prt-tabs{display:flex;margin-bottom:28px;border-bottom:1px solid rgba(255,255,255,.08);}
        .prt-tab{flex:1;padding:12px;text-align:center;font-size:13px;font-weight:800;color:rgba(255,255,255,.4);cursor:pointer;border:none;border-bottom:2px solid transparent;background:none;font-family:inherit;transition:all .15s;}
        .prt-tab.active{color:#F6B800;border-bottom-color:#F6B800;}

        .prt-title{font-size:26px;font-weight:900;color:#fff;letter-spacing:-.5px;margin-bottom:6px;}
        .prt-sub{font-size:14px;color:rgba(255,255,255,.4);margin-bottom:28px;}

        .prt-label{display:block;font-size:11px;font-weight:800;color:rgba(255,255,255,.45);margin-bottom:7px;letter-spacing:.06em;text-transform:uppercase;}
        .prt-input{width:100%;padding:13px 16px;background:#111;border:1.5px solid rgba(255,255,255,.1);border-radius:8px;color:#fff;font-size:15px;margin-bottom:14px;outline:none;transition:border-color .15s;font-family:inherit;display:block;}
        .prt-input:focus{border-color:#F6B800;}
        .prt-input::placeholder{color:rgba(255,255,255,.2);}

        .prt-submit{width:100%;padding:15px;background:#F6B800;color:#000;font-weight:900;font-size:16px;border:none;border-radius:8px;cursor:pointer;font-family:inherit;transition:background .15s;margin-top:4px;}
        .prt-submit:hover{background:#e5a800;}
        .prt-submit:disabled{opacity:.55;cursor:not-allowed;}

        .prt-divider{display:flex;align-items:center;gap:14px;margin:20px 0;}
        .prt-div-line{flex:1;height:1px;background:rgba(255,255,255,.08);}
        .prt-div-text{font-size:11px;color:rgba(255,255,255,.2);font-weight:700;}

        .prt-alt{display:block;width:100%;padding:13px;text-align:center;background:transparent;color:rgba(255,255,255,.55);font-weight:700;font-size:14px;border:1.5px solid rgba(255,255,255,.1);border-radius:8px;text-decoration:none;margin-bottom:10px;font-family:inherit;cursor:pointer;transition:all .15s;}
        .prt-alt:hover{border-color:rgba(255,255,255,.3);color:#fff;}

        .prt-error{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#fca5a5;padding:12px 16px;border-radius:8px;font-size:13px;font-weight:600;margin-bottom:14px;}
        .prt-ok{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);color:#86efac;padding:12px 16px;border-radius:8px;font-size:13px;font-weight:600;margin-bottom:14px;}

        .prt-footer{margin-top:24px;text-align:center;font-size:12px;color:rgba(255,255,255,.2);line-height:1.8;}
        .prt-footer a{color:rgba(246,184,0,.7);text-decoration:none;}
        .prt-footer a:hover{color:#F6B800;}
      `}} />

      <div className="prt-wrap">
        <header className="prt-header">
          <a href="/"><img src="/images/logo-header.webp" alt="Phoenix Epoxy Pros" /></a>
          <MobileNavigation />
          <a href="/" className="prt-header-back">← Back to site</a>
        </header>

        <div className="prt-body">
          <div className="prt-card">
            <div className="prt-logo">
              <div className="prt-logo-mark">PEP</div>
              <div>
                <div className="prt-logo-name">Phoenix Epoxy Pros</div>
                <div className="prt-logo-sub">Client Portal</div>
              </div>
            </div>

            <div className="prt-tabs">
              <button className={`prt-tab${tab==="signin"?" active":""}`} onClick={()=>{setTab("signin");setError("");setOk("");}}>Sign In</button>
              <button className={`prt-tab${tab==="track"?" active":""}`} onClick={()=>{setTab("track");setError("");setOk("");}}>Track by Job ID</button>
            </div>

            {tab==="signin"&&(
              <>
                <div className="prt-title">Welcome back</div>
                <div className="prt-sub">Sign in to view your project and estimate.</div>
                {error&&<div className="prt-error">{error}</div>}
                <form onSubmit={handleSignIn}>
                  <label className="prt-label">Email address</label>
                  <input className="prt-input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email"/>
                  <label className="prt-label">Password</label>
                  <input className="prt-input" type="password" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} required autoComplete="current-password"/>
                  <button className="prt-submit" type="submit" disabled={loading}>{loading?"Signing in…":"Sign In →"}</button>
                </form>
                <div className="prt-divider"><div className="prt-div-line"/><span className="prt-div-text">or</span><div className="prt-div-line"/></div>
                <a href="/digital-estimator" className="prt-alt">Start a New Digital Estimate</a>
                <a href="https://wa.me/17722090266" className="prt-alt" target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
              </>
            )}

            {tab==="track"&&(
              <>
                <div className="prt-title">Track Your Job</div>
                <div className="prt-sub">Enter your Job ID from your confirmation email.</div>
                {error&&<div className="prt-error">{error}</div>}
                {ok&&<div className="prt-ok">{ok}</div>}
                <form onSubmit={handleTrack}>
                  <label className="prt-label">Job ID</label>
                  <input className="prt-input" type="text" placeholder="EPX-2024-001" value={jobId} onChange={e=>setJobId(e.target.value)} required/>
                  <button className="prt-submit" type="submit" disabled={loading}>{loading?"Looking up…":"Track My Project →"}</button>
                </form>
                <div className="prt-divider"><div className="prt-div-line"/><span className="prt-div-text">no job ID?</span><div className="prt-div-line"/></div>
                <a href="/digital-estimator" className="prt-alt">Start a New Project →</a>
              </>
            )}

            <div className="prt-footer">
              New customer? <a href="/digital-estimator">Start your free estimate</a><br/>
              Need help? <a href="tel:17722090266">772-209-0266</a> · <a href="https://wa.me/17722090266">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
