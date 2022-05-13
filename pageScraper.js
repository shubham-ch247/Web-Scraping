// const scraperObject = {
//   url: "https://www.reserve.unilodge.com.au/categoryInfo.html?category=273",
//   async scraper(browser) {
//     let page = await browser.newPage();
//     console.log(`Navigating to ${this.url}...`);
//     // Navigate to the selected page
//     await page.goto(this.url);
//     const data = [];
//     const rate = [];
//     // Wait for the required DOM to be rendered
//     await page.waitForSelector(".ul_rooms");
//     // Get the link to all the required books
//     let urls = await page.$$(".ul_room");
//     urls.length=[4];
//     let Obj = await page.$$(".ul_stayPrice");
//     console.log(urls.length, "urls");
//     for (let i = 0; i < urls.length; i++) {
//       const roomTitle = await urls[i].$eval("h2", (text) =>
//       text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim()
//       );
//       //Obj.length=[]
//       for (let j = 0; j < Obj.length; j++) {
//         const roomPrice = await Obj[j].$eval(
//           ".price",
//           (number) => number.textContent
//         );
//         //rate object
//         let rateObj = {
//           roomPrice: parseInt(roomPrice),
//         };
//         rate.push(rateObj);
//         //push price inside rate array
//       }
//       let roomObj = {
//         roomTitle: [roomTitle],
//       };
//       data.push(roomObj,rate);
//     }
//     console.log(data);
//    },
// };
// module.exports = scraperObject;

const scraperObject = {
  url: "https://www.iqstudentaccommodation.com/london/will-wyatt-court?year=2022-23&sorting=priceAsc",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    const data = [];
    const rate = [];
    // Wait for the required DOM to be rendered
    await page.waitForSelector(".iq-room-card__content");
    // Get the link to all the required books
    let urls = await page.$$(".iq-room-card__content-extender");
    let Obj = await page.$$(".ul_stayPrice");
    console.log(urls.length, "urls");
    for (let i = 0; i < urls.length; i++) {
      const roomTitle = await urls[i].$eval("h2", (text) =>
        text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").trim()
      );
      for (let j = 0; j < Obj.length; j++) {
        const roomPrice = await Obj[j].$eval(
          ".iq-text-xl iq-text-red",
          (number) => number.textContent
        );
        //rate object
        let rateObj = {
          roomPrice: parseInt(roomPrice),
        };
        //push price inside rate array
        rate.push(rateObj);
      }
      const roomObj = {
        roomTitle: roomTitle,
        rate: rate,
      };
      data.push(roomObj);
    }
    let newData = [];
    data.map((value) => {
      const result = value.rate.filter(
        (thing, index, self) =>
          index ===
          self.findIndex(
            (t) => t.place === thing.place && t.roomPrice === thing.roomPrice
          )
      );
      let pushobj = {
        roomTitle: value.roomTitle,
        roomRate: result,
      };
      newData.push(pushobj);
    });
    newData.map((data) => {
      console.log(data);
    });
  },
};
module.exports = scraperObject;
