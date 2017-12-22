import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { withRouter } from 'react-router'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'

@withRouter
export default class Layout extends PureComponent {
	static propTypes = {
		router: PropTypes.object.isRequired,
		children: PropTypes.element.isRequired,
	}

	@autobind handleShowFrontpage() { this.props.router.push('/') }
	@autobind handleShowOverview() { this.props.router.push('/About') }

	state = {
		open: true,
	}

	handleDrawerClose = () => { this.setState({ open: false }) }

	render() {
		const { children } = this.props
		const { open } = this.state
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
						<ListItem button onClick={this.handleShowFrontpage}>
							<ListItemIcon>
								<Icon className='material-icons'>home</Icon>
							</ListItemIcon>
							<ListItemText primary='Inbox' />
						</ListItem>
						<ListItem button onClick={this.handleShowOverview}>
							<ListItemIcon>
								<Icon className='material-icons'>home</Icon>
							</ListItemIcon>
							<ListItemText primary='Subpage Bitch' />
						</ListItem>
						<ListItem button onClick={this.handleDrawerClose}>
							<ListItemIcon>
								<Icon className='material-icons'>close</Icon>
							</ListItemIcon>
							<ListItemText primary='Close' />
						</ListItem>
					</List>
				</Drawer>
				{children}
			</div>
		)
	}
}
