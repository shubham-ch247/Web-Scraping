const scraperObject = {
  url: "https://www.reserve.unilodge.com.au/categoryInfo.html?category=273",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    const data = [];
    // Wait for the required DOM to be rendered
    await page.waitForSelector(".ul_rooms");
    let urls = await page.$$(".ul_room");
    console.log(urls.length, "urls");
    for (let i = 0; i < urls.length; i++) {
      const roomTitle = await urls[i].$eval("h2", (text) =>
      text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim()
      );
      await page.waitForSelector(".");
      let Obj = await page.$$(".ul_stayPrice");
      const rate = [];
      for (let j = 0; j < Obj.length; j++) {
        const roomPrice = await Obj[j].$eval(
          ".price",
          (number) => number.textContent
        );
        //rate object
        const rateObj = {
          roomPrice: parseInt(roomPrice),
        };
        //push price inside rate array
        rate.push(rateObj);
      }
      const roomObj = {
        roomTitle: roomTitle,
        roomRate: rate,
      };
      data.push(roomObj);
    }
    //const hotel = JSON.stringify(data)
    console.log(JSON.stringify(data));
  },
};
module.exports = scraperObject;
