const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('Slider', () => {
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

	describe('drag', () => {
		it('increment', async () => {
			const filename = getFileName('Slider');
			await page.goto('http://localhost:8080/slider');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitForSelector('#Slider');
			const {x: posX, y: posY} = await page.evaluate(() => {
				const knobElement = document.querySelector('[class^="Slider_knob"]');
				const {x, y} = knobElement.getBoundingClientRect();
				return {x, y};
			});

			await page.mouse.move(posX, posY);
			await page.mouse.down();


			for (let i = 0; i < 100; i++) {
				await page.mouse.move(posX + (i * 10), posY);
			}

			await page.tracing.stop();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Slider', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Slider', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	describe('keyboard', () => {
		it('increment', async () => {
			const filename = getFileName('Slider');
			await page.goto('http://localhost:8080/slider');
			await page.tracing.start({path: filename, screenshots: false});
			await page.waitForSelector('#Slider');
			await page.focus('#Slider');

			await page.keyboard.press('Enter');

			for (let i = 0; i < 100; i++) {
				await page.keyboard.down('ArrowRight');
			}

			await page.tracing.stop();

			const actualFPS = FPS(filename);
			TestResults.addResult({component: 'Slider', type: 'Frames Per Second', actualValue: actualFPS});

			const actualUpdateTime = Update(filename, 'Changeable');
			TestResults.addResult({component: 'Slider', type: 'Update', actualValue: actualUpdateTime});
		});
	});

	it('mount', async () => {
		const filename = getFileName('Slider');

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/slider');
		await page.waitForSelector('#Slider');
		await page.waitFor(2000);

		await page.tracing.stop();

		const actualMount = Mount(filename, 'Changeable');
		TestResults.addResult({component: 'Slider', type: 'Mount', actualValue: actualMount});
	});
});

