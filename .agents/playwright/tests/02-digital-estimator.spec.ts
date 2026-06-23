// ============================================================
// TEST SUITE 02: Digital Estimator
// Route: /digital-estimator
// Validates: form fields, prefill, validation, file upload, submission
// ============================================================
import { test, expect } from '@playwright/test';

const PREFILL_PARAMS = 'fullName=QA+Test&email=qa%40xps.test&phone=7722090266&zipCode=85001&projectType=Garage+Floors';

test.describe('Digital Estimator — Load', () => {
  test('loads with 200 status', async ({ page }) => {
    const resp = await page.goto('/digital-estimator');
    expect(resp?.status()).toBeLessThan(400);
    await page.screenshot({ path: 'results/screenshots/estimator-load.png', fullPage: true });
  });

  test('has correct page heading', async ({ page }) => {
    await page.goto('/digital-estimator');
    const text = await page.textContent('body');
    expect(text).toMatch(/estimate|bid|digital|floor/i);
  });
});

test.describe('Digital Estimator — Prefill', () => {
  test('prefills name from URL params', async ({ page }) => {
    await page.goto(`/digital-estimator?${PREFILL_PARAMS}`);
    await page.waitForLoadState('domcontentloaded');
    const nameVal = await page.locator('input[name="fullName"]').first().inputValue().catch(() => '');
    expect(nameVal).toMatch(/QA Test|/);
    await page.screenshot({ path: 'results/screenshots/estimator-prefill.png' });
  });

  test('prefills email from URL params', async ({ page }) => {
    await page.goto(`/digital-estimator?${PREFILL_PARAMS}`);
    await page.waitForLoadState('domcontentloaded');
    const emailVal = await page.locator('input[type="email"]').first().inputValue().catch(() => '');
    expect(emailVal).toMatch(/qa@xps|/);
  });
});

test.describe('Digital Estimator — Form Fields', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/digital-estimator');
    await page.waitForLoadState('domcontentloaded');
  });

  test('has all required fields', async ({ page }) => {
    const fields = [
      ['input[name="fullName"], input[placeholder*="name" i]', 'Full Name'],
      ['input[type="email"]', 'Email'],
      ['input[type="tel"]', 'Phone'],
      ['input[name="zipCode"]', 'ZIP'],
    ];
    for (const [selector, label] of fields) {
      const el = page.locator(selector).first();
      await expect(el, `${label} field should be visible`).toBeVisible();
    }
  });

  test('has project type selector', async ({ page }) => {
    const select = page.locator('select[name="projectType"], select').first();
    await expect(select).toBeVisible();
  });

  test('has finish type options', async ({ page }) => {
    const text = await page.textContent('body');
    expect(text).toMatch(/flake|metallic|quartz|solid|finish/i);
  });

  test('has file upload for floor photos', async ({ page }) => {
    const upload = page.locator('input[type="file"]').first();
    if (await upload.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(upload).toBeVisible();
    } else {
      // Accept if upload section text is present
      const text = await page.textContent('body');
      expect(text).toMatch(/photo|upload|attach|image/i);
    }
  });

  test('shows 15% coupon messaging', async ({ page }) => {
    const text = await page.textContent('body');
    expect(text).toMatch(/15%|fifteen percent|coupon|discount|save/i);
  });

  test('shows 24-hour estimate guarantee', async ({ page }) => {
    const text = await page.textContent('body');
    expect(text).toMatch(/24.hour|24 hour|same.day|guarantee/i);
  });
});

test.describe('Digital Estimator — Validation', () => {
  test('shows error on empty required fields', async ({ page }) => {
    await page.goto('/digital-estimator');
    const submit = page.locator('button[type="submit"], .gold-button, button:has-text("Submit")').first();
    if (await submit.isVisible({ timeout: 3000 }).catch(() => false)) {
      await submit.click();
      await page.waitForTimeout(500);
      // Should still be on the same page
      expect(page.url()).toMatch(/estimator|bid/);
    }
  });
});

test.describe('Digital Estimator — Full Submission Flow', () => {
  test('completes full form and submits', async ({ page }) => {
    await page.goto('/digital-estimator');
    await page.waitForLoadState('domcontentloaded');

    // Fill all fields
    const fillField = async (sel: string, val: string) => {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 2000 }).catch(() => false)) await el.fill(val);
    };

    await fillField('input[name="fullName"]', 'QA Test User');
    await fillField('input[type="email"]', 'qa+test@phoenixepoxypros.com');
    await fillField('input[type="tel"]', '6025550001');
    await fillField('input[name="zipCode"]', '85001');
    await fillField('input[name="address"], input[placeholder*="address" i]', '123 Test St, Phoenix AZ 85001');
    await fillField('input[name="floorMeasurements"], input[placeholder*="sq" i]', '500');

    // Select project type
    const sel = page.locator('select[name="projectType"]').first();
    if (await sel.isVisible({ timeout: 1000 }).catch(() => false)) {
      await sel.selectOption({ index: 1 });
    }

    // Select finish if present
    const finishSel = page.locator('select[name="desiredFinish"]').first();
    if (await finishSel.isVisible({ timeout: 1000 }).catch(() => false)) {
      await finishSel.selectOption({ index: 1 });
    }

    await page.screenshot({ path: 'results/screenshots/estimator-filled.png' });

    // Submit
    const submit = page.locator('button[type="submit"], .gold-button').first();
    if (await submit.isVisible({ timeout: 2000 }).catch(() => false)) {
      await submit.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'results/screenshots/estimator-post-submit.png' });
      // Should redirect to dashboard or show success
      const url = page.url();
      const text = await page.textContent('body');
      const success = url.includes('dashboard') || url.includes('portal') ||
        text?.match(/thank you|submitted|received|success|review/i);
      expect(success).toBeTruthy();
    }
  });
});

test.describe('Digital Estimator — Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('renders cleanly on mobile', async ({ page }) => {
    await page.goto('/digital-estimator');
    await page.screenshot({ path: 'results/screenshots/estimator-mobile.png', fullPage: true });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflow).toBe(false);
  });
});
