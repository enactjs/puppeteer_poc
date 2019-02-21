const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Item', () => {
	it('mount', async () => {
		const filename = getFileName('Item');

		const browser = await puppeteer.launch({headless: true});
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
		await browser.close();

		const actualMount = Mount(filename, 'Pure');

		TestResults.addResult({component: 'Button', type: 'Mount', actualValue: actualMount});
	});
});

