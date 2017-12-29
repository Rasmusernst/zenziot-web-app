import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
// import { blue, orange } from 'material-ui/colors'

import zenziotTheme from './layout/muiTheme'
import routes from './routes'

export default class App extends Component {
	static propTypes = {
		store: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
	}

	render() {
		const { store, history } = this.props

		const theme = createMuiTheme(zenziotTheme)

		return (
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<Router history={history} routes={routes()} />
				</MuiThemeProvider>
			</Provider>
		)
	}
}
