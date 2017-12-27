import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import TextField from 'material-ui/TextField'

import { actions as authActions } from '../../stores/auth'

@connect(({ Auth }) => ({ Auth }), authActions)

export default class Register extends PureComponent {
	static propTypes = {
		Auth: PropTypes.object.isRequired,
		requestToken: PropTypes.func.isRequired,
		sendToken: PropTypes.func.isRequired,
		getAccessToken: PropTypes.func.isRequired,
		location: PropTypes.shape({
			query: PropTypes.string.isRequired,
		}),
	}

	state = {
		token: '',
		password: '',
		userName: '',
		userPassword: '',
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}

	@autobind handleRequestToken() { this.props.requestToken(this.props.location.query.emailAddress) }
	@autobind handleSendToken() { this.props.sendToken(this.state.token, this.state.password, this.props.location.query.emailAddress) }
	@autobind handleGetAccessToken() { this.props.getAccessToken(this.state.userName, this.state.userPassword) }
	render() {
		const { Auth } = this.props
// console.log(this.state.token)
// console.log(this.state.password)
		return (
			<Grid container spacing={24}>

				<Grid item xs={12}>
					<Typography type='headline' gutterBottom>
						Aktiver din brugerprofil hos ZenzIOT
					</Typography>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper elevation={2}>
						<Typography type='body1' gutterBottom >
							Send en kode til din mobiltelefon
						</Typography>
						<Button raised color='primary' onClick={this.handleRequestToken}>
								Send
						</Button>
					</Paper>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper elevation={2}>
						<Typography type='body1' gutterBottom >
							sdgkl jsdkgj klsdfgj klsdjfgkl sdfgkl sjdgkl jsdklgj skldgj klsgj klsdfjg klsdjg klsjdfgkl sjdgkl sdfklg kls
						</Typography>
						<Grid item xs={12} md={4}>
							<TextField
								required
								id='required'
								label='Sms Kode'
								defaultValue='Hello World'
								margin='normal'
								onChange={this.handleChange('token')}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								required
								id='required'
								label='Kodeord'
								defaultValue='Hello World'
								margin='normal'
								onChange={this.handleChange('password')}
							/>
						</Grid>

						<Button raised color='default' onClick={this.handleSendToken} >
								Aktiver
						</Button>
					</Paper>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper elevation={2}>
						<Typography type='body1' gutterBottom >
							sdgkl jsdkgj klsdfgj klsdjfgkl sdfgkl sjdgkl jsdklgj skldgj klsgj klsdfjg klsdjg klsjdfgkl sjdgkl sdfklg kls
						</Typography>
						<Grid item xs={12} md={4}>
							<TextField
								required
								id='required'
								label='e-mail adressse'
								defaultValue='Hello World'
								margin='normal'
								onChange={this.handleChange('userName')}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								required
								id='required'
								label='Kodeord'
								defaultValue='Hello World'
								margin='normal'
								onChange={this.handleChange('userPassword')}
							/>
						</Grid>
						<Button raised color='primary' onClick={this.handleGetAccessToken}>
								Log Ind
						</Button>
					</Paper>
				</Grid>

				<Grid item xs={12} >
					<Grid container justify='flex-end' alignItems='flex-end' >
						<Button fab color='accent' aria-label='add'>
							<Icon className='material-icons' >add</Icon>
						</Button>
					</Grid>
				</Grid>

			</Grid>
		)
	}
}

// <img src={logo} alt='zenziot' />
