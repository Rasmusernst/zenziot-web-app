import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'

import statusBoxclasses from './style.scss'

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

class StatusBox extends PureComponent {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		headline: PropTypes.string.isRequired,
		hasMessage: PropTypes.bool.isRequired,
		messages: PropTypes.object.isRequired,
		isInitialized: PropTypes.bool.isRequired,
	}

	state = {
		ready: false,
	}

	componentDidMount() {
		this.setState({ ready: true	})
	}

	handleAlarmMessage(message) {
		switch (this.props.headline) {
			case 'Områdealarmer':
				return (
					<ListItemText
						primary={'Alarmen ' + message.get('alarmName') + ' er udløst'}
						secondary='Klik for at se enheden på et kort'
					/>
				)

			case 'Bevægelsesalarmer':
				return (
					<ListItemText
						primary={'Alarmen ' + message.get('alarmName') + ' er udløst'}
						secondary='Klik for at se enheden på et kort'
					/>
				)

			case 'Driftsinformation':
				return (
					this.handleOperationalMessage(message)
				)

			default:
				break
		}
	}

	handleOperationalMessage(message) {
		if (message.get('batteryPercentage') <= 10 && message.get('signalStrength') === 2) {
			return (
				<ListItemText
					primary='Der er flere driftsbeskeder for enheden'
					secondary='Klik for at få hjælp til at løse problemerne'
				/>
			)
		}
		if (message.get('batteryPercentage') <= 10 && message.get('signalStrength') !== 2) {
			return (
				<ListItemText
					primary='Lavt batteriniveau'
					secondary='Klik for at få hjælp til at løse problemet'
				/>
			)
		}
		if (message.get('batteryPercentage') >= 10 && message.get('signalStrength') === 2) {
			return (
				<ListItemText
					primary='Lav signalstyrke'
					secondary='Klik for at få hjælp til at løse problemet'
				/>
			)
		}
	}

	render() {
		const { classes, headline, hasMessage, messages, isInitialized } = this.props
		const tmpHeadline = isInitialized ? headline : 'Headline'

		return (


				<div className={statusBoxclasses.statusBox}>

					<Paper >
						<Grid container spacing={0} >
							<Grid item xs={8}>
								<Typography type='title' classes={{	root: classes.statusHeadline }}>
									{tmpHeadline}
								</Typography>
							</Grid>

							<Grid item xs={4}>
								<Typography align='right' classes={{	root: classes.statusHeadline }}>
									<Icon>help</Icon>
								</Typography>
							</Grid>
						</Grid>
					</Paper>

					<div className={hasMessage
						? statusBoxclasses.statusIndicator + ' ' + statusBoxclasses.message
						: statusBoxclasses.statusIndicator}
					>
						{
							!hasMessage
								? <Icon classes={{	root: classes.statusIcon }}>check</Icon>
								: <Icon classes={{	root: classes.statusIcon }}>warning</Icon>
						}
					</div>
					{
						hasMessage &&
							<Paper>
								<List>
									{
										messages.map((message) =>
											<div key={message.get('deviceId')}>
												<ListItem button>
													<Grid container spacing={0} >
														<Avatar>
															<Icon>directions_car</Icon>
														</Avatar>
														<Grid item xs={9}>
															<Typography type='title' classes={{	root: classes.msgHeadline }}>
															Enhed: {message.get('deviceName')}
															</Typography>
															{	this.handleAlarmMessage(message)}
														</Grid>
													</Grid>
												</ListItem>
												<Divider inset />
											</div>,
										)
									}
								</List>
							</Paper>
					}

				</div>

		)
	}
}

export default withStyles(styles)(StatusBox)
