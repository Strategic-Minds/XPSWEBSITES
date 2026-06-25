"use client";
import { useEffect, useState } from "react";
import { DashboardShell } from "../components/DashboardShell";

const STATUS_LABEL: Record<string, string> = {
  scheduled: "Scheduled", in_progress: "In Progress", completed: "Completed",
  deposit_paid: "Deposit Paid", proposal_sent: "Proposal Sent", new: "New Lead",
};
const STATUS_BADGE: Record<string, string> = {
  scheduled: "amber", in_progress: "green", completed: "blue", deposit_paid: "amber",
};

const CREW: Record<string, { name: string; role: string; phone: string }> = {
  "Marcus T.": { name: "Marcus T.", role: "Lead Installer", phone: "6023331100" },
  "Ray M.":    { name: "Ray M.",    role: "Installer",      phone: "6023332200" },
  "Jason R.":  { name: "Jason R.", role: "Supervisor",     phone: "6023333300" },
  "Lisa K.":   { name: "Lisa K.",  role: "Supervisor",     phone: "6023334400" },
};

export default function SupervisorDashboardPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Record<string, unknown> | null>(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<{text: string; time: string}[]>([
    { text: "PXP-1002 Scottsdale — crew confirmed 6:30 AM. Day 1 of 2.", time: "07:02 AM" },
  ]);

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, []);

  const jobs = (data?.jobs as Record<string, unknown>[] | undefined) || [];
  const activeJobs = jobs.filter(j => ["scheduled","in_progress","deposit_paid"].includes(j.status as string));
  const todayStr = new Date().toISOString().split("T")[0];
  const todayJobs = jobs.filter(j => j.install_date === todayStr);

  function addNote() {
    if (!note.trim()) return;
    setNotes(n => [{ text: note, time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) }, ...n]);
    setNote("");
  }

  return (
    <DashboardShell role="supervisor" roleLabel="Supervisor" user="Supervisor View" active="Schedule">

      {/* KPIs */}
      <div className="ds-kpi-row">
        {[
          { label: "Today's Installs",  value: String(todayJobs.length),    sub: "Active crew dispatched",      color: "#f6b800" },
          { label: "Total Active Jobs", value: String(activeJobs.length),   sub: "In pipeline / scheduled",     color: "#10b981" },
          { label: "Pending QC",        value: String(jobs.filter(j => j.status === "in_progress").length), sub: "Require sign-off", color: "#f59e0b" },
          { label: "Completed MTD",     value: String(jobs.filter(j => j.status === "completed").length),   sub: "Revenue unlocked",  color: "#3b82f6" },
        ].map(({ label, value, sub, color }) => (
          <div className="ds-kpi" key={label}>
            <p className="ds-kpi-label">{label}</p>
            <p className="ds-kpi-value" style={{ color }}>{value}</p>
            <p className="ds-kpi-sub">{sub}</p>
          </div>
        ))}
      </div>

      {/* JOB SCHEDULE TABLE */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">📋 Job Schedule</h2>
          <a className="ds-btn gold" href="/admin-dashboard" style={{ fontSize: 12, padding: "6px 14px" }}>Full Pipeline</a>
        </div>
        <div className="ds-card-body" style={{ padding: 0, overflowX: "auto" }}>
          <table className="ds-table">
            <thead><tr>{["Job #","Address","City","System","Sq Ft","Date","Status","Crew","Actions"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={9} style={{ textAlign: "center", padding: 24, color: "#666" }}>Loading…</td></tr>
              ) : activeJobs.map(j => (
                <tr key={j.id as string} style={{ cursor: "pointer" }} onClick={() => setSelectedJob(j)}>
                  <td style={{ fontWeight: 900, color: "#f6b800" }}>{j.project_number as string}</td>
                  <td>{j.job_address as string}</td>
                  <td>{j.city as string}</td>
                  <td>{j.finish_system as string}</td>
                  <td>{j.square_footage as number} sqft</td>
                  <td>{(j.install_date as string) || "TBD"}</td>
                  <td><span className={`ds-badge ${STATUS_BADGE[j.status as string] || "blue"}`}>{STATUS_LABEL[j.status as string] || j.status as string}</span></td>
                  <td style={{ fontSize: 12 }}>
                    {j.status === "in_progress" ? "Ray M." : j.status === "scheduled" ? "Marcus T." : "—"}
                  </td>
                  <td style={{ display: "flex", gap: 6 }}>
                    <button onClick={e => { e.stopPropagation(); setSelectedJob(j); }} className="ds-btn" style={{ fontSize: 11, padding: "4px 8px" }}>Detail</button>
                    <a className="ds-btn gold" href="/crew-dashboard" style={{ fontSize: 11, padding: "4px 8px" }}>Crew</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JOB DETAIL + CREW BOARD */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Job Detail Panel */}
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">🔍 Job Detail</h2></div>
          <div className="ds-card-body">
            {selectedJob ? (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[
                    ["Job #",         selectedJob.project_number as string],
                    ["Status",        STATUS_LABEL[selectedJob.status as string] || selectedJob.status as string],
                    ["Address",       `${selectedJob.job_address}, ${selectedJob.city}`],
                    ["System",        selectedJob.finish_system as string],
                    ["Sq Ft",         `${selectedJob.square_footage} sqft`],
                    ["Total",         `$${(selectedJob.total_price as number)?.toLocaleString()}`],
                    ["Deposit Paid",  (selectedJob.deposit_paid as boolean) ? "✅ Yes" : "❌ No"],
                    ["Install Date",  (selectedJob.install_date as string) || "TBD"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p style={{ margin: "0 0 2px", fontSize: 10, fontWeight: 800, textTransform: "uppercase", color: "#555" }}>{k}</p>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#fff" }}>{v}</p>
                    </div>
                  ))}
                </div>
                {(selectedJob.notes as string | null) && (
                  <div style={{ background: "#111", borderRadius: 6, padding: 10, fontSize: 13, color: "#aaa" }}>📝 {String(selectedJob.notes)}</div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <a className="ds-btn gold" href="/crew-dashboard" style={{ flex: 1, textAlign: "center" }}>Assign Crew</a>
                  <button className="ds-btn" style={{ flex: 1 }} onClick={() => setSelectedJob(null)}>Close</button>
                </div>
              </div>
            ) : (
              <p style={{ color: "#555", fontSize: 13 }}>Click a job row to view details</p>
            )}
          </div>
        </div>

        {/* Supervisor Notes */}
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">📝 Supervisor Log</h2></div>
          <div className="ds-card-body" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ maxHeight: 160, overflowY: "auto", marginBottom: 12 }}>
              {notes.map((n, i) => (
                <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid #1a1a1a" }}>
                  <div style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>{n.time}</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#ccc" }}>{n.text}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => e.key === "Enter" && addNote()} placeholder="Log a note…" style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", fontSize: 13 }} />
              <button onClick={addNote} style={{ background: "#f6b800", color: "#000", border: "none", borderRadius: 6, padding: "8px 14px", fontWeight: 900, cursor: "pointer" }}>→</button>
            </div>
          </div>
        </div>
      </div>

      {/* CREW ROSTER */}
      <div className="ds-card">
        <div className="ds-card-head"><h2 className="ds-card-title">👷 Crew Roster</h2></div>
        <div className="ds-card-body" style={{ padding: 0 }}>
          <table className="ds-table">
            <thead><tr>{["Name","Role","Jobs Today","WhatsApp"].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {Object.values(CREW).map(c => {
                const assigned = activeJobs.filter(j =>
                  (j.status === "in_progress" && c.name === "Ray M.") ||
                  (j.status === "scheduled" && c.name === "Marcus T.")
                ).length;
                return (
                  <tr key={c.name}>
                    <td style={{ fontWeight: 700 }}>{c.name}</td>
                    <td>{c.role}</td>
                    <td><span className={`ds-badge ${assigned > 0 ? "green" : "blue"}`}>{assigned} active</span></td>
                    <td><a className="ds-btn" href={`https://wa.me/1${c.phone}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, padding: "4px 10px" }}>Message</a></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </DashboardShell>
  );
}
