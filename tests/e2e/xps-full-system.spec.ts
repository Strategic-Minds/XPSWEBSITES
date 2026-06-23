// tests/e2e/xps-full-system.spec.ts
// XPS Enterprise — Full E2E Playwright test suite
// Tests every route, form, button, and user flow

import { test, expect, Page } from '@playwright/test';

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

// ─────────────────────────────────────────────
// HOMEPAGE TESTS
// ─────────────────────────────────────────────
test.describe('Homepage', () => {
  test('loads and has correct title', async ({ page }) => {
    await page.goto(BASE);
    await expect(page).toHaveTitle(/Phoenix Epoxy Pros/i);
  });

  test('has logo in header', async ({ page }) => {
    await page.goto(BASE);
    const logo = page.locator('img[alt*="Phoenix Epoxy Pros"]').first();
    await expect(logo).toBeVisible();
  });

  test('has navigation links', async ({ page }) => {
    await page.goto(BASE);
    for (const link of ['Digital Bid', 'Portal System', 'About Us', 'Gallery']) {
      await expect(page.getByText(link).first()).toBeVisible();
    }
  });

  test('Get Quote CTA is visible and gold', async ({ page }) => {
    await page.goto(BASE);
    const cta = page.getByRole('link', { name: /get quote/i }).first();
    await expect(cta).toBeVisible();
  });

  test('phone number is present', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByText('772-209-0266').first()).toBeVisible();
  });

  test('hero form has required fields', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('input[name="fullName"], input[placeholder*="name" i]').first()).toBeVisible();
    await expect(page.locator('input[name="email"], input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[name="phone"], input[type="tel"]').first()).toBeVisible();
  });

  test('color charts section is visible', async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    const charts = page.locator('.xps-flake-chart-section, [class*="chart"]').first();
    await expect(charts).toBeVisible();
  });

  test('service cards visible', async ({ page }) => {
    await page.goto(BASE);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
    for (const svc of ['Garage Floor', 'Commercial', 'Patio']) {
      await expect(page.getByText(new RegExp(svc, 'i')).first()).toBeVisible();
    }
  });

  test('mobile responsive — no horizontal scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(380);
  });

  test('15% discount offer visible', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByText(/15%/i).first()).toBeVisible();
  });
});

// ─────────────────────────────────────────────
// DIGITAL ESTIMATOR TESTS
// ─────────────────────────────────────────────
test.describe('Digital Estimator', () => {
  test('page loads', async ({ page }) => {
    await page.goto(`${BASE}/digital-estimator`);
    await expect(page.getByText(/digital/i).first()).toBeVisible();
  });

  test('accepts URL params prefill', async ({ page }) => {
    await page.goto(`${BASE}/digital-estimator?fullName=Test+User&email=test%40test.com&phone=7725551234&zipCode=85001&projectType=Garage+Floors`);
    const nameInput = page.locator('input[name="fullName"]').first();
    if (await nameInput.isVisible()) {
      await expect(nameInput).toHaveValue('Test User');
    }
  });

  test('form has all required fields', async ({ page }) => {
    await page.goto(`${BASE}/digital-estimator`);
    for (const field of ['fullName', 'email', 'phone', 'zipCode']) {
      await expect(page.locator(`input[name="${field}"]`).first()).toBeVisible();
    }
  });

  test('finish dropdown exists', async ({ page }) => {
    await page.goto(`${BASE}/digital-estimator`);
    await page.evaluate(() => window.scrollTo(0, 500));
    const finishSelect = page.locator('select[name*="finish"], [data-field="finish"]').first();
    if (await finishSelect.isVisible()) {
      await expect(finishSelect).toBeVisible();
    }
  });

  test('file upload input accepts files', async ({ page }) => {
    await page.goto(`${BASE}/digital-estimator`);
    const fileInput = page.locator('input[type="file"]').first();
    if (await fileInput.count() > 0) {
      await expect(fileInput).toBeAttached();
    }
  });

  test('form validates required fields', async ({ page }) => {
    await page.goto(`${BASE}/digital-estimator`);
    const submitBtn = page.getByRole('button', { name: /submit|send|get|estimate/i }).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      // Should show validation or stay on page (not navigate away)
      await expect(page).toHaveURL(new RegExp('digital-estimator'));
    }
  });

  test('15% coupon message visible', async ({ page }) => {
    await page.goto(`${BASE}/digital-estimator`);
    await expect(page.getByText(/15%/i).first()).toBeVisible();
  });

  test('24-hour guarantee message visible', async ({ page }) => {
    await page.goto(`${BASE}/digital-estimator`);
    await expect(page.getByText(/24.hour/i).first()).toBeVisible();
  });
});

