const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');


describe( 'GridListImageItem', () => {
	let browser;
	beforeEach(async () => {
		browser = await puppeteer.launch({headless: true});
	});

	afterEach(async () => {
		await browser.close();
	});
	it('mount', async () => {
		const filename = getFileName('GridListImageItem');
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/GridListImageItem');
		await page.waitForSelector('#GridListImageItem');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Spottable');
		TestResults.addResult({component: 'GridListImageItem', type: 'Mount', actualValue: actualMount});
	});
});
