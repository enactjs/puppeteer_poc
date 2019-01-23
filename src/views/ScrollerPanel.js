import kind from '@enact/core/kind';
import {Panel} from '@enact/moonstone/Panels';
import React from 'react';
import Scroller from '@enact/moonstone/Scroller';
import Item from '@enact/moonstone/Item';
import Group from '@enact/ui/Group';

const itemData = [];
for (let i = 0; i < 100; i++) {
	itemData.push(`Item ${i}`);
}

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Scroller>
				<Group childComponent={Item}>
					{itemData}
				</Group>
			</Scroller>
		</Panel>
	)
});

export default MainPanel;
