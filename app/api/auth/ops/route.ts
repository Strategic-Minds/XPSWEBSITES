import { NextRequest, NextResponse } from "next/server";
import { signToken, OPS_USERS } from "../../../../lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = OPS_USERS[username?.toLowerCase()];
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = await signToken({ sub: username, role: user.role, type: "ops" });
  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set("ops_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("ops_token", "", { maxAge: 0, path: "/" });
  return res;
}
