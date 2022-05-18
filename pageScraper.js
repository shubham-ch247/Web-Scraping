const scraperObject = {
  url: "https://www.reserve.unilodge.com.au/categoryInfo.html?category=273",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    const data = [];
    // Wait for the required DOM to be rendered
    let urls = await page.$$(".ul_room");
    console.log(urls.length, "urls");
    //roomName for loop
    for (let i = 0; i < urls.length; i++) {
      const roomTitle = await urls[i].$eval("h2", (text) =>
        text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim()
      );
      let obj = await urls[i].$$(".ul_stayPrice");
      const rate = [];
      //roomRate for loop
      for (let j = 0; j < obj.length; j++) {
        const roomPrice = await obj[j].$eval(
          ".price",
          (number) => number.textContent
        );
        //rate object
        const rateObj = { roomPrice: parseInt(roomPrice) };
        //push price inside rate array
        rate.push(rateObj);
      }
      const roomObj = { roomTitle, rate };
      data.push(roomObj);
    }
    //const hotel = JSON.stringify(data)
    console.log(JSON.stringify(data));
  },
};
module.exports = scraperObject;
