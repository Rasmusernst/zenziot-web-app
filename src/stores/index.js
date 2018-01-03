import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import auth from './auth'
import register from './register'
import overview from './overview'

const rootReducer = combineReducers({
	routing,
	auth,
	register,
	overview,
})

export default rootReducer
