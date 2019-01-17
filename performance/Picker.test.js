const puppeteer = require('puppeteer');
const FPS = require('./fps');

function pad2(n) { return n < 10 ? '0' + n : n }
const date = new Date();
const formattedDate = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds());
const filename = `./performance/traces/picker_${formattedDate}.json`;

describe(
	'Picker', () => {
		it('increment', async () => {
			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.goto('http://localhost:8080/picker');
			await page.tracing.start({ path: filename, screenshots: false });
			await page.waitFor(500);
			await page.click('.Picker__incrementer___2mPTR');
			await page.waitFor(200);
			await page.click('.Picker__incrementer___2mPTR');
			await page.waitFor(200);
			await page.click('.Picker__incrementer___2mPTR');
			await page.waitFor(200);

			await page.click('.Picker__incrementer___2mPTR');

			await page.tracing.stop();
			await browser.close();

			const {avgDuration, fps} = FPS(filename);
			console.log(avgDuration, fps)
			expect(Object.keys(fps).length).toBe(0);
		})
	}
)