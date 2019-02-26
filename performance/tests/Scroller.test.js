const puppeteer = require('puppeteer');
const {FPS, Mount} = require('../TraceModel');
const {getFileName, scrollAtPoint} = require('../utils');
const TestResults = require('../TestResults');


describe( 'Scroller', () => {
	describe('ScrollButton', () => {
		it('scrolls down', async () => {
			const filename = getFileName('Scroller');

			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});
			await page.goto('http://localhost:8080/#/scroller');
			await page.tracing.start({path: filename, screenshots: false});

			await page.focus('[aria-label="scroll down"]');
			await page.keyboard.down('Enter');
			await page.keyboard.down('Enter');
			await page.waitFor(2000);

			await page.tracing.stop();
			await browser.close();

			const actual = FPS(filename);
			TestResults.addResult({component: 'Scroller', type: 'Frames Per Second', actualValue: actual});
		});
	});

	describe('mouse wheel', () => {

		it('scrolls down', async () => {
			const filename = getFileName('Scroller');

			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});
			await page.goto('http://localhost:8080/#/scroller');
			await page.tracing.start({path: filename, screenshots: false});

			const scroller = '#Scroller';

			await scrollAtPoint(page, scroller, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, scroller, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, scroller, 1000);
			await page.waitFor(200);
			await scrollAtPoint(page, scroller, 1000);
			await page.waitFor(200);

			await page.tracing.stop();
			await browser.close();

			const actual = FPS(filename);
			TestResults.addResult({component: 'Scroller', type: 'Frames Per Second', actualValue: actual});
		});
	});

	it('mount', async () => {
		const filename = getFileName('Scroller');

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/#/scroller');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actual = Mount(filename, 'Scroller');

		TestResults.addResult({component: 'Scroller', type: 'Mount', actualValue: actual});
	});
});
