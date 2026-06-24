export const dynamic = "force-dynamic";

function twiml(body: string) {
  return new Response(body, {
    headers: { "content-type": "text/xml; charset=utf-8" }
  });
}

export async function GET() {
  return Response.json({
    ok: true,
    route: "/api/voice/twilio",
    enabled: process.env.TWILIO_VOICE_ASSISTANT_ENABLED === "true",
    mode: process.env.TWILIO_VOICE_ASSISTANT_ENABLED === "true" ? "approval_gated_live_handler" : "scaffolded_disabled",
    owner: "Chris Lavin",
    purpose: "Inbound receptionist and outbound appointment-setting scaffold. Live calls remain approval-gated."
  });
}

export async function POST() {
  if (process.env.TWILIO_VOICE_ASSISTANT_ENABLED !== "true") {
    return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Matthew-Neural">The X P S voice assistant is installed but not enabled yet. A human team member will follow up.</Say>
</Response>`);
  }

  return twiml(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" method="POST" action="/api/voice/twilio" timeout="4" speechTimeout="auto">
    <Say voice="Polly.Matthew-Neural">Thank you for calling Xtreme Polishing Systems. Please say whether you need a quote, project update, training information, store support, or to reach Chris.</Say>
  </Gather>
  <Say voice="Polly.Matthew-Neural">I did not catch that. I will route this to the team for follow up.</Say>
</Response>`);
}
