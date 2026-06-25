import { NextRequest, NextResponse } from "next/server";
import { signToken } from "../../../../lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // TODO: replace with Supabase lookup
  // For now: accept demo@pep.com / demo2026 or any @phoenixepoxypros.com
  const isDemo = email === "demo@pep.com" && password === "demo2026";
  if (!isDemo) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signToken({ sub: email, name: "Demo Client", type: "client" });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("client_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("client_token", "", { maxAge: 0, path: "/" });
  return res;
}
