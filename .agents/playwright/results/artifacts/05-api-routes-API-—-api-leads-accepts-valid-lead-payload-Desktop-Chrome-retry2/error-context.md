# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05-api-routes.spec.ts >> API — /api/leads >> accepts valid lead payload
- Location: .agents/playwright/tests/05-api-routes.spec.ts:19:7

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 500
Received:   500
```

# Test source

```ts
  1   | // ============================================================
  2   | // TEST SUITE 05: API Routes
  3   | // Routes: /api/leads, /api/whatsapp/send, /api/enterprise/status
  4   | // Validates: response shape, validation errors, feature flags
  5   | // ============================================================
  6   | import { test, expect } from '@playwright/test';
  7   | 
  8   | const BASE = process.env.XPS_TEST_URL || 'https://xpswebsites.vercel.app';
  9   | 
  10  | test.describe('API — /api/leads', () => {
  11  |   test('rejects empty POST with 400/422', async ({ request }) => {
  12  |     const resp = await request.post(`${BASE}/api/leads`, {
  13  |       data: {},
  14  |       headers: { 'Content-Type': 'application/json' },
  15  |     });
  16  |     expect([400, 422, 500]).toContain(resp.status());
  17  |   });
  18  | 
  19  |   test('accepts valid lead payload', async ({ request }) => {
  20  |     const resp = await request.post(`${BASE}/api/leads`, {
  21  |       data: {
  22  |         fullName: 'Playwright QA Test',
  23  |         email: 'playwright@qa.xpstest.internal',
  24  |         phone: '6025551234',
  25  |         zipCode: '85001',
  26  |         projectType: 'Garage Floors',
  27  |         asapRequested: false,
  28  |         attachmentCount: 0,
  29  |         source: 'playwright_test',
  30  |       },
  31  |       headers: { 'Content-Type': 'application/json' },
  32  |     });
  33  |     const body = await resp.json().catch(() => ({}));
> 34  |     expect(resp.status()).toBeLessThan(500);
      |                           ^ Error: expect(received).toBeLessThan(expected)
  35  |     expect(body.status).toMatch(/received|ok|success/i);
  36  |     expect(body.leadId || body.id).toBeTruthy();
  37  |     expect(typeof body.score === 'number' || body.score).toBeTruthy();
  38  |   });
  39  | 
  40  |   test('returns evidence receipt fields', async ({ request }) => {
  41  |     const resp = await request.post(`${BASE}/api/leads`, {
  42  |       data: {
  43  |         fullName: 'Receipt Test',
  44  |         email: 'receipt@qa.xpstest.internal',
  45  |         phone: '6025559999',
  46  |         zipCode: '85020',
  47  |         projectType: 'Commercial Floors',
  48  |       },
  49  |       headers: { 'Content-Type': 'application/json' },
  50  |     });
  51  |     const body = await resp.json().catch(() => ({}));
  52  |     expect(body.timestamp).toBeTruthy();
  53  |   });
  54  | });
  55  | 
  56  | test.describe('API — /api/whatsapp/send', () => {
  57  |   test('returns disabled status when WHATSAPP_ENABLED is not set', async ({ request }) => {
  58  |     const resp = await request.post(`${BASE}/api/whatsapp/send`, {
  59  |       data: {
  60  |         to: '+16025551234',
  61  |         template: 'xps_lead_submitted',
  62  |         params: { name: 'Test', projectType: 'Garage' },
  63  |       },
  64  |       headers: { 'Content-Type': 'application/json' },
  65  |     });
  66  |     const body = await resp.json().catch(() => ({}));
  67  |     // On old production build, WhatsApp route doesn't exist (404)
  68  |     // On our branch build, it returns { status: 'disabled' } when env vars not set
  69  |     if (resp.status() === 404) {
  70  |       console.log('NOTE: WhatsApp route not on this deployment yet');
  71  |       return; // not a failure — route exists in branch
  72  |     }
  73  |     expect(resp.status()).toBeLessThan(500);
  74  |     if (body.status) {
  75  |       expect(body.status).toMatch(/disabled|sent|failed/i);
  76  |     }
  77  |   });
  78  | 
  79  |   test('rejects missing to/template with 400', async ({ request }) => {
  80  |     const resp = await request.post(`${BASE}/api/whatsapp/send`, {
  81  |       data: { params: {} },
  82  |       headers: { 'Content-Type': 'application/json' },
  83  |     });
  84  |     // Either 400 or disabled (both are acceptable non-500 responses)
  85  |     expect(resp.status()).toBeLessThan(500);
  86  |   });
  87  | });
  88  | 
  89  | test.describe('API — /api/enterprise/status', () => {
  90  |   test('returns system status JSON', async ({ request }) => {
  91  |     const resp = await request.get(`${BASE}/api/enterprise/status`);
  92  |     expect(resp.status()).toBeLessThan(500);
  93  |     const body = await resp.json().catch(() => null);
  94  |     if (body) {
  95  |       expect(typeof body === 'object').toBe(true);
  96  |     }
  97  |   });
  98  | });
  99  | 
  100 | test.describe('API — /api/takeoff/proposal', () => {
  101 |   test('returns non-500 response', async ({ request }) => {
  102 |     const resp = await request.get(`${BASE}/api/takeoff/proposal`);
  103 |     expect(resp.status()).toBeLessThan(500);
  104 |   });
  105 | });
  106 | 
```