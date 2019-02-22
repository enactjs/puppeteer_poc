import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';

import Picker from '../views/Picker';
import ScrollerPanel from '../views/ScrollerPanel';
import Panels from '../views/Panels';
import ExpandableItem from '../views/ExpandableItem';
import Marquee from '../views/Marquee';
import Spinner from '../views/Spinner';
import Button from '../views/Button';
import VirtualList from '../views/VirtualList';
import Item from '../views/Item';

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
				<Route path="/marquee" component={Marquee} />
				<Route path="/spinner" component={Spinner} />
				<Route path="/button" component={Button} />
				<Route path="/virtualList" component={VirtualList} />
				<Route path="/item" component={Item} />
			</div>
		</Router>
	)
});

export default MoonstoneDecorator(App);
