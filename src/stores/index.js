import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import Frontpage from './Frontpage'

const rootReducer = combineReducers({
	routing,
	Frontpage,
})

export default rootReducer
