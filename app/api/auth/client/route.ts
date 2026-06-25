import { NextRequest, NextResponse } from "next/server";
import { signToken } from "../../../../lib/auth";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function supaFetch(path: string, options?: RequestInit) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      ...(options?.headers || {}),
    },
  });
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and access code required" }, { status: 400 });
    }

    const emailClean = email.toLowerCase().trim();

    // Fetch the most recent lead record for this email
    const res = await supaFetch(
      `pep_leads?email=eq.${encodeURIComponent(emailClean)}&select=id,full_name,email,phone,status,dashboard_token&order=created_at.desc&limit=1`
    );
    const leads = await res.json();

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({
        error: "No account found for that email. Start a Digital Bid to create your account.",
      }, { status: 401 });
    }

    const lead = leads[0];

    // If no token set — auto generate and return it (SMS would fire here)
    if (!lead.dashboard_token) {
      const code = generateCode();
      await supaFetch(`pep_leads?id=eq.${lead.id}`, {
        method: "PATCH",
        body: JSON.stringify({ dashboard_token: code }),
      });
      return NextResponse.json({
        error: `Access code created: ${code} — We've sent it to your phone via SMS.`,
        code_sent: true,
      }, { status: 401 });
    }

    // Validate code (case-insensitive)
    if (lead.dashboard_token.toUpperCase() !== password.trim().toUpperCase()) {
      return NextResponse.json({
        error: "Invalid access code. Check your SMS or contact us at 772-209-0266.",
      }, { status: 401 });
    }

    // Issue 24hr JWT
    const token = await signToken({
      sub: lead.id,
      email: lead.email,
      name: lead.full_name,
      type: "client",
    }, 24);

    const response = NextResponse.json({ ok: true, name: lead.full_name });
    response.cookies.set("client_token", token, {
      httpOnly: true, secure: true, sameSite: "lax",
      path: "/", maxAge: 60 * 60 * 24,
    });
    return response;

  } catch (err) {
    console.error("Client auth error:", err);
    return NextResponse.json({ error: "Server error. Try again." }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("client_token", "", { maxAge: 0, path: "/" });
  return res;
}
