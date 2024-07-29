import { defineConfig, devices } from '@playwright/test'

export const setupDir = 'playwright/.setup'
export const setupFile = `${setupDir}/user.json`

export default defineConfig({
  fullyParallel: true,

  // Reporters generate test reports. See https://playwright.dev/docs/test-reporters
  // Generate a dot report and an HTML report (but do not open the HTML report after the test).
  reporter: [['dot'], ['html', { open: 'never' }]],

  testMatch: '**/*.test.ts',

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions
  use: {
    // For CI, you may want to set BASE_URL to the deployed application.
    baseURL: 'http://localhost:8080/',

    ignoreHTTPSErrors: true,

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'retain-on-failure',

    // Change the default data-testid attribute.
    testIdAttribute: 'data-testid',

    // Capture screenshot after each test failure.
    // screenshot: "only-on-failure",

    // Record video only when retrying a test for the first time.
    // video: "on-first-retry",

    // Bypass content security policy (CSP) for every page. See https://playwright.dev/docs/api/class-testoptions#test-options-bypass-csp
    bypassCSP: true,
  },

  projects: [
    // Setup project
    { name: 'setup', testMatch: '**/*.setup.ts' },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        storageState: setupFile,
      },
      dependencies: ['setup'],
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: `npm run dev`,
    port: 8080,
    reuseExistingServer: true,
    ignoreHTTPSErrors: true,
    // Wait for the server to respond before starting the tests.
    timeout: 3 * 60 * 1000,
  },
})
