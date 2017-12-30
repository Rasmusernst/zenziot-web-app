import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'

import classes from './style.scss'

export default class Header extends PureComponent {
	static propTypes = {
		user: PropTypes.object,
		onShowFrontpage: PropTypes.func.isRequired,
		onShowOverview: PropTypes.func.isRequired,
		onToggleDrawer: PropTypes.func.isRequired,
		drawerIsOpen: PropTypes.bool.isRequired,
	}

	render() {
		const { user, onShowFrontpage, onShowOverview, onToggleDrawer, drawerIsOpen } = this.props

		return (
			<div>
				<AppBar className={classes.appBar} position='static'>
					<Toolbar>
						<IconButton color='contrast' onClick={onToggleDrawer} aria-label='Menu'>
							<Icon className='material-icons'>menu</Icon>
						</IconButton>
						<Typography type='title' color='inherit'>
							Title
						</Typography>
						<Button color='contrast'>Login</Button>
					</Toolbar>
				</AppBar>
				<Drawer type='persistent' className={classes.drawer} anchor='left' open={drawerIsOpen}>
					<List>
						<ListItem button onClick={onShowFrontpage}>
							<ListItemIcon>
								<Icon className='material-icons'>home</Icon>
							</ListItemIcon>
							<ListItemText primary='Forside' />
						</ListItem>
						<ListItem button onClick={onShowOverview}>
							<ListItemIcon>
								<Icon className='material-icons'>home</Icon>
							</ListItemIcon>
							<ListItemText primary='Subpage' />
						</ListItem>
						<ListItem button onClick={onToggleDrawer}>
							<ListItemIcon>
								<Icon className='material-icons'>close</Icon>
							</ListItemIcon>
							<ListItemText primary='Close' />
						</ListItem>
					</List>
				</Drawer>
			</div>
		)
	}
}
