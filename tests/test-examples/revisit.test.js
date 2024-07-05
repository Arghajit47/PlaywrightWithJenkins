import { test, expect } from "@playwright/test";
const url = "https://thinking-tester-contact-list.herokuapp.com/";

test.describe("Testing Contact List Web-Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.waitForLoadState();
  });
  test("Checking visibility of all the elements in the page", async ({
    page,
  }) => {
    await expect(page.locator("h1")).toHaveText("Contact List App");
    await expect(
      page.locator("(//div[@class='welcome-message'])[1]")
    ).toHaveText(
      "  Welcome! This application is for testing purposes only. The database will be purged as needed to keep costs down."
    );
    await expect(
      page.locator("(//div[@class='welcome-message'])[2]")
    ).toHaveText("  The API documentation can be found here.");
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#submit")).toBeVisible();
    await expect(page.locator("(//div/p)[2]")).toContainText(
      "Not yet a user? Click here to sign up!"
    );
    await expect(page.locator("#signup")).toBeEnabled();
  });
  test.skip("Sign up with new user", async ({ page }) => {
    // "Click on Sign Up Button"
    await page.locator("#signup").click();
    await page.waitForLoadState();

    // "Check all the elements present in Add User screen"
    await expect(page.locator("h1")).toHaveText("Add User");
    await expect(page.locator("(//div/p)[1]")).toHaveText(
      "Sign up to begin adding your contacts!"
    );
    await expect(page.locator("#firstName")).toBeVisible();
    await expect(page.locator("#lastName")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#submit")).toBeVisible();
    await expect(page.locator("#cancel")).toBeVisible();

    // "Add all inputs in the fields"
    await page.fill("#firstName", "Jhon");
    await page.locator("#lastName", "Doe");
    await page.fill("#email", "jhon.doe47@gmail.com");
    await page.fill("#password", "jhon.doe@4711");
    await page.locator("#submit").click();
    await page.waitForLoadState();
    await expect(page).toHaveTitle("My Contacts");
  });
  test("Login with newly created user", async ({ page }) => {
    await page.locator("#email").fill("jhon.doe47@gmail.com");
    await page.fill("#password", "jhon.doe@4711");
    await page.locator("#submit").click();
  });
});
