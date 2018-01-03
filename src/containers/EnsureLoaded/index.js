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
		// getAccessToken: PropTypes.func,
		ensureLoaded: PropTypes.func,
		auth: PropTypes.object,
	}

	componentDidMount() {
		this.props.ensureLoaded()
		// console.log('componentDidMount')
		// console.log(this.props.auth.isInitialized, this.props.auth.isLoading, this.props.auth.isLoggedIn)
		// console.log('EnsureLoaded says isLoggedIn is: ', this.props.auth.isLoggedIn)
	}

	componentWillUpdate(nextProps) {
		// console.log('next props', nextProps.children.props.location.pathname )
		// console.log('current props', this.props.children.props.location.pathname )
		if (nextProps.children.props.location.pathname !== this.props.children.props.location.pathname) {
			// console.log('componentWillUpdate')
			this.props.ensureLoaded()
		}
	}
	// componentDidUpdate() {
	// 	console.log(this.props.auth.isInitialized, this.props.auth.isLoading, this.props.auth.isLoggedIn)
	// }

	// First we need to make sure we dont react to any routing requests bafore api call to check access token validity has completed
	// isInitialized is used as an indication that the getAccessToken endpoint has been called and that a user has been returned.
	// isLoading is used as an indication of any ongoing call to db. Why?
	// Even though the user has alread been authorized doesn't mean that he should be for next route

	render() {
		const { children, auth } = this.props

		if (auth.isInitialized && !auth.isLoading) {
			// console.log('fired', auth.user)
			if (auth.isLoggedIn) {
				return Children.only(children)
			}
			if (!auth.isLoggedIn && auth.user === null) {
				this.props.router.push('/')
			}
			return null
		}
		return null
	}
}
