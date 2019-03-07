const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('VirtualList clientSize prop', () => {
	describe('VirtualList js type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualList_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualList');

			TestResults.addResult({component: 'VirtualList', type: 'Mount', actualValue: actual});
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualList_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualList');

			TestResults.addResult({component: 'VirtualList', type: 'Mount', actualValue: actual});
		});
	});

	describe('VirtualList native type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualListNative_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?native=true');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualListNative');

			TestResults.addResult({component: 'VirtualListNative', type: 'Mount', actualValue: actual});
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualListNative_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&native=true');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualListNative');

			TestResults.addResult({component: 'VirtualListNative', type: 'Mount', actualValue: actual});
		});
	});
});
