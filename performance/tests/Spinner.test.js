const puppeteer = require('puppeteer');
const {FPS, Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe( 'Spinner', () => {
	let browser;
	beforeEach(async () => {
		browser = await puppeteer.launch({headless: true});
	});

	afterEach(async () => {
		await browser.close();
	});
	it('mount', async () => {
		const filename = getFileName('Spinner');

		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/spinner');
		await page.waitForSelector('#Spinner');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'SpinnerSpotlightDecorator');
		TestResults.addResult({component: 'Spinner', type: 'Mount', actualValue: actualMount});

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'Spinner', type: 'Frames Per Second', actualValue: actualFPS});
	});
});
