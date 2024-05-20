import { Browser, Builder } from "selenium-webdriver";
import { expect } from "chai";
import HomePage from "../pages/homePage.mjs";
import ProductPage from "../pages/ProductPage.mjs";
import SearchResultsPage from "../pages/SearchResultsPage.mjs";
import { takeScreenshot } from "../utils/screenshot.mjs";

describe("Amazon Smoke Tests", function () {
  this.timeout(30000);
  let driver;
  let homePage;
  let searchResultsPage;
  let productPage;

  before(async () => {
    driver = new Builder().forBrowser(Browser.EDGE).build();
    await driver.manage().window().maximize();
    homePage = new HomePage(driver);
    searchResultsPage = new SearchResultsPage(driver);
    productPage = new ProductPage(driver);
  });

  after(async () => {
    await driver.quit();
  });

  it("should open the Amazon home page", async function () {
    const testName = this.test.fullTitle();
    try {
      await homePage.open();
      await driver.sleep(10000);
      const title = await homePage.getTitle();
      expect(title).to.include("Amazon");
    } catch (error) {
      await takeScreenshot(driver, testName);
      throw error;
    }
  });

  it("should search for a product", async function () {
    const testName = this.test.fullTitle();
    try {
      await homePage.open();
      await homePage.searchForItem("laptop");
      await searchResultsPage.waitForResults();
      const firstProductText = await searchResultsPage.getFirstProductText();
      console.log(firstProductText);
      expect(firstProductText.toLowerCase()).to.include("laptop");
    } catch (error) {
      await takeScreenshot(driver, testName);
      throw error;
    }
  });

  it("should add a product to the cart", async function () {
    const testName = this.test.fullTitle();
    try {
      await homePage.open();
      await homePage.searchForItem("laptop");
      await searchResultsPage.waitForResults();
      await searchResultsPage.selectFirstProduct();
      await productPage.addToCart();
      await productPage.verifyProductAdded();
      const confirmationText = await productPage.getConfirmationText();
      expect(confirmationText).to.include("Added to Cart");
    } catch (error) {
      await takeScreenshot(driver, testName);
      throw error;
    }
  });
});
