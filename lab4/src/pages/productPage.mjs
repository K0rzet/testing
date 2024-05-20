import { By } from 'selenium-webdriver';
import BasePage from './basePage.mjs';

class ProductPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.addToCartButton = By.id('add-to-cart-button');
    this.confirmationText = By.xpath('//h1[@class="a-size-medium-plus a-color-base sw-atc-text a-text-bold"]');
  }

  async addToCart() {
    await this.click(this.addToCartButton);
  }

  async verifyProductAdded() {
    await this.waitForElement(this.confirmationText);
  }

  async getConfirmationText() {
    return await this.getText(this.confirmationText);
  }
}

export default ProductPage;
