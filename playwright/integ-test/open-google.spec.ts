import { Page } from "@playwright/test";

import { test } from "../page-objects/fixture/create-browser";
import { printBrowserStackBrowserURL } from "../page-objects/utils/bs-utils";

test.describe("open google website", () => {
  let page: Page;

  test.beforeAll(async ({ browser }, testInfo) => {
    page = await browser.newPage();

    if (testInfo.project.name.match(/browserstack/)) {
      await printBrowserStackBrowserURL(page, "network-handler.spec");
    }
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("open site", async () => {
    await page.goto("https://www.google.com");
  });
});
