import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'
import { withRouter } from 'react-router'

import Header from './Header'
import Drawer from './Drawer'
import BottomNav from './BottomNav'

const styles = theme => ({
	contentLeft: {
		marginLeft: 248,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	contentShiftLeft: {
		marginLeft: 0,
	},
})

@withRouter
class Body extends PureComponent {
	static propTypes = {
		children: PropTypes.element.isRequired,
		user: PropTypes.object,
		onLogOut: PropTypes.func.isRequired,
		onShowFrontpage: PropTypes.func.isRequired,
		onShowOverview: PropTypes.func.isRequired,
		classes: PropTypes.object.isRequired,
		location: PropTypes.shape({
			pathname: PropTypes.string.isRequired,
		}),
	}

	state = {
		open: true,
	}

	handleToggleDrawer = (forceValue) => {
		switch (forceValue) {
			case 'open':
				this.setState({ open: true })
				break
			case 'close':
				this.setState({ open: false })
				break
			default:
				this.setState({ open: !this.state.open })
		}
	}

	handleShiftContent = () => {
		return (
			this.state.open
				? this.props.classes.contentLeft + ' ' + this.props.classes.contentShift
				: this.props.classes.contentShiftLeft + ' ' + this.props.classes.contentShift
		)
	}

	render() {
		const {
			children,
			user,
			onShowFrontpage,
			onShowOverview,
			location,
			onLogOut,
		} = this.props

		return (
			<div>

				{(() => {
					switch (location.pathname) {
						// hide all menus for front page
						case '/':
							return (
								<div>
									{children}
								</div>
							)

						// show Header for register page
						case '/register':
							return (
								<div>
									<Header
										user={user}
										onLogOut={onLogOut}
										onShowFrontpage={onShowFrontpage}
										onShowOverview={onShowOverview}
										onToggleDrawer={this.handleToggleDrawer}
										drawerIsOpen={this.state.open}
										showLogo
									/>
									{children}
								</div>
							)

						// show Header and side navigation/bottom navigation for dasboard pages.
						default:
							return (
								<div>
									<Hidden mdDown>
										<Drawer
											onShowFrontpage={onShowFrontpage}
											onShowOverview={onShowOverview}
											onToggleDrawer={this.handleToggleDrawer}
											drawerIsOpen={this.state.open}
											user={user}
										/>
									</Hidden>

									<div className={this.handleShiftContent()}>
										<Header
											user={user}
											onLogOut={onLogOut}
											onShowFrontpage={onShowFrontpage}
											onShowOverview={onShowOverview}
											onToggleDrawer={this.handleToggleDrawer}
											drawerIsOpen={this.state.open}
											showLogo={false}
										/>
										{children}
									</div>

									<Hidden mdUp >
										<BottomNav
											onShowFrontpage={onShowFrontpage}
											onShowOverview={onShowOverview}
											onToggleDrawer={this.handleToggleDrawer}
										/>
									</Hidden>

								</div>
							)
					}
				})()}
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(Body)
