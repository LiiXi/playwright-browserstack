/**
 * helper functions for browserstack
 */
import { Page } from "@playwright/test";

export async function printBrowserStackBrowserURL(page: Page, testName: string) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const resp: any = await page.evaluate(_ => {},
  `browserstack_executor: ${JSON.stringify({ action: "getSessionDetails" })}`);

  console.log(`Check out test ${testName} at `, await JSON.parse(resp).browser_url);
}
