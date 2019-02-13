import kind from '@enact/core/kind';
import {Panel} from '@enact/moonstone/Panels';
import React from 'react';
import ExpandableItem from '@enact/moonstone/ExpandableItem';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<ExpandableItem
				title="test"
			>
				This can be any type of content you might want to
					render inside a labeled expandable container

			</ExpandableItem>
		</Panel>
	)
});

export default MainPanel;
