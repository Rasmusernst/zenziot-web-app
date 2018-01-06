import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

import Typography from 'material-ui/Typography'

import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Checkbox from 'material-ui/Checkbox'
import Snackbar from 'material-ui/Snackbar'
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
		onEditMovementAlarm: PropTypes.func,
		onGetMovementAlarm: PropTypes.func,
		onDeleteMovementAlarm: PropTypes.func,
	}

	state = {
		open: false,
		snackbarOpen: false,
		name: 'Navn',
		startTime: '06:30',
		stopTime: '08:30',
		checked: false,
		alarmId: null,
		formcontentLoading: false,
		deleteDialogOpen: false,
		idToDelete: null,
	}

	handleClickOpen = () => {
		this.setState({ open: true })
	}

	handleClose = () => {
		this.setState({
			open: false,
			snackbarOpen: false,
			name: 'Navn',
			startTime: '06:30',
			stopTime: '08:30',
			checked: false,
			alarmId: null,
			formcontentLoading: false,
			deleteDialogOpen: false,
			idToDelete: null,
		})
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}

	componentDidUpdate() {
		if (this.props.trackers.movementAlarm !== null && !this.isUndefined(this.props.trackers.movementAlarm)) {
			this.populateForm()
		}
		this.handleErrors()
	}

	populateForm() {
		const { trackers } = this.props
		if (trackers.isInitialized && this.state.formcontentLoading) {
			this.setState({
				open: true,
				name: trackers.movementAlarm.get('name'),
				startTime: trackers.movementAlarm.get('startTime'),
				stopTime: trackers.movementAlarm.get('endTime'),
				checked: trackers.movementAlarm.get('startTime') === trackers.movementAlarm.get('endTime'),
				alarmId: trackers.movementAlarm.get('id'),
				formcontentLoading: false,
			})
		}
	}

	populateEditForm(alarmId) {
		this.setState({ formcontentLoading: true })
		this.props.onGetMovementAlarm(alarmId)
	}

	handleSubmit() {
		const { name, startTime, stopTime, checked, alarmId } = this.state
		const localName = name
		let formattedStartTime = startTime
		let formattedStopTime = stopTime
		const localAlarmId = alarmId
		this.handleClose()

		if (localAlarmId !== null) {
			formattedStartTime = checked ? '00:00:00' : startTime
			formattedStopTime = checked ? '00:00:00' : stopTime
			return this.props.onEditMovementAlarm(localName, formattedStartTime, formattedStopTime, localAlarmId)
		}
		formattedStartTime = checked ? '00:00:00' : startTime + ':00'
		formattedStopTime = checked ? '00:00:00' : stopTime + ':00'
		this.props.onCreateMovementAlarm(localName, formattedStartTime, formattedStopTime)
	}

	handleToggle = () => {
		this.setState({ checked: !this.state.checked })
	}

	handleOpenDeleteDialog(alarmId) {
		this.setState({
			deleteDialogOpen: true,
			idToDelete: alarmId,
		})
	}

	handleDelete() {
		this.props.onDeleteMovementAlarm(this.state.idToDelete)
		this.handleClose()
	}

	isUndefined(value) {
		var undef = void (0)
		return value === undef
	}

	handleErrors() {
		if (this.props.trackers.error && !this.isUndefined(this.props.trackers.error)) {
			this.setState({ snackbarOpen: true })
		}
	}

	render() {
		const { classes, trackers } = this.props
		const { name, startTime, stopTime, checked, deleteDialogOpen, snackbarOpen } = this.state
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
								<ListItem key={n.get('id')}>
									<ListItemText	primary={n.get('name')} />
									<div className={movementAlarmsclasses.button}>
										<IconButton aria-label='Delete' onClick={() => { this.handleOpenDeleteDialog(n.get('id')) }}>
											<Icon>delete</Icon>
										</IconButton>
									</div>
									<div className={movementAlarmsclasses.button}>
										<IconButton aria-label='Edit' onClick={() => { this.populateEditForm(n.get('id')) }}>
											<Icon>edit</Icon>
										</IconButton>
									</div>
								</ListItem>
							)
						})}
					</List>

					{/* Form for editing alarm */}
					<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby='form-dialog-title'
					>
						<DialogTitle id='form-dialog-title'>Opsæt Bevægelsesalarm</DialogTitle>

						<DialogContent>
							<TextField
								onChange={this.handleChange('name')}
								autoFocus
								margin='dense'
								value={name}
								id='name'
								label='Alarmens navn'
								fullWidth
							/>
						</DialogContent>

						<DialogContent>
							<TextField
								onChange={this.handleChange('startTime')}
								id='time-start'
								value={startTime}
								label='Alarmen aktiveres'
								type='time'
								fullWidth
							/>
						</DialogContent>

						<DialogContent>
							<TextField
								onChange={this.handleChange('stopTime')}
								id='time-end'
								value={stopTime}
								label='Alarmen deaktiveres'
								type='time'
								fullWidth
							/>
						</DialogContent>

						<DialogContent>
							<List>
								<ListItem
									dense
									button
									onClick={() => { this.handleToggle() }}
								>
									<Checkbox
										checked={checked}
										// onClick=
										tabIndex={-1}
										disableRipple
									/>
									<ListItemText primary='Alarmen skal altid være aktiveret' />
								</ListItem>
							</List>
						</DialogContent>

						<DialogActions classes={{ root: classes.dialogActions }}>

							<Button color='primary' onClick={() => { this.handleSubmit() }} raised >
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

					<Dialog
						open={deleteDialogOpen}
						onClose={this.handleClose}
						aria-labelledby='alert-dialog-title'
						aria-describedby='alert-dialog-description'
					>
						<DialogTitle id='alert-dialog-title'>{'Slet Alarm?'}</DialogTitle>
						<DialogContent>
							<DialogContentText id='alert-dialog-description'>
								Hvis du sletter alarmen vil den også blive slettet fra alle tilknyttede enheder.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => { this.handleDelete() }} color='primary'>
								OK
							</Button>
							<Button onClick={this.handleClose} color='primary' autoFocus>
								Annuler
							</Button>
						</DialogActions>
					</Dialog>

					<Grid container alignItems='flex-end' justify='flex-end'>
						<span className={movementAlarmsclasses.fabButtonWrapper}>
							<Button fab color='accent' aria-label='add' onClick={this.handleClickOpen}>
								<Icon classes={{ root: classes.whiteIcon }}>add</Icon>
							</Button>
						</span>
					</Grid>
				</Paper>

				<Snackbar
					open={snackbarOpen}
					onClose={this.handleClose}
					autoHideDuration={6000}
					SnackbarContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id='message-id'> Der skete en fejl. Prøv venligst igen.</span>}
				/>

			</Grid>
		)
	}
}

export default withStyles(styles)(MovementAlarms)
