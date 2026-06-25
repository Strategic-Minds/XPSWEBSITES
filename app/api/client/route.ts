import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../lib/auth";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://prhppuuwcnmfdhwsagug.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function supa(path: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` },
    cache: "no-store",
  });
  return res.json();
}

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("client_token");
    if (!cookie?.value) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = await verifyToken(cookie.value);
    if (!payload?.sub) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const leadId = payload.sub as string;

    const [leadArr, jobArr, timelineArr, messagesArr] = await Promise.all([
      supa(`pep_leads?id=eq.${leadId}&select=*&limit=1`),
      supa(`pep_jobs?lead_id=eq.${leadId}&select=*&order=created_at.desc&limit=1`),
      supa(`pep_timeline_events?select=*&order=step_number.asc&limit=10`),
      supa(`pep_messages?lead_id=eq.${leadId}&select=id,created_at,content,direction,platform&order=created_at.desc&limit=10`),
    ]);

    const lead = Array.isArray(leadArr) && leadArr.length > 0 ? leadArr[0] : null;
    const job = Array.isArray(jobArr) && jobArr.length > 0 ? jobArr[0] : null;

    // Filter timeline to this job if we have one
    const timeline = Array.isArray(timelineArr) && job
      ? timelineArr.filter((t: Record<string, unknown>) => t.job_id === job.id)
      : [];

    return NextResponse.json({
      lead, job, timeline,
      messages: Array.isArray(messagesArr) ? messagesArr : [],
      name: payload.name as string,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
