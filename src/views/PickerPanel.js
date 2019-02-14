import kind from '@enact/core/kind';
import React from 'react';
import Picker from '@enact/moonstone/Picker';

const airports = [
	'San Francisco Airport Terminal Gate 1',
	'Boston Airport Terminal Gate 2',
	'Tokyo Airport Terminal Gate 3',
	'נמל התעופה בן גוריון טרמינל הבינלאומי'
];

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<div {...props}>
			<Picker
				wrap
				joined
				width="large"
			>
				{airports}
			</Picker>
		</div>
	)
});

export default MainPanel;
