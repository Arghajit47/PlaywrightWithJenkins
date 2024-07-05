import { test, expect, chromium } from "@playwright/test";
import { BasePage } from "../../pages/basePage";

test.describe("Enter all personal Details", async () => {
  let browser;
  let page;
  let basePage;
  test.beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    basePage = new BasePage(page);
    await basePage.navigateToUrl("https://testautomationpractice.blogspot.com");
  });

  test("See the Page", async () => {
    await basePage.verifyTitle("Automation Testing Practice");
  });

  test("Enter Name, Email, Phone, Address", async () => {
    await basePage.enterInInputFields("#name", "Arghajit");
    await basePage.enterInInputFields("#email", "arghajitsingha@4711");
    await basePage.enterInInputFields("#phone", "7908985664");
    await basePage.enterInInputFields("#textarea", "Noida");
  });

  test("Select Gender, Male", async () => {
    await basePage.checkTheBox("//input[@id='male']");
    await basePage.verifyNotChecked("//input[@id='female']");
  });

  test("Select Day, Monday", async () => {
    await basePage.checkTheBox("//input[@id='monday']");
    await basePage.verifyNotChecked("//input[@id='tuesday']");
  });

  test("Select Country", async () => {
    await basePage.selectFromDropdown("//select[@id='country']", "india");
  });

  test("Select Color", async () => {
    await basePage.selectFromDropdown("//select[@id='colors']", "green");
  });

  test("Select Date-Picker", async () => {
    await basePage.enterInInputFields("//input[@id='datepicker']", "1/2/1998");
  });

  test("Clicking on New Url", async () => {
    await basePage.clickOnElement("//div/a[contains(text(),'open cart')]");
    await basePage.verifyTitle("Your Store");
    await basePage.navigateBack();
    await basePage.clickOnElement("//div/a[contains(text(),'orange HRM')]");
    await basePage.verifyTitle("OrangeHRM");
  });

  test("Inputing data in IFrame", async () => {
    const allFrames = await page.frames();
    console.log(allFrames.length);
    const frame = await page.frameLocator("#frame-one796456169");

    const inputBox = frame.locator(
      "//div[@id='q0']//input[contains(@id, 'RESULT_TextField')]"
    );
    await inputBox.fill("Admin");

    const selectGender = await frame.locator(
      "//div[@id='q2']//input[@value='Radio-0']/following::label[text()='Male']"
    );
    await selectGender.click();

    const datePicker = await frame.locator(
      "//div[@id='q4']//input[contains(@id, 'RESULT_TextField')]"
    );
    await datePicker.fill("04/03/2024");

    const selectJob = await frame.locator(
      "//div[@id='q3']//select[contains(@id, 'RESULT_RadioButton')]"
    );
    await selectJob.selectText("Automation Engineer");

    const submitButton = await frame.locator("#FSsubmit");
    await submitButton.click();
  });

  test.afterEach(async () => {
    await basePage.closeBrowser();
  });
});

test("Handle new window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const basePage = new BasePage(page);
  await basePage.navigateToUrl(
    "https://freelance-learn-automation.vercel.app/login"
  );
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("(//a[contains(@href,'facebook')])[1]").click(),
  ]);
});

test("Handle New Page Window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const basePage = new BasePage(page);
  await basePage.navigateToUrl("https://testautomationpractice.blogspot.com");
  await basePage.clickOnElement("//div/button[text()='New Browser Window']");
  const [newPage] = await Promise.all([context.waitForEvent("page")]);
  await newPage.waitForLoadState();
  let bP = new BasePage(newPage);
  await bP.verifyTitle("Your Store");
  await bP.closeBrowser();
});

test("Handle Alerts", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const basePage = new BasePage(page);
  await basePage.navigateToUrl("https://testautomationpractice.blogspot.com");
  await basePage.clickOnElement("//div/button[text()='Alert']");
  await page.on("dialog", async (alert) => {
    console.log(alert.message);
    expect(alert.message).toEqual("I am an alert box!");
    await alert.accept();
  });
});

test("Handle Confirm Box", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const basePage = new BasePage(page);
  await basePage.navigateToUrl("https://testautomationpractice.blogspot.com");
  await basePage.clickOnElement("//div/button[text()='Confirm Box']");
  await page.on("dialog", async (prompt) => {
    console.log(prompt.message);
    expect(prompt.message).toEqual("Press a button!");
    await prompt.dismiss();
  });
  await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
});

test("Handle Window Prompt", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const basePage = new BasePage(page);
  await basePage.navigateToUrl("https://testautomationpractice.blogspot.com");
  await basePage.clickOnElement("//div/button[text()='Prompt']");
  const name = "Arghajit";
  await page.on("dialog", async (dialog) => {
    console.log(dialog.message);
    expect(dialog.message).toEqual("Please enter your name:");
    await dialog.type(name);
    await dialog.dismiss();
  });
  await expect(page.locator("#demo")).toHaveText("User cancelled the prompt.");
});

test("Drag and Drop", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const basePage = new BasePage(page);
  await basePage.navigateToUrl("https://testautomationpractice.blogspot.com");
  await basePage.dragAndDrop("#draggable", "#droppable");
  await basePage.verifyText("//div/p[text()='Dropped!']", "Dropped!");
});
