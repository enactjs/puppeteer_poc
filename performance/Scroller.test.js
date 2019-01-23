const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('./TraceModel.js');
const {getFileName} = require('./utils');

const filename = getFileName('picker');

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
	it('scrolls down', async () => {
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

		FPS(filename);
	});
});
