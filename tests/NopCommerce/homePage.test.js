import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/NopCommerce/homePage";
let registrationRequired = false;

test.describe("Testing Homepage", async () => {
  let Home;
  test.beforeEach(async ({ page }) => {
    Home = new HomePage(page);
    await Home.gotoWebsite("https://demo.nopcommerce.com/");
  });
  test("Checking the title of the page", async () => {
    await Home.verifyHomePageTitle("nopCommerce demo store");
  });
  test("Checking all the elements of the Home Page", async () => {
    await Home.verifyHomePage();
  });
  test("Testing for broken links if available", async ({ page }) => {
    test.setTimeout(1500000);
    const baseURL = "https://demo.nopcommerce.com"; // Replace with your website's base URL

    // Collect all links
    const links = await page.$$eval("a", (anchors) =>
      anchors.map((anchor) => anchor.href)
    );

    // Filter out links that are fragments or don't start with http/https
    const validLinks = links.filter(
      (href) =>
        href &&
        !href.includes("#") &&
        (href.startsWith(baseURL) || href.startsWith("http"))
    );

    console.log(`Found ${validLinks.length} valid links.`);

    for (const link of validLinks) {
      const href = link.startsWith("/") ? `${baseURL}${link}` : link;
      try {
        const response = await fetch(href, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
          timeout: 10000, // Set a timeout for the request
        });

        expect(response.status).toBeLessThan(400);
        console.log(`Valid link: ${href} - Status: ${response.status}`);
      } catch (error) {
        console.error(`Error with link: ${href} - Message: ${error.message}`);
      }
    }
  });

  test("Check out all the featured items in Store Home Page", async ({
    page,
  }) => {
    const items = await page.$$("//h2//a");
    for (var i = 1; i <= items.length; i++) {
      console.log(await page.locator(`(//h2//a)[${i}]`).innerText());
    }
  });

  test("Login and register user if needed", async () => {
    const email = "arghajitsingha4@gmail.com";
    const password = "Parker@123";
    const registrationSuccessful = await Home.attemptLogin(email, password);

    if (!registrationSuccessful) {
      console.log("Login failed. Registering a new user...");

      await Home.clickOnRegisterOption();
      await Home.registerNewUser(
        "Arghajit",
        "Singha",
        "19",
        "11",
        "1999",
        email,
        password,
        "Your registration completed"
      );

      console.log("Retrying login with new registration...");
      await Home.clickOnLoginOption();
      await Home.loginToApplication(email, password);
      await Home.verifyHomePage("After Login");
    }
  });
  test("Checking All Navber elements", async ({ page }) => {
    const navbarItems = await page.$$(".header-menu > .notmobile > li > a");
    const menuItems = await page.$$eval(
      ".header-menu > .notmobile > li > a",
      (anchors) => {
        return anchors.map((anchor) => anchor.textContent.trim());
      }
    );
    console.log(menuItems.toLocaleString());
    for (var i = 0; i < navbarItems.length; i++) {
      await page
        .locator(`(//a[contains(text(),'${menuItems[i]}')])[1]`)
        .hover();
      let subMenus = await page.$$eval(
        `//div[@class='header-menu']//ul[@class='top-menu notmobile']//a[contains(text(),'${menuItems[i]}')]/following-sibling::ul//a`,
        (anchors) => {
          return anchors.map((anchor) => anchor.textContent.trim());
        }
      );
      console.log(subMenus.toLocaleString());
    }
  });
});
