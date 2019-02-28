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
			await page.goto('http://localhost:8080/scroller');
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
			await page.goto('http://localhost:8080/scroller');
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

	it.only('mount', async () => {
		const filename = getFileName('Scroller');

		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});
		const client = await page.target().createCDPSession();

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/scroller');
		await page.waitFor(2000);

		const performanceTiming = JSON.parse(
			await page.evaluate(() => JSON.stringify(window.performance.timing))
		);

		const metrics = await getPerformanceMetrics(client);
		const perf = getPerformanceMetric(metrics, 'FirstMeaningfulPaint');

		console.log(performanceTiming, metrics, perf);

		await page.tracing.stop();
		await browser.close();

		const actual = Mount(filename, 'Scroller');

		TestResults.addResult({component: 'Scroller', type: 'Mount', actualValue: actual});
	});

	it.only('mount with 100 children', async () => {

		const counts = [10, 100, 1000];
		let results = [];
		const types = [
			'ScrollerJS',
			'ScrollerNative',
			'UiScrollerJS',
			'UiScrollerNative'
		];
		for (const type of types) {
			console.log(type);
			for (let index = 0; index < counts.length; index++) {
				const filename = getFileName(type);
				const count = counts[index];

				const browser = await puppeteer.launch({headless: true});
				const page = await browser.newPage();
				await page.setViewport({
					width: 1920,
					height: 1080
				});

				await page.tracing.start({path: filename, screenshots: false});
				await page.goto(`http://localhost:8080/scrollerMultipleChildren?count=${count}&type=${type}`);
				await page.waitFor(2000);

				await page.tracing.stop();
				await browser.close();

				const actual = Mount(filename, 'ScrollerMultipleChildren');
				results.push({count: count, value: actual, type: type});
				TestResults.addResult({component: 'Scroller', type: `Mount ${count} ${type}`, actualValue: actual});
			}
		}
		console.log(results);
	});
});
