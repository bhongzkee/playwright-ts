import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';


const config: PlaywrightTestConfig = {
  workers: 4, // run tests with 3 parallel workers
  timeout: 40 * 1000,  // 3 minutes per test
  testDir: './src/tests',


  /* Run tests in files in parallel */
  fullyParallel: true,


  reporter: [
    ['list'], // default console reporter
    // ['allure-playwright', { resultsDir: './allure-reports/allure-results' }],
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
  ],


  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://demoqa.com',
    trace: 'retain-on-failure',    //for playwright trace viewer
    headless: true,
    screenshot: 'only-on-failure',
    actionTimeout: 10000, // 10 seconds for each action
  
  },


  // This sets the default timeout for ALL expect() checks
  expect: {
    timeout: 10000, // 10 seconds
  },



  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chromium Browser',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'Firefox Browser',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'Safari Webkit Browser',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],



};

export default defineConfig(config);
