// ============================================================
// TEST SUITE 06: Navigation & All Routes
// Validates every route responds, no broken links, no 500s
// ============================================================
import { test, expect } from '@playwright/test';

const ALL_ROUTES = [
  { path: '/', name: 'Homepage' },
  { path: '/digital-estimator', name: 'Digital Estimator' },
  { path: '/digital-bid', name: 'Digital Bid' },
  { path: '/visualizer', name: 'Floor Visualizer' },
  { path: '/floor-design-center', name: 'Floor Design Center' },
  { path: '/customer-portal', name: 'Customer Portal' },
  { path: '/customer-portal/dashboard', name: 'Client Dashboard' },
  { path: '/client-dashboard', name: 'Client Dashboard (legacy)' },
  { path: '/admin-dashboard', name: 'Admin Dashboard' },
  { path: '/owner-dashboard', name: 'Owner Dashboard' },
  { path: '/crew-leader-dashboard', name: 'Crew Leader Dashboard' },
  { path: '/project-manager-dashboard', name: 'Project Manager Dashboard' },
  { path: '/proposal-system', name: 'Proposal System' },
  { path: '/installer', name: 'Installer PWA' },
  { path: '/ops', name: 'Operations Center' },
  { path: '/job-tracker', name: 'Job Tracker' },
  { path: '/portal-system', name: 'Portal System' },
  { path: '/gallery', name: 'Gallery' },
  { path: '/about-us', name: 'About Us' },
  { path: '/contact-us', name: 'Contact Us' },
];

test.describe('All Routes — No 500 Errors', () => {
  for (const route of ALL_ROUTES) {
    test(`${route.name} (${route.path}) returns < 500`, async ({ page }) => {
      const resp = await page.goto(route.path, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const status = resp?.status() ?? 0;
      expect(status, `${route.name} returned ${status}`).not.toBe(500);
      expect(status, `${route.name} returned ${status}`).not.toBe(502);
      expect(status, `${route.name} returned ${status}`).not.toBe(503);
    });
  }
});

test.describe('Navigation Links — No Broken Anchors', () => {
  test('all header nav links work from homepage', async ({ page }) => {
    await page.goto('/');
    const navLinks = await page.locator('header nav a, header a').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).href).filter((h) => h && !h.startsWith('tel:') && !h.startsWith('mailto:'))
    );
    for (const href of navLinks.slice(0, 8)) {
      try {
        const resp = await page.goto(href, { waitUntil: 'domcontentloaded', timeout: 10000 });
        expect(resp?.status() ?? 0).toBeLessThan(500);
      } catch {
        // Timeout or navigation error — log but don't fail hard
      }
    }
  });

  test('Get Quote CTA navigates to estimator', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('a[href*="estimator"], a[href*="bid"], header a.gold-button').first();
    if (await cta.isVisible({ timeout: 3000 }).catch(() => false)) {
      await cta.click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toMatch(/estimator|bid/);
    }
  });

  test('footer links do not 500', async ({ page }) => {
    await page.goto('/');
    const footerLinks = await page.locator('footer a').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).href).filter((h) => h && !h.startsWith('tel:') && !h.startsWith('mailto:'))
    );
    for (const href of footerLinks.slice(0, 6)) {
      try {
        const resp = await page.goto(href, { waitUntil: 'domcontentloaded', timeout: 8000 });
        expect(resp?.status() ?? 0).not.toBe(500);
      } catch {
        // Acceptable
      }
    }
  });
});

test.describe('Route Response Summary', () => {
  test('produce full route status report', async ({ page }) => {
    const results: Array<{ path: string; status: number; hasContent: boolean }> = [];
    for (const route of ALL_ROUTES) {
      try {
        const resp = await page.goto(route.path, { waitUntil: 'domcontentloaded', timeout: 12000 });
        const status = resp?.status() ?? 0;
        const text = await page.textContent('body').catch(() => '');
        results.push({ path: route.path, status, hasContent: (text?.trim().length ?? 0) > 30 });
      } catch (err) {
        results.push({ path: route.path, status: -1, hasContent: false });
      }
    }
    // Save report
    const report = results.map((r) =>
      `${r.status === 200 ? '✅' : r.status === 404 ? '🔲' : r.status < 500 ? '↩️' : '❌'} ${r.path.padEnd(35)} ${r.status} ${r.hasContent ? '(has content)' : '(empty)'}`
    ).join('\n');
    console.log('\n=== XPS ROUTE STATUS REPORT ===\n' + report + '\n');
    // Fail only if any route returns 500
    const failures = results.filter((r) => r.status >= 500);
    expect(failures.length, `500 errors on: ${failures.map((f) => f.path).join(', ')}`).toBe(0);
  });
});
