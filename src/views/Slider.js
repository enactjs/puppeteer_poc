import kind from '@enact/core/kind';
import React from 'react';
import Slider from '@enact/moonstone/Slider';

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<Slider id="Slider" min={0} max={100} defaultValue={0} />
	)
});

export default MainPanel;
