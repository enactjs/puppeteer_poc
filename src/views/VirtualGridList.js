import React from 'react';
import kind from '@enact/core/kind';
import {VirtualGridListNative as VirtualGridList} from '@enact/moonstone/VirtualList';
import Spottable from '@enact/spotlight/Spottable';

const items = [];
const SpottableDiv = Spottable('div');

// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	return (
		<SpottableDiv {...rest}>
			{items[index].item}
		</SpottableDiv>
	);
};

for (let i = 0; i < 1000; i++) {
	items.push({item :'Item ' + ('00' + i).slice(-3)});
}

const itemSize = {
	minWidth: 180,
	minHeight: 270
};

const VirtualListView = kind({
	name: 'VirtualListView',

	render: () => (
		<div style={{height: '700px'}}>
			<VirtualGridList
				id="virtualList"
				dataSize={items.length}
				focusableScrollbar
				itemRenderer={renderItem}
				itemSize={itemSize}
			/>
		</div>
	)
});

export default VirtualListView;
