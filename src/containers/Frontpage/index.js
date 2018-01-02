import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { autobind } from 'core-decorators'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'
import Icon from 'material-ui/Icon'

import { actions as authActions } from '../../stores/auth'

import logo from './zenziot_logo.svg'
import logoWhite from './zenziot_logo_white.svg'
import customClasses from './style.scss'

const styles = theme => ({
	inputLabelUnderline: {
		'&:before': {
			backgroundColor: theme.palette.common.lightWhite + '!important',
		},
	},
	inputContrast: {
		color: theme.palette.common.white,
	},
	inputInkbar: {
		color: theme.palette.common.white,
		'&:after': {
			backgroundColor: theme.palette.common.white,
		},
	},
})

@withRouter
@connect(({ auth }) => ({ auth }), authActions)
class Frontpage extends PureComponent {
	static propTypes = {
		router: PropTypes.object.isRequired,
		setAccessToken: PropTypes.func,
		auth: PropTypes.object,
		classes: PropTypes.object.isRequired,
	}

	state = {
		userName: '',
		userPassword: '',
	}
	componentDidUpdate() {
		if (this.props.auth.isLoggedIn) {
			this.props.router.push('/overview')
		}
	}
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}
	@autobind handleGetAccessToken() { this.props.setAccessToken(this.state.userName, this.state.userPassword) }

	render() {
		const { classes } = this.props

		return (
			<Grid container spacing={0} >

				<Hidden mdDown>
					<Grid item xs={12} md={8} >
						<Grid container spacing={24} alignItems='center' justify='center' className={customClasses.infoContainer}>
							<Grid item xs={12}>
								<Grid container spacing={24} direction='column' alignItems='center' justify='center'>

									<Grid item xs={6}>
										<div className={customClasses.zenziotLogo}>
											<img src={logo} alt='ZenzIOT logo' />
										</div>

										<Typography type='headline' align='center' gutterBottom>
										Sporingsportal
										</Typography>

										<Typography type='body1' align='center' gutterBottom>
										Overvåg og administrer din GPS tracker.
										Opsæt alarmer og modtag besked på mail og SMS,
										hvis en GPS tracker bevæger sig udenfor et tilladt tidspunkt
										eller område.
										</Typography>
									</Grid>

									<Grid item xs={6}>
										<Grid container spacing={24} alignItems='center' justify='center'>

											<Grid item xs={6} >
												<Typography type='headline' align='center' gutterBottom>
													<Icon className={customClasses.icon} color='primary' >monetization_on</Icon>
												</Typography>
												<Typography type='body1' align='center' gutterBottom>
													Uhørt billigt
												</Typography>
											</Grid>

											<Grid item xs={6} >
												<Typography type='headline' align='center' gutterBottom>
													<Icon className={customClasses.icon} color='primary' >alarm_on</Icon>
												</Typography>
												<Typography type='body1' align='center' gutterBottom>
													Hurtigt i gang
												</Typography>
											</Grid>

											<Grid item xs={6} >
												<Typography type='headline' align='center' gutterBottom>
													<Icon className={customClasses.icon} color='primary' >battery_charging_full</Icon>
												</Typography>
												<Typography type='body1' align='center' gutterBottom>
													Lang batterilevetid
												</Typography>
											</Grid>

											<Grid item xs={6} >
												<Typography type='headline' align='center' gutterBottom>
													<Icon className={customClasses.icon} color='primary' >language</Icon>
												</Typography>
												<Typography type='body1' align='center' gutterBottom>
													Sporingsportal
												</Typography>
											</Grid>

										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Hidden>

				<Grid item xs={12} md={4} >
					<Grid container alignItems='center' justify='center' className={customClasses.loginContainer}>
						<Grid item xs={6}>
							<Grid container direction='column' alignItems='center' justify='center' >

								<Grid item xs={12}>
									<div className={customClasses.zenziotLogoWhite}>
										<img src={logoWhite} alt='Hvidt ZenzIOT logo' />
									</div>

									<Typography type='body1' align='center' gutterBottom classes={{	root: classes.inputContrast }}>
									Sporingsportal
									</Typography>
								</Grid>

								<Grid item xs={12}>
									<Typography type='headline' gutterBottom classes={{	root: classes.inputContrast }}>
										Log ind
									</Typography>
								</Grid>

								<Grid item xs={12}>
									<FormControl >

										<InputLabel	FormControlClasses={{	root: classes.inputContrast }} htmlFor='email' >
											E-mail Addresse
										</InputLabel>

										<Input
											classes={{ inkbar: classes.inputInkbar, underline: classes.inputLabelUnderline }}
											id='email'
											autoComplete='username email'
											placeholder='E-mail Addresse'
											onChange={this.handleChange('userName')}
											type='email'
										/>

									</FormControl>
								</Grid>

								<Grid item xs={12}>
									<Grid item xs={12}>
										<FormControl margin='normal'>

											<InputLabel	FormControlClasses={{	root: classes.inputContrast }} htmlFor='password' >
												Kodeord
											</InputLabel>

											<Input
												classes={{ inkbar: classes.inputInkbar, underline: classes.inputLabelUnderline }}
												id='password'
												autoComplete='current-password'
												placeholder='Kodeord'
												type='password'
												onChange={this.handleChange('userPassword')}
											/>

										</FormControl>
									</Grid>

									<Grid item xs={12}>
										<Button raised color='accent' onClick={this.handleGetAccessToken} className={customClasses.logInButton}>
											Log Ind
										</Button>
									</Grid>

								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		)
	}
}
export default withStyles(styles)(Frontpage)
