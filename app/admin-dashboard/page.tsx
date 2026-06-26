"use client";
import { useEffect, useState } from "react";
import { DashboardShell } from "../components/DashboardShell";

const STATUS_BADGE: Record<string, string> = {
  new: "blue", proposal_sent: "amber", deposit_paid: "green",
  in_progress: "green", completed: "blue", scheduled: "amber",
};

const STATUS_LABEL: Record<string, string> = {
  new: "New Lead", proposal_sent: "Proposal Sent", deposit_paid: "Deposit Paid",
  in_progress: "In Progress", completed: "Completed", scheduled: "Scheduled",
};

const SCORE_COLOR: Record<string, string> = { hot: "#ef4444", warm: "#f59e0b", cold: "#3b82f6" };

interface Lead { id: string; full_name: string; email: string; phone: string; zip_code: string; project_type: string; square_footage: number; status: string; lead_score: string; ai_score: number; source_campaign: string; created_at: string; }
interface Job { id: string; project_number: string; status: string; job_address: string; city: string; finish_system: string; square_footage: number; total_price: number; install_date: string; deposit_paid: boolean; }
interface KPIs { leadsToday: number; leadsMTD: number; totalRevenue: number; collectedRevenue: number; newLeads: number; proposalSent: number; activeJobs: number; scheduledJobs: number; completedJobs: number; }
interface Charts { weeklyData: {week: string; leads: number}[]; sources: Record<string, number>; }

