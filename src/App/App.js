import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';

import PickerPanel from '../views/PickerPanel';
import ScrollerPanel from '../views/ScrollerPanel';
import ExpandableItemPanel from '../views/ExpandableItemPanel';

import css from './App.less';

import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<Router>
			<div {...props}>
				<Route path="/picker" component={PickerPanel} />
				<Route path="/scroller" component={ScrollerPanel} />
				<Route path="/expandableItem" component={ExpandableItemPanel} />
			</div>
		</Router>
	)
});

export default MoonstoneDecorator(App);
