import kind from '@enact/core/kind';
import React from 'react';
import Scroller from '@enact/moonstone/Scroller';

const ScrollerTest = kind({
	name: 'Scroller',

	render: (props) => (
		<div {...props} style={{height: '700px'}}>
			<Scroller id="Scroller" focusableScrollbar>
				<div style={{height: '5000px'}} />
			</Scroller>
		</div>
	)
});

export default ScrollerTest;
