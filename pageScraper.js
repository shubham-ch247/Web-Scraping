const scraperObject = {
  url: "https://www.reserve.unilodge.com.au/categoryInfo.html?category=273",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    const data = [];
    // Wait for the required DOM to be rendered
    let rooms = await page.$$(".ul_room");
    //roomName for loop
    for (let i = 0; i < rooms.length; i++) {
      const roomTitle = await rooms[i].$eval("h2", (text) =>
        text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim()
      );
      let stayPrice = await rooms[i].$$(".ul_stayPrice");
      const rate = [];
      //roomRate for loop
      for (let j = 0; j < stayPrice.length; j++) {
        const roomPrice = await stayPrice[j].$eval(
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
    console.log(JSON.stringify(data));
  },
};
module.exports = scraperObject;
