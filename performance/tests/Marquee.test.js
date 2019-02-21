const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Marquee', () => {
	it('should start marquee on hover', async () => {
		const filename = getFileName('Marquee');
		const MarqueeText = '[class^="Marquee"]';

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.goto('http://localhost:8080/marquee');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitForSelector('#Marquee');
		await page.hover(MarqueeText);
		await page.waitFor(500);

		await page.tracing.stop();
		await browser.close();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Marquee', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'Skinnable');
		TestResults.addResult({component: 'Marquee', type: 'Update', actualValue: actualUpdateTime});

	});

	it('should mount Marquee under threshold', async () => {
		const filename = getFileName('Marquee');

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/marquee');
		await page.waitForSelector('#Marquee');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actualMount = Mount(filename, 'Skinnable');
		TestResults.addResult({component: 'Marquee', type: 'Mount', actualValue: actualMount});
	});
});

