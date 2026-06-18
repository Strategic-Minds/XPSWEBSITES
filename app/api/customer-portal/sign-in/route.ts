import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = "https://prhppuuwcnmfdhwsagug.supabase.co";
const SUPABASE_AUTH_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByaHBwdXV3Y25tZmRod3NhZ3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTc3NTUsImV4cCI6MjA5Mzg3Mzc1NX0.c80sEMbJG_-bG4Zgto1ltZyWgVz4eNEmMC69-Ei_CiQ";

function cleanMessage(result: Record<string, unknown>) {
  const raw = String(result.error_description || result.msg || result.error || "Portal sign-in failed.");

  if (raw.toLowerCase().includes("api key")) {
    return "Portal connection is not reaching the verified Supabase project yet. Refresh the portal and try again.";
  }

  return raw;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = String(email || "").trim();
    const rawPassword = String(password || "");

    if (!normalizedEmail || !rawPassword) {
      return NextResponse.json({ ok: false, message: "Email and password are required." }, { status: 400 });
    }

    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_AUTH_KEY,
        Authorization: `Bearer ${SUPABASE_AUTH_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: normalizedEmail, password: rawPassword }),
      cache: "no-store"
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.access_token) {
      return NextResponse.json(
        { ok: false, message: cleanMessage(result) },
        { status: response.status || 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      email: normalizedEmail,
      userId: result.user?.id || null,
      expiresIn: result.expires_in || null
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Portal sign-in failed." },
      { status: 400 }
    );
  }
}
