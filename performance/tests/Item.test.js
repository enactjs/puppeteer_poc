const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Item', () => {
	let browser;
	beforeEach(async () => {
		browser = await puppeteer.launch({headless: true});
	});

	afterEach(async () => {
		await browser.close();
	});
	it('mount', async () => {
		const filename = getFileName('Item');

		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/item');
		await page.waitForSelector('#Item');
		await page.waitFor(2000);
		await page.tracing.stop();

		const actualMount = Mount(filename, 'Pure');

		TestResults.addResult({component: 'Button', type: 'Mount', actualValue: actualMount});
	});
});

