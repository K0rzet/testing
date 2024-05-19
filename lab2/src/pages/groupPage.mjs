import { By } from "selenium-webdriver";
import { BasePage } from "./basePage.mjs";

export class GroupPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.searchField = By.xpath("//input[@placeholder='группа ...']");
    this.searchResultLink = By.xpath('//div[contains(text(), "221-322")]');
    this.scheduleTable = By.css(".schedule-week");
    this.currentDay = By.css(".schedule-day_today");
  }

  async searchGroup(groupNumber) {
    await this.type(this.searchField, groupNumber);
    await this.driver.findElement(this.searchField).sendKeys("\n");
  }

  async clickSearchResult() {
    await this.click(this.searchResultLink);
  }

  async isCurrentDayHighlighted() {
    const daysOfWeek = [
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
      "воскресенье"
    ];

    const today = new Date();
    const todayDayOfWeek = today.getDay();
    
    if (todayDayOfWeek === 0) {
      try {
        const currentDayElement = await this.getElement(this.currentDay);
        return !currentDayElement.isDisplayed();
      } catch (e) {
        return true;
      }
    }
    const currentDayElement = await this.getElement(this.currentDay);
    if (await currentDayElement.isDisplayed()) {
      const highlightedDayText = await currentDayElement.getText();
      return highlightedDayText.toLowerCase() === daysOfWeek[todayDayOfWeek - 1];
    }

    return false;
  }
}
