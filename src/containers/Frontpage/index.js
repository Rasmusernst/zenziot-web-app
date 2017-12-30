import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { autobind } from 'core-decorators'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

import { actions as authActions } from '../../stores/auth'

import classes from './style.scss'

@withRouter
@connect(({ auth }) => ({ auth }), authActions)

export default class Frontpage extends PureComponent {
	static propTypes = {
		router: PropTypes.object.isRequired,
		setAccessToken: PropTypes.func,
		auth: PropTypes.object,
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
		console.log(this.props.auth)
		return (
			<Grid container spacing={24}>

				<Grid item xs={12}>
					<Typography type='headline' gutterBottom>
						Log ind
					</Typography>
				</Grid>

				<Grid item xs={12} md={4}>
					<Paper elevation={2}>
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
			</Grid>
		)
	}
}
