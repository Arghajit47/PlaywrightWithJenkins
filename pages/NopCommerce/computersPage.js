const { expect } = require("@playwright/test");

export class ComputersPage {
  constructor(page) {
    this.page = page;
    this.computers = page.locator(
      "//div[@class='header-menu']//ul[@class='top-menu notmobile']//a[contains(text(),'Computers')]"
    );
    this.desktops = page.locator(
      "//div[@class='header-menu']//ul[@class='top-menu notmobile']//a[contains(text(),'Computers')]/following-sibling::ul//a[contains(text(),'Desktops')]"
    );
    this.notebooks = page.locator(
      "//div[@class='header-menu']//ul[@class='top-menu notmobile']//a[contains(text(),'Computers')]/following-sibling::ul//a[contains(text(),'Notebooks')]"
    );
    this.softwares = page.locator(
      "//div[@class='header-menu']//ul[@class='top-menu notmobile']//a[contains(text(),'Computers')]/following-sibling::ul//a[contains(text(),'Software')]"
    );
    this.lenovoIdeaCentre = page.locator(
      "(//a[text()='Lenovo IdeaCentre 600 All-in-One PC'])[last()]"
    );
    this.DigitalStormVANQUISH = page.locator(
      "(//a[text()='Digital Storm VANQUISH 3 Custom Performance PC'])[last()]"
    );
    this.buildYourOwnComputer = page.locator(
      "(//a[text()='Build your own computer'])[last()]"
    );

    this.processor = page.locator("#product_attribute_input_1 > select");
    this.ram = page.locator("#product_attribute_input_2 > select");
    this.storage1 = page.locator(
      "//label[contains(text(),'320 GB')]/parent::li/input"
    );
    this.storage2 = page.locator(
      "//label[contains(text(),'400 GB')]/parent::li/input"
    );
    this.OS1 = page.locator(
      "//label[contains(text(),'Vista Home')]/parent::li/input"
    );
    this.OS2 = page.locator(
      "//label[contains(text(),'Vista Premium')]/parent::li/input"
    );
    this.software1 = page.locator(
      "//label[contains(text(),'Microsoft Office')]/parent::li/input"
    );
    this.software2 = page.locator(
      "//label[contains(text(),'Acrobat Reader')]/parent::li/input"
    );
    this.software3 = page.locator(
      "//label[contains(text(),'Total Commander')]/parent::li/input"
    );
    this.AddToCartButton = page.locator("(//button[text()='Add to cart'])[1]");
    this.successBar = page.locator("//div[@id='bar-notification']//p");
    this.macbook = page.locator(
      "(//a[text()='Apple MacBook Pro 13-inch'])[last()]"
    );
    this.asus = page.locator(
      "(//a[text()='Asus N551JK-XO076H Laptop'])[last()]"
    );
    this.hpEnvy = page.locator(
      "(//a[text()='HP Envy 6-1180ca 15.6-Inch Sleekbook'])[last()]"
    );
    this.hpSpectre = page.locator(
      "(//a[text()='HP Spectre XT Pro UltraBook'])[last()]"
    );
    this.lenovoThinkpad = page.locator(
      "(//a[text()='Lenovo Thinkpad X1 Carbon Laptop'])[last()]"
    );
    this.samsungSeries = page.locator(
      "(//a[text()='Samsung Series 9 NP900X4C Premium Ultrabook'])[last()]"
    );
    this.adobePhotoshop = page.locator(
      "(//a[text()='Adobe Photoshop CS4'])[last()]"
    );
    this.soundForgePro = page.locator(
      "(//a[text()='Sound Forge Pro 11 (recurring)'])[last()]"
    );
    this.windows8pro = page.locator("(//a[text()='Windows 8 Pro'])[last()]");
  }
  async visitDesktopsPage() {
    await this.computers.hover();
    await this.desktops.click();
    await this.page.waitForLoadState();
    await expect(this.page).toHaveTitle("nopCommerce demo store. Desktops");
  }
  async visitNotebooksPage() {
    await this.computers.hover();
    await this.notebooks.click();
    await this.page.waitForLoadState();
    await expect(this.page).toHaveTitle("nopCommerce demo store. Notebooks");
  }
  async visitSoftwaresPage() {
    await this.computers.hover();
    await this.softwares.click();
    await this.page.waitForLoadState();
    await expect(this.page).toHaveTitle("nopCommerce demo store. Software");
  }
  async visitSelectedComputerOptionPage(option) {
    if (option == "Build your own computer") {
      await this.buildYourOwnComputer.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. Build your own computer"
      );
    } else if (option == "Digital Storm VANQUISH 3 Custom Performance PC") {
      await this.DigitalStormVANQUISH.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. Digital Storm VANQUISH 3 Custom Performance PC"
      );
    } else if (option == "Lenovo IdeaCentre 600 All-in-One PC") {
      await this.lenovoIdeaCentre.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. Lenovo IdeaCentre 600 All-in-One PC"
      );
    }
  }
  async configureOwnPCAndAddToCart(
    desktop,
    processorName,
    ramName,
    storage,
    OS,
    software
  ) {
    if (desktop == "Build your own computer") {
      await this.processor.selectOption(processorName);
      await this.ram.selectOption(ramName);
      if (storage == "320 GB") {
        await this.storage1.click();
      } else if (storage == "400 GB") {
        await this.storage2.click();
      }
      if (OS == "Vista Home") {
        await this.OS1.click();
      } else if (OS == "Vista Premium") {
        await this.OS2.click();
      }
      if (software == "Microsoft Office") {
        await this.software1.click();
      } else if (software == "Acrobat Reader") {
        await this.software2.click();
      } else if (software == "Total Commander") {
        await this.software3.click();
      }
    }
    await this.AddToCartButton.click();
    await expect(this.successBar).toBeVisible();
    await this.page.waitForLoadState();
  }
  async addNotebooksIntoCart(name) {
    if (name === "Apple MacBook Pro 13-inch") {
      await this.macbook.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. Apple MacBook Pro 13-inch"
      );
    } else if (name === "Asus N551JK-XO076H Laptop") {
      await this.asus.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. Asus N551JK-XO076H Laptop"
      );
    } else if (name === "HP Envy 6-1180ca 15.6-Inch Sleekbook") {
      await this.hpEnvy.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. HP Envy 6-1180ca 15.6-Inch Sleekbook"
      );
    } else if (name === "HP Spectre XT Pro UltraBook") {
      await this.hpSpectre.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. HP Spectre XT Pro UltraBook"
      );
    } else if (name === "Lenovo Thinkpad X1 Carbon Laptop") {
      await this.lenovoThinkpad.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. Lenovo Thinkpad X1 Carbon Laptop"
      );
    } else if (name === "Samsung Series 9 NP900X4C Premium Ultrabook") {
      await this.samsungSeries.click();
      await this.page.waitForLoadState();
      await expect(this.page).toHaveTitle(
        "nopCommerce demo store. Samsung Series 9 NP900X4C Premium Ultrabook"
      );
    } else {
      console.error(
        "You are trying to choose an notebook which is not available in the Web App"
      );
    }
    await this.AddToCartButton.click();
    await expect(this.successBar).toBeVisible();
  }
  async addSoftwareIntoCart(name) {
    if (name === "Windows 8 Pro") {
      await this.windows8pro.click();
    } else if (name === "Adobe Photoshop CS4") {
      await this.adobePhotoshop.click();
    } else if (name === "Sound Forge Pro 11 (recurring)") {
      await this.soundForgePro.click();
    } else {
      console.error(
        "You are trying to choose an software which is not available in the Web App"
      );
    }
    if (name === "Windows 8 Pro" && name === "Sound Forge Pro 11 (recurring)") {
      await this.AddToCartButton.click();
      await expect(this.successBar).toBeVisible();
    } else {
      console.error(
        "The product is not available right now! Kindly try to add some other product :)"
      );
    }
  }
}
