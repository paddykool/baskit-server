const { Builder, By, Capabilities, Key, until } = require("selenium-webdriver");

const getDetails = async (url) => {
  itemData = {
    title: "Not found",
    imageURL: "Not found",
    price: "Not found",
  };

  var chromeCapabilities = Capabilities.chrome();
  //setting chrome options
  var chromeOptions = {
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  };
  chromeCapabilities.set("chromeOptions", chromeOptions);

  let driver = await new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();
  try {
    console.log(`Navigating to supplied url: ${url}`);
    await driver.get(url);

    // Find the title of the item
    console.log("Trying to get header...");
    h1List = await driver.findElements(By.xpath("h1"));
    // assign the first h1 found to the title
    itemData["title"] = h1List[0];

    // Find the imageURL of the element
    console.log("Trying to get image URL...");
    var imageElement = await driver.findElement(
      By.xpath("//*[@id='ShotView']/img")
    );
    itemData["imageURL"] = imageElement.getAttribute("src");

    // Find the price
    console.log("Trying to get price...");
    var priceElement = await driver.findElement(
      By.css(
        "#Style589780 > section > div.Price > div.nowPrice.branded-markdown > span"
      )
    );
    itemData["price"] = priceElement.getText();
    
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
