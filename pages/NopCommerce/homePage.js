const { expect } = require("@playwright/test");

export class HomePage {
  constructor(page) {
    this.page = page;
    this.register_option = page.locator("//a[text()='Register']");
    this.login_option = page.locator("//a[text()='Log in']");
    this.wishlist_option = page.locator("//li//span[text()='Wishlist']");
    this.shoppingCart_option = page.locator(
      "//li//span[text()='Shopping cart']"
    );
    this.searchBar = page.locator("(//*[@id='small-searchterms'])[1]");
    this.logo = page.locator("//img[@alt='nopCommerce demo store']");
    this.currentCurrency = page.locator(
      "//div//select[@id='customerCurrency']"
    );
    this.welcomeText = page.locator("//h1[text()='Welcome, Please Sign In!']");
    this.inputEmail = page.locator(
      "//label[@for='Email']/following-sibling::input[@id='Email']"
    );
    this.inputPassword = page.locator("#Password");
    this.rememberMe = page.locator("#RememberMe");
    this.loginButton = page.locator("//div//button[text()='Log in']");
    this.myAccount = page.locator("(//a[text()='My account'])[1]");
    this.logout_option = page.locator("//a[text()='Log out']");
    this.gender_male = page.locator("#gender-male");
    this.firstName = page.locator("#FirstName");
    this.lastName = page.locator("#LastName");
    this.dateOfBirthDay = page.locator("//select[@name='DateOfBirthDay']");
    this.dateOfBirthMonth = page.locator("//select[@name='DateOfBirthMonth']");
    this.dateOfBirthYear = page.locator("//select[@name='DateOfBirthYear']");
    this.email = page.locator("#Email");
    this.password = page.locator("#Password");
    this.confirmPassword = page.locator("#ConfirmPassword");
    this.registerButton = page.locator("#register-button");
    this.continue_option = page.locator("//a[text()='Continue']");
    this.result = page.locator("//div[@class='result']");
  }

  async gotoWebsite(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState();
  }
  async verifyHomePage(condition) {
    if (condition == "After Login") {
      await expect(this.myAccount).toBeVisible();
      await expect(this.logout_option).toBeVisible();
    } else {
      await expect(this.register_option).toBeVisible();
      await expect(this.login_option).toBeVisible();
    }
    await expect(this.logo).toBeVisible();
    await expect(this.searchBar).toBeVisible();
    await expect(this.currentCurrency).toBeVisible();
    await expect(this.wishlist_option).toBeVisible();
    await expect(this.shoppingCart_option).toBeVisible();
  }
  async verifyHomePageTitle(hometitle) {
    await expect(this.page).toHaveTitle(hometitle);
  }
  async clickOnLoginOption() {
    await this.login_option.click();
    await expect(this.welcomeText).toBeVisible();
  }
  async loginToApplication(email, password) {
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.rememberMe.click();
    await this.loginButton.click();
    await this.page.waitForLoadState();
  }
  async clickOnRegisterOption() {
    await this.register_option.click();
    await this.page.waitForLoadState();
  }
  async registerNewUser(
    first,
    last,
    day,
    month,
    year,
    emailID,
    passwordText,
    result
  ) {
    await this.gender_male.click();
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.dateOfBirthDay.selectOption(day);
    await this.dateOfBirthMonth.selectOption(month);
    await this.dateOfBirthYear.selectOption(year);
    await this.email.fill(emailID);
    await this.password.fill(passwordText);
    await this.confirmPassword.fill(passwordText);
    await this.registerButton.click();
    await this.page.waitForLoadState();
    await expect(this.result).toHaveText(result);
    await this.continue_option.click();
    await this.page.waitForLoadState();
  }
  async attemptLogin(email, password) {
    try {
      await this.clickOnLoginOption();
      await this.loginToApplication(email, password);
      await this.verifyHomePage("After Login");
      return true;
    } catch (error) {
      console.error(`Login failed: ${error.message}`);
      return false;
    }
  }
}
