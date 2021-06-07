import kind from '@enact/core/kind';
import Item from '@enact/moonstone/Item';

const ItemView = kind({
	name: 'ItemTest',

	render: () => (
		<Item id="item">Item Test</Item>
	)
});

export default ItemView;
