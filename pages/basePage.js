import { expect, Page, Locator, Browser } from "playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToUrl(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState();
  }

  async clickOnElement(dom) {
    await this.page.locator(dom).click();
    await this.page.waitForLoadState();
  }

  async enterInInputFields(dom, input) {
    await this.page.locator(dom).fill(input);
    await this.page.waitForLoadState();
  }

  async verifyText(dom, text) {
    await expect(this.page.locator(dom)).toHaveText(text);
    await this.page.waitForLoadState();
  }

  async verifyTitle(title) {
    await expect(this.page).toHaveTitle(title);
    await this.page.waitForLoadState();
  }

  async checkTheBox(dom) {
    await this.page.locator(dom).check();
    await this.page.waitForLoadState();
  }

  async unCheckTheBox(dom) {
    await this.page.locator(dom).uncheck();
    await this.page.waitForLoadState();
  }

  async verifyNotChecked(dom) {
    await expect(this.page.locator(dom)).not.toBeChecked();
    await this.page.waitForLoadState();
  }

  async selectFromDropdown(dom, value) {
    await this.page.locator(dom).selectOption(value);
    await this.page.waitForLoadState();
  }

  async navigateBack() {
    await this.page.goBack();
    await this.page.waitForLoadState();
  }

  async closeBrowser() {
    await this.page.close();
  }

  async dragAndDrop(sourceDom, targetDom) {
    await this.page.locator(sourceDom).dragTo(this.page.locator(targetDom));
    await this.page.waitForLoadState();
  }
}
