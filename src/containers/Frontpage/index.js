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

import { actions as authActions } from '../../stores/auth'

import logo from './zenziot_logo.svg'
import customClasses from './style.scss'

const styles = theme => ({
	inputLabelUnderline: {
		'&:before': {
			backgroundColor: theme.palette.common.lightWhite + '!important',
		},
	},
	inputLabelFocused: {
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
					<Grid item xs={12} md={8} className={customClasses.wrapper}>
						<Grid container spacing={24} alignItems='center' justify='center' className={customClasses.infoContainer}>
							<Grid item xs={5}>
								<div className={customClasses.zenziotLogoWrapper}>
									<img src={logo} alt='ZenzIOT logo' />
								</div>
								<Typography type='headline' align='center' gutterBottom>
									Sporingsportal
								</Typography>
								<Typography type='body1' align='center' gutterBottom>
									Overvåg og administrer din GPS tracker. Opsæt alarmer og modtag besked på mail og SMS, hvis en GPS tracker bevæger sig udenfor et tilladt tidspunkt eller område.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Hidden>

				<Grid item xs={12} md={4} className={customClasses.loginWrapper}>
					<Grid container alignItems='center' justify='center' className={customClasses.loginContainer}>
						<Grid item xs={6}>
							<Grid container direction='column' alignItems='center'>

								<Grid item xs={12}>
									<Typography type='headline' gutterBottom>
										Log ind
									</Typography>
								</Grid>

								<Grid item xs={12}>
									<FormControl >

										<InputLabel	FormControlClasses={{	root: classes.inputLabelFocused }} htmlFor='email' >
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

											<InputLabel	FormControlClasses={{	root: classes.inputLabelFocused }} htmlFor='password' >
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
