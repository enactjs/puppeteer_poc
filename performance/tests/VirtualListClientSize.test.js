const puppeteer = require('puppeteer');
const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('VirtualList clientSize prop', () => {
	let browser;
	let page;

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

	describe('VirtualList js type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualList_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=JS');
			await page.waitFor(2000);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualList');

			TestResults.addResult({component: 'VirtualList', type: 'Mount', actualValue: actual});
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualList_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=JS');
			await page.waitFor(2000);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualList');

			TestResults.addResult({component: 'VirtualList', type: 'Mount', actualValue: actual});
		});
	});

	describe('VirtualList native type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualListNative_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize');
			await page.waitFor(2000);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualListNative');

			TestResults.addResult({component: 'VirtualListNative', type: 'Mount', actualValue: actual});
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualListNative_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true');
			await page.waitFor(2000);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualListNative');

			TestResults.addResult({component: 'VirtualListNative', type: 'Mount', actualValue: actual});
		});
	});
});
