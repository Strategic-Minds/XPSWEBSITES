// app/lib/whatsapp.ts
// Server-side WhatsApp helper — call this from other routes
// Do not import from app/api/whatsapp/send/route.ts

export async function sendWhatsApp(
  to: string,
  template: string,
  params: Record<string, string>,
  meta?: { leadId?: string; jobId?: string }
): Promise<boolean> {
  if (!process.env.WHATSAPP_ENABLED || process.env.WHATSAPP_ENABLED !== 'true') {
    return false;
  }
  if (!to) return false;
  
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resp = await fetch(`${appUrl}/api/whatsapp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, template, params, ...meta }),
    });
    return resp.ok;
  } catch (err) {
    console.error('WhatsApp send error:', err);
    return false;
  }
}
