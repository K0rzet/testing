const assert = require("assert");
const { Builder, Browser, By } = require("selenium-webdriver");
let driver = new Builder().forBrowser(Browser.EDGE).build();
let total = 5;
let remaining = 5;

async function lambdaTest() {
  try {
    await driver.get("https://lambdatest.github.io/sample-todo-app/");
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    const title = await driver.getTitle();
    assert.equal(title, "Sample page - lambdatest.com");

    await checkRemainingItems(remaining, total);

    for (let i = 1; i <= total; i++) {
      await checkItemStatus(i, false);
      await clickItemCheckbox(i);
      await checkItemStatus(i, true);
      remaining--;
      await checkRemainingItems(remaining, total);
    }

    await addItem("New Item");

    await checkItemStatus(6, false, "New Item");
    total++;
    remaining++;
    await checkRemainingItems(remaining, total);

    await clickItemCheckbox(6);
    await checkItemStatus(6, true);
    remaining--;
    await checkRemainingItems(remaining, total);

  } catch (error) {
    await driver.takeScreenshot().then(function (image) {
      require("fs").writeFileSync("screenshot_error.png", image, "base64");
    });
    console.error(`Ошибка: ${error}`);
  } finally {
    await driver.quit();
  }
}

async function checkRemainingItems(remaining, total) {
  let remainingElem = await driver.findElement(By.className('ng-binding'));
  let text = await remainingElem.getText();
  let expectedText = `${remaining} of ${total} remaining`;
  assert.equal(text, expectedText);
}

async function checkItemStatus(index, isDone, expectedText = null) {
  let item = await driver.findElement(By.xpath(`//input[@name='li${index}']/following-sibling::span`));
  let itemClass = await item.getAttribute("class");
  assert.equal(itemClass, isDone ? "done-true" : "done-false");
  if (expectedText) {
    let itemText = await item.getText();
    assert.equal(itemText, expectedText);
  }
}

async function clickItemCheckbox(index) {
  await driver.findElement(By.name(`li${index}`)).click();
  await driver.sleep(1000);
}

async function addItem(text) {
  await driver.findElement(By.id("sampletodotext")).sendKeys(text);
  await driver.sleep(1000);
  await driver.findElement(By.id("addbutton")).click();
  await driver.sleep(1000);
}

// Запуск теста
lambdaTest();
