import kind from '@enact/core/kind';
import {ActivityPanels, Panel} from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<React.Fragment>
			<Panel {...props} />
		</React.Fragment>
	)
});

class Panels extends React.Component {
	static propTypes = {
		index: PropTypes.number
	}

	static defaultProps = {
		index: 0
	}

	constructor (props) {
		super(props);
		this.state = {
			index: this.props.index
		};
	}

	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState(prevState => {
		let newIndex;
		if (prevState.index) {
			newIndex = 0;
		} else {
			newIndex = 1;
		}
		return {index: newIndex};
	})

	render () {
		return <ActivityPanels index={this.state.index} >
			<MainPanel id="testPanel1" onClick={this.handleClick}>1</MainPanel>
			<MainPanel id="testPanel2" onClick={this.handleClick}>2</MainPanel>
		</ActivityPanels>
	}
}

export default Panels;
