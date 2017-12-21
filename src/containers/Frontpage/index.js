import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { blue, orange } from 'material-ui/colors'

import { actions as frontPageActions } from '../../stores/Frontpage'

// import logo from './logo.png'
import classes from './style.scss'

@connect(({ Frontpage }) => ({ Frontpage }), frontPageActions)

export default class Frontpage extends PureComponent {
	static propTypes = {
		Frontpage: PropTypes.object.isRequired,
		setPageName: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.props.setPageName()
	}

	@autobind handlesetPageName() { this.props.setPageName('HEJ') }

	render() {
		const { Frontpage } = this.props

		const theme = createMuiTheme({
			palette: {
				primary: blue, // Purple and green play nicely together.
				secondary: orange,
			},
		})

		return (
			<MuiThemeProvider theme={theme}>
				<Grid container className={classes.root} spacing={24}>
					<Grid item xs={12}>
						<h1>{Frontpage.pageName}</h1>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper elevation={2}>
							<p>sdgkl jsdkgj klsdfgj klsdjfgkl sdfgkl sjdgkl jsdklgj skldgj klsgj klsdfjg klsdjg klsjdfgkl sjdgkl sdfklg kls</p>
							<Button raised color='primary' onClick={this.handlesetPageName}>
								HEJ!
							</Button>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper elevation={2}>
							<p>sdgkl jsdkgj klsdfgj klsdjfgkl sdfgkl sjdgkl jsdklgj skldgj klsgj klsdfjg klsdjg klsjdfgkl sjdgkl sdfklg kls</p>
							<Button raised color='primary' onClick={this.handlesetPageName}>
								HEJ!
							</Button>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper elevation={2}>
							<p>sdgkl jsdkgj klsdfgj klsdjfgkl sdfgkl sjdgkl jsdklgj skldgj klsgj klsdfjg klsdjg klsjdfgkl sjdgkl sdfklg kls</p>
							<Button raised color='primary' onClick={this.handlesetPageName}>
								HEJ!
							</Button>
						</Paper>
					</Grid>
				</Grid>
			</MuiThemeProvider>

		)
	}
}

// <img src={logo} alt='zenziot' />
