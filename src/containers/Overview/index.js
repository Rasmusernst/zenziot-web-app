import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'

import { actions as overviewActions } from '../../stores/overview'

import Statusbox from '../../components/StatusBox/'
import Placeholder from '../../components/StatusBoxPlaceholder/'

import Overviewclasses from './style.scss'

const styles = theme => ({
	customPaperBlue: {
		backgroundColor: theme.palette.primary['500'],
		height: '106px',
	},
	statusIcon: {
		color: theme.palette.common.white,
		fontSize: '50px',
	},
	headlineText: {
		color: theme.palette.common.white,
		paddingLeft: '24px',
	},
	statusHeadline: {
		padding: '24px',
	},
	msgHeadline: {
		paddingLeft: '16px',
	},
})

@withRouter
@connect(({ overview }) => ({ overview }), overviewActions)
class Overview extends PureComponent {
	static propTypes = {
		overview: PropTypes.object,
		classes: PropTypes.object.isRequired,
		getMessages: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.props.getMessages()
	}

	render() {
		const { classes, overview } = this.props
		const areaAlarms = overview.getIn(['messages', 'areaAlarms'])
		const movementAlarms = overview.getIn(['messages', 'movementAlarms'])
		const operationalAlarms = overview.getIn(['messages', 'operationalAlarms'])

		return (

			<Grid container spacing={0} >
				<Hidden smDown>
					<Grid item xs>
						<Paper classes={{	root: classes.customPaperBlue }}>
							<div className={Overviewclasses.headline}>
								<Typography type='headline' classes={{	root: classes.headlineText }}>
									Mit overblik
								</Typography>
							</div>
						</Paper>
					</Grid>
				</Hidden>

				{
					overview.isInitialized
						? <Grid container spacing={0} >
							<Statusbox headline={'Områdealarmer'}
								hasMessage={overview.isInitialized && areaAlarms.count() !== 0}
								messages={areaAlarms}
								isInitialized={overview.isInitialized}
							/>

							<Statusbox headline={'Bevægelsesalarmer'}
								hasMessage={overview.isInitialized && movementAlarms.count() !== 0}
								messages={movementAlarms}
								isInitialized={overview.isInitialized}
							/>

							<Statusbox headline={'Driftsinformation'}
								hasMessage={overview.isInitialized && operationalAlarms.count() !== 0}
								messages={operationalAlarms}
								isInitialized={overview.isInitialized}
							/>
						</Grid>

						: <Grid container spacing={0} >
							<Placeholder />
							<Placeholder />
							<Placeholder />
						</Grid>

				}

			</Grid>
		)
	}
}

export default withStyles(styles)(Overview)