import kind from '@enact/core/kind';
import ExpandableItem from '@enact/moonstone/ExpandableItem';

const ExpandableItemView = kind({
	name: 'ExpandableItemView',

	render: () => (
		<div className='testExpandable'>
			<ExpandableItem
				title="test"
			>
				This can be any type of content you might want to render inside a labeled expandable container
			</ExpandableItem>
		</div>
	)
});

export default ExpandableItemView;
