import kind from '@enact/core/kind';
import React from 'react';
import Button from '@enact/moonstone/Button';

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<Button>Puppeteer!</Button>
	)
});

export default MainPanel;
