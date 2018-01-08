import { handleActions } from 'redux-actions'
import { fromJS, Record } from 'immutable'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_ERROR = '/ERROR'
export const SETMESSAGES = 'OVERVIEW/SETMESSAGES'
export const SETISINITIALIZED = 'OVERVIEW/SETISINITIALIZED'
// ------------------------------------
// initialState
// ------------------------------------

const State = Record({
	error: null,
	messages: null,
	isInitialized: false,
}, 'overview')

const initialState = State()
// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
	setError: (payload) => ({ type: SET_ERROR, payload }),

	getMessages: () => async (dispatch) => {
		axios({
			method: 'GET',
			url: 'https://zenzapi.azurewebsites.net/api/overview',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				// console.log('response from api: ', response)
				if (response.status === 200) {
					dispatch({ type: SETMESSAGES, payload: response.data })
					dispatch({ type: SETISINITIALIZED, payload: true })
				}
			})
			.catch(function (error) {
				console.log(error)
			})
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
	[SETMESSAGES]: (state, { payload }) => state.merge({ messages: payload }),
	[SETISINITIALIZED]: (state, { payload }) => state.merge({ isInitialized: payload }),

}, initialState)
