const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Marquee', () => {
	let browser, page;

	beforeEach(async () => {
		browser = await puppeteer.launch({headless: true});

		page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		const client = await page.target().createCDPSession();
		await client.send('Emulation.setCPUThrottlingRate', {rate: 6});
	});

	afterEach(async () => {
		await browser.close();
	});

	it('should start marquee on hover', async () => {
		const filename = getFileName('Marquee');
		const MarqueeText = '[class^="Marquee"]';

		await page.goto('http://localhost:8080/marquee');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitForSelector('#Marquee');
		await page.hover(MarqueeText);
		await page.waitFor(500);

		await page.tracing.stop();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Marquee', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'Skinnable');
		TestResults.addResult({component: 'Marquee', type: 'Update', actualValue: actualUpdateTime});

	});

	it('should mount Marquee under threshold', async () => {
		const filename = getFileName('Marquee');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/marquee');
		await page.waitForSelector('#Marquee');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Skinnable');
		TestResults.addResult({component: 'Marquee', type: 'Mount', actualValue: actualMount});
	});
});

