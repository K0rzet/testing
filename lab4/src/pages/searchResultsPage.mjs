import { By } from "selenium-webdriver";
import BasePage from "./basePage.mjs";

class SearchResultsPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.firstProduct = By.css(".s-main-slot .s-result-item h2 a");
  }

  async waitForResults() {
    await this.waitForElement(this.firstProduct);
  }

  async selectFirstProduct() {
    await this.click(this.firstProduct);
  }

  async getFirstProductText() {
    return await this.getText(this.firstProduct);
  }
}

export default SearchResultsPage;
