import React from 'react';
import PropTypes from 'prop-types';

class DelayedRender extends React.Component {
	static propTypes = {
		timeout: PropTypes.number
	}

	static defaultProps = {
		timeout: 100
	}

	state = {
		show: false
	}

	componentDidMount () {
		setTimeout(() => this.setState({show: true}), this.props.timeout);
	}

	render () {
		return this.state.show ? this.props.children : '';
	}
}

export default DelayedRender;
