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

// creating changes to the styles for the mui components via react inline style
const styles = theme => ({
	customPaperBlue: {
		backgroundColor: theme.palette.primary['500'],
		height: '106px',
	},
	inactiveTab: {
		color: 'rgba(46, 55, 59, 1)',
	},
	activeTab: {
		color: 'rgba(46, 55, 59, 1)',
	},
	customPaperLightBlue: {
		backgroundColor: '#6ec6ff',
	},
	headlineText: {
		color: theme.palette.common.white,
		paddingLeft: '24px',
	},
})

// Here we extend the PureComponent class to create a new derived class called Trackers.
// Classes support extending other classes, but can also extend other objects. Whatever you extend must be a constructor.

// withRouter can get access to the routers history object properties. This can be used for triggering routing changes or looking for parts of the current url
// withRouter is used as a higher order component (HOC) that is, a component wrapping this component: export default withRouter(connect(...)(Trackers))
// this can get tiresome and hard to read, so instead we can use decorator syntax, supported by babel which compiles the decorators to es5.

// the conect decorator is also a HOC. It is using redux bindActionCreators, which is basically shorthand for redux specific methods mapDispatchToProps and mapStateToProps
// these handle mapping of redux action methods and redux state to the props of the given component.

@withRouter
@connect(({ trackers }) => ({ trackers }), trackersActions)
class Trackers extends PureComponent {
	static propTypes = {
		trackers: PropTypes.object,
		getTrackers: PropTypes.func,
		getTrackerList: PropTypes.func,
		getMovementAlarms: PropTypes.func,
		createMovementAlarm: PropTypes.func,
		editMovementAlarm: PropTypes.func,
		getMovementAlarm: PropTypes.func,
		deleteMovementAlarm: PropTypes.func,
		classes: PropTypes.object.isRequired,
	}
	// In JavaScript, class methods are not bound by default. If you forget to bind this.yourmethod and pass it to onClick or use it as props for other components,
	// this will be undefined when the function is actually called.

	// Using vanilla ES6/ES7 JavaScript we would have to bind custom component methods, like handleGetMovementAlarm, to the component inside the constructor() by using the bind keyword
	// this makes the code very versbose, it is easy to mess up or forget, and hard to read. So instead we use the autobind decorator, which does this for us.
	// also note: the only reason we need the custom methods here are to pass parameters to the Redux store action methods.
		@autobind handleCreateMovementAlarm(name, startTime, stopTime) { this.props.createMovementAlarm(name, startTime, stopTime) }
		@autobind handleEditMovementAlarm(name, startTime, stopTime, alarmId) { this.props.editMovementAlarm(name, startTime, stopTime, alarmId) }
		@autobind handleGetMovementAlarm(alarmId) { this.props.getMovementAlarm(alarmId) }
		@autobind handleDeleteMovementAlarm(alarmId) { this.props.deleteMovementAlarm(alarmId) }

		componentDidMount() {
			// here we can just access the methods from props, without the autobind decorator, as we do not need to pass any arguments to the redux stores action methods
			// this is handled through property initializers - see comment below. It will automatically ensure that the 'this' context is bound to the component inside of the method.
			this.props.getTrackers()
			this.props.getMovementAlarms()
			this.props.getTrackerList()
		}

		// We use an experimental JavaScript feature called property initializers, which allows us to define initial state outside of the constructor
		// It allows for a much cleaner ES6 class component style. Support is through babel-plugin-transform-class-properties
	state = {
		value: 0,
	}

	// in ES6 {value} is shorthand for {value: value}, which sets the state propery of value to be that of the value parameter.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
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
						// textColor='rgba(46, 55, 59, 0.87)'
						scrollable

					>
						<Tab label='Enheder' classes={{	root: classes.activeTab }} />
						<Tab label='Områdealarmer' disabled classes={{	root: classes.inactiveTab }} />
						<Tab label='Bevægelsesalarmer' classes={{	root: classes.activeTab }} />
						<Tab label='Alarmpersoner' disabled classes={{	root: classes.inactiveTab }} />

					</Tabs>
				</AppBar>

				<Grid container spacing={0} >

					{value === 0 &&
						<TrackerList trackers={trackers} />

					}
					{value === 1 &&
						<Typography type='headline'>
										Områdealarmer
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
