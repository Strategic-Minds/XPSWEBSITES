import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation — Hamburger Menu', () => {

  test('Hamburger button is present and starts closed', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hamburger = page.locator('.mobile-menu-button, [aria-label="Open menu"], button:has-text("Menu")').first();
    await expect(hamburger).toBeAttached({ timeout: 10000 });
    const expanded = await hamburger.getAttribute('aria-expanded');
    expect(expanded).toBe('false');
  });

  test('Hamburger opens drawer with nav links', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hamburger = page.locator('.mobile-menu-button, button:has-text("Menu")').first();
    await hamburger.click();
    await page.waitForTimeout(600);
    const expanded = await hamburger.getAttribute('aria-expanded');
    expect(expanded).toBe('true');
    // At least 2 links appear in the menu root
    const links = page.locator('.mobile-menu-root a');
    expect(await links.count()).toBeGreaterThan(1);
  });

  test('Digital Bid link visible in drawer', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('.mobile-menu-button, button:has-text("Menu")').first().click();
    await page.waitForTimeout(500);
    await expect(page.locator('a:has-text("Digital Bid")').first()).toBeVisible({ timeout: 5000 });
  });

  test('Portal System link visible in drawer', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('.mobile-menu-button, button:has-text("Menu")').first().click();
    await page.waitForTimeout(500);
    await expect(page.locator('a:has-text("Portal System")').first()).toBeVisible({ timeout: 5000 });
  });

  test('Gallery link visible in drawer', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('.mobile-menu-button, button:has-text("Menu")').first().click();
    await page.waitForTimeout(500);
    await expect(page.locator('a:has-text("Gallery")').first()).toBeVisible({ timeout: 5000 });
  });

  test('Drawer closes on toggle or close button', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const hamburger = page.locator('.mobile-menu-button, button:has-text("Menu")').first();
    await hamburger.click();
    await page.waitForTimeout(500);
    // Try close button first
    const closeBtn = page.locator('button:has-text("Close"), [aria-label="Close menu"], .mobile-close').first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    } else {
      await hamburger.click();
    }
    await page.waitForTimeout(500);
    const expanded = await hamburger.getAttribute('aria-expanded');
    expect(expanded).toBe('false');
  });
});

test.describe('Mobile Navigation — Bottom Action Rail', () => {

  test('Mobile action rail is in the DOM', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.mobile-action-rail, nav[aria-label="Mobile quick actions"]').first()).toBeAttached();
  });

  test('Estimate rail link points to /digital-estimator', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const link = page.locator('.mobile-action-rail a[href="/digital-estimator"]');
    await expect(link).toBeAttached();
  });

  test('Call rail link is a tel: link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const callLink = page.locator('.mobile-action-rail a[href^="tel:"]');
    await expect(callLink).toBeAttached();
  });
});

test.describe('Dashboard Pages — Direct Route Access', () => {

  const dashboards = [
    { name: 'Admin Dashboard',       path: '/admin-dashboard'       },
    { name: 'Owner Dashboard',        path: '/owner-dashboard'        },
    { name: 'Crew Leader Dashboard',  path: '/crew-leader-dashboard'  },
    { name: 'Customer Portal',        path: '/customer-portal'        },
    { name: 'Customer Portal Dash',   path: '/customer-portal/dashboard' },
    { name: 'Installer',              path: '/installer'              },
    { name: 'Ops',                    path: '/ops'                    },
  ];

  for (const { name, path } of dashboards) {
    test(`${name} loads without server error`, async ({ page }) => {
      const resp = await page.goto(path, { waitUntil: 'domcontentloaded' });
      expect(resp?.status()).toBeLessThan(500);
    });
  }
});
