const {getAveragePaintTimeFor, getFileName} = require('../utils');

describe('VirtualList clientSize prop', () => {
	describe('UiVirtualList js type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('UiVirtualListJS_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=UiVirtualListJS');

			await page.tracing.stop();
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('UiVirtualListJS_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=UiVirtualListJS');


			await page.tracing.stop();
		});
	});

	describe('UiVirtualList native type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('UiVirtualListNative_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=UiVirtualListNative');


			await page.tracing.stop();
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('UiVirtualListNative_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=UiVirtualListNative');

			await page.tracing.stop();
		});
	});

	describe('VirtualList js type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualList_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=VirtualListJS');


			await page.tracing.stop();
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualList_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=VirtualListJS');

			await page.tracing.stop();
		});
	});

	describe('VirtualList native type', () => {
		it('mount time without clientSize', async () => {
			const filename = getFileName('VirtualListNative_withOutClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?type=VirtualListNative');


			await page.tracing.stop();
		});

		it('mount time with clientSize', async () => {
			const filename = getFileName('VirtualListNative_withClientSize');

			await page.tracing.start({path: filename, screenshots: false});
			await page.goto('http://localhost:8080/virtualListClientSize?clientSize=true&type=VirtualListNative');


			await page.tracing.stop();
		});
	});
});
