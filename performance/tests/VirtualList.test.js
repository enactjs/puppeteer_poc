const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName, scrollAtPoint} = require('../utils');
const TestResults = require('../TestResults');

const filename = getFileName('VirtualList');

describe('VirtualList', () => {
	describe('ScrollButton', () => {
		it('scrolls down', async () => {
			jest.setTimeout(30000);
			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});
			await page.goto('http://localhost:8080/virtualList');
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
			await browser.close();

			const actual = FPS(filename);
			TestResults.addResult({component: 'VirtualList', type: 'Frames Per Second', actualValue: actual});

			const actualUpdate = Update(filename, 'ui:VirtualListBase');
			TestResults.addResult({component: 'VirtualList', type: 'Update', actualValue: actualUpdate});
		});
	});

	describe('mousewheel', () => {
		it('scrolls down', async () => {
			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});

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
			await browser.close();

			const actual = FPS(filename);
			TestResults.addResult({component: 'VirtualList', type: 'Frames Per Second', actualValue: actual});

			const actualUpdate = Update(filename, 'ui:VirtualListBase');
			TestResults.addResult({component: 'VirtualList', type: 'Update', actualValue: actualUpdate});
		});
	});

	it('mount', async () => {
		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/virtualList');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actual = Mount(filename, 'VirtualList');

		TestResults.addResult({component: 'VirtualList', type: 'Mount', actualValue: actual});
	});
});
