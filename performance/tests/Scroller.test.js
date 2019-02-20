const puppeteer = require('puppeteer');
const {FPS, Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

const filename = getFileName('Scroller');

async function scrollAtPoint (
		page,
		viewportPoint,
		scrollDelta
) {
	const mouseWheelEvent = {
		type: 'mouseWheel',
		button: 'none',
		x: viewportPoint[0],
		y: viewportPoint[1],
		modifiers: 0,
		deltaX: scrollDelta[0],
		deltaY: scrollDelta[1]
	};
	await page.mouse._client.send('Input.dispatchMouseEvent', mouseWheelEvent);
}

describe( 'Scroller', () => {
	describe('ScrollButton', () => {
		it('scroll down FPS', async () => {
			jest.setTimeout(30000);
			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});
			await page.goto('http://localhost:8080/scroller');
			await page.tracing.start({path: filename, screenshots: true});

			await page.focus('[aria-label="scroll down"]');
			await page.keyboard.down('Enter');
			await page.keyboard.down('Enter');
			await page.waitFor(2000);

			await page.tracing.stop();
			await browser.close();

			const actual = FPS(filename);
			TestResults.addResult({component: 'Scroller', type: 'Mount', actualValue: actual});
		});
	});

	describe('mouse wheel', () => {
		it('scroll down FPS', async () => {
			const browser = await puppeteer.launch({headless: true});
			const page = await browser.newPage();
			await page.setViewport({
				width: 1920,
				height: 1080
			});
			await page.goto('http://localhost:8080/scroller');
			await page.tracing.start({path: filename, screenshots: false});

			await scrollAtPoint(page, [600, 400], [0, 100]);
			await page.waitFor(200);
			await scrollAtPoint(page, [600, 400], [0, 100]);
			await page.waitFor(200);
			await scrollAtPoint(page, [600, 400], [0, 100]);
			await page.waitFor(200);
			await scrollAtPoint(page, [600, 400], [0, 100]);
			await page.waitFor(200);

			await page.tracing.stop();
			await browser.close();

			const actual = FPS(filename);
			TestResults.addResult({component: 'Scroller', type: 'Mount', actualValue: actual});
		});
	});

	it('mount time', async () => {
		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/scroller');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		const actual = Mount(filename, 'Scroller');

		TestResults.addResult({component: 'Scroller', type: 'Mount', actualValue: actual});
	});
});
