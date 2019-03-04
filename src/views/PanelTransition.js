import {ActivityPanels, Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';
import ExpandableList from '@enact/moonstone/ExpandableList';
import Item from '@enact/moonstone/Item';
import Scroller from '@enact/moonstone/Scroller';
import React from 'react';

const createList = childrenLength => {
	const arr = [];
	for (let i = 0; i < childrenLength; i++) {
		// TODO: we may be able to import components dynamically
		arr.push(
			<ExpandableList
				key={`el_${childrenLength}_${i}`}
				id={`el_${childrenLength}_${i}`}
				title={`ExpandableList_${childrenLength}_${i}`}
			>
				{[
					'expandableitem 1',
					'expandableitem 2',
					'expandableitem 3',
					'expandableitem 4',
					'expandableitem 5'
				]}
			</ExpandableList>
		);
	}
	return arr;
};

const ScrollerPanel = ({childrenLength, onClick, ...rest}) => {
	return (
		<Panel {...rest}>
			<Header title={`Title ${childrenLength}`}>
				<Button>Button</Button>
			</Header>
			<Scroller>
				<Item onClick={onClick}>Item</Item>
				{createList(childrenLength)}
			</Scroller>
		</Panel>
	);
};

class Panels extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0
		};
	}

	handleClick = () =>
		this.setState(state => {
			if (state.index < 4) {
				return {index: state.index + 1};
			}
			return {index: 0};
		});

	render () {
		return (
			<ActivityPanels index={this.state.index}>
				<ScrollerPanel childrenLength={10} onClick={this.handleClick} />
				<ScrollerPanel childrenLength={20} onClick={this.handleClick} />
				<ScrollerPanel childrenLength={30} onClick={this.handleClick} />
				<ScrollerPanel childrenLength={40} onClick={this.handleClick} />
				<ScrollerPanel childrenLength={50} onClick={this.handleClick} />
			</ActivityPanels>
		);
	}
}

export default Panels;
