import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { withRouter } from 'react-router'

@withRouter
export default class Layout extends PureComponent {
	static propTypes = {
		router: PropTypes.object.isRequired,
		children: PropTypes.element.isRequired,
	}

	@autobind handleShowFrontpage() { this.props.router.push('/') }
	@autobind handleShowOverview() { this.props.router.push('/About') }

	render() {
		const { children } = this.props
		return (
			<div>
				<ul>
					<li><button type='link' label='Home' onClick={this.handleShowFrontpage}>Home</button></li>
					<li><button type='link' label='About' onClick={this.handleShowOverview}>About</button></li>
				</ul>
				{children}
			</div>
		)
	}
}
