import { NextRequest, NextResponse } from "next/server";
import { signToken } from "../../../../lib/auth";

// Try all possible env var names Vercel might use
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://prhppuuwcnmfdhwsagug.supabase.co";

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function supaFetch(path: string, options?: RequestInit) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  return fetch(url, {
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

    const res = await supaFetch(
      `pep_leads?email=eq.${encodeURIComponent(emailClean)}&select=id,full_name,email,phone,status,dashboard_token&order=created_at.desc&limit=1`
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Supabase error:", res.status, errText);
      return NextResponse.json({ error: "Database error. Try again." }, { status: 500 });
    }

    const leads = await res.json();

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({
        error: "No account found for that email. Start a Digital Bid to create your account.",
      }, { status: 401 });
    }

    const lead = leads[0];

    if (!lead.dashboard_token) {
      const code = generateCode();
      await supaFetch(`pep_leads?id=eq.${lead.id}`, {
        method: "PATCH",
        body: JSON.stringify({ dashboard_token: code }),
      });
      return NextResponse.json({
        error: `Your access code is: ${code} — We'll also send it to your phone.`,
        code_sent: true,
      }, { status: 401 });
    }

    if (lead.dashboard_token.toUpperCase() !== password.trim().toUpperCase()) {
      return NextResponse.json({
        error: "Invalid access code. Check your SMS or call 772-209-0266.",
      }, { status: 401 });
    }

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
