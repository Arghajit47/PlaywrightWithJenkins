import { test, expect } from "@playwright/test";

test.describe("Enter all personal Details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com");
    await page.waitForLoadState();
  });

  test("See the Page", async ({ page }) => {
    await expect(page).toHaveTitle("Automation Testing Practice");
  });

  test("Enter Name, Email, Phone, Address", async ({ page }) => {
    await page.locator("#name").fill("Argha");
    await page.locator("#email").fill("arghajitsingha@4711");
    await page.fill("#phone", "7908985664");
    await page.locator("#textarea").fill("Noida");
  });

  test("Select Gender, Male", async ({ page }) => {
    await page.locator("//input[@id='male']").check();
    await expect(page.locator("//input[@id='female']")).not.toBeChecked();
  });

  test("Select Day, Monday", async ({ page }) => {
    await page.locator("//input[@id='monday']").check();
    await expect(page.locator("//input[@id='tuesday']")).not.toBeChecked();
  });

  test("Select Country", async ({ page }) => {
    await page.locator("//select[@id='country']").selectOption("india");
  });

  test("Select Color", async ({ page }) => {
    await page.locator("//select[@id='colors']").selectOption("green");
  });

  test("Select Date-Picker", async ({ page }) => {
    await page.locator("//input[@id='datepicker']").fill("1/2/1998");
  });

  test("Clicking on New Url", async ({ page }) => {
    await page.locator("//div/a[contains(text(),'open cart')]").click();
    await page.waitForLoadState();
    await expect(page).toHaveTitle("Your Store");
    await page.goBack();
    await page.waitForLoadState();
    await page.locator("//div/a[contains(text(),'orange HRM')]").click();
    await page.waitForLoadState();
    await expect(page).toHaveTitle("OrangeHRM");
  });

  test("Inputing data in IFrame", async ({ page }) => {
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

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});

test("Handle new window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://freelance-learn-automation.vercel.app/login");
  await page.waitForLoadState();

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.locator("(//a[contains(@href,'facebook')])[1]").click(),
  ]);
});

test("Handle New Page Window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com");
  await page.waitForLoadState();
  await page.locator("//div/button[text()='New Browser Window']").click();
  await page.waitForLoadState();
  const [newPage] = await Promise.all([context.waitForEvent("page")]);
  await newPage.waitForLoadState();
  await expect(newPage).toHaveTitle("Your Store");
  await page.close();
});

test("Handle Alerts", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");
  await page.locator("//div/button[text()='Alert']").click();
  await page.on("dialog", async (alert) => {
    console.log(alert.message);
    expect(alert.message).toEqual("I am an alert box!");
    await alert.accept();
  });
});

test("Handle Confirm Box", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");
  await page.locator("//div/button[text()='Confirm Box']").click();
  await page.on("dialog", async (prompt) => {
    console.log(prompt.message);
    expect(prompt.message).toEqual("Press a button!");
    await prompt.dismiss();
  });
  await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
});

test("Handle Window Prompt", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");
  await page.locator("//div/button[text()='Prompt']").click();
  const name = "Arghajit";
  await page.on("dialog", async (dialog) => {
    console.log(dialog.message);
    expect(dialog.message).toEqual("Please enter your name:");
    await dialog.type(name);
    await dialog.dismiss();
  });
  await expect(page.locator("#demo")).toHaveText("User cancelled the prompt.");
});

test("Drag and Drop", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");
  await page.locator("#draggable").dragTo(page.locator("#droppable"));
  await expect(page.locator("//div/p[text()='Dropped!']")).toHaveText(
    "Dropped!"
  );
});
