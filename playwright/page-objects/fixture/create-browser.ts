import cp from "child_process";
import { test as base, chromium } from "@playwright/test";

export const test = base.extend({
  browser: async ({ browser }, use, testInfo) => {
    if (testInfo.project.name.match(/browserstack/)) {
      const isMac = !!testInfo.project.name.match(/OSX/);
      const clientPlaywrightVersion = cp
        .execSync("npx playwright --version")
        .toString()
        .trim()
        .split(" ")[1]; // This is used to get the installed Playwright version on you machine. The same needs to be passed on to BrowserStack so that proper request-response mapping can be done for mismatched client and server Playwright versions in the same test

      const isSnapshotUrl = process.env.URL?.includes("autocad-web-snapshots");
      const isLocalTesting = !process.env.URL;
      const disableCors = isSnapshotUrl || isLocalTesting;

      const caps = {
        browser: "chrome",
        browser_version: "latest",
        os: isMac ? "osx" : "Windows",
        os_version: isMac ? "Mojave" : "11",
        resolution: "1600x1200",
        build: process.env.URL,
        "browserstack.username": process.env.BROWSERSTACK_USERNAME,
        "browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY,
        "browserstack.console": "verbose",
        "browserstack.networkLogs": true,
        "browserstack.networkLogsOptions": {
          captureContent: "true"
        },
        "browserstack.wsLocalSupport": "true",
        "client.playwrightVersion": clientPlaywrightVersion,
        "goog:chromeOptions": {
          args: disableCors ? ["--no-sandbox", "--disable-web-security"] : ["--no-sandbox"]
        }
      };
      const vBrowser = await chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
          JSON.stringify(caps)
        )}`
      });
      await use(vBrowser);
      await vBrowser.close();
    } else {
      use(browser);
    }
  }
});
