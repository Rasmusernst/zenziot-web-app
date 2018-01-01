import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper'
import Paper from 'material-ui/Paper'
import { withRouter } from 'react-router'

import { actions as registerActions } from '../../stores/register'

import classes from './style.scss'

@withRouter
@connect(({ register }) => ({ register }), registerActions)
export default class Register extends PureComponent {
	static propTypes = {
		register: PropTypes.object,
		router: PropTypes.object.isRequired,
		requestToken: PropTypes.func.isRequired,
		sendToken: PropTypes.func.isRequired,
		location: PropTypes.shape({
			query: PropTypes.string.isRequired,
		}),
	}

	// check if the sent token has returned a valid response from api. Then call handleNext to increase the activeStep state.
	componentDidUpdate() {
		if (this.state.activeStep === 1 && this.props.register.tokenIsValid) {
			this.handleNext()
		}
	}

	state = {
		token: '',
		password: '',
		activeStep: 0,
	}
	// Bind functions to props for use in this component and any child components
	@autobind handleRequestToken() { this.props.requestToken(this.props.location.query.emailAddress) }
	@autobind handleSendToken() { this.props.sendToken(this.state.token, this.state.password, this.props.location.query.emailAddress) }
	@autobind handleShowFrontpage() { this.props.router.push('/') }

	// generic handler for state change
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}

	// Handles the content of each step headline
	getSteps() {
		return ['Send engangskode', 'Indtast enganskode og vælg kodeord', 'Bekræftelse']
	}

	// Handles the content and behavior of each step in the stepper component
	getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<Typography type='body1' gutterBottom >
									Når du trykker på SEND KODE, sender vi en SMS med en engangskode.
							</Typography>
							<Typography type='body1' gutterBottom >
									Den skal du bruge til at aktivere din brugerprofil.
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Button color='primary' onClick={this.handleRequestToken}>
									Send kode
							</Button>
						</Grid>
					</Grid>
				)

			case 1:
				return (
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<Typography type='body1' gutterBottom>
										Klik på NÆSTE når du har indtastet din engangskode og valgt et kodeord.
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<TextField
								required
								error={this.props.register.error}
								id='required'
								label='Engangskode'
								defaultValue='xxxxxx'
								margin='normal'
								onChange={this.handleChange('token')}
								helperText={this.props.register.error ? 'Engangskoden er ugyldig' : 'Indtast engangskode fra SMS'}
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
								helperText='Indtast et kodeord til din profil'
							/>
						</Grid>
					</Grid>
				)

			case 2:
				return (
					<Grid container spacing={24}>
						<Grid item xs={12}>
							<Typography type='body1' gutterBottom >
									Din brugerprofil er nu aktiveret. Du kan logge ind med dit kodeord og e-mail adresse på forsiden.
							</Typography>
						</Grid>
					</Grid>
				)
			default:
				return 'Ukendt brugeraktivering'
		}
	}

	// Handles the look and onClick of the Tilbage and Næste button
	getStepButtonContent(step) {
		switch (step) {
			case 0:
				return (
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<Button	disabled={this.state.activeStep === 0}	onClick={this.handleBack}>
									tilbage
							</Button>
							{ this.props.register.tokenIsSent &&
							<Button	raised color='primary' onClick={this.handleNext} >
								{this.state.activeStep === this.getSteps().length - 1 ? 'Afslut' : 'Næste'}
							</Button>
							}
							{ !this.props.register.tokenIsSent &&
							<Button	disabled >
								{this.state.activeStep === this.getSteps().length - 1 ? 'Afslut' : 'Næste'}
							</Button>
							}
						</Grid>
					</Grid>
				)

			case 1:
				return (
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<Button	disabled={this.state.activeStep === 0}	onClick={this.handleBack}>
									tilbage
							</Button>
							<Button	raised color='primary' onClick={this.handleNext} >
								{this.state.activeStep === this.getSteps().length - 1 ? 'Afslut' : 'Næste'}
							</Button>
						</Grid>
					</Grid>
				)

			case 2:
				return (
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<Button	disabled={this.state.activeStep === 0}	onClick={this.handleBack}>
									tilbage
							</Button>
							<Button	raised color='primary' onClick={this.handleNext} >
								{this.state.activeStep === this.getSteps().length - 1 ? 'Afslut' : 'Næste'}
							</Button>
						</Grid>
					</Grid>
				)
			default:
				return 'Ukendt brugeraktivering'
		}
	}

	// Handles clicking the Næste button
	handleNext = () => {
		if (this.state.activeStep === 1 && !this.props.register.tokenIsValid) {
			this.handleSendToken()
		}
		if (this.state.activeStep === 1 && this.props.register.tokenIsValid) {
			this.setState({
				activeStep: this.state.activeStep + 1,
			})
		}
		if (this.state.activeStep === 0) {
			this.setState({
				activeStep: this.state.activeStep + 1,
			})
		}
		if (this.state.activeStep === 2) {
			this.handleShowFrontpage()
		}
	}

	handleBack = () => {
		this.setState({
			activeStep: this.state.activeStep - 1,
		})
	}

	render() {
		const { activeStep } = this.state
		const steps = this.getSteps()

		return (
			<div className={classes.root}>
				<Grid container spacing={0} justify='center'>
					<Grid item xs={12} md={6} >
						<Paper elevation={2}>
							<div className={classes.headlineWrapper}>
								<Grid container>
									<Grid item xs={12} >
										<Typography type='headline' gutterBottom>
											Aktivering af din konto
										</Typography>
									</Grid>
								</Grid>
							</div>

							<Stepper activeStep={activeStep} orientation='vertical'>
								{steps.map((label, index) => {
									return (
										<Step key={label}>
											<StepLabel>{label}</StepLabel>
											<StepContent>
												<Grid container spacing={24}>
													<Grid item xs={12}>
														{this.getStepContent(index)}
													</Grid>
													<Grid item xs={12}>
														{this.getStepButtonContent(index)}
													</Grid>
												</Grid>
											</StepContent>
										</Step>
									)
								})}
							</Stepper>
						</Paper>
					</Grid>
				</Grid>
			</div>
		)
	}
}
