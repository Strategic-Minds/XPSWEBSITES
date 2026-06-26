import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

const OPS_PATHS = [
  "/admin-dashboard",
  "/owner-dashboard",
  "/crew-dashboard",
  "/supervisor-dashboard",
  "/ops",
];

const CLIENT_PATHS = [
  "/customer-portal/dashboard",
  "/customer-portal/projects",
  "/client-dashboard",
];

function isOpsDomain(req: NextRequest) {
  const host = req.headers.get("host") || "";
  return host.startsWith("ops.");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isOpsDomain(req)) {
    if (pathname === "/ops-login" || pathname.startsWith("/api/auth/ops")) return NextResponse.next();
    const token = req.cookies.get("ops_token")?.value;
    const payload = token ? await verifyToken(token) : null;
    if (!payload) {
      const url = req.nextUrl.clone(); url.pathname = "/ops-login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const isOpsPath = OPS_PATHS.some(p => pathname.startsWith(p));
  if (isOpsPath) {
    if (pathname === "/ops-login" || pathname.startsWith("/api/auth/ops")) return NextResponse.next();
    const token = req.cookies.get("ops_token")?.value;
    const payload = token ? await verifyToken(token) : null;
    if (!payload) {
      const url = req.nextUrl.clone();
      url.pathname = "/ops-login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const isClientPath = CLIENT_PATHS.some(p => pathname.startsWith(p));
  if (isClientPath) {
    const token = req.cookies.get("client_token")?.value;
    const payload = token ? await verifyToken(token) : null;
    if (!payload) {
      const url = req.nextUrl.clone();
      url.pathname = "/customer-portal";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/owner-dashboard/:path*",
    "/crew-dashboard/:path*",
    "/supervisor-dashboard/:path*",
    "/ops/:path*",
    "/ops-login",
    "/customer-portal/dashboard/:path*",
    "/customer-portal/projects/:path*",
    "/client-dashboard/:path*",
  ],
};
