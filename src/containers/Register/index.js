import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper'

import { actions as registerActions } from '../../stores/register'

@connect(({ register }) => ({ register }), registerActions)

export default class Register extends PureComponent {
	static propTypes = {
		register: PropTypes.object,
		requestToken: PropTypes.func.isRequired,
		sendToken: PropTypes.func.isRequired,
		location: PropTypes.shape({
			query: PropTypes.string.isRequired,
		}),
	}

	state = {
		token: '',
		password: '',
		activeStep: 0,
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}

	getSteps() {
		return ['Send engangskode', 'Aktiver profil', 'Bekræftelse']
	}

	getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<div>
						<Typography type='body1' gutterBottom >
									Når du trykker på SEND KODE, sender vi sms med en engangskode.
						</Typography>
						<Typography type='body1' gutterBottom >
									Den skal du bruge til at aktivere din brugerprofil.
						</Typography>
						<Button color='primary' onClick={this.handleRequestToken}>
									Send kode
						</Button>
					</div>
				)

			case 1:
				return (
					<Grid container spacing={24}>
						<Grid item xs={12}>
							<Typography type='body1' gutterBottom >
										Indtast den engangskode du har modtaget på SMS.
							</Typography>
							<Typography type='body1' gutterBottom>
										Indtast et kodeord, du vil bruge til at logge ind på din profil med.
							</Typography>
							<Typography type='body1' gutterBottom>
										Klik på AKTIVER PROFIL når du har indtastet din engangskode og valgt et kodeord.
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id='required'
								label='Sms Kode'
								defaultValue='xxxxxx'
								margin='normal'
								onChange={this.handleChange('token')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id='required'
								label='Kodeord'
								defaultValue='xxxxxx'
								margin='normal'
								onChange={this.handleChange('password')}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button color='primary' onClick={this.handleSendToken} >
										Aktiver profil
							</Button>
						</Grid>
					</Grid>
				)

			case 2:
				return (
					<Grid container spacing={24}>
						<Grid item xs={12}>
							<Typography type='body1' gutterBottom >
									Din brugerprofil er nu aktiveret. Du kan logge ind med dit kodeord og e-mail adresse ved på forsiden.
							</Typography>
						</Grid>
					</Grid>
				)
			default:
				return 'Ukendt brugeraktivering'
		}
	}

handleNext = () => {
	this.setState({
		activeStep: this.state.activeStep + 1,
	})
}

handleBack = () => {
	this.setState({
		activeStep: this.state.activeStep - 1,
	})
}

handleReset = () => {
	this.setState({
		activeStep: 0,
	})
}

	@autobind handleRequestToken() { this.props.requestToken(this.props.location.query.emailAddress) }
	@autobind handleSendToken() { this.props.sendToken(this.state.token, this.state.password, this.props.location.query.emailAddress) }
	render() {
		// const { classes } = this.props
		const steps = this.getSteps()
		const { activeStep } = this.state

		return (
			<div>
				<Stepper activeStep={activeStep} orientation='vertical'>
					{steps.map((label, index) => {
						return (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									{this.getStepContent(index)}
									<div>
										<div>
											<Button	disabled={activeStep === 0}	onClick={this.handleBack}>
												tilbage
											</Button>
											<Button	raised color='primary' onClick={this.handleNext} >
												{activeStep === steps.length - 1 ? 'Afslut' : 'Næste'}
											</Button>
										</div>
									</div>
								</StepContent>
							</Step>
						)
					})}
				</Stepper>
				{activeStep === steps.length && (
					<Paper square elevation={0}>
						<Typography>All steps completed - you&quot;re finished</Typography>
						<Button onClick={this.handleReset}>
Reset
						</Button>
					</Paper>
				)}
			</div>
		)

		// return (
		// 	<Grid container spacing={24}>
		//
		// 		<Grid item xs={12}>
		// 			<Typography type='headline' gutterBottom>
		// 				Aktiver din brugerprofil hos ZenzIOT
		// 			</Typography>
		// 		</Grid>
		//
		// 		<Grid item xs={12} md={4}>
		// 			<Paper elevation={2}>
		// 				<Typography type='body1' gutterBottom >
		// 					Send en kode til din mobiltelefon
		// 				</Typography>
		// 				<Button raised color='primary' onClick={this.handleRequestToken}>
		// 						Send
		// 				</Button>
		// 			</Paper>
		// 		</Grid>
		//
		// <Grid item xs={12} md={4}>
		// 	<Paper elevation={2}>
		// 		<Grid item xs={12} md={4}>
		// 			<TextField
		// 				required
		// 				id='required'
		// 				label='Sms Kode'
		// 				defaultValue='Hello World'
		// 				margin='normal'
		// 				onChange={this.handleChange('token')}
		// 			/>
		// 		</Grid>
		// 		<Grid item xs={12} md={4}>
		// 			<TextField
		// 				required
		// 				id='required'
		// 				label='Kodeord'
		// 				defaultValue='Hello World'
		// 				margin='normal'
		// 				onChange={this.handleChange('password')}
		// 			/>
		// 		</Grid>
		//
		// 		<Button raised color='default' onClick={this.handleSendToken} >
		// 				Aktiver
		// 		</Button>
		// 	</Paper>
		// </Grid>
		// 	</Grid>
		// )
	}
}

// <img src={logo} alt='zenziot' />
