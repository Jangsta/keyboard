const puppeteer = require('puppeteer');

(async function main() {
  try {
    const browser = await puppeteer.launch(
      {
        headless: true, args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
          ] })
    const page = await browser.newPage()
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36')

    await page.goto('https://google.com')
    await page.waitForSelector('#hplogo')

    console.log("It's working!")

  } catch (error) {
    console.log('An error occurted!\n')
    console.log(error)
  }
  page.close();
})()

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: [
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       "--no-sandbox",
//       '--disable-setuid-sandbox',
//       '--disable-dev-shm-usage',
//       '--disable-gpu'
//     ]
//   });
//   const page = await browser.newPage();
//   page.on('error', (error) => console.error(error))
//   await page.goto('https://google.com');
//   console.log('goto')

//   await browser.close();
// })();

// const puppeteer = require('puppeteer')

// const main = async () => {
//   const browser = await puppeteer.launch(
//     {
//       ignoreHTTPSErrors: true,
//       headless: true,
//       args :[
//         '--ignore-certificate-errors',
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-dev-shm-usage',
//         '--lang=ja,en-US;q=0.9,en;q=0.8',
//         '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//       ]
//       //args: ["--no-sandbox", '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--unlimited-storage', '--full-memory-crash-report', '--force-gpu-mem-available-mb', '--full-memory-crash-report']
//     });
//   const page = await browser.newPage()
//   await page.setViewport({
//     width: 1920,
//     height: 1080,
//     deviceScaleFactor: 1,
//   })
//   await page.goto('https://unsplash.com', { waitUntil : 'domcontentloaded' , timeout : 15000})
//   await page.screenshot({ path: 'unsplash2.png' })

//   await browser.close()
// }

// main()