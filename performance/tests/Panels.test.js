const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Panels', () => {
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
	it('change panel', async () => {
		const filename = getFileName('Panels');
		const panel = '[class^="Panel_body"]';

		await page.goto('http://localhost:8080/panels');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitFor(1000);
		await page.click(panel);
		await page.waitFor(1000);
		await page.click(panel);
		await page.waitFor(1000);


		await page.tracing.stop();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Panels', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'Cancelable');
		TestResults.addResult({component: 'Panels', type: 'Update', actualValue: actualUpdateTime});

	});

	it('should mount panels under threshold', async () => {
		const filename = getFileName('Panels');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/panels');
		await page.waitForSelector('#testPanel1');

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Cancelable');
		TestResults.addResult({component: 'Panels', type: 'Mount', actualValue: actualMount});
	});
});

