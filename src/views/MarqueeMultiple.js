import kind from '@enact/core/kind';
import React from 'react';
import Marquee from '@enact/moonstone/Marquee';
import qs from 'qs';

const MarqueeMultiple = kind({
	name: 'MarqueeMultiple',

	render: ({location}) => {
		const arr = [];
		const search = qs.parse(location.search, {ignoreQueryPrefix: true});
		const count = parseInt(search.count);
		const marqueeOn = search.marqueeOn || 'hover';

		for (let i = 0; i < count; i++) {
			arr.push(
				<Marquee
					id={`Marquee_${i}`}
					key={i}
					marqueeDelay={1}
					marqueeOn={marqueeOn}
				>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</Marquee>
			);
		}
		return (
			<div id="Container">
				{arr}
			</div>
		);
	}
});

export default MarqueeMultiple;
