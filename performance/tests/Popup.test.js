const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Popup', () => {
	it('open and close', async () => {
		const filename = getFileName('Popup');
		const open = '[data-component-id="open"]';
		const close = '[data-component-id="close"]';

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.goto('http://localhost:8080/popup');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitFor(500);
		await page.click(open);
		await page.waitFor(500);
		await page.click(close);
		await page.waitFor(500);
		await page.click(open);
		await page.waitFor(500);
		await page.click(close);
		await page.waitFor(500);

		await page.tracing.stop();
		await browser.close();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Popup', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'Popup');
		TestResults.addResult({component: 'Popup', type: 'Update', actualValue: actualUpdateTime});

	});

	it('should mount Popup under threshold', async () => {
		const filename = getFileName('Popup');

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/popup');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actualMount = Mount(filename, 'Popup');
		TestResults.addResult({component: 'Popup', type: 'Mount', actualValue: actualMount});
	});
});

