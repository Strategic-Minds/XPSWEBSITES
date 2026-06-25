// lib/auth.ts — zero dependency JWT auth using Web Crypto API (Edge compatible)

const JWT_SECRET = process.env.JWT_SECRET || "pep-ops-secret-change-in-prod-2026";
const ENC = new TextEncoder();

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    "raw", ENC.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]
  );
}

function b64url(buf: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export async function signToken(payload: Record<string, unknown>, expiresInHours = 8): Promise<string> {
  const header = b64url(ENC.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const body = b64url(ENC.encode(JSON.stringify({ ...payload, exp, iat: Math.floor(Date.now() / 1000) })));
  const key = await getKey(JWT_SECRET);
  const sig = await crypto.subtle.sign("HMAC", key, ENC.encode(`${header}.${body}`));
  return `${header}.${body}.${b64url(sig)}`;
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const key = await getKey(JWT_SECRET);
    const dec = Uint8Array.from(atob(sig.replace(/-/g,"+").replace(/_/g,"/")), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify("HMAC", key, dec, ENC.encode(`${header}.${body}`));
    if (!valid) return null;
    const payload = JSON.parse(atob(body.replace(/-/g,"+").replace(/_/g,"/")));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

// Hardcoded users — replace with DB in production
export const OPS_USERS: Record<string, { password: string; role: string }> = {
  "jeremy": { password: process.env.OPS_ADMIN_PASSWORD || "PEP@Admin2026!", role: "admin" },
  "admin":  { password: process.env.OPS_ADMIN_PASSWORD || "PEP@Admin2026!", role: "admin" },
  "crew":   { password: process.env.OPS_CREW_PASSWORD  || "PEP@Crew2026!",  role: "crew"  },
  "owner":  { password: process.env.OPS_OWNER_PASSWORD || "PEP@Owner2026!", role: "owner" },
};

export const CLIENT_USERS: Record<string, { password: string; name: string }> = {
  // populated dynamically via Supabase — this is fallback demo
  "demo": { password: "demo2026", name: "Demo Client" },
};
