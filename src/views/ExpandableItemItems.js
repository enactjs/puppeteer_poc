import kind from '@enact/core/kind';
import ExpandableItem from '@enact/moonstone/ExpandableItem';
import Item from '@enact/moonstone/Item';
import React from 'react';
import qs from 'qs';

const ExpandableItemItems = kind({
	name: 'ExpandableItemItems',

	render: ({location}) => {
		const arr = [];
		const search = qs.parse(location.search, {ignoreQueryPrefix: true});
		const count = parseInt(search.count);

		for (let i = 0; i < count; i++) {
			arr.push(
				<Item
					key={i}
				>
					{`Item ${i}`}
				</Item>
			);
		}

		return (
			<ExpandableItem id="ExpandableItem" title="title" label="label">
				{arr}
			</ExpandableItem>
		);
	}
});

export default ExpandableItemItems;
