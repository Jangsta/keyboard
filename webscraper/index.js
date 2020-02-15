function contains(elements, text) {
	//var elements = document.querySelectorAll(selector);
	
	return Array.prototype.filter.call(elements, function(element){
		return RegExp(text).test(element);
	});
}

const puppeteer = require('puppeteer');
var fs = require('fs'); 
const screenshot = 'sleekeyboards.png';

const sleekkeyboards = async () => {
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
			links.forEach((link)=>{
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
		console.log('here');
		console.log(contains(keyboardinfo, 'GB Date'));
		let parsedkeyboardinfo = contains(keyboardinfo, 'GB Date');
		//await page.screenshot({path: screenshot})
		//console.log('See screenshot: ' + screenshot)
		await browser.close();

		var file = fs.createWriteStream('sleekkeyboards.txt');
		file.on('error', function(err) { /* error handling */ });
		parsedkeyboardinfo.forEach(function(v) { file.write(v + '\n'); });
		file.end();
};

const geekhack = async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.goto('https://geekhack.org/index.php?board=70.0');
	await page.waitForSelector('td.subject.windowbg2');
	let data = await page.evaluate(() => {
		let result = [];
		document.querySelectorAll('td.subject.windowbg2').forEach((element) => {
			let links = element.querySelectorAll('a');
			let replyviews = element.nextElementSibling.innerText.split('\n');
			let lastpost = element.nextElementSibling.nextElementSibling.innerText.split('\n');
				let currentresult = {
				url: links[0].href,
				title: links[0].innerText,
				author: links[1].innerText,
				authorlink: links[1].href,
				views: replyviews[0].split(' ')[0],
				replies: replyviews[1].split(' ')[0],
				lastpost: lastpost[0],
				lastpostauthor: lastpost[1]
			}
			result.push(currentresult);
		});
		return result;
	});
	console.log(data[0], 'length:' + data.length);
	await browser.close();
}

geekhack();