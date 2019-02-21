import kind from '@enact/core/kind';
import React from 'react';
import Item from '@enact/moonstone/Item';

const ItemTest = kind({
	name: 'ItemTest',

	render: () => (
		<Item id="Item">Item Test</Item>
	)
});

export default ItemTest;
