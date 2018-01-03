import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* containers */

// import App from './App'
import Layout from './containers/Layout'
import EnsureLoaded from './containers/EnsureLoaded'

import Frontpage from './containers/Frontpage'
import Overview from './containers/Overview'
import Register from './containers/Register'

export default () => (
	<Route path='/' component={Layout} >
		<IndexRoute component={Frontpage} />
		<Route path='/register' component={Register} />
		<Route path='/Overview' component={Overview} />
		<Route component={EnsureLoaded} >
			{/* <Route path='/Overview' component={Overview} /> */}
		</Route>

	</Route>
)
