import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './.agents/playwright/tests',
  fullyParallel: false,
  retries: 2,
  workers: 2,
  reporter: [['json', { outputFile: '.agents/playwright/results/results.json' }], ['list']],
  outputDir: '.agents/playwright/results/artifacts',
  use: {
    baseURL: 'https://xpswebsites.vercel.app',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
      testMatch: ['**/08-mobile-nav.spec.ts'],
    },
  ],
});
