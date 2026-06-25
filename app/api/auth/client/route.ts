import { NextRequest, NextResponse } from "next/server";
import { signToken } from "../../../../lib/auth";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function supabase(path: string, options?: RequestInit) {
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

function generateToken(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Look up lead by email
    const res = await supabase(
      `pep_leads?email=eq.${encodeURIComponent(email.toLowerCase().trim())}&select=id,full_name,email,phone,status,dashboard_token&limit=1`
    );
    const leads = await res.json();

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({ error: "No account found for that email. Start a Digital Bid to create your account." }, { status: 401 });
    }

    const lead = leads[0];

    // Check token
    if (!lead.dashboard_token) {
      // Auto-generate and save a token, return a "check your phone" message
      const newToken = generateToken();
      await supabase(`pep_leads?id=eq.${lead.id}`, {
        method: "PATCH",
        body: JSON.stringify({ dashboard_token: newToken }),
      });
      // TODO: send via Twilio SMS
      return NextResponse.json({
        error: `Access code sent to your phone. Enter it as your password. (Dev mode: ${newToken})`,
        code_sent: true,
      }, { status: 401 });
    }

    if (lead.dashboard_token !== password.trim()) {
      return NextResponse.json({ error: "Invalid access code. Check your SMS or contact us." }, { status: 401 });
    }

    // Issue JWT
    const token = await signToken({
      sub: lead.id,
      email: lead.email,
      name: lead.full_name,
      type: "client",
    }, 24);

    const response = NextResponse.json({
      ok: true,
      name: lead.full_name,
    });

    response.cookies.set("client_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
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
