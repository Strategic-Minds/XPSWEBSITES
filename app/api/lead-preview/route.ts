import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const zipPattern = /^\d{5}$/;

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ ok: false, message: 'JSON request required.' }, { status: 415 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });

  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const email = String(body.email || '').trim();
  const zip = String(body.zip || '').trim();
  const consent = String(body.consent || '').trim();

  if (name.length < 2 || phone.length < 7 || !emailPattern.test(email) || !zipPattern.test(zip) || consent !== 'yes') {
    return NextResponse.json(
      { ok: false, message: 'Please provide a valid name, phone, email, five-digit ZIP code, and Preview consent.' },
      { status: 422 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      mode: 'preview_validation_only',
      message: 'Your Phoenix project request passed validation. No live message or sales record was created.',
      receipt: {
        acceptedAt: new Date().toISOString(),
        region: 'Phoenix, Arizona',
        finish: String(body.finish || 'Not specified'),
      },
    },
    { status: 202 }
  );
}
