"use client";
import { useEffect, useState } from "react";
import { DashboardShell } from "../components/DashboardShell";

function LineChart({ data }: { data: {week: string; leads: number}[] }) {
  const max = Math.max(...data.map(d => d.leads), 1);
  const H = 70; const W = 100;
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * W},${H - (d.leads / max) * H}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 70, overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke="#f6b800" strokeWidth="2" />
      {data.map((d, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * W} cy={H - (d.leads / max) * H} r="3" fill="#f6b800" />
      ))}
    </svg>
  );
}

function FunnelBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: "#ccc" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 800, color }}>{value}</span>
      </div>
      <div style={{ height: 8, background: "#1a1a1a", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${max > 0 ? (value / max) * 100 : 0}%`, height: "100%", background: color, borderRadius: 4, transition: "width .4s" }} />
      </div>
    </div>
  );
}

export default function OwnerDashboardPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(d => { setData(d); setLoading(false); });
  }, []);

  const k = data?.kpis as Record<string, number> | undefined;
  const charts = data?.charts as { weeklyData: {week: string; leads: number}[]; sources: Record<string, number> } | undefined;
  const jobs = (data?.jobs as Record<string, unknown>[] | undefined) || [];
  const leads = (data?.leads as Record<string, unknown>[] | undefined) || [];
  const fmtMoney = (n?: number) => n !== undefined ? `$${n.toLocaleString()}` : "$0";

  const totalLeads = leads.length;
  const conversions = jobs.filter(j => j.deposit_paid).length;
  const convRate = totalLeads > 0 ? Math.round((conversions / totalLeads) * 100) : 0;
  const projAnnual = k ? Math.round(k.collectedRevenue * 12) : 0;

  // Goal targets
  const MONTHLY_GOAL = 25000;
  const LEAD_GOAL = 40;

  return (
    <DashboardShell role="owner" roleLabel="Owner" user="Jeremy Bensen — Owner" active="Overview">

      {/* EXECUTIVE KPIs */}
      {loading ? (
        <div className="ds-kpi-row">{[0,1,2,3].map(i => <div key={i} className="ds-kpi" style={{ background: "#111" }} />)}</div>
      ) : (
        <div className="ds-kpi-row">
          {[
            { label: "Revenue Collected",   value: fmtMoney(k?.collectedRevenue), sub: `${fmtMoney(k?.totalRevenue)} pipeline`, color: "#10b981" },
            { label: "Total Leads",         value: String(totalLeads), sub: `${k?.leadsToday || 0} today`, color: "#3b82f6" },
            { label: "Conversion Rate",     value: `${convRate}%`, sub: `${conversions} deposits paid`, color: "#f59e0b" },
            { label: "Avg Job Value",       value: fmtMoney(k?.avgJobValue), sub: `${jobs.length} total jobs`, color: "#f6b800" },
          ].map(({ label, value, sub, color }) => (
            <div className="ds-kpi" key={label}>
              <p className="ds-kpi-label">{label}</p>
              <p className="ds-kpi-value" style={{ color }}>{value}</p>
              <p className="ds-kpi-sub">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* CHARTS + FUNNEL */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Lead trend */}
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">📈 Lead Trend (4 Weeks)</h2></div>
          <div className="ds-card-body">
            {charts?.weeklyData ? <LineChart data={charts.weeklyData} /> : <div style={{ height: 70, background: "#111", borderRadius: 6 }} />}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              {(charts?.weeklyData || []).map(d => (
                <div key={d.week} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#888" }}>{d.week}<br /><strong style={{ color: "#fff" }}>{d.leads}</strong></div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion funnel */}
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">🔻 Conversion Funnel</h2></div>
          <div className="ds-card-body">
            <FunnelBar label="New Leads"     value={k?.newLeads || 0}      max={totalLeads} color="#3b82f6" />
            <FunnelBar label="Proposal Sent" value={k?.proposalSent || 0}  max={totalLeads} color="#8b5cf6" />
            <FunnelBar label="Deposit Paid"  value={k?.depositPaid || 0}   max={totalLeads} color="#f59e0b" />
            <FunnelBar label="Active Jobs"   value={k?.activeJobs || 0}    max={totalLeads} color="#10b981" />
            <FunnelBar label="Completed"     value={k?.completedJobs || 0} max={totalLeads} color="#f6b800" />
          </div>
        </div>
      </div>

      {/* GOAL TRACKERS */}
      <div className="ds-card">
        <div className="ds-card-head"><h2 className="ds-card-title">🎯 Monthly Goals</h2></div>
        <div className="ds-card-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Revenue Goal</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#10b981" }}>{fmtMoney(k?.collectedRevenue)} / {fmtMoney(MONTHLY_GOAL)}</span>
              </div>
              <div style={{ height: 12, background: "#1a1a1a", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: `${Math.min((k?.collectedRevenue || 0) / MONTHLY_GOAL * 100, 100)}%`, height: "100%", background: "linear-gradient(90deg,#f6b800,#10b981)", borderRadius: 6, transition: "width .4s" }} />
              </div>
              <p style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{Math.round((k?.collectedRevenue || 0) / MONTHLY_GOAL * 100)}% of monthly goal</p>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Lead Goal</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#3b82f6" }}>{k?.leadsMTD || 0} / {LEAD_GOAL}</span>
              </div>
              <div style={{ height: 12, background: "#1a1a1a", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: `${Math.min((k?.leadsMTD || 0) / LEAD_GOAL * 100, 100)}%`, height: "100%", background: "linear-gradient(90deg,#3b82f6,#8b5cf6)", borderRadius: 6 }} />
              </div>
              <p style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{Math.round((k?.leadsMTD || 0) / LEAD_GOAL * 100)}% of lead goal</p>
            </div>
          </div>
        </div>
      </div>

      {/* PIPELINE BY STAGE + PROJECTED ANNUAL */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">Pipeline by Stage</h2></div>
          <div className="ds-card-body" style={{ padding: 0 }}>
            <table className="ds-table">
              <thead><tr>{["Stage","Count","Pipeline Value"].map(h => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {[
                  ["New Leads",     k?.newLeads     || 0, "#3b82f6"],
                  ["Proposal Sent", k?.proposalSent || 0, "#8b5cf6"],
                  ["Deposit Paid",  k?.depositPaid  || 0, "#f59e0b"],
                  ["Active Jobs",   k?.activeJobs   || 0, "#10b981"],
                  ["Completed",     k?.completedJobs|| 0, "#f6b800"],
                ].map(([stage, count, color]) => (
                  <tr key={stage as string}>
                    <td style={{ fontWeight: 700 }}>{stage as string}</td>
                    <td><span style={{ background: color as string, color: "#000", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 800 }}>{count as number}</span></td>
                    <td style={{ fontWeight: 700, color: "#10b981" }}>{fmtMoney((count as number) * (k?.avgJobValue || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ds-card">
          <div className="ds-card-head"><h2 className="ds-card-title">📊 Projections</h2></div>
          <div className="ds-card-body">
            {[
              { label: "Projected Annual Revenue", value: fmtMoney(projAnnual), color: "#10b981" },
              { label: "Pipeline Value",           value: fmtMoney(k?.totalRevenue), color: "#f6b800" },
              { label: "Jobs in Progress",         value: String(k?.activeJobs || 0), color: "#3b82f6" },
              { label: "Jobs This Week",           value: String((k?.activeJobs || 0) + (k?.scheduledJobs || 0)), color: "#8b5cf6" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1a1a1a" }}>
                <span style={{ fontSize: 13, color: "#888" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 900, color }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {[
          { title: "Operations Center", desc: "All leads, proposals, active jobs, crew schedule.", href: "/admin-dashboard", icon: "⚙️" },
          { title: "Supervisor Board",  desc: "Job scheduling, crew assignments, QC checks.", href: "/supervisor-dashboard", icon: "🗓️" },
          { title: "Crew Board",        desc: "Daily jobs, photo uploads, checklists.", href: "/crew-dashboard", icon: "🔧" },
        ].map(({ title, desc, href, icon }) => (
          <a key={title} href={href} style={{ textDecoration: "none" }}>
            <div className="ds-card ds-card-body" style={{ padding: "20px 20px", cursor: "pointer", transition: "border-color .2s", border: "1px solid #222" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <h3 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 900, color: "#fff" }}>{title}</h3>
              <p style={{ margin: 0, fontSize: 12, color: "#777" }}>{desc}</p>
            </div>
          </a>
        ))}
      </div>

    </DashboardShell>
  );
}