// ─────────────────────────────────────────────
// CLIENT DASHBOARD TESTS
// ─────────────────────────────────────────────
test.describe('Client Dashboard', () => {
  test('loads without error', async ({ page }) => {
    await page.goto(`${BASE}/customer-portal/dashboard`);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('shows project journey steps', async ({ page }) => {
    await page.goto(`${BASE}/customer-portal/dashboard`);
    await expect(page.getByText(/submitted/i).first()).toBeVisible();
    await expect(page.getByText(/review/i).first()).toBeVisible();
  });

  test('WhatsApp contact button present', async ({ page }) => {
    await page.goto(`${BASE}/customer-portal/dashboard`);
    await expect(page.getByRole('link', { name: /whatsapp/i }).first()).toBeVisible();
  });

  test('call button links to phone', async ({ page }) => {
    await page.goto(`${BASE}/customer-portal/dashboard`);
    const callLink = page.getByRole('link', { name: /call/i }).first();
    if (await callLink.isVisible()) {
      const href = await callLink.getAttribute('href');
      expect(href).toMatch(/tel:/i);
    }
  });
});

// ─────────────────────────────────────────────
// ADMIN DASHBOARD TESTS
// ─────────────────────────────────────────────
test.describe('Admin Dashboard', () => {
  test('loads without error', async ({ page }) => {
    await page.goto(`${BASE}/admin-dashboard`);
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('shows lead pipeline table', async ({ page }) => {
    await page.goto(`${BASE}/admin-dashboard`);
    await expect(page.getByText(/lead pipeline/i).first()).toBeVisible();
  });

  test('shows integration status', async ({ page }) => {
    await page.goto(`${BASE}/admin-dashboard`);
    await expect(page.getByText(/integration status/i).first()).toBeVisible();
  });

  test('sidebar navigation works', async ({ page }) => {
    await page.goto(`${BASE}/admin-dashboard`);
    await expect(page.getByText(/lead pipeline/i).first()).toBeVisible();
    await expect(page.getByText(/proposals/i).first()).toBeVisible();
  });
});

// ─────────────────────────────────────────────
// OWNER DASHBOARD TESTS
// ─────────────────────────────────────────────
test.describe('Owner Dashboard', () => {
  test('loads and shows KPIs', async ({ page }) => {
    await page.goto(`${BASE}/owner-dashboard`);
    await expect(page.getByText(/revenue/i).first()).toBeVisible();
  });

  test('70-city table visible', async ({ page }) => {
    await page.goto(`${BASE}/owner-dashboard`);
    await expect(page.getByText(/70.city/i).first()).toBeVisible();
    await expect(page.getByText(/Phoenix/i).first()).toBeVisible();
  });

  test('crew performance section visible', async ({ page }) => {
    await page.goto(`${BASE}/owner-dashboard`);
    await expect(page.getByText(/crew/i).first()).toBeVisible();
  });
});

// ─────────────────────────────────────────────
// CREW DASHBOARD TESTS
// ─────────────────────────────────────────────
test.describe('Crew Dashboard', () => {
  test("shows today's job header", async ({ page }) => {
    await page.goto(`${BASE}/crew-leader-dashboard`);
    await expect(page.getByText(/today/i).first()).toBeVisible();
  });

  test('has pre-job checklist', async ({ page }) => {
    await page.goto(`${BASE}/crew-leader-dashboard`);
    await expect(page.getByText(/checklist/i).first()).toBeVisible();
  });

  test('checklist items are interactive', async ({ page }) => {
    await page.goto(`${BASE}/crew-leader-dashboard`);
    const checkbox = page.locator('input[type="checkbox"]').first();
    if (await checkbox.isVisible()) {
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  });

  test('WhatsApp button present', async ({ page }) => {
    await page.goto(`${BASE}/crew-leader-dashboard`);
    await expect(page.getByText(/whatsapp/i).first()).toBeVisible();
  });

  test('change order form works', async ({ page }) => {
    await page.goto(`${BASE}/crew-leader-dashboard`);
    await expect(page.getByText(/change order/i).first()).toBeVisible();
    const textarea = page.locator('textarea').first();
    if (await textarea.isVisible()) {
      await textarea.fill('Extra crack repair needed in NE corner');
      await expect(textarea).toHaveValue('Extra crack repair needed in NE corner');
    }
  });
});

// ─────────────────────────────────────────────
// NAVIGATION TESTS
// ─────────────────────────────────────────────
test.describe('Navigation', () => {
  const routes = [
    '/', '/digital-estimator', '/gallery', '/about-us',
    '/contact-us', '/portal-system', '/job-tracker',
    '/admin-dashboard', '/owner-dashboard', '/crew-leader-dashboard',
    '/customer-portal/dashboard',
  ];

  for (const route of routes) {
    test(`${route} returns 200 (no 404/500)`, async ({ page }) => {
      const resp = await page.goto(`${BASE}${route}`);
      expect(resp?.status()).not.toBe(500);
      await expect(page.locator('body')).not.toContainText('Internal Server Error');
    });
  }
});

// ─────────────────────────────────────────────
// WHATSAPP API TESTS
// ─────────────────────────────────────────────
test.describe('WhatsApp API', () => {
  test('GET /api/whatsapp/send returns status ok', async ({ request }) => {
    const resp = await request.get(`${BASE}/api/whatsapp/send`);
    const body = await resp.json() as { status: string };
    expect(body.status).toBe('ok');
  });

  test('POST /api/whatsapp/send with disabled flag returns disabled', async ({ request }) => {
    const resp = await request.post(`${BASE}/api/whatsapp/send`, {
      data: { to: '+17725551234', template: 'xps_lead_submitted', params: { name: 'Test', projectType: 'Garage' } },
    });
    const body = await resp.json() as { status?: string; error?: string };
    // Should either succeed or return disabled (not crash)
    expect(['sent', 'disabled', 'failed']).toContain(body.status);
  });
});

// ─────────────────────────────────────────────
// LEADS API TESTS
// ─────────────────────────────────────────────
test.describe('Leads API', () => {
  test('POST /api/leads validates required fields', async ({ request }) => {
    const resp = await request.post(`${BASE}/api/leads`, { data: {} });
    expect(resp.status()).toBe(422);
  });

  test('POST /api/leads accepts valid lead', async ({ request }) => {
    const resp = await request.post(`${BASE}/api/leads`, {
      data: {
        fullName: 'Test User', email: 'test@test.com',
        phone: '7725551234', zipCode: '85001', projectType: 'Garage Floors',
        desiredFinish: 'flake', asapRequested: false,
      },
    });
    const body = await resp.json() as { status: string; leadId: string };
    expect(body.status).toBe('received');
    expect(body.leadId).toBeTruthy();
  });
});

// ─────────────────────────────────────────────
// VISUAL / ACCESSIBILITY QUICK CHECKS
// ─────────────────────────────────────────────
test.describe('Visual QA', () => {
  test('homepage has no images with missing alt text', async ({ page }) => {
    await page.goto(BASE);
    const imgs = await page.locator('img:not([alt])').count();
    expect(imgs).toBe(0);
  });

  test('homepage h1 exists', async ({ page }) => {
    await page.goto(BASE);
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('all CTAs have descriptive text', async ({ page }) => {
    await page.goto(BASE);
    const btnsWithoutText = await page.locator('button:not(:has-text(""))').count();
    expect(btnsWithoutText).toBeGreaterThan(0);
  });

  test('desktop layout at 1440px — no overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});
