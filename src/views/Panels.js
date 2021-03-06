import {ActivityPanels, Panel} from '@enact/moonstone/Panels';
import React from 'react';

class PanelsView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0
		};
	}

	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState(state => {
		return {index: state.index ? 0 : 1};
	})

	render () {
		return (
			<ActivityPanels index={this.state.index}>
				<Panel id="panel-1" onClick={this.handleClick}>1</Panel>
				<Panel id="panel-2" onClick={this.handleClick}>2</Panel>
			</ActivityPanels>
		);
	}
}

export default PanelsView;
