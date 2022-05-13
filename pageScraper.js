const scraperObject = {
  url: "https://www.reserve.unilodge.com.au/categoryInfo.html?category=273",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    const data = [];
    const rate = [];
    // Wait for the required DOM to be rendered
    await page.waitForSelector(".ul_rooms");
    // Get the link to all the required books
    let urls = await page.$$(".ul_room");
    let Obj = await page.$$(".ul_stayPrice");
    console.log(urls.length, "urls");
    for (let i = 0; i < urls.length; i++) {
      const roomTitle = await urls[i].$eval("h2", (text) =>
      text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim()
      );
      const roomObj = {
        roomTitle: roomTitle,
        rate: rate,
      };
      data.push(roomObj);
      for (let j = 0; j < Obj.length; j++) {
        const roomPrice = await Obj[j].$eval(
          ".price",
          (number) => number.textContent
          );
          //rate object
        let rateObj = {
          roomPrice: parseInt(roomPrice),
        };
        //push price inside rate array
        rate.push(rateObj);
      }
    }
    console.log(data);
    // let newData = [];
    // data.map((value) => {
    //   const result = value.rate.filter(
    //     (thing, index, self) =>
    //       index ===
    //       self.findIndex(
    //         (t) => t.place === thing.place && t.roomPrice === thing.roomPrice
    //       )
    //   );
    //   let pushobj = {
    //     roomTitle: value.roomTitle,
    //     Rate: result,
    //   };
    //   newData.push(pushobj);
    // });
    // newData.map((data) => {
    //   console.log(data);
    // });
  },
};
module.exports = scraperObject;
