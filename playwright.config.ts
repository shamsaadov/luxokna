import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  // One dev server shared across 4 projects + 6 workers triggers Fast Refresh
  // races. Keep concurrency modest so smoke + responsive tests don't fight.
  workers: 3,
  retries: 1,
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
      testMatch: /(smoke|pass5)\.spec\.ts/,
    },
    {
      name: 'responsive-desktop',
      use: devices['Desktop Chrome'],
      testMatch: /responsive\.spec\.ts/,
    },
    {
      name: 'responsive-iphone',
      use: devices['iPhone 13'],
      testMatch: /responsive\.spec\.ts/,
    },
    {
      name: 'responsive-ipad',
      use: devices['iPad (gen 7)'],
      testMatch: /responsive\.spec\.ts/,
    },
  ],
})
