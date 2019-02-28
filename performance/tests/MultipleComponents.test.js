const puppeteer = require('puppeteer');
const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('A list of multiple components', () => {
	it('mounts', async () => {
		const counts = [10, 100, 1000];
		let results = [];
		for (let index = 0; index < counts.length; index++) {
			const count = counts[index];

			const filename = getFileName('MultipleDivs');

			const browser = await puppeteer.launch({headless: false});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto(`http://localhost:8080/multipleComponents?count=${count}`);
			await page.waitFor(2000);

			await page.tracing.stop();
			await browser.close();

			const actual = Mount(filename, 'MultipleComponents');
			results.push({count: count, value: actual});
			TestResults.addResult({component: 'MultipleComponents', type: 'Mount', actualValue: actual});
		}
		console.log(results);
	});
});
