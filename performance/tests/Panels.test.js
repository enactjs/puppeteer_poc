const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Panels', () => {
	it('change panel FPS and Update', async () => {
		const filename = getFileName('Panels');
		const panel = '[class^="Panel_body"]';

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.goto('http://localhost:8080/panels');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitFor(1000);
		await page.click(panel);
		await page.waitFor(1000);
		await page.click(panel);
		await page.waitFor(1000);


		await page.tracing.stop();
		await browser.close();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Panels', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'Cancelable');
		TestResults.addResult({component: 'Panels', type: 'Update', actualValue: actualUpdateTime});

	});

	it('mount time', async () => {
		const filename = getFileName('Panels');

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/panels');
		await page.waitForSelector('#testPanel1');

		await page.tracing.stop();
		await browser.close();

		const actualMount = Mount(filename, 'Cancelable');
		TestResults.addResult({component: 'Panels', type: 'Mount', actualValue: actualMount});
	});
});
