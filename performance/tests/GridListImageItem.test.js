const puppeteer = require('puppeteer');
const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');


describe( 'GridListImageItem', () => {
	it('mount', async () => {
		const filename = getFileName('GridListImageItem');
		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/GridListImageItem');
		await page.waitForSelector('#gridListImageItem');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actualMount = Mount(filename, 'Spottable');
		TestResults.addResult({component: 'GridListImageItem', type: 'Mount', actualValue: actualMount});
	});
});
