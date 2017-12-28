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
// import Grid from 'material-ui/Grid'

export default class Layout extends PureComponent {
	static propTypes = {
		user: PropTypes.object,
		onShowFrontpage: PropTypes.func.isRequired,
		onShowOverview: PropTypes.func.isRequired,
	}

	state = {
		open: true,
	}

	handleDrawerClose = () => { this.setState({ open: false }) }

	render() {
		const { user, onShowFrontpage, onShowOverview } = this.props
		const { open } = this.state

		console.log('user: ', user)

		return (
			<div>
				<AppBar position='static'>
					<Toolbar>
						<IconButton color='contrast' aria-label='Menu'>
							<Icon className='material-icons'>menu</Icon>
						</IconButton>
						<Typography type='title' color='inherit'>
							Title
						</Typography>
						<Button color='contrast'>Login</Button>
					</Toolbar>
				</AppBar>
				<Drawer type='persistent'	anchor='left' open={open}>
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
						<ListItem button onClick={this.handleDrawerClose}>
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
