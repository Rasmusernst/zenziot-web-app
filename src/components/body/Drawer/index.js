import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import { withRouter } from 'react-router'

import classes from './style.scss'
import logo from './zenziot_logo.svg'

@withRouter
export default class NavigationDrawer extends PureComponent {
	static propTypes = {
		user: PropTypes.object,
		onShowFrontpage: PropTypes.func.isRequired,
		onShowOverview: PropTypes.func.isRequired,
		onShowTrackers: PropTypes.func.isRequired,
		onToggleDrawer: PropTypes.func.isRequired,
		drawerIsOpen: PropTypes.bool.isRequired,
		location: PropTypes.shape({
			pathname: PropTypes.string.isRequired,
		}),
	}

	componentDidMount() {
		this.props.onToggleDrawer('open')
	}

	render() {
		const { user, onShowFrontpage, onShowOverview, onToggleDrawer, onShowTrackers, drawerIsOpen } = this.props

		const path = this.props.location.pathname
		// const userIsLoggedIn = user === undefined ? false : user.isLoggedIn

		return (
			<div>

				<Drawer type='persistent' className={classes.drawer} anchor='left' open={drawerIsOpen}>
					<List>

						<ListItem button onClick={onShowFrontpage} className={classes.zenziotLogoWrapper}>
							<img src={logo} alt='ZenzIOT logo' />
						</ListItem>

						<ListItem button onClick={onShowOverview} className={path === '/overview' ? classes.highlight : null} >
							<ListItemIcon className={path === '/overview' ? classes.highlight : null}>
								<Icon className='material-icons'>home</Icon>
							</ListItemIcon>
							<ListItemText primary='Overblik' />
						</ListItem>

						<ListItem button onClick={onShowTrackers} className={path === '/trackers' ? classes.highlight : null}>
							<ListItemIcon className={path === '/trackers' ? classes.highlight : null}>
								<Icon className='material-icons'>view_list</Icon>
							</ListItemIcon>
							<ListItemText primary='Mine enheder' />
						</ListItem>

						<ListItem button onClick={onShowFrontpage} disabled>
							<ListItemIcon>
								<Icon className='material-icons'>map</Icon>
							</ListItemIcon>
							<ListItemText primary='Kort' />
						</ListItem>

						<ListItem button onClick={onShowFrontpage} disabled>
							<ListItemIcon>
								<Icon className='material-icons'>account_circle</Icon>
							</ListItemIcon>
							<ListItemText primary='Konto' />
						</ListItem>
					</List>

				</Drawer>

			</div>
		)
	}
}
