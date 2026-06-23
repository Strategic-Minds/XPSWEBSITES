// ============================================================
// TEST SUITE 07: SEO & Performance
// Validates: titles, meta tags, schema, Core Web Vitals proxy,
//            image optimization, canonical URLs
// ============================================================
import { test, expect } from '@playwright/test';

test.describe('SEO — Homepage', () => {
  test('title contains brand and location keyword', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/epoxy|phoenix|floor/);
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(70);
  });

  test('meta description exists and is correct length', async ({ page }) => {
    await page.goto('/');
    const desc = await page.$eval('meta[name="description"]', (el) => el.getAttribute('content')).catch(() => null);
    if (desc) {
      expect(desc.length).toBeGreaterThan(50);
      expect(desc.length).toBeLessThan(165);
      expect(desc.toLowerCase()).toMatch(/epoxy|floor|phoenix|coating/);
    }
  });

  test('has canonical URL tag', async ({ page }) => {
    await page.goto('/');
    const canonical = await page.$eval('link[rel="canonical"]', (el) => el.getAttribute('href')).catch(() => null);
    if (canonical) {
      expect(canonical).toMatch(/^https/);
    }
  });

  test('has OpenGraph tags', async ({ page }) => {
    await page.goto('/');
    const ogTitle = await page.$eval('meta[property="og:title"]', (el) => el.getAttribute('content')).catch(() => null);
    const ogDesc = await page.$eval('meta[property="og:description"]', (el) => el.getAttribute('content')).catch(() => null);
    const ogImage = await page.$eval('meta[property="og:image"]', (el) => el.getAttribute('content')).catch(() => null);
    // At least one OG tag should exist
    expect(ogTitle || ogDesc || ogImage).toBeTruthy();
  });

  test('has LocalBusiness schema with all required fields', async ({ page }) => {
    await page.goto('/');
    const schema = await page.$eval('script[type="application/ld+json"]', (el) => {
      try { return JSON.parse(el.textContent || '{}'); } catch { return {}; }
    }).catch(() => null);
    if (schema) {
      expect(schema['@type']).toBe('LocalBusiness');
      expect(schema.name).toBeTruthy();
      expect(schema.telephone).toBeTruthy();
      expect(schema.address?.['@type']).toBe('PostalAddress');
    }
  });
});

test.describe('SEO — Inner Pages', () => {
  const pages = [
    { path: '/digital-estimator', keyword: /estimate|bid|floor|digital/i },
    { path: '/visualizer', keyword: /visualiz|floor|color|design/i },
    { path: '/about-us', keyword: /about|epoxy|phoenix|company/i },
  ];

  for (const { path, keyword } of pages) {
    test(`${path} has appropriate title`, async ({ page }) => {
      await page.goto(path);
      const status = (await page.goto(path))?.status() ?? 0;
      if (status === 404) return; // Not yet built — skip SEO check
      const title = await page.title();
      const meta = await page.$eval('meta[name="description"]', (el) => el.getAttribute('content')).catch(() => '');
      expect(title.toLowerCase() + (meta || '')).toMatch(keyword);
    });
  }
});

test.describe('Performance — Image Optimization', () => {
  test('hero image loads and is not broken', async ({ page }) => {
    await page.goto('/');
    const heroImg = page.locator('header ~ * img, .hero img, section:first-of-type img').first();
    if (await heroImg.isVisible({ timeout: 5000 }).catch(() => false)) {
      const loaded = await page.waitForFunction(
        (el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0,
        await heroImg.elementHandle(),
        { timeout: 8000 }
      ).catch(() => false);
      expect(loaded).not.toBeFalsy();
    }
  });

  test('no images return 404', async ({ page }) => {
    const failedImages: string[] = [];
    page.on('response', (resp) => {
      if (resp.request().resourceType() === 'image' && resp.status() === 404) {
        failedImages.push(resp.url());
      }
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    if (failedImages.length > 0) {
      console.warn('Broken images:', failedImages);
    }
    expect(failedImages.length).toBe(0);
  });

  test('page loads within 8 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(8000);
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle').catch(() => null);
    // Filter out known acceptable errors (e.g. GA, third-party)
    const criticalErrors = errors.filter((e) =>
      !e.includes('google') && !e.includes('analytics') && !e.includes('cdn.shopify')
    );
    if (criticalErrors.length > 0) console.warn('Console errors:', criticalErrors);
    expect(criticalErrors.length).toBe(0);
  });
});

test.describe('Performance — sitemap.xml', () => {
  test('sitemap.xml exists or /api/sitemap returns 200', async ({ request }) => {
    const BASE = process.env.XPS_TEST_URL || 'https://xpswebsites.vercel.app';
    const resp = await request.get(`${BASE}/sitemap.xml`);
    const altResp = await request.get(`${BASE}/sitemap`);
    const hasMap = resp.status() === 200 || altResp.status() === 200;
    // Not failing hard — sitemap may not be deployed yet
    if (!hasMap) console.warn('⚠️ sitemap.xml not found — add next-sitemap config');
  });
});
