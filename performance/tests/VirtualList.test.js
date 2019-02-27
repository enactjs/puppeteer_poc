const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName, scrollAtPoint} = require('../utils');
const TestResults = require('../TestResults');

describe('VirtualList', () => {
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

	describe('ScrollButton', () => {
		it('scrolls down', async () => {
			const filename = getFileName('VirtualList');			await page.goto('http://localhost:8080/virtualList');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitForSelector('#VirtualList');
			await page.focus('[aria-label="scroll down"]');
			await page.keyboard.down('Enter');
			await page.waitFor(200);
			await page.keyboard.down('Enter');
			await page.waitFor(200);
			await page.keyboard.down('Enter');
			await page.waitFor(200);
			await page.keyboard.down('Enter');
			await page.waitFor(2000);

			await page.tracing.stop();

			const actual = FPS(filename);
			TestResults.addResult({component: 'VirtualList', type: 'Frames Per Second', actualValue: actual});

			const actualUpdate = Update(filename, 'ui:VirtualListBase');
			TestResults.addResult({component: 'VirtualList', type: 'Update', actualValue: actualUpdate});
		});
	});

	describe('mousewheel', () => {
		it('scrolls down', async () => {
			const filename = getFileName('VirtualList');
			const VirtualList = '#VirtualList';

			await page.goto('http://localhost:8080/virtualList');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitForSelector(VirtualList);
			await scrollAtPoint(page, VirtualList, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, VirtualList, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, VirtualList, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, VirtualList, 1000);
			await page.waitFor(200);

			await page.tracing.stop();

			const actual = FPS(filename);
			TestResults.addResult({component: 'VirtualList', type: 'Frames Per Second', actualValue: actual});

			const actualUpdate = Update(filename, 'ui:VirtualListBase');
			TestResults.addResult({component: 'VirtualList', type: 'Update', actualValue: actualUpdate});
		});
	});

	it('mount', async () => {
		const filename = getFileName('VirtualList');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/virtualList');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actual = Mount(filename, 'VirtualList');

		TestResults.addResult({component: 'VirtualList', type: 'Mount', actualValue: actual});
	});
});
