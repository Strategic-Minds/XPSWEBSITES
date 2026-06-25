import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://prhppuuwcnmfdhwsagug.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function supa(path: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` },
    cache: "no-store",
  });
  return res.json();
}

export async function GET() {
  try {
    const [leads, jobs, timeline, messages] = await Promise.all([
      supa("pep_leads?select=id,full_name,email,phone,zip_code,project_type,square_footage,status,lead_score,ai_score,source_campaign,created_at,dashboard_token&order=created_at.desc&limit=100"),
      supa("pep_jobs?select=*&order=created_at.desc&limit=50"),
      supa("pep_timeline_events?select=*&order=step_number.asc"),
      supa("pep_messages?select=id,created_at,content,direction,platform,status&order=created_at.desc&limit=20"),
    ]);

    // KPIs
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

    const leadsArr = Array.isArray(leads) ? leads : [];
    const jobsArr = Array.isArray(jobs) ? jobs : [];

    const leadsToday = leadsArr.filter((l: Record<string, unknown>) => l.created_at && (l.created_at as string) >= today).length;
    const leadsMTD = leadsArr.filter((l: Record<string, unknown>) => l.created_at && (l.created_at as string) >= startOfMonth).length;

    const byStatus = leadsArr.reduce((acc: Record<string, number>, l: Record<string, unknown>) => {
      const s = (l.status as string) || "new";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    const jobsByStatus = jobsArr.reduce((acc: Record<string, number>, j: Record<string, unknown>) => {
      const s = (j.status as string) || "scheduled";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    const totalRevenue = jobsArr.reduce((sum: number, j: Record<string, unknown>) => sum + ((j.total_price as number) || 0), 0);
    const collectedRevenue = jobsArr.reduce((sum: number, j: Record<string, unknown>) => sum + ((j.deposit_paid as boolean) ? (j.deposit_amount as number) || 0 : 0), 0);
    const avgJobValue = jobsArr.length > 0 ? Math.round(totalRevenue / jobsArr.length) : 0;

    // Weekly buckets for chart (last 4 weeks)
    const weeklyData = [0,1,2,3].map(w => {
      const wStart = new Date(now); wStart.setDate(wStart.getDate() - (w+1)*7);
      const wEnd = new Date(now); wEnd.setDate(wEnd.getDate() - w*7);
      const count = leadsArr.filter((l: Record<string, unknown>) => {
        const d = new Date(l.created_at as string);
        return d >= wStart && d < wEnd;
      }).length;
      return { week: `W${4-w}`, leads: count };
    }).reverse();

    // Source breakdown
    const sources = leadsArr.reduce((acc: Record<string, number>, l: Record<string, unknown>) => {
      const s = (l.source_campaign as string) || "Direct";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});

    // City breakdown
    const cities = leadsArr.reduce((acc: Record<string, number>, l: Record<string, unknown>) => {
      const z = (l.zip_code as string) || "Unknown";
      acc[z] = (acc[z] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      leads: leadsArr,
      jobs: jobsArr,
      timeline: Array.isArray(timeline) ? timeline : [],
      messages: Array.isArray(messages) ? messages : [],
      kpis: {
        leadsToday, leadsMTD,
        totalRevenue, collectedRevenue, avgJobValue,
        newLeads: byStatus["new"] || 0,
        proposalSent: byStatus["proposal_sent"] || 0,
        depositPaid: byStatus["deposit_paid"] || 0,
        activeJobs: jobsByStatus["in_progress"] || 0,
        scheduledJobs: jobsByStatus["scheduled"] || 0,
        completedJobs: jobsByStatus["completed"] || 0,
      },
      charts: { weeklyData, sources, cities },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
