// playwright config for CI
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  forbidOnly: true,
  // retries: 2,
  workers: 1,
  reporter: "list",
  timeout: 1200000,
  testDir: "./",
  use: {
    actionTimeout: 10000, // for example click
    navigationTimeout: 60000,
    viewport: null
  },
  expect: { timeout: 10000 },
  projects: [
    {
      /**
       * Use MAC: OSX in the name
       * Use Window: Win in the name
       */
      name: "chrome@latest:OSX@browserstack",
      use: {
        browserName: "chromium"
      }
    }
  ]
};
export default config;
