import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

import App from './App'
import createStore from './createStore'
import 'typeface-roboto'

// Create store
const store = createStore()
const history = syncHistoryWithStore(browserHistory, store)

// const render = Component => {
// 	ReactDOM.render(
// 		<AppContainer>
// 			<Component />
// 		</AppContainer>,
// 		document.getElementById('root'),
// 	)
// }
const rootElement = document.getElementById('root')

const render = () => {
	// Render app
	const App = require('./App').default
	ReactDOM.render(
		<AppContainer>
			<App store={store} history={history} />
		</AppContainer>,
		rootElement,
	)
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./App', () => { render(App) })
}
