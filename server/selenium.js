const { Builder, By, Capabilities, Key, until } = require("selenium-webdriver");
const Chrome = require("selenium-webdriver/chrome");

const getDetails = async (url) => {
  itemData = {
    title: "Not found",
    imageURL: "Not found",
    price: "Not found",
  };

  var options = new Chrome.Options();
  options.addArguments(
    "--disable-infobars"
    // "--proxy-server=http://proxy.proxy-cheap.com:31112"
  );
  // options.addExtensions(
  //   "/usr/src/selenium/ChromeExtension/chrome_extension.zip"
  // );

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

    // Playing with timeouts...
    const TIMEOUT = 60000
    await driver
      .manage()
      .setTimeouts({ pageLoad: TIMEOUT });
    console.info(await driver.manage().getTimeouts());

  try {
    console.log(`Navigating to supplied url: ${url}`);
    console.log(Date.now());
    await driver.get(url);

    // Find the title of the item
    console.log("Trying to get header...");
    console.log(Date.now());
    var h1List = await driver.findElements(By.xpath("h1"));
    // assign the first h1 found to the title
    console.log('lenght of h1 array')
    console.log()
    itemData["title"] = await h1List[0].getText();

    // Find the imageURL of the element
    console.log("Trying to get image URL...");
    var imageElement = await driver.findElement(
      By.xpath("//*[@id='ShotView']/img")
    );
    itemData["imageURL"] = await imageElement.getAttribute("src");

    // Find the price
    console.log("Trying to get price...");
    var priceElement = await driver.findElement(
      By.css(
        "#Style589780 > section > div.Price > div.nowPrice.branded-markdown > span"
      )
    );
    itemData["price"] = await priceElement.getText();
  } catch (e) {
    console.log(`There was an error.... ${e}`);
  } finally {
    console.log("Quitting webdriver..");
    await driver.quit();
  }

  console.log("Contents of item data before sending....");
  console.log(itemData);
  return itemData;
};

module.exports = getDetails;
