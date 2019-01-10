const puppeteer = require('puppeteer');

function pad2(n) { return n < 10 ? '0' + n : n }
const date = new Date();
const formattedDate = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds());

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.tracing.start({ path: `./performance/traces/picker_${formattedDate}.json`, screenshots: true });
	await page.goto('http://localhost:8080/picker');

	await page.click('.Picker__incrementer___2mPTR');
	await page.waitFor(200);
	await page.click('.Picker__incrementer___2mPTR');
	await page.waitFor(200);
	await page.click('.Picker__incrementer___2mPTR');
	await page.waitFor(200);

	await page.click('.Picker__incrementer___2mPTR');

	await page.tracing.stop();
	await browser.close();
})();