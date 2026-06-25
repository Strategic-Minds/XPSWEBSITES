// lib/auth.ts — zero dependency JWT auth using Web Crypto API (Edge compatible)

const JWT_SECRET = process.env.JWT_SECRET || "pep-ops-secret-change-in-prod-2026";
const ENC = new TextEncoder();

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    ENC.encode(secret).buffer as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function b64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export async function signToken(payload: Record<string, unknown>, expiresInHours = 8): Promise<string> {
  const header = b64url(ENC.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })).buffer as ArrayBuffer);
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const body = b64url(ENC.encode(JSON.stringify({ ...payload, exp, iat: Math.floor(Date.now() / 1000) })).buffer as ArrayBuffer);
  const key = await getKey(JWT_SECRET);
  const sig = await crypto.subtle.sign("HMAC", key, ENC.encode(`${header}.${body}`).buffer as ArrayBuffer);
  return `${header}.${body}.${b64url(sig)}`;
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const key = await getKey(JWT_SECRET);
    const dec = Uint8Array.from(atob(sig.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify(
      "HMAC", key,
      dec.buffer as ArrayBuffer,
      ENC.encode(`${header}.${body}`).buffer as ArrayBuffer
    );
    if (!valid) return null;
    const pl = JSON.parse(atob(body.replace(/-/g, "+").replace(/_/g, "/")));
    if (pl.exp < Math.floor(Date.now() / 1000)) return null;
    return pl;
  } catch { return null; }
}

export const OPS_USERS: Record<string, { password: string; role: string }> = {
  "jeremy": { password: process.env.OPS_ADMIN_PASSWORD || "PEP@Admin2026!", role: "admin" },
  "admin":  { password: process.env.OPS_ADMIN_PASSWORD || "PEP@Admin2026!", role: "admin" },
  "crew":   { password: process.env.OPS_CREW_PASSWORD  || "PEP@Crew2026!",  role: "crew"  },
  "owner":      { password: process.env.OPS_OWNER_PASSWORD      || "PEP@Owner2026!",  role: "owner"      },
  "supervisor": { password: process.env.OPS_SUPERVISOR_PASSWORD || "PEP@Super2026!", role: "supervisor" },
};
