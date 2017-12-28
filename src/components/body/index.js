import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import Header from './Header'

export default class Body extends PureComponent {
	static propTypes = {
		children: PropTypes.element.isRequired,
		user: PropTypes.object,
		onShowFrontpage: PropTypes.func.isRequired,
		onShowOverview: PropTypes.func.isRequired,
	}

	state = {
		open: true,
	}

	handleDrawerClose = () => { this.setState({ open: false }) }

	render() {
		const {
			children,
			user,
			onShowFrontpage,
			onShowOverview,
		} = this.props

		return (
			<div>
				<Header
					user={user}
					onShowFrontpage={onShowFrontpage}
					onShowOverview={onShowOverview}
				/>
				{children}
			</div>
		)
	}
}
