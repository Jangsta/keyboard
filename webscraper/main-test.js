const puppeteer = require('puppeteer');
const axios = require('axios');
const redditurl = "https://www.reddit.com/r/mechanicalkeyboards";
const redditconfig = require('./config.js');

const webscrape = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ["--no-sandbox", '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  console.log('new page');
  try {
    await page.setViewport({width: 1000, height: 500});
    console.log('set viewport');
    try {
      await page.goto('https://yahoo.com', {waitUntil: 'load', timeout: 0});
    } catch (err) {
      console.log(err);
    }
    console.log('goto ' + url);
    let redditposts = await page.evaluate(() => {
      console.log('evaluating');
      let posts = document.querySelectorAll("_1oQyIsiPHYt6nx7VOmd1sz _1RYN-7H8gYctjOQeL8p2Q7 scrollerItem _3Qkp11fjcAw9I9wtLo8frE _1qftyZQ2bhqP62lbPjoGAh _1LmKpEAguLZV4jQMgQSFVL  Post");  
      return posts.map((post) => {
        return post.querySelector("a").innerText;
      });
    });
  
    //const element = document.querySelectorAll("#t3_esd7d6 > div._1poyrkZ7g36PawDueRza-J._11R7M_VOgKO1RJyRSRErT3");
    

    console.log(redditposts);

  } catch (err) {
    console.log(err);
  }

  browser.close();
};

const apiscrape = () => {
  axios.get("https://www.reddit.com/api/v1/authorize", {
    params: {
      client_id: "oBz7WlvPKTBmUA",
      response_type: "code",
      state: "test",
      redirect_uri: "http://localhost:3000",
      duration: "temporary",
      scope: "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread"
    }
  }).then((response)=>{
    console.log(response.data.redirect);
  });
//   axios.request({
//     method: "post",
//     baseURL: "https://reddit.com/",
//     url: "/api/v1/authorize",
//   // auth: {
//   //   username: 'oBz7WlvPKTBmUA', // This is the client_id
//   //   password: 'o3Y4GdwXZeMsom6Z_DMjEvB8xXg' // This is the client_secret
//   // },
//   params: {
//     // "grant_type": "authorization_code",
//     // "code": "oBz7WlvPKTBmUA",
//     // "redirect_uri": "http://localhost:3000"
//   }
// }).then((response) => {
//   console.log(response);  
// }).catch((err)=>{
//   console.log(err);
// }); 
}

// webscrape(mechmarketurl).catch((err)=>{
//   console.log(err);
// });

webscrape(redditurl);