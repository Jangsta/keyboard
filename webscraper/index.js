const puppeteer = require('puppeteer');
const mechmarketurl = "https://www.reddit.com/r/mechmarket/";

const webscrape = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  try {

  } catch (err) {
    console.log(err);
  }

  browser.close();
};

webscrape(mechmarketurl).catch((err)=>{
  console.log(err);
});