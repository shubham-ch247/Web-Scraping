const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)

// const request= require("request-promise")
// const cheerio= require("cheerio");

// request("https://www.reserve.unilodge.com.au/categoryInfo.html?category=273", (error,response,html)=>{
//     if (!error && response.statusCode==200) {
//         const $ = cheerio.load(html);

//         const room= $("body");
//         const output= room.find("div").text();
//         console.log(output)
//     }
// });