function BarChart({ data }: { data: {week: string; leads: number}[] }) {
  const max = Math.max(...data.map(d => d.leads), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 80, padding: "0 4px" }}>
      {data.map(d => (
        <div key={d.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#f6b800" }}>{d.leads}</div>
          <div style={{ width: "100%", background: "#f6b800", borderRadius: 4, height: `${(d.leads / max) * 60}px`, minHeight: 4 }} />
          <div style={{ fontSize: 10, color: "#888" }}>{d.week}</div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }: { data: Record<string, number> }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const COLORS = ["#f6b800","#3b82f6","#10b981","#8b5cf6","#ef4444","#f59e0b"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {Object.entries(data).slice(0, 5).map(([k, v], i) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i], flexShrink: 0 }} />
          <div style={{ flex: 1, fontSize: 12, color: "#ccc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{total > 0 ? Math.round(v / total * 100) : 0}%</div>
          <div style={{ fontSize: 11, color: "#888" }}>({v})</div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<{ leads: Lead[]; jobs: Job[]; kpis: KPIs; charts: Charts } | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"leads" | "jobs">("leads");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<{author: string; text: string; time: string}[]>([
    { author: "Jeremy", text: "Focus on getting PXP-1002 wrapped up today — big commercial job.", time: "8:02 AM" },
    { author: "Jason R.", text: "Crew confirmed for Scottsdale. Starting 6:30 AM.", time: "7:45 AM" },
  ]);

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(d => { setData(d); setLoading(false); });
    const iv = setInterval(() => {
      fetch("/api/dashboard").then(r => r.json()).then(d => setData(d));
    }, 60000);
    return () => clearInterval(iv);
  }, []);

  const filteredLeads = (data?.leads || []).filter(l =>
    (statusFilter === "all" || l.status === statusFilter) &&
    (search === "" || l.full_name?.toLowerCase().includes(search.toLowerCase()) || l.zip_code?.includes(search))
  );

  const k = data?.kpis;
  const fmtMoney = (n?: number) => n !== undefined ? `$${n.toLocaleString()}` : "$0";
  const timeAgo = (iso: string) => {
    const d = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (d < 60) return `${d}m ago`; if (d < 1440) return `${Math.floor(d/60)}h ago`; return `${Math.floor(d/1440)}d ago`;
  };

  function postMsg() {
    if (!msg.trim()) return;
    setMessages(m => [{ author: "Jeremy", text: msg, time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) }, ...m]);
    setMsg("");
  }

  return (
    <DashboardShell role="admin" roleLabel="Admin" user="Jeremy Bensen — Admin" active="Dashboard">

      {/* LIVE INDICATOR */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>LIVE — Auto-refreshes every 60s</span>
      </div>

      {/* KPI ROW */}
      {loading ? (
        <div className="ds-kpi-row">{[0,1,2,3].map(i => <div key={i} className="ds-kpi" style={{ background: "#111", animation: "pulse 1.5s infinite" }} />)}</div>
      ) : (
        <div className="ds-kpi-row">
          {[
            { label: "New Leads Today",    value: String(k?.leadsToday ?? 0), sub: `${k?.leadsMTD ?? 0} this month`, color: "#3b82f6" },
            { label: "Open Proposals",     value: String(k?.proposalSent ?? 0), sub: "Awaiting approval", color: "#8b5cf6" },
            { label: "Active Jobs",        value: String((k?.activeJobs ?? 0) + (k?.scheduledJobs ?? 0)), sub: `${k?.completedJobs ?? 0} completed`, color: "#10b981" },
            { label: "Revenue Collected",  value: fmtMoney(k?.collectedRevenue), sub: `${fmtMoney(k?.totalRevenue)} pipeline`, color: "#f6b800" },
          ].map(({ label, value, sub, color }) => (
            <div className="ds-kpi" key={label}>
              <p className="ds-kpi-label">{label}</p>
              <p className="ds-kpi-value" style={{ color }}>{value}</p>
              <p className="ds-kpi-sub">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* CHARTS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">Weekly Lead Volume</h2></div>
          <div className="ds-card-body">
            {data?.charts?.weeklyData ? <BarChart data={data.charts.weeklyData} /> : <div style={{height:80,background:"#111",borderRadius:6}} />}
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">Lead Sources</h2></div>
          <div className="ds-card-body">
            {data?.charts?.sources ? <DonutChart data={data.charts.sources} /> : <div style={{height:80,background:"#111",borderRadius:6}} />}
          </div>
        </div>
      </div>

      {/* PIPELINE TABLE */}
      <div className="ds-card">
        <div className="ds-card-head">
          <h2 className="ds-card-title">
            <button onClick={() => setTab("leads")} style={{ background: tab==="leads" ? "#f6b800" : "transparent", color: tab==="leads" ? "#000" : "#888", border: "none", borderRadius: 6, padding: "4px 14px", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>Leads</button>
            <button onClick={() => setTab("jobs")} style={{ background: tab==="jobs" ? "#f6b800" : "transparent", color: tab==="jobs" ? "#000" : "#888", border: "none", borderRadius: 6, padding: "4px 14px", fontWeight: 800, cursor: "pointer", fontSize: 13, marginLeft: 6 }}>Jobs</button>
          </h2>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or ZIP…" style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", fontSize: 12, width: 160 }} />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", fontSize: 12 }}>
              <option value="all">All Status</option>
              <option value="new">New Lead</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="deposit_paid">Deposit Paid</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <a className="ds-btn gold" href="/digital-estimator" style={{ fontSize: 12, padding: "6px 14px" }}>+ New Lead</a>
          </div>
        </div>
        <div className="ds-card-body" style={{ padding: 0, overflowX: "auto" }}>
          {tab === "leads" ? (
            <table className="ds-table">
              <thead><tr>{["Customer","ZIP","Type","Sq Ft","Score","Status","Source","Submitted","Action"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={9} style={{ textAlign: "center", padding: 24, color: "#666" }}>Loading live data…</td></tr>
                ) : filteredLeads.length === 0 ? (
                  <tr><td colSpan={9} style={{ textAlign: "center", padding: 24, color: "#666" }}>No leads match filter</td></tr>
                ) : filteredLeads.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 700 }}>{l.full_name}</td>
                    <td>{l.zip_code}</td>
                    <td>{l.project_type}</td>
                    <td>{l.square_footage ? `${l.square_footage} sqft` : "—"}</td>
                    <td><span style={{ background: SCORE_COLOR[l.lead_score] || "#555", color: "#fff", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>{l.lead_score || "—"}</span></td>
                    <td><span className={`ds-badge ${STATUS_BADGE[l.status] || "blue"}`}>{STATUS_LABEL[l.status] || l.status}</span></td>
                    <td style={{ color: "#888", fontSize: 12 }}>{l.source_campaign || "Direct"}</td>
                    <td style={{ color: "#888", fontSize: 12 }}>{l.created_at ? timeAgo(l.created_at) : "—"}</td>
                    <td><a className="ds-btn" href={`https://wa.me/1${l.phone?.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, padding: "4px 10px" }}>WhatsApp</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="ds-table">
              <thead><tr>{["Job #","Address","City","System","Sq Ft","Price","Install Date","Status","Action"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {(data?.jobs || []).map(j => (
                  <tr key={j.id}>
                    <td style={{ fontWeight: 900, color: "#f6b800" }}>{j.project_number}</td>
                    <td>{j.job_address}</td>
                    <td>{j.city}</td>
                    <td>{j.finish_system}</td>
                    <td>{j.square_footage} sqft</td>
                    <td style={{ fontWeight: 700 }}>${j.total_price?.toLocaleString()}</td>
                    <td>{j.install_date || "TBD"}</td>
                    <td><span className={`ds-badge ${STATUS_BADGE[j.status] || "blue"}`}>{STATUS_LABEL[j.status] || j.status}</span></td>
                    <td><a className="ds-btn" href="/supervisor-dashboard" style={{ fontSize: 11, padding: "4px 10px" }}>View</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CALENDAR + MESSAGE BOARD */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Install Calendar */}
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">📅 Install Calendar</h2></div>
          <div className="ds-card-body">
            {(data?.jobs || []).filter(j => j.install_date).sort((a, b) => new Date(a.install_date).getTime() - new Date(b.install_date).getTime()).map(j => (
              <div key={j.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #1a1a1a" }}>
                <div style={{ background: "#f6b800", color: "#000", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 900, minWidth: 52, textAlign: "center" }}>
                  {new Date(j.install_date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{j.project_number}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{j.city} · {j.finish_system}</div>
                </div>
                <span className={`ds-badge ${STATUS_BADGE[j.status] || "blue"}`} style={{ fontSize: 10 }}>{STATUS_LABEL[j.status] || j.status}</span>
              </div>
            ))}
            {(data?.jobs || []).filter(j => j.install_date).length === 0 && (
              <p style={{ color: "#555", fontSize: 13 }}>No installs scheduled</p>
            )}
          </div>
        </div>

        {/* Message Board */}
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">💬 Team Board</h2></div>
          <div className="ds-card-body" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ maxHeight: 180, overflowY: "auto", marginBottom: 12 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid #1a1a1a" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                    <span style={{ fontWeight: 800, fontSize: 12, color: "#f6b800" }}>{m.author}</span>
                    <span style={{ fontSize: 11, color: "#555" }}>{m.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#ccc" }}>{m.text}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && postMsg()} placeholder="Post to team…" style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", fontSize: 13 }} />
              <button onClick={postMsg} style={{ background: "#f6b800", color: "#000", border: "none", borderRadius: 6, padding: "8px 14px", fontWeight: 900, cursor: "pointer" }}>→</button>
            </div>
          </div>
        </div>
      </div>

    </DashboardShell>
  );
}
