import qs from 'querystring'

import { handleActions } from 'redux-actions'
import { fromJS, Record } from 'immutable'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_ERROR = '/ERROR'
export const ISLOGGEDIN = 'AUTH/ISLOGGEDIN'
export const SETUSER = 'AUTH/SETUSER'
// ------------------------------------
// initialState
// ------------------------------------

const State = Record({
	error: null,
	user: null,
	userPassword: '',
	isLoggedIn: false,
}, 'auth')

const initialState = State()
// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
	setError: (payload) => ({ type: SET_ERROR, payload }),

	setAccessToken: (email, password) => async (dispatch) => {
		axios({
			method: 'POST',
			url: 'http://zenzapi.azurewebsites.net/token',
			data: qs.stringify({
				grant_type: 'password',
				username: email,
				password: password,
			}),
			headers: { 'accept': 'application/json', 'cache-control': 'no-cache' },
		})
			.then(function (response) {
				// console.log('response from api: ', response.data.access_token)
				localStorage.setItem('accessToken', response.data.access_token)
				return dispatch(actions.getAccessToken())
			})
			.catch(function (error) {
				console.log(error)
				return dispatch({ type: ISLOGGEDIN, payload: false }) // to do: add feedback to user about wrong pass
			})
	},
	getAccessToken: () => async (dispatch) => {
		// to do: add timer for how often we should check the token with the db
		// for now just check with each route.

		axios({
			method: 'GET',
			url: 'http://zenzapi.azurewebsites.net/api/users',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				console.log('response from api: ', response)
				if (response.status === 200) {
					dispatch({ type: SETUSER, payload: response.data })
					dispatch({ type: ISLOGGEDIN, payload: true })
				} else {
					dispatch({ type: ISLOGGEDIN, payload: false })
				}
			})
			.catch(function (error) {
				console.log(error)
				return dispatch({ type: ISLOGGEDIN, payload: false })
			})
	},

	logOut: () => async (dispatch) => {
		localStorage.removeItem('accessToken')
		dispatch({ type: ISLOGGEDIN, payload: false })
		dispatch({ type: SETUSER, payload: null })
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
	[ISLOGGEDIN]: (state, { payload }) => state.merge({ isLoggedIn: payload }),
	[SETUSER]: (state, { payload }) => state.merge({ user: payload }),

}, initialState)
