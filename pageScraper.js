const scraperObject = {
  url: "https://www.iqstudentaccommodation.com/london/will-wyatt-court?year=2022-23&sorting=priceAsc",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    const data = [];
    // Get the link to all the requier rooms
    let rooms = await page.$$(".iq-room-card__content");
    console.log(rooms.length, "rooms");
    //roomName for loop
    for (let i = 0; i < rooms.length; i++) {
      console.log(typeof rooms);
      const roomTitle = await rooms[i].$eval("h2", (text) =>
        text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim()
      );
      let price = await rooms[i].$$(".iq-room-card__content-extender");
      const rate = [];
      //roomRate for loop
      for (let j = 0; j < price.length; j++) {
        console.log(typeof price);
        const roomPrice = await price[j].$eval(
          ".iq-text-xl",
          (number) => number.textContent
        );
        //rate object
        const stayPrice =roomPrice.split("From ")[1] 
        const rateObj = { stayPrice };
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
