import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import Frontpage from './Frontpage'
import Auth from './auth'

const rootReducer = combineReducers({
	routing,
	Auth,
	Frontpage,
})

export default rootReducer
