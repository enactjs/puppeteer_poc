const puppeteer = require('puppeteer');
function pad2(n) { return n < 10 ? '0' + n : n }
const date = new Date();
const formattedDate = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds());
const filename = `./performance/traces/scroller_${formattedDate}.json`;

const FPS = require('./fps');

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

describe(
  'Scroller',
  () => {
    it('scrolls down', async() => {
      const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();
      await page.setViewport({
            width: 1920,
            height: 1080
        });
      await page.goto('http://localhost:8080/scroller');
      await page.tracing.start({ path: filename, screenshots: false });

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

      const {avgDuration, fps} = FPS(filename);
      console.log(avgDuration, fps)
      expect(Object.keys(fps).length).toBe(0);
    })
  }
)