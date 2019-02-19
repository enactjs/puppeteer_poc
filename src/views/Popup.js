import {ButtonBase as Button} from '@enact/moonstone/Button';
import Popup from '@enact/moonstone/Popup';
import React from 'react';

class MainPanel extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			open: false
		};
	}

	handleToggle = () => {
		this.setState(({open}) => ({open: !open}));
	}

	render () {
		const {open} = this.state;

		return (
			<div>
				<Button data-component-id="open" onClick={this.handleToggle}>open</Button>
				<Popup open={open}>
					<Button data-component-id="close" onClick={this.handleToggle}>close</Button>
				</Popup>
			</div>
		);
	}
}

export default MainPanel;
