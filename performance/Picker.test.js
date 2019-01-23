const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('./TraceModel.js');
const {getFileName} = require('./utils');

describe('Picker', () => {
	it('increment', async () => {
		const filename = getFileName('picker');
		const incrementer = '[class^="Picker__incrementer"]';

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

		FPS(filename);
		Update(filename, 'Changeable');
	});

	it('should mount picker under threshold', async () => {
		const filename = getFileName('picker');

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

		Mount(filename, 'Changeable');
	});
});
