/**
 *  * @name Amazon search
 *   *
 *    * @desc Looks for a "nyan cat pullover" on amazon.com, goes two page two clicks the third one.
 *     */
const puppeteer = require('puppeteer')
const screenshot = 'sleekeyboards.png'
try {
	(async () => {
		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.goto('https://sleekeyboards.com/#keyboards');
		await page.waitForSelector('a');
			//await page.type('#twotabsearchtextbox', 'nyan cat pullover');
			//await page.click('input.nav-input')
			//await page.screenshot({path: 'amazon_nyan_cat_pullovers_list.png'})
			//await page.click('#pagnNextString')
			//await page.waitForSelector('#resultsCol')
			//const pullovers = await page.$$('a.a-link-normal.a-text-normal')
			//await pullovers[2].click()
			//await page.waitForSelector('#ppd')
		let data = await page.evaluate(()=>{	
			let links = document.querySelectorAll('.image a');
			let result = [];
			links.forEach((link, i)=>{
				result.push(link.href);
			});
			return result;
		});
		console.log(data[0]);
		await page.goto(data[0]);
		await page.waitForSelector('.inner p');
		let keyboardinfo = await page.evaluate(()=>{
			let result = [];
			document.querySelectorAll('.inner').forEach((element)=>{
				result.push(element.innerText);
			});
			return result;
		});
		console.log(keyboardinfo);
		//await page.screenshot({path: screenshot})
		//console.log('See screenshot: ' + screenshot)
		await browser.close()
	})()
} catch (err) {
	  console.error(err)
}
