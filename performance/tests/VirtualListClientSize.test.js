const {Mount} = require('../TraceModel');
const {getFileName} = require('../utils');
const TestResults = require('../TestResults');

describe('VirtualList clientSize prop', () => {
	describe('UiVirtualList js type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('UiVirtualListJS_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=UiVirtualListJS');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'ui:VirtualList');

			TestResults.addResult({component: 'UiVirtualListJS', type: 'Mount', actualValue: actual});
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('UiVirtualListJS_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=UiVirtualListJS');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'ui:VirtualList');

			TestResults.addResult({component: 'UiVirtualListJS', type: 'Mount', actualValue: actual});
		});
	});

	describe('UiVirtualList native type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('UiVirtualListNative_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=UiVirtualListNative');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'ui:VirtualListNative');

			TestResults.addResult({component: 'UiVirtualListNative', type: 'Mount', actualValue: actual});
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('UiVirtualListNative_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=UiVirtualListNative');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'ui:VirtualListNative');

			TestResults.addResult({component: 'UiVirtualListNative', type: 'Mount', actualValue: actual});
		});
	});

	describe('VirtualList js type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualList_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=VirtualListJS');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualList');

			TestResults.addResult({component: 'VirtualList', type: 'Mount', actualValue: actual});
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualList_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=VirtualListJS');
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
			await page.goto('http://localhost:8080/virtualListClientSize?type=VirtualListNative');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualListNative');

			TestResults.addResult({component: 'VirtualListNative', type: 'Mount', actualValue: actual});
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualListNative_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=VirtualListNative');
			await page.waitFor('#virtualList');
			await page.waitFor(50);

			await page.tracing.stop();

			const actual = Mount(filename, 'VirtualListNative');

			TestResults.addResult({component: 'VirtualListNative', type: 'Mount', actualValue: actual});
		});
	});
});
