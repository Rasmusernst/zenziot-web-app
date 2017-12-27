import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* containers */

// import App from './App'
import Layout from './containers/Layout'
import Frontpage from './containers/Frontpage'
import Subpage from './containers/Subpage'
import Register from './containers/Register'

export default () => (
	<Route path='/' component={Layout} >
		<IndexRoute component={Frontpage} />
		<Route path='/About' component={Subpage} />
		<Route path='/Register' component={Register} />
	</Route>
)
