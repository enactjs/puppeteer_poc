import kind from '@enact/core/kind';
import React from 'react';
import Picker from '@enact/moonstone/Picker';
import qs from 'qs';

const airports = [
	'San Francisco Airport Terminal Gate 1',
	'Boston Airport Terminal Gate 2',
	'Tokyo Airport Terminal Gate 3',
	'נמל התעופה בן גוריון טרמינל הבינלאומי'
];

const PickerMultiple = kind({
	name: 'PickerMultiple',

	render: ({location}) => {
		const arr = [];
		const search = qs.parse(location.search, {ignoreQueryPrefix: true});
		const count = parseInt(search.count) || 1;
		const joined = Boolean(search.joined) || false;

		for (let i = 0; i < count; i++) {
			arr.push(
				<Picker key={i} defaultValue={1} joined={joined} width="medium">
					{airports}
				</Picker>
			);
		}
		return (
			<div id="container">
				{arr}
			</div>
		);
	}
});

export default PickerMultiple;
