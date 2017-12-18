import { handleActions } from 'redux-actions'
import { fromJS, Record } from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_ERROR = '/ERROR'
export const SET_PAGENAME = 'FRONTPAGE/SETNAME'
// ------------------------------------
// initialState
// ------------------------------------
// const initialState = fromJS({
// 	error: null,
// 	pageName: 'Page Name',
// })
const State = Record({
	error: null,
	pageName: 'Page Name Placeholder',
}, 'FrontPageStore')

const initialState = State()
// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
	setError: (payload) => ({ type: SET_ERROR, payload }),

	setPageName: (newPageName) => (dispatch, getState) => {
		// check if categories have already loaded, if true don't load again
		const pageNameToSend = newPageName || getState().Frontpage.pageName
		console.log('pagename: ', pageNameToSend)
		dispatch({ type: SET_PAGENAME, payload: pageNameToSend })
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
	[SET_PAGENAME]: (state, { payload }) => state.merge({ pageName: payload }),
}, initialState)
