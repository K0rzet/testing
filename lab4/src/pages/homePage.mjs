import { By } from 'selenium-webdriver';
import BasePage from './basePage.mjs';

class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.url = 'https://www.amazon.com';
    this.searchBox = By.id('twotabsearchtextbox');
    this.searchButton = By.id('nav-search-submit-button');
  }

  async open() {
    await super.open(this.url);
  }

  async searchForItem(item) {
    await this.type(this.searchBox, item);
    await this.click(this.searchButton);
  }
}

export default HomePage;
