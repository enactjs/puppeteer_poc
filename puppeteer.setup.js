const puppeteer = require('puppeteer');

let browser, context;

global.beforeAll(async () => {
	browser = await puppeteer.launch();
	context = await browser.createIncognitoBrowserContext();
});

global.beforeEach(async () => {
	const newPage = await context.newPage();

	await newPage.setViewport({
		width: 1920,
		height: 1080
	});

	const client = await newPage.target().createCDPSession();
	await client.send('Emulation.setCPUThrottlingRate', {rate: 6});
	global.page = newPage;
});

global.afterEach(async () => {
	await page.close();
});

global.afterAll(async () => {
	await context.close();
	await browser.close();
});
