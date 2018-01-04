import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import auth from './auth'
import register from './register'
import overview from './overview'
import trackers from './trackers'

const rootReducer = combineReducers({
	routing,
	auth,
	register,
	overview,
	trackers,
})

export default rootReducer
