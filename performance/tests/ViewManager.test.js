const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('ViewManager', () => {
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
	it('change index', async () => {
		const filename = getFileName('ViewManager');
		const view = '[class^="view"]';

		await page.goto('http://localhost:8080/viewManager');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitFor(1000);
		await page.click(view);
		await page.waitFor(1000);
		await page.click(view);
		await page.waitFor(1000);

		await page.tracing.stop();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'ViewManager', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'ViewManager');
		TestResults.addResult({component: 'ViewManager', type: 'Update', actualValue: actualUpdateTime});
	});

	it('mount', async () => {
		const filename = getFileName('ViewManager');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/viewManager');
		await page.waitForSelector('#view1');

		await page.tracing.stop();

		const actualMount = Mount(filename, 'ViewManager');
		TestResults.addResult({component: 'Panels', type: 'Mount', actualValue: actualMount});
	});
});

