import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from 'material-ui/Icon'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import Grid from 'material-ui/Grid'

import logo from './zenziot_logo_white.svg'
import classes from './style.scss'

export default class Header extends PureComponent {
	static propTypes = {
		user: PropTypes.object,
		onToggleDrawer: PropTypes.func.isRequired,
		onShowOverview: PropTypes.func.isRequired,
		showLogo: PropTypes.bool.isRequired,
	}

	render() {
		const { user, onToggleDrawer, onShowOverview, showLogo } = this.props

		return (
			<div>
				<AppBar className={classes.appBar} position='static'>
					{showLogo
						// show logo for all resolutions for register page, discard burger menu
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
								<Grid item xs>
									<Hidden mdUp>
										<div onClick={onShowOverview} className={classes.zenziotLogoWrapper}>
											<img src={logo} alt='ZenzIOT logo' />
										</div>
									</Hidden>
								</Grid>
							</Grid>
							<Button color='contrast'>Log ind</Button>
						</Toolbar>
					}
				</AppBar>
			</div>
		)
	}
}
