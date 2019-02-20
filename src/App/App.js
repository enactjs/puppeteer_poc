import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';

import Picker from '../views/Picker';
import ScrollerPanel from '../views/ScrollerPanel';
import Panels from '../views/Panels';
import ExpandableItem from '../views/ExpandableItem';
import Button from '../views/Button';

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
				<Route path="/panels" component={Panels} />
				<Route path="/picker" component={Picker} />
				<Route path="/scroller" component={ScrollerPanel} />
				<Route path="/expandableItem" component={ExpandableItem} />
				<Route path="/button" component={Button} />
			</div>
		</Router>
	)
});

export default MoonstoneDecorator(App);
