const puppeteer = require('puppeteer');

(async () => {

  const defaultPuppeteerOptions = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ],
    devtools: false,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    ignoreDefaultArgs: ['--disable-extensions'],
    executablePath: '/usr/bin/chromium-browser'
  };
  // await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--disable-gpu', '--no-sandbox', '--lang=en-US', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] })
  
  const defaultViewport = {
    deviceScaleFactor: 1,
    hasTouch: false,
    height: 1024,
    isLandscape: false,
    isMobile: false,
    width: 1280
  };
  
  const browser = await puppeteer.launch({
    ...defaultPuppeteerOptions
  });
  
  const page = await browser.newPage();
  console.log('new page');
  
  await page.setViewport(defaultViewport);
  console.log('set viewport');
  
  await page.goto('http://proteus.com');
  console.log('goto');

  // const browser = await puppeteer.launch(
  //   {args: ['--no-sandbox', '--disable-setuid-sandbox', "--proxy-server='direct://'", '--proxy-bypass-list=*'], 
  //   headless: false});
  // const page = await browser.newPage();
  // await page.goto('https://google.com');
  // console.log('goto worked');
  // //await page.screenshot({path: 'example.png'});

  await browser.close();
})();