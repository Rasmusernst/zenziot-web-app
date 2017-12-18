import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './stores/index'

const middlewares = [
	routerMiddleware(browserHistory),
	thunkMiddleware,
]

const enhancers = []
// if (config.isDev) {
// 	const devToolsExtension = window.devToolsExtension
// 	if (typeof devToolsExtension === 'function') {
// 		enhancers.push(devToolsExtension())
// 	}
// }

export default () => {
	const createStoreWithMiddleware = compose(
		applyMiddleware(...middlewares),
		...enhancers,
	)(createStore)

	const store = createStoreWithMiddleware(rootReducer)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./stores', () => {
			const nextRootReducer = require('./stores').default
			store.replaceReducer(nextRootReducer)
		})
	}
	// store.dispatch(userAgentActions.initialize())
	// store.dispatch(authActions.initialize())

	return store
}
