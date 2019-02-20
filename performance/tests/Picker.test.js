const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Picker', () => {
	describe('click', () => {
		it('increment FPS and Update', async () => {
			const filename = getFileName('Picker');
			const incrementer = '[class^="Picker_incrementer"]';

			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});

			await page.goto('http://localhost:8080/picker');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitFor(500);
			await page.click(incrementer);
			await page.waitFor(200);
			await page.click(incrementer);
			await page.waitFor(200);
			await page.click(incrementer);
			await page.waitFor(200);
			await page.click(incrementer);
			await page.waitFor(200);

			await page.tracing.stop();
			await browser.close();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Picker', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Picker', type: 'Update', actualValue: actualUpdateTime});

		});
	});

	describe('keypress', () => {
		it('increment FPS and Update', async () => {
			const filename = getFileName('Picker');

			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});

			await page.goto('http://localhost:8080/picker');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitFor(500);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);
			await page.keyboard.press('ArrowRight');
			await page.waitFor(200);

			await page.tracing.stop();
			await browser.close();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Picker', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Picker', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	it('mount time', async () => {
		const filename = getFileName('Picker');

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/picker');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actualMount = Mount(filename, 'Changeable');
		TestResults.addResult({component: 'Picker', type: 'Mount', actualValue: actualMount});
	});
});
