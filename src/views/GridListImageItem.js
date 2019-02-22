import kind from '@enact/core/kind';
import React from 'react';
import GridListImageItem from '@enact/moonstone/GridListImageItem';

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<GridListImageItem
			id="GridListImageItem"
			caption="image0"
			source="http://placehold.it/100x100/9037ab/ffffff&text=Image0"
			subCaption="sub-image0"
		/>
	)
});

export default MainPanel;
