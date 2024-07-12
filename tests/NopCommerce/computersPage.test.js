import { test } from "@playwright/test";
import { HomePage } from "../../pages/NopCommerce/homePage";
import { ComputersPage } from "../../pages/NopCommerce/computersPage";
import config from "../../data/configuration.json";
let registrationRequired = false;

test.describe("Checking all the Computers Option related functionalities", async () => {
  let Home;
  let Computer;
  test.beforeEach("Login and register user if needed", async ({ page }) => {
    Home = new HomePage(page);
    await Home.gotoWebsite("https://demo.nopcommerce.com/");
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
  test("Visit Desktop Page and Order an Desktop", async ({ page }) => {
    test.slow();
    Computer = new ComputersPage(page);
    await Computer.visitDesktopsPage();
    await Computer.visitSelectedComputerOptionPage(config.desktop);
    await Computer.configureOwnPCAndAddToCart(
      config.desktop,
      config.processor,
      config.ram,
      config.HDD,
      config.OS,
      config.Software
    );
  });
  test("Visit Notebook Page and Order an Notebook", async ({ page }) => {
    test.slow();
    Computer = new ComputersPage(page);
    await Computer.visitNotebooksPage();
    await Computer.addNotebooksIntoCart(config.Notebook);
  });
  test("Visit Software Page and Order an Software", async ({ page }) => {
    test.slow();
    Computer = new ComputersPage(page);
    await Computer.visitSoftwaresPage();
    await Computer.addSoftwareIntoCart(config.software);
  });
});
