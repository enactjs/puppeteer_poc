import kind from '@enact/core/kind';
import React from 'react';
import ExpandableItem from '@enact/moonstone/ExpandableItem';

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<ExpandableItem
			title="test"
		>
				This can be any type of content you might want to
					render inside a labeled expandable container

		</ExpandableItem>
	)
});

export default MainPanel;
