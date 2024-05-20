import { By, until } from 'selenium-webdriver';

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    await this.driver.get(url);
  }

  async findElement(locator) {
    return await this.driver.findElement(locator);
  }

  async click(locator) {
    const element = await this.findElement(locator);
    await element.click();
  }

  async type(locator, text) {
    const element = await this.findElement(locator);
    await element.sendKeys(text);
  }

  async waitForElement(locator, timeout = 10000) {
    await this.driver.wait(until.elementLocated(locator), timeout);
  }

  async getText(locator) {
    const element = await this.findElement(locator);
    return await element.getText();
  }

  async getTitle() {
    return await this.driver.getTitle();
  }
}

export default BasePage;
