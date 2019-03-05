const puppeteer = require('puppeteer');
const {FPS, Mount, Update} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('ExpandableItem', () => {
	it('open and close', async () => {
		const filename = getFileName('ExpandableItem');
		const openClose = '[class^="ExpandableItem_expandableItem"]';

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.goto('http://localhost:8080/expandableItem');
		await page.tracing.start({path: filename, screenshots: false});
		await page.waitFor(500);
		await page.click(openClose);
		await page.waitFor(200);
		await page.click(openClose);
		await page.waitFor(200);
		await page.click(openClose);
		await page.waitFor(200);
		await page.click(openClose);
		await page.waitFor(200);

		await page.tracing.stop();
		await browser.close();

		const actualFPS = FPS(filename);
		TestResults.addResult({component: 'ExpandableItem', type: 'Frames Per Second', actualValue: actualFPS});

		const actualUpdateTime = Update(filename, 'Toggleable');
		TestResults.addResult({component: 'ExpandableItem', type: 'Update', actualValue: actualUpdateTime});

	});

	it('should mount ExpandableItem under threshold', async () => {
		const filename = getFileName('ExpandableItem');

		const browser = await puppeteer.launch({headless: true});
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080
		});

		await page.tracing.start({path: filename, screenshots: false});
		await page.goto('http://localhost:8080/expandableItem');
		await page.waitFor(2000);

		await page.tracing.stop();
		await browser.close();

		// Transition causes a cascading update that mounts the Expandable's children
		const actualMount = Mount(filename, 'Toggleable') + Update(filename, 'Transition');
		TestResults.addResult({component: 'ExpandableItem', type: 'Mount', actualValue: actualMount});
	});

	describe('ExpandableItem with Items', () => {
		const counts = [10, 40, 70, 100];

		for (let index = 0; index < counts.length; index++) {
			const count = counts[index];
			it(`mounts ${count} Item components`, async () => {
				const filename = getFileName('ExpandableItem');

				const browser = await puppeteer.launch({headless: true});
				const page = await browser.newPage();
				await page.setViewport({
					width: 1920,
					height: 1080
				});

				await page.tracing.start({path: filename, screenshots: false});
				await page.goto(`http://localhost:8080/expandableItemItems?count=${count}`);
				await page.waitForSelector('#ExpandableItem');
				await page.waitFor(500);

				await page.tracing.stop();
				await browser.close();

				// Transition causes a cascading update that mounts the Expandable's children
				const actualMount = Mount(filename, 'ExpandableItemItems') + Update(filename, 'Transition');
				TestResults.addResult({component: 'ExpandableItem', type: 'Mount', actualValue: actualMount});
			});
		}

		for (let index = 0; index < counts.length; index++) {
			const count = counts[index];
			it(`toggles while containing ${count} Item components`, async () => {
				const filename = getFileName('ExpandableItem');
				const openClose = '[class^="ExpandableItem_expandableItem"]';

				const browser = await puppeteer.launch({headless: true});
				const page = await browser.newPage();
				await page.setViewport({
					width: 1920,
					height: 1080
				});

				await page.tracing.start({path: filename, screenshots: false});
				await page.goto(`http://localhost:8080/expandableItemItems?count=${count}`);
				await page.waitForSelector('#ExpandableItem');

				await page.waitFor(500);
				await page.click(openClose);
				await page.waitFor(200);
				await page.click(openClose);
				await page.waitFor(200);
				await page.click(openClose);
				await page.waitFor(200);
				await page.click(openClose);
				await page.waitFor(200);

				await page.tracing.stop();
				await browser.close();

				const actualFPS = FPS(filename);
				TestResults.addResult({component: 'ExpandableItem', type: 'Frames Per Second', actualValue: actualFPS});
			});
		}
	});
});

