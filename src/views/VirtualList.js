import React from 'react';

import kind from '@enact/core/kind';
import Item from '@enact/moonstone/Item';
import VirtualList from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';

const itemStyle = {
	borderBottom: ri.unit(3, 'rem') + ' solid #202328',
	boxSizing: 'border-box'
};
const items = [];

// eslint-disable-next-line enact/display-name, enact/prop-types
const renderItem = (size) => ({index, ...rest}) => {
	const style = {height: size + 'px', ...itemStyle};
	return (
		<Item index={index} style={style} {...rest}>
			{items[index].item}
		</Item>
	);
};

for (let i = 0; i < 100; i++) {
	items.push({item :'Item ' + ('00' + i).slice(-3), selected: false});
}

const itemSize = ri.scale(72);

const VirtualListTest = kind({
	name: 'VirtualListTest',

	render: ({...props}) => (
		<div {...props} style={{height: '700px'}}>
			<VirtualList
				id="VirtualList"
				dataSize={items.length}
				focusableScrollbar
				itemRenderer={renderItem(itemSize)}
				itemSize={itemSize}
				spacing={ri.scale(0)}
			/>
		</div>
	)
});

export default VirtualListTest;
