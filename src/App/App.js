import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import Picker from '../views/Picker';
import ScrollerPanel from '../views/ScrollerPanel';
import Panels from '../views/Panels';
import ExpandableItem from '../views/ExpandableItem';
import Popup from '../views/Popup';
import Marquee from '../views/Marquee';
import Spinner from '../views/Spinner';
import Button from '../views/Button';
import VirtualList from '../views/VirtualList';
import GridListImageItem from '../views/GridListImageItem';
import Item from '../views/Item';
import Slider from '../views/Slider';
import MarqueeMultiple from '../views/MarqueeMultiple';

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
				<Route path="/popup" component={Popup} />
				<Route path="/marquee" component={Marquee} />
				<Route path="/spinner" component={Spinner} />
				<Route path="/button" component={Button} />
				<Route path="/virtualList" component={VirtualList} />
				<Route path="/gridListImageItem" component={GridListImageItem} />
				<Route path="/item" component={Item} />
				<Route path="/slider" component={Slider} />
				<Route path="/marqueeMultiple" component={MarqueeMultiple} />
			</div>
		</Router>
	)
});

export default MoonstoneDecorator(App);
