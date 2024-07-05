import { test, expect } from "@playwright/test";

test.describe("Performing Actions", () => {
  test("Actions Handling Dropdown", async ({ page }) => {
    await page.goto(
      "https://globalsqa.com/demo-site/select-dropdown-menu/#google_vignette"
    );
    await page.waitForLoadState();
    const n = await page.$$("//select/option");
    console.log(n.length);
    for (var i = 1; i <= n.length; i++) {
      let name = await page.locator(`(//select/option)[${i}]`).textContent();
      console.log(name);
    }
    await page.locator("//select").selectOption("India");
  });
});

test("API Testing", async ({ request }) => {
  const response = await request.get("https://randomuser.me/api/?results=1");
  await expect(response).toBeOK();
  await expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);

  await expect(responseBody.info).toBeTruthy();
  await expect(responseBody.info.version).toBe("1.4");
});
