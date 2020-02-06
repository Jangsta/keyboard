const puppeteer = require('puppeteer');
const url = "https://www.reddit.com/r/mechanicalkeyboards";

const webscrape = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ["--no-sandbox", '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  console.log('new page');
  try {
    // await page.setViewport({width: 1000, height: 500});
    // console.log('set viewport');
    try {
      await page.goto('http://keyboardcatalog.com/65-percent', {waitUntil: 'load', timeout: 0});
    } catch (err) {
      console.log(err);
    }
    
    console.log('goto ' + url);
    let redditposts = await page.evaluate(() => {
      console.log('evaluating');
      let posts = document.querySelectorAll(".post");  
      let results = [];
      return posts.forEach((post) => {
        return results.push(post.querySelector(".post-header").innerText.replace(/:* */gi,''));
      });
    });
  
    //const element = document.querySelectorAll("#t3_esd7d6 > div._1poyrkZ7g36PawDueRza-J._11R7M_VOgKO1RJyRSRErT3");
    

    console.log(redditposts);

  } catch (err) {
    console.log(err);
  }

  browser.close();
};