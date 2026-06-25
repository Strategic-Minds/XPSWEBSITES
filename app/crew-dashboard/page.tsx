"use client";
import { useEffect, useState, useRef } from "react";
import { DashboardShell } from "../components/DashboardShell";

const CHECKLIST_ITEMS = [
  "Job site arrived + confirmed with customer",
  "Before photos taken (all areas)",
  "Surface prep complete (grind/shot blast)",
  "Moisture test passed",
  "Primer coat applied",
  "Base coat applied",
  "Flake/broadcast applied",
  "Topcoat #1 applied",
  "Topcoat #2 applied",
  "Final inspection passed",
  "After photos taken",
  "Customer walkthrough + sign-off",
];

export default function CrewDashboardPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [checks, setChecks] = useState<boolean[]>(new Array(CHECKLIST_ITEMS.length).fill(false));
  const [photos, setPhotos] = useState<{ name: string; preview: string; type: "before" | "after" | "progress" }[]>([]);
  const [photoType, setPhotoType] = useState<"before" | "after" | "progress">("before");
  const fileRef = useRef<HTMLInputElement>(null);
  const [changeOrder, setChangeOrder] = useState("");
  const [changeOrders, setChangeOrders] = useState<{text: string; time: string}[]>([]);

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(d => {
      setData(d);
      setLoading(false);
      const jobs = d.jobs as Record<string, unknown>[];
      const active = jobs?.find(j => j.status === "in_progress");
      if (active) setSelectedJobId(active.id as string);
    });
  }, []);

  const jobs = (data?.jobs as Record<string, unknown>[] | undefined) || [];
  const todayStr = new Date().toISOString().split("T")[0];
  const myJobs = jobs.filter(j => ["scheduled","in_progress"].includes(j.status as string));
  const selectedJob = myJobs.find(j => j.id === selectedJobId) || myJobs[0];

  const checkedCount = checks.filter(Boolean).length;
  const pct = Math.round(checks.filter(Boolean).length / CHECKLIST_ITEMS.length * 100);

  function handleFiles(files: FileList | null, type: "before" | "after" | "progress") {
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        setPhotos(p => [...p, { name: file.name, preview: e.target?.result as string, type }]);
      };
      reader.readAsDataURL(file);
    });
  }

  function submitCO() {
    if (!changeOrder.trim()) return;
    setChangeOrders(c => [...c, { text: changeOrder, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) }]);
    setChangeOrder("");
  }

  return (
    <DashboardShell role="crew" roleLabel="Crew" user="Crew Leader View" active="My Jobs">

      {/* KPIs */}
      <div className="ds-kpi-row">
        {[
          { label: "Today's Jobs",      value: String(myJobs.length),           sub: "Active / scheduled",     color: "#f6b800" },
          { label: "Checklist",         value: `${checkedCount}/${CHECKLIST_ITEMS.length}`, sub: `${pct}% complete`, color: pct === 100 ? "#10b981" : "#f59e0b" },
          { label: "Photos Uploaded",   value: String(photos.length),           sub: `${photos.filter(p => p.type === "before").length} before / ${photos.filter(p => p.type === "after").length} after`, color: "#3b82f6" },
          { label: "Change Orders",     value: String(changeOrders.length),     sub: "Pending supervisor review", color: changeOrders.length > 0 ? "#ef4444" : "#888" },
        ].map(({ label, value, sub, color }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value" style={{ color }}>{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* JOB SELECTOR */}
      {myJobs.length > 1 && (
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">Select Job</h2></div>
          <div className="ds-card-body" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {myJobs.map(j => (
              <button key={j.id as string} onClick={() => setSelectedJobId(j.id as string)} style={{ padding: "8px 16px", borderRadius: 6, border: `2px solid ${selectedJobId === j.id ? "#f6b800" : "#333"}`, background: selectedJobId === j.id ? "#f6b800" : "#111", color: selectedJobId === j.id ? "#000" : "#fff", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>
                {j.project_number as string}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#555" }}>Loading jobs…</div>
      ) : selectedJob ? (
        <>
          {/* JOB SUMMARY */}
          <div className="ds-card">
            <div className="ds-card-head">
              <h2 className="ds-card-title" style={{ color: "#f6b800" }}>{selectedJob.project_number as string}</h2>
              <span className={`ds-badge green`}>{selectedJob.status as string === "in_progress" ? "In Progress" : "Scheduled"}</span>
            </div>
            <div className="ds-card-body">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {[
                  ["Address",     `${selectedJob.job_address}, ${selectedJob.city}`],
                  ["System",      selectedJob.finish_system as string],
                  ["Color",       (selectedJob.selected_color as string) || "TBD"],
                  ["Sq Footage",  `${selectedJob.square_footage} sqft`],
                  ["Install Date",(selectedJob.install_date as string) || "Today"],
                  ["Balance",     `$${(selectedJob.balance_amount as number)?.toLocaleString() || "0"}`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#555" }}>{k}</p>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#fff" }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PROGRESS + CHECKLIST side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Checklist */}
            <div className="ds-card">
              <div className="ds-card-head">
                <h2 className="ds-card-title">✅ Job Checklist</h2>
                <span className={`ds-badge ${pct === 100 ? "green" : "amber"}`}>{checkedCount}/{CHECKLIST_ITEMS.length}</span>
              </div>
              <div className="ds-card-body" style={{ maxHeight: 320, overflowY: "auto" }}>
                {/* Progress bar */}
                <div style={{ height: 6, background: "#1a1a1a", borderRadius: 3, marginBottom: 12, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#10b981" : "#f6b800", borderRadius: 3, transition: "width .3s" }} />
                </div>
                {CHECKLIST_ITEMS.map((item, i) => (
                  <div key={i} onClick={() => setChecks(c => { const n=[...c]; n[i]=!n[i]; return n; })} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #111", cursor: "pointer" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${checks[i] ? "#10b981" : "#444"}`, background: checks[i] ? "#10b981" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .15s" }}>
                      {checks[i] && <span style={{ color: "#000", fontSize: 11, fontWeight: 900 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 12, color: checks[i] ? "#555" : "#ccc", textDecoration: checks[i] ? "line-through" : "none" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="ds-card">
              <div className="ds-card-head">
                <h2 className="ds-card-title">📷 Photos</h2>
                <span className={`ds-badge ${photos.length > 0 ? "green" : "blue"}`}>{photos.length} uploaded</span>
              </div>
              <div className="ds-card-body">
                {/* Type selector */}
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                  {(["before","progress","after"] as const).map(t => (
                    <button key={t} onClick={() => setPhotoType(t)} style={{ flex: 1, padding: "6px", borderRadius: 6, border: `2px solid ${photoType === t ? "#f6b800" : "#333"}`, background: photoType === t ? "#f6b800" : "#111", color: photoType === t ? "#000" : "#888", fontWeight: 700, fontSize: 11, cursor: "pointer", textTransform: "capitalize" }}>{t}</button>
                  ))}
                </div>
                {/* Drop zone */}
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files, photoType); }}
                  style={{ border: "2px dashed #333", borderRadius: 8, padding: "20px", textAlign: "center", cursor: "pointer", marginBottom: 12, background: "#0a0a0a" }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>📸</div>
                  <div style={{ fontSize: 12, color: "#666" }}>Tap or drag to upload <strong style={{ color: "#f6b800" }}>{photoType}</strong> photos</div>
                  <input ref={fileRef} type="file" accept="image/*" multiple capture="environment" onChange={e => handleFiles(e.target.files, photoType)} style={{ display: "none" }} />
                </div>
                {/* Preview grid */}
                {photos.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                    {photos.map((p, i) => (
                      <div key={i} style={{ position: "relative" }}>
                        <img src={p.preview} alt={p.name} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 6, border: `2px solid ${p.type === "before" ? "#3b82f6" : p.type === "after" ? "#10b981" : "#f59e0b"}` }} />
                        <div style={{ position: "absolute", top: 3, left: 3, background: p.type === "before" ? "#3b82f6" : p.type === "after" ? "#10b981" : "#f59e0b", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 4px", borderRadius: 3 }}>{p.type}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CHANGE ORDERS */}
          <div className="ds-card">
            <div className="ds-card-head">
              <h2 className="ds-card-title">⚠️ Change Orders</h2>
              {changeOrders.length > 0 && <span className="ds-badge red">{changeOrders.length} pending</span>}
            </div>
            <div className="ds-card-body">
              <div style={{ marginBottom: 12 }}>
                {changeOrders.length === 0 ? (
                  <p style={{ color: "#555", fontSize: 13 }}>No change orders submitted</p>
                ) : changeOrders.map((co, i) => (
                  <div key={i} style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 6, padding: "8px 12px", marginBottom: 8 }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 3 }}>{co.time}</div>
                    <p style={{ margin: 0, fontSize: 13, color: "#fca5a5" }}>{co.text}</p>
                    <span style={{ fontSize: 11, color: "#f59e0b" }}>⏳ Awaiting supervisor approval</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={changeOrder} onChange={e => setChangeOrder(e.target.value)} onKeyDown={e => e.key === "Enter" && submitCO()} placeholder="Describe change order (extra sq ft, material change, etc.)…" style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", fontSize: 13 }} />
                <button onClick={submitCO} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontWeight: 900, cursor: "pointer" }}>Submit</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <p style={{ color: "#555" }}>No active jobs assigned today</p>
        </div>
      )}
    </DashboardShell>
  );
}
