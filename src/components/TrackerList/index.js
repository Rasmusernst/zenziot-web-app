import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import Avatar from 'material-ui/Avatar'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Hidden from 'material-ui/Hidden'

import trackerListclasses from './style.scss'

const styles = theme => ({
	trackerListPaper: {
		minHeight: '80vh',
		margin: '24px',
		padding: '24px',
	},
	trackersTableRow: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
})

class TrackerList extends PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		trackerList: PropTypes.object,
	}

	alarmIsActive(areaAlarm, movementAlarm) {
		console.log(areaAlarm, movementAlarm)
		const activated = areaAlarm !== null || movementAlarm !== null
		console.log(activated)
		return activated
	}

	render() {
		const { classes, trackers } = this.props
		return (

			<Grid item xs>
				<Paper classes={{ root: classes.trackerListPaper }}>
					<Grid item xs>
						<Table>
							<TableHead>
								<Hidden lgDown>
									<TableRow >
										<TableCell />
										<TableCell>Enhed</TableCell>
										<TableCell >Status</TableCell>
										<TableCell >Områdealarm</TableCell>
										<TableCell >Bevægelsesalarm</TableCell>
										<TableCell >Alarmpersoner</TableCell>
									</TableRow>
								</Hidden>
								<Hidden lgUp>
									<TableRow >
										<TableCell />
										<TableCell>Enhed</TableCell>
									</TableRow>
								</Hidden>
							</TableHead>
							<Hidden lgDown>
								<TableBody >
									{trackers.isInitialized && trackers.trackerList !== null &&
										trackers.trackerList.map(n => {
											return (
												<TableRow key={n.get('deviceId')} hover classes={{ hover: classes.trackersTableRow }}>
													<TableCell>
														<Icon>directions_car</Icon>
													</TableCell>
													<TableCell>
														{n.get('deviceName')}
													</TableCell>
													<TableCell>
														{
															this.alarmIsActive(n.getIn(['areaAlarm', 'activated']), n.getIn(['movementAlarm', 'activated'])) &&
															<Icon>warning</Icon>
														}
													</TableCell>
													<TableCell>
														{n.getIn(['areaAlarm', 'name'])}
													</TableCell>
													<TableCell>

														{n.getIn(['movementAlarm', 'name'])}
													</TableCell>
													<TableCell>
														{n.getIn(['alarmPersons']).map(p => {
															return (
																<span>{p} </span>
															)
														},
														)

														}
													</TableCell>
												</TableRow>
											)
										})}
								</TableBody>
							</Hidden>
							<Hidden lgUp>
								<TableBody >
									{trackers.isInitialized && trackers.trackers.map(n => {
										return (
											<TableRow key={n.get('id')} hover classes={{ hover: classes.trackersTableRow }}>
												<TableCell>
													<Icon>directions_car</Icon>
												</TableCell>
												<TableCell>
													{n.get('name')}
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Hidden>
						</Table>
					</Grid>

				</Paper>
			</Grid>
		)
	}
}

export default withStyles(styles)(TrackerList)
