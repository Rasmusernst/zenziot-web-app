import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

import Typography from 'material-ui/Typography'

import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Checkbox from 'material-ui/Checkbox'

import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog'

// import TimeInput from 'material-ui-time-picker'

import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'

import List, {
	ListItem,
	ListItemText,
} from 'material-ui/List'

import Hidden from 'material-ui/Hidden'

import movementAlarmsclasses from './style.scss'

const styles = theme => ({
	trackerListPaper: {
		minHeight: '80vh',
		margin: '24px',
		padding: '24px',
	},
	whiteIcon: {
		color: theme.palette.common.white,
	},
	dialogActions: {
		margin: '0 12px',
	},
	editLink: {
		marginTop: '24px',
	},
	headlineDivider: {
		marginTop: '0px',
		marginBottom: '8px',
	},
})

class MovementAlarms extends PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		trackers: PropTypes.object,
		onCreateMovementAlarm: PropTypes.func,
	}

state = {
	open: false,
}

handleClickOpen = () => {
	this.setState({ open: true })
}

handleClose = () => {
	this.setState({ open: false })
}

render() {
	const { classes, trackers, onCreateMovementAlarm } = this.props
	return (

		<Grid item xs={12} md={8} lg={6} xl={4}>
			<Paper classes={{ root: classes.trackerListPaper }}>
				<List>
					<ListItem>
						<Typography type='subheading'>
											Alle Bevægelsesalarmer
						</Typography>

					</ListItem>
					<Divider classes={{ root: classes.headlineDivider }} />
					{trackers.isInitialized && trackers.movementAlarms.map(n => {
						return (
							<ListItem>
								<ListItemText	primary={n.get('name')} />

								<div className={movementAlarmsclasses.button}>
									<IconButton aria-label='Delete'>
										<Icon>delete</Icon>
									</IconButton>
								</div>

								<div className={movementAlarmsclasses.button}>
									<IconButton aria-label='Delete'>
										<Icon>edit</Icon>
									</IconButton>
								</div>

							</ListItem>
						)
					})}
				</List>

				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>Opsæt Bevægelsesalarm</DialogTitle>

					<DialogContent>
						<TextField
							autoFocus
							margin='dense'
							id='name'
							label='Alarmens navn'
							fullWidth
						/>
					</DialogContent>

					<DialogContent>
						<TextField
							id='time'
							label='Alarmen aktiveres'
							type='time'
							defaultValue='23:30'
							fullWidth
						/>
					</DialogContent>

					<DialogContent>
						<TextField
							id='time'
							label='Alarmen deaktiveres'
							type='time'
							defaultValue='23:30'
							fullWidth
						/>
					</DialogContent>

					<DialogContent>
						<List>
							<ListItem
								dense
								button
								// onClick={this.handleToggle(value)}
						            >
								<Checkbox
									// checked={this.state.checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
						              />
								<ListItemText primary='Alarmen skal altid være aktiveret' />
							</ListItem>
						</List>

					</DialogContent>

					<DialogActions classes={{ root: classes.dialogActions }}>

						<Button onClick={this.handleClose} color='primary' raised >
								Gem
						</Button>
						<Button onClick={this.handleClose} color='primary' raised >
								Annuler
						</Button>

					</DialogActions>

					<DialogContent>
						<Grid container spacing={0} justify='flex-end' >
							<Grid item xs={1}>
								<Icon color='primary' classes={{ root: classes.editLink }}>edit</Icon>
							</Grid>
							<Grid item xs={7}>

								<Typography type='body1' align='right' color='primary' classes={{ root: classes.editLink }}>
													Rediger tilknyttede enheder
								</Typography>

							</Grid>
						</Grid>
					</DialogContent>
				</Dialog>

				<Grid container alignItems='flex-end' justify='flex-end'>
					<span className={movementAlarmsclasses.fabButtonWrapper}>
						<Button fab color='accent' aria-label='add' onClick={this.handleClickOpen}>
							<Icon classes={{ root: classes.whiteIcon }}>add</Icon>
						</Button>
					</span>
				</Grid>
			</Paper>
		</Grid>
	)
}
}

export default withStyles(styles)(MovementAlarms)
