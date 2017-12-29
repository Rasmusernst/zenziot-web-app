import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { withRouter } from 'react-router'

import Body from '../../components/body'

import classes from './style.scss'

@withRouter
export default class Layout extends PureComponent {
	static propTypes = {
		router: PropTypes.object.isRequired,
		children: PropTypes.element.isRequired,
		auth: PropTypes.object,
	}

	@autobind handleShowFrontpage() { this.props.router.push('/') }
	@autobind handleShowOverview() { this.props.router.push('/overview') }

	render() {
		const { children, auth } = this.props
		const user = auth

		return (
			<Body

				user={user}
				onShowFrontpage={this.handleShowFrontpage}
				onShowOverview={this.handleShowOverview}
			>
				<div className={classes.root}>
					{children}
				</div>

			</Body>
		)
	}
}
