const puppeteer = require('puppeteer');
const {FPS, Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

const filename = getFileName('GridListImageItem');

describe( 'GridListImageItem', () => {
	it('mount', async () => {
		const browser = await puppeteer.launch({headless: true});
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
		await browser.close();

		const actualMount = Mount(filename, 'Spottable');
		TestResults.addResult({component: 'GridListImageItem', type: 'Mount', actualValue: actualMount});

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'GridListImageItem', type: 'Frames Per Second', actualValue: actualFPS});
	});
});
