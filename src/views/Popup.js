import {ButtonBase as Button} from '@enact/moonstone/Button';
import Popup from '@enact/moonstone/Popup';
import React from 'react';

class MainPanel extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			open: true
		};
	}

	handleToggle = () => {
		this.setState(({open}) => ({open: !open}));
	}

	render () {
		const {open} = this.state;

		return (
			<div>
				<Button id="popup-open" onClick={this.handleToggle}>open</Button>
				<Popup id="PopupTest" open={open}>
					<Button id="popup-close" onClick={this.handleToggle}>close</Button>
				</Popup>
			</div>
		);
	}
}

export default MainPanel;
