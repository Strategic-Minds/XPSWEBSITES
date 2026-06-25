import { NextRequest, NextResponse } from "next/server";

const HS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_API_KEY || "";
const SUPA = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function supaGet(path: string) {
  const res = await fetch(`${SUPA}/rest/v1/${path}`, {
    headers: { "apikey": KEY, "Authorization": `Bearer ${KEY}` },
  });
  return res.json();
}

async function supaUpdate(table: string, id: string, data: Record<string,unknown>) {
  await fetch(`${SUPA}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers: { "apikey": KEY, "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function hsUpsertContact(lead: Record<string, unknown>) {
  const props = {
    email:     lead.email || "",
    firstname: (lead.full_name as string || "").split(" ")[0],
    lastname:  (lead.full_name as string || "").split(" ").slice(1).join(" "),
    phone:     lead.phone || "",
    zip:       lead.zip_code || "",
    hs_lead_status: lead.status === "new" ? "NEW" : "IN_PROGRESS",
    notes_last_contacted: lead.notes || "",
  };

  // Try to find existing contact by email
  if (lead.hubspot_contact_id) {
    const res = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${lead.hubspot_contact_id}`, {
      method: "PATCH",
      headers: { "Authorization": `Bearer ${HS_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ properties: props }),
    });
    return res.json();
  }

  // Create new contact
  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: { "Authorization": `Bearer ${HS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ properties: props }),
  });
  return res.json();
}

export async function POST(req: NextRequest) {
  const { lead_id } = await req.json().catch(() => ({}));

  try {
    const leads = lead_id
      ? await supaGet(`pep_leads?id=eq.${lead_id}&select=*`)
      : await supaGet(`pep_leads?hubspot_contact_id=is.null&select=*&limit=50`);

    const leadsArr = Array.isArray(leads) ? leads : [];
    let synced = 0; let errors = 0;

    for (const lead of leadsArr as Record<string,unknown>[]) {
      const result = await hsUpsertContact(lead);
      if (result?.id) {
        await supaUpdate("pep_leads", lead.id as string, { hubspot_contact_id: result.id });
        synced++;
      } else {
        errors++;
        console.error("HubSpot error:", result?.message || result);
      }
    }

    return NextResponse.json({ ok: true, synced, errors, total: leadsArr.length });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "HubSpot sync active", token_set: !!HS_TOKEN });
}
