import kind from '@enact/core/kind';
import React from 'react';
import Scroller from '@enact/moonstone/Scroller';
import Item from '@enact/moonstone/Item';
import Group from '@enact/ui/Group';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<div {...props} style={{height: '700px'}}>
			<Scroller focusableScrollbar>
				<div style={{height: '5000px'}} />
			</Scroller>
		</div>
	)
});

export default MainPanel;
