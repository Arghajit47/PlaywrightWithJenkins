import { test, expect } from "@playwright/test";

const category = "Mobiles";
const subCategory = "Electronics";
const option = "Samsung";

test("WebPage Testing", async ({ page }) => {
  // Get the viewport size
  const viewportSize = page.viewportSize();

  if (viewportSize.width <= 480) {
    // Typical condition for mobile
    console.warn("Running in mobile view");
    // Mobile-specific actions
    await page.goto("https://www.flipkart.com/");
    await page.waitForLoadState();
    await page.click("#product-2");
    await page.waitForLoadState();
    await page.click(`(//*[@id="_parentCtr_"]/div[5]//div[6]//div)[1]`);
    await page.waitForLoadState();
  } else {
    console.warn("Running in desktop view");
    // Desktop-specific actions
    await page.goto("https://www.flipkart.com/");
    await page.waitForLoadState();
    await page.click(`//a[@aria-label='${category}']`);
    await page.waitForLoadState();
    await page.locator(`//div//span[text()='${subCategory}']`).click();
    await page.click(`//div//a[@title='${option}']`);
    await page.waitForLoadState();
    await expect(
      page.locator(`//div//h1[text()='${option} Mobile Phones']`)
    ).toBeVisible();
  }
});
