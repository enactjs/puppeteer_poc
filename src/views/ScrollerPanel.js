import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import Picker from '@enact/moonstone/Picker';
import Scroller from '@enact/moonstone/Scroller';
import Item from '@enact/moonstone/Item';
import Group from '@enact/ui/Group';

const airports = [
	'San Francisco Airport Terminal Gate 1',
	'Boston Airport Terminal Gate 2',
	'Tokyo Airport Terminal Gate 3',
	'נמל התעופה בן גוריון טרמינל הבינלאומי'
];

const CustomItem = (props) => {
	return <Item style={{height: '100px'}} {...props} />;
};

const itemData = [];
for (let i = 0; i < 100; i++) {
	itemData.push(`Item ${i}`);
}

const
	prop = {
		direction: ['both', 'horizontal', 'vertical'],
		horizontalScrollbar: ['auto', 'hidden', 'visible']
	};

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
