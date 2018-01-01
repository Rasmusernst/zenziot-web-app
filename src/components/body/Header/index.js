import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from 'material-ui/Icon'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import Grid from 'material-ui/Grid'
import Menu, { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'

import logo from './zenziot_logo_white.svg'
import classes from './style.scss'

export default class Header extends PureComponent {
	static propTypes = {
		user: PropTypes.object,
		onLogOut: PropTypes.func.isRequired,
		onToggleDrawer: PropTypes.func.isRequired,
		onShowOverview: PropTypes.func.isRequired,
		onShowFrontpage: PropTypes.func.isRequired,
		showLogo: PropTypes.bool.isRequired,
		drawerIsOpen: PropTypes.bool.isRequired,
	}

	state = {
		anchorEl: null,
		accountMenuOpen: false,
	}

	handleClick = event => {
		this.setState({ accountMenuOpen: true, anchorEl: event.currentTarget })
	}

	handleClose = () => {
		this.setState({ accountMenuOpen: false })
	}

	handleLogOut = () => {
		this.props.onLogOut()
		this.props.onShowFrontpage()
	}

	render() {
		const {
			user,
			onToggleDrawer,
			onShowOverview,
			showLogo,
			drawerIsOpen,
		} = this.props

		const userName = user ? user.get('name') : 'Brugernavn ikke fundet'

		return (
			<div>
				<AppBar className={classes.appBar} position='static'>
					{showLogo
						// register page appbar: show logo for all resolutions for register page, discard burger menu
						?	<Toolbar>
							<Grid container spacing={24}>
								<Grid item xs>
									<div onClick={onShowOverview} className={classes.zenziotLogoWrapper}>
										<img src={logo} alt='ZenzIOT logo' />
									</div>
								</Grid>
							</Grid>
						</Toolbar>
						// default appBar config
						: <Toolbar>
							<Hidden mdDown>
								<IconButton color='contrast' onClick={onToggleDrawer} aria-label='Menu'>
									<Icon className='material-icons'>menu</Icon>
								</IconButton>
							</Hidden>
							<Grid container spacing={24}>

								{!drawerIsOpen &&
								<Grid item xs>
									<Hidden mdUp >
										<div onClick={onShowOverview} className={classes.zenziotLogoWrapper}>
											<img src={logo} alt='ZenzIOT logo' />
										</div>
									</Hidden>
									<Hidden mdDown >
										<div onClick={onShowOverview} className={classes.zenziotLogoWrapper}>
											<img src={logo} alt='ZenzIOT logo' />
										</div>
									</Hidden>
								</Grid>
								}

							</Grid>

							<Button color='contrast' >
								<Icon className='material-icons'>notifications</Icon>
							</Button>

							<Button color='contrast'
								aria-owns={this.state.open ? 'account-menu' : null}
								aria-haspopup='true'
								onClick={this.handleClick}
							>
								<Icon className='material-icons'>account_circle</Icon>
							</Button>

							<Menu
								id='account-menu'
								anchorEl={this.state.anchorEl}
								open={this.state.accountMenuOpen}
								onClose={this.handleClose}
							>

								<MenuItem disabled >{userName}</MenuItem>
								<MenuItem onClick={this.handleClose}>Konto</MenuItem>
								<MenuItem onClick={this.handleLogOut}>Log ud</MenuItem>
							</Menu>
						</Toolbar>
					}
				</AppBar>
			</div>
		)
	}
}
