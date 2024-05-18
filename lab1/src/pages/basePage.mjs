import { promises as fs } from "fs";

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(url) {
    await this.driver.get(url);
  }

  async maximizeWindow() {
    await this.driver.manage().window().maximize();
  }

  async getTitle() {
    return await this.driver.getTitle();
  }

  async takeScreenshot(filePath) {
    let image = await this.driver.takeScreenshot();
    await fs.writeFile(filePath, image, "base64");
  }
}

export default BasePage;
