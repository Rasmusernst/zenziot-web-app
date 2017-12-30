import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'

import Header from './Header'

// import classes from './style.scss'

const styles = theme => ({
	contentLeft: {
		marginLeft: 255,
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

class Body extends PureComponent {
	static propTypes = {
		children: PropTypes.element.isRequired,
		user: PropTypes.object,
		onShowFrontpage: PropTypes.func.isRequired,
		onShowOverview: PropTypes.func.isRequired,
		classes: PropTypes.object.isRequired,
		theme: PropTypes.object.isRequired,
	}

	state = {
		open: true,
	}

	handleToggleDrawer = () => {
		this.setState({ open: !this.state.open })
	}

	handleShiftContent = () => {
		return (
			this.state.open
				? this.props.classes.contentLeft + ' ' + this.props.classes.contentShift
				: this.props.classes.contentShiftLeft + ' ' + this.props.classes.contentShift
		)
	}
	// contentShift: this.state.open ? this.props.classes.contentLeft + ' ' + this.props.classes.contentShift : this.props.classes.contentShiftLeft,

	render() {
		const {
			classes,
			children,
			user,
			onShowFrontpage,
			onShowOverview,
		} = this.props

		console.log(this.state.open)
		return (
			<div>
				<Header
					user={user}
					onShowFrontpage={onShowFrontpage}
					onShowOverview={onShowOverview}
					onToggleDrawer={this.handleToggleDrawer}
					drawerIsOpen={this.state.open}
				/>

				<div className={this.handleShiftContent()}>
					{children}
				</div>

			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(Body)
