const puppeteer = require('puppeteer');
const {getFileName} = require('../utils');

describe('Panel Transition', () => {
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

	it('should transition under threshold with ExpandableList children', async () => {
		const filename = getFileName('PanelTransition');
		const item = '[class^="Item_item"]';

		await page.goto('http://localhost:8080/panelTransition');
		await page.tracing.start({path: filename, screenshots: true});
		await page.waitForSelector('#el_10_9');

		await page.click(item);
		await page.waitForSelector('#el_20_19');

		await page.click(item);
		await page.waitForSelector('#el_30_29');

		await page.click(item);
		await page.waitForSelector('#el_40_39');

		await page.click(item);
		await page.waitForSelector('#el_50_49');

		await page.tracing.stop();
		await browser.close();
	});
});

