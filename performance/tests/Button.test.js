const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Button', () => {
	describe('click', () => {
		it('increment', async () => {
			const filename = getFileName('Button');
			const button = '[class^="Button"]';

			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});

			await page.goto('http://localhost:8080/button');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitFor(500);
			await page.click(button);
			await page.waitFor(200);
			await page.click(button);
			await page.waitFor(200);
			await page.click(button);
			await page.waitFor(200);
			await page.click(button);
			await page.waitFor(200);

			await page.tracing.stop();
			await browser.close();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Button', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Button', type: 'Update', actualValue: actualUpdateTime});

		});
	});

	describe('keypress', () => {
		it('increment', async () => {
			const filename = getFileName('Button');

			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});

			await page.goto('http://localhost:8080/picker');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitFor(500);
			await page.keyboard.press('Enter');
			await page.waitFor(200);
			await page.keyboard.press('Enter');
			await page.waitFor(200);
			await page.keyboard.press('Enter');
			await page.waitFor(200);
			await page.keyboard.press('Enter');
			await page.waitFor(200);
			await page.keyboard.press('Enter');
			await page.waitFor(200);

			await page.tracing.stop();
			await browser.close();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Button', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Touchable');
			TestResults.addResult({component: 'Button', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	it('should mount Button under threshold', async () => {
		const filename = getFileName('Button');

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/button');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actualMount = Mount(filename, 'Touchable');
		TestResults.addResult({component: 'Button', type: 'Mount', actualValue: actualMount});
	});
});

