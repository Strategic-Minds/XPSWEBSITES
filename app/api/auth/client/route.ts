import { NextRequest, NextResponse } from "next/server";
import { signToken } from "../../../../lib/auth";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://prhppuuwcnmfdhwsagug.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const TWILIO_SID    = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_TOKEN  = process.env.TWILIO_AUTH_TOKEN || "";
const WA_FROM       = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+15559730487";

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

async function sendWhatsApp(to: string, body: string): Promise<boolean> {
  try {
    const toWA = to.startsWith("whatsapp:") ? to : `whatsapp:+1${to.replace(/\D/g,"")}`;
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64"),
        },
        body: new URLSearchParams({ From: WA_FROM, To: toWA, Body: body }).toString(),
      }
    );
    const data = await res.json();
    if (data.sid) return true;
    console.error("WhatsApp send failed:", data);
    return false;
  } catch (e) {
    console.error("WhatsApp error:", e);
    return false;
  }
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
      return NextResponse.json({ error: "Database error. Try again." }, { status: 500 });
    }

    const leads = await res.json();

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json({
        error: "No account found for that email. Get a free estimate at phoenixepoxypros.com to create your account.",
      }, { status: 401 });
    }

    const lead = leads[0];

    // No token yet — generate one and send via WhatsApp
    if (!lead.dashboard_token) {
      const code = generateCode();
      await supaFetch(`pep_leads?id=eq.${lead.id}`, {
        method: "PATCH",
        body: JSON.stringify({ dashboard_token: code }),
      });

      const phone = lead.phone || "";
      let waSent = false;
      if (phone) {
        const msg = `Hi ${lead.full_name?.split(" ")[0] || "there"} 👋\n\nYour Phoenix Epoxy Pros portal access code is:\n\n*${code}*\n\nGo to your project portal and enter this code to track your job status.\n\n— Phoenix Epoxy Pros Team`;
        waSent = await sendWhatsApp(phone, msg);
      }

      return NextResponse.json({
        error: waSent
          ? "Access code sent to your WhatsApp. Enter it below."
          : `Your access code is: ${code}`,
        code_sent: true,
      }, { status: 401 });
    }

    // Validate code
    if (lead.dashboard_token.toUpperCase() !== password.trim().toUpperCase()) {
      return NextResponse.json({
        error: "Invalid access code. Check your WhatsApp or call 772-209-0266.",
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
