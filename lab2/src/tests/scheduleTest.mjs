import { Browser, Builder } from "selenium-webdriver";
import { expect } from "chai";
import mocha from "mocha";
import { takeScreenshot } from "../utils/screenshot.mjs";
import { HomePage } from "../pages/homePage.mjs";
import { SchedulePage } from "../pages/shedulePage.mjs";
import { GroupPage } from "../pages/groupPage.mjs";

const { it, describe, after, before } = mocha;

describe("Mospolytech Timetable Test", function () {
  this.timeout(30000);
  let driver;
  let homePage;
  let schedulePage;
  let groupPage;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.EDGE).build();
    await driver.manage().window().maximize()
    homePage = new HomePage(driver);
    schedulePage = new SchedulePage(driver);
    groupPage = new GroupPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it("should open timetable page and search for a group", async function () {
    const testName = this.test.fullTitle();

    try {
      await homePage.open("https://mospolytech.ru/");
      await homePage.clickScheduleButton();
      await schedulePage.waitForElement(schedulePage.seeOnSiteLink);
      await schedulePage.clickSeeOnSiteLink();
      const tabs = await driver.getAllWindowHandles();
      await driver.switchTo().window(tabs[1]);
      await groupPage.waitForElement(groupPage.searchField);
      await groupPage.searchGroup("221-322");
      await groupPage.waitForElement(groupPage.searchResultLink);
      const groupLinks = await groupPage.getAllElements(
        groupPage.searchResultLink
      );
      expect(groupLinks.length).to.equal(1);
      await groupPage.clickSearchResult();
      await groupPage.waitForElement(groupPage.scheduleTable);
      const isCurrentDayHighlighted = await groupPage.isCurrentDayHighlighted();
      expect(isCurrentDayHighlighted).to.be.true;
    } catch (error) {
      await takeScreenshot(driver, testName);
      throw error;
    }
  });
});
