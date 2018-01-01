import { PureComponent, Children } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import { actions as authActions } from '../../stores/auth'

@connect(({ auth }) => ({ auth }), authActions)
@withRouter
export default class EnsureLoaded extends PureComponent {
	static propTypes = {
		router: PropTypes.object.isRequired,
		children: PropTypes.element.isRequired,
		getAccessToken: PropTypes.func,
		auth: PropTypes.object,
	}

	componentDidMount() {
		this.props.getAccessToken()
		// console.log('EnsureLoaded says isLoggedIn is: ', this.props.auth.isLoggedIn)
	}

	render() {
		const { children, auth } = this.props
		if (auth.isLoggedIn) {
			return Children.only(children)
		} else {
			this.props.router.push('/')
			return null
		}
	}
}
