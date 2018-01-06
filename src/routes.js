
import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* containers */

// import App from './App'
import Layout from './containers/Layout'
import EnsureLoaded from './containers/EnsureLoaded'

import Frontpage from './containers/Frontpage'
// import Overview from './containers/Overview'
// import Register from './containers/Register'
// import Trackers from './containers/Trackers'

// const asyncContainer = (name) => (nextState, cb) => {
// 	require.ensure([], () => {
// 		console.log(name)
// 		System.import('./containers/asyncContainers').then(module => cb(null, module[name]))
// 	})
// }
//
// function errorLoading(err) {
// 	console.error('Lazy-loading failed', err)
// }
// function loadRoute(callback) {
// 	return (module) => callback(null, module.default)
// }
//

export default () => (
	<Route path='/' component={Layout} >
		<IndexRoute component={Frontpage} />
		<Route path='/register'
			getComponent={(location, cb) => {
				System.import('./containers/Register').then(module => cb(null, module.default))
			}} />
		<Route component={EnsureLoaded} >
			<Route path='/overview'
				getComponent={(location, cb) => {
					System.import('./containers/Overview').then(module => cb(null, module.default))
				}} />

			<Route path='/trackers'
				getComponent={(location, cb) => {
					System.import('./containers/Trackers').then(module => cb(null, module.default))
				}} />

		</Route>

	</Route>
)

// function errorLoading(err) {
// 	console.error('Lazy-loading failed', err)
// }
// function loadRoute(cb) {
// 	return (module) => cb(null, module.default)
// }
//
// export default () => ({
// 	component: Layout,
// 	path: '/',
// 	indexRoute: { component: Frontpage },
// 	childRoutes: [
// 		{
// 			path: '/overview',
// 			getComponent(location, cb) {
// 				System.import('./containers/Overview')
// 					.then(loadRoute(cb))
// 					.catch(errorLoading)
// 			},
// 		},
//
// 	],
// })

// export default () => (
// 	<Route path='/' component={Layout} >
// 		<IndexRoute component={Frontpage} />
// 		<Route path='/register' component={Register} />
// 		<Route component={EnsureLoaded} >
// 			<Route path='/overview' component={Overview} />
// 			<Route path='/trackers' component={Trackers} />
// 		</Route>
//
// 	</Route>
// )
