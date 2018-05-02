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
import SvgIcon from 'material-ui/SvgIcon'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import { actions as authActions } from '../../stores/auth'

import logo from './logo_black.svg'
import logoWhite from './logo_white.svg'
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

const HomeIcon = props => (
	<SvgIcon {...props}>
		<path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
	</SvgIcon>
)

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
	<GoogleMap
		defaultZoom={8}
		defaultCenter={{ lat: -34.397, lng: 150.644 }}
	>
		{props.isMarkerShown &&
			<Marker
				position={{ lat: -34.397, lng: 150.644 }}
				icon={logo}
			/>}
	</GoogleMap>,
))

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

	handleClick = () => {
		window.location.href = 'https://zenziot.dk/'
	}

	@autobind handleSetAccessToken() { this.props.setAccessToken(this.state.userName, this.state.userPassword) }

	render() {
		const { classes } = this.props

		return (
			<Grid container spacing={0} >

				<Hidden mdDown>

					<Grid item xs={12} md={8} >
						<Paper elevation={0}>
							<Grid container spacing={0} alignItems='center' justify='center' className={customClasses.infoContainer}>
								<Grid item xs={12}>
									<Grid container spacing={24} direction='column' alignItems='center' justify='center'>

										<Grid item xl={3} lg={5} md={6}>
											<div className={customClasses.zenziotLogo}>
												<img src={logo} alt='ZenzIOT logo' />
											</div>

											<Typography type='subheading' align='center' className={customClasses.subheading} >
										Sporingsportal
											</Typography>

											<Typography type='body1' align='center' gutterBottom>
										Overvåg og administrer din GPS tracker.
										Opsæt alarmer og modtag besked på mail og SMS,
										hvis en GPS tracker bevæger sig udenfor et tilladt tidspunkt
										eller område.
											</Typography>
										</Grid>

										<Grid item xl={3} lg={5} md={6}>
											<Grid container spacing={24} alignItems='center' justify='center'>

												<Grid item xs={5} >
													<Typography type='headline' align='center' gutterBottom>
														<Icon className={customClasses.icon} color='primary' >monetization_on</Icon>
													</Typography>
													<Typography type='body1' align='center' noWrap gutterBottom>
													Uhørt billigt
													</Typography>
												</Grid>

												<Grid item xs={5}>
													<Typography type='headline' align='center' gutterBottom>
														<Icon className={customClasses.icon} color='primary' >alarm_on</Icon>
													</Typography>
													<Typography type='body1' align='center' noWrap gutterBottom>
													Hurtigt i gang
													</Typography>
												</Grid>

												<Grid item xs={5}>
													<Typography type='headline' align='center' gutterBottom>
														<Icon className={customClasses.icon} color='primary' >battery_charging_full</Icon>
													</Typography>
													<Typography type='body1' align='center' noWrap gutterBottom>
													Lang batterilevetid
													</Typography>
												</Grid>

												<Grid item xs={5}>
													<Typography type='headline' align='center' gutterBottom>
														<Icon className={customClasses.icon} color='primary' >language</Icon>
													</Typography>
													<Typography type='body1' align='center' noWrap gutterBottom>
													Sporingsportal
													</Typography>
												</Grid>

												<Grid item xs={12}>
													<Typography type='body1' align='center'>
														Du kan købe GPS trackers i vores webshop
													</Typography>
												</Grid>

												<Grid item xs={12}>
													<Grid container spacing={24} alignItems='center' justify='center'>
														<Button	raised color='primary' onClick={this.handleClick} className={customClasses.logInButton}>
															Til webshop
														</Button>
													</Grid>
												</Grid>

											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>

				</Hidden>

				<Grid item xs={12} md={4} >
					<Grid container alignItems='center' justify='center' className={customClasses.loginContainer}>
						<Grid item xs={6}>
							<Grid container direction='column' alignItems='center' justify='center' >

								<Hidden mdUp>
									<Grid item xs={12}>

										<div className={customClasses.zenziotLogoWhite}>
											<img src={logoWhite} alt='Hvidt ZenzIOT logo' />
										</div>

										<Typography type='body1' align='center' gutterBottom classes={{	root: classes.inputContrast }}>
												Sporingsportal
										</Typography>

									</Grid>
								</Hidden>

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
										<Button raised color='accent' onClick={this.handleSetAccessToken} className={customClasses.logInButton}>
											Log Ind
										</Button>
									</Grid>

								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{/* <Grid item xs={12}>
					<MyMapComponent
						isMarkerShown
						googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: `400px` }} />}
						mapElement={<div style={{ height: `100%` }} />}
						defaultIcon={<Icon className={customClasses.icon} color='primary' >monetization_on</Icon>}
					/>
				</Grid> */}
			</Grid>
		)
	}
}
export default withStyles(styles)(Frontpage)
