import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'

import TrackerList from '../../components/TrackerList'
import MovementAlarms from '../../components/MovementAlarms'

import { actions as trackersActions } from '../../stores/trackers'

import trackersClasses from './style.scss'

const styles = theme => ({
	customPaperBlue: {
		backgroundColor: theme.palette.primary['500'],
		height: '106px',
	},
	customPaperLightBlue: {
		backgroundColor: '#6ec6ff',
	},
	headlineText: {
		color: theme.palette.common.white,
		paddingLeft: '24px',
	},
})

@withRouter
@connect(({ trackers }) => ({ trackers }), trackersActions)
class Trackers extends PureComponent {
	static propTypes = {
		trackers: PropTypes.object,
		getTrackers: PropTypes.func,
		getMovementAlarms: PropTypes.func,
		createMovementAlarm: PropTypes.func,
		editMovementAlarm: PropTypes.func,
		getMovementAlarm: PropTypes.func,
		deleteMovementAlarm: PropTypes.func,
		classes: PropTypes.object.isRequired,
	}
		@autobind handleCreateMovementAlarm(name, startTime, stopTime) { this.props.createMovementAlarm(name, startTime, stopTime) }
		@autobind handleEditMovementAlarm(name, startTime, stopTime, alarmId) { this.props.editMovementAlarm(name, startTime, stopTime, alarmId) }
		@autobind handleGetMovementAlarm(alarmId) { this.props.getMovementAlarm(alarmId) }
		@autobind handleDeleteMovementAlarm(alarmId) { this.props.deleteMovementAlarm(alarmId) }

		componentDidMount() {
			this.props.getTrackers()
			this.props.getMovementAlarms()
		}

	state = {
		value: 0,
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}
	render() {
		const { classes, trackers } = this.props
		const { value } = this.state

		return (

			<Grid container spacing={0} >
				<Hidden smDown>
					<Grid item xs>
						<Paper classes={{	root: classes.customPaperBlue }}>
							<div className={trackersClasses.headline}>
								<Typography type='headline' classes={{	root: classes.headlineText }}>
									Mit overblik
								</Typography>
							</div>
						</Paper>
					</Grid>
				</Hidden>
				<AppBar position='static' classes={{	root: classes.customPaperLightBlue }}>
					<Tabs value={value}
						onChange={this.handleChange}
						indicatorColor='#FF9100'
						textColor='rgba(46, 55, 59, 0.87)'
						scrollable
					>
						<Tab label='Enheder' />
						<Tab label='Områdealarmer' />
						<Tab label='Bevægelsesalarmer' />
						<Tab label='Alarmpersoner' />

					</Tabs>
				</AppBar>

				<Grid container spacing={0} >

					{value === 0 &&
						<TrackerList trackers={trackers} />
					}
					{value === 1 &&
						<Typography type='headline'>
										Områdealarmer... coming soon!
						</Typography>
					}
					{value === 2 &&
					<MovementAlarms trackers={trackers}
						onCreateMovementAlarm={this.handleCreateMovementAlarm}
						onEditMovementAlarm={this.handleEditMovementAlarm}
						onGetMovementAlarm={this.handleGetMovementAlarm}
						onDeleteMovementAlarm={this.handleDeleteMovementAlarm}
					/>

					}
					{value === 3 &&
						<Typography type='headline'>
										Alarmpersoner
						</Typography>
					}

				</Grid>
			</Grid>
		)
	}
}

export default withStyles(styles)(Trackers)
