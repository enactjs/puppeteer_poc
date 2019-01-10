const puppeteer = require('puppeteer');
function pad2(n) { return n < 10 ? '0' + n : n }
const date = new Date();
const formattedDate = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds());

(async () => {
	const browser = await puppeteer.launch({headless: true});
	const page = await browser.newPage();
	await page.tracing.start({ path: `./performance/traces/scroller_${formattedDate}.json`, screenshots: true });
	await page.goto('http://localhost:8080/scroller');
	await page.setViewport({
        width: 1920,
        height: 1080
    });

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
})();

async function scrollAtPoint(
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
    deltaY: scrollDelta[1],
  };
  await page.mouse._client.send('Input.dispatchMouseEvent', mouseWheelEvent);
}