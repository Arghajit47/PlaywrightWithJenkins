import { expect, test } from "@playwright/test";

const phoneName = "Apple iPhone 15";
const phoneColor = "Pink";
const phoneStorage = "128 GB";

test.describe("Testing Flipkart Scenario", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.flipkart.com");
    await page.waitForLoadState();
  });

  test("Add the phone in flipkart to the cart", async ({ page, context }) => {
    await page.locator("//input[@name='q']").fill(phoneName);
    await page.keyboard.press("Enter");
    await page.waitForLoadState();

    // Wait for the product to appear
    await page.waitForSelector(
      `//div[text()='${phoneName} (${phoneColor}, ${phoneStorage})']/parent::div/parent::div/parent::a`
    );

    // Click on the product to open it in a new tab
    await page.click(
      `//div[text()='${phoneName} (${phoneColor}, ${phoneStorage})']/parent::div/parent::div/parent::a`
    );

    // Wait for a new page to be created
    const newPage = await context.waitForEvent("page");
    await newPage.waitForLoadState();

    // Perform actions on the new page
    await newPage.waitForSelector("//button[text()='Add to cart']");
    await newPage.click("//button[text()='Add to cart']");
    await newPage.waitForLoadState();

    // Assert that the product is added to the cart
    await expect(
      newPage.locator(
        `//a[text()='${phoneName} (${phoneColor}, ${phoneStorage})']`
      )
    ).toBeVisible();
  });
});
