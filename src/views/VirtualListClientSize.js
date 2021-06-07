import kind from '@enact/core/kind';
import UiVirtualListJS, {VirtualListNative as UiVirtualListNative} from '@enact/ui/VirtualList';
import VirtualListJS, {VirtualListNative} from '@enact/moonstone/VirtualList';
import qs from 'qs';
import DelayedRender from '../components/DelayedRender';

const items = [];

// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	return (
		<div {...rest}>
			{items[index]}
		</div>
	);
};

for (let i = 0; i < 100; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

const itemSize = 60;

const types = {
	VirtualListJS,
	VirtualListNative,
	UiVirtualListJS,
	UiVirtualListNative
};

const VirtualListClientSizeView = kind({
	name: 'VirtualListClientSizeView',

	render: ({location}) => {
		const search = qs.parse(location.search, {ignoreQueryPrefix: true});
		const clientSize = search.clientSize ? {clientWidth: 1280, clientHeight: 720} : undefined;
		const VirtualList = types[search.type] || VirtualListJS;

		return (
			<div style={{width: '1280px', height: '720px'}}>
				<DelayedRender>
					<VirtualList
						id="virtualList"
						clientSize={clientSize}
						dataSize={items.length}
						itemRenderer={renderItem}
						itemSize={itemSize}
					/>
				</DelayedRender>
			</div>
		);
	}
});

export default VirtualListClientSizeView;
