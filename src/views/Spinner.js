import kind from '@enact/core/kind';
import React from 'react';
import Spinner from '@enact/moonstone/Spinner';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<div {...props}>
			<Spinner>Loading message...</Spinner>
		</div>
	)
});

export default MainPanel;
