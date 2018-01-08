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
export const START_LOADING = 'AUTH/START_LOADING'
export const LOGOUT = 'AUTH/LOGOUT'
export const SETISINITIALIZED = 'AUTH/SETISINITIALIZED'
// ------------------------------------
// initialState
// ------------------------------------

const State = Record({
	error: null,
	user: null,
	isLoading: false,
	isInitialized: false,
	userPassword: '',
	isLoggedIn: false,
}, 'auth')

const initialState = State()
// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
	setError: (payload) => ({ type: SET_ERROR, payload }),

	ensureLoaded: () => (dispatch) => {
		console.log('ensureLoaded fired')
		dispatch({ type: SETISINITIALIZED, payload: false })
		return dispatch(actions.getAccessToken())

		// const { auth } = getState()
		// if (!auth.get('isInitialized')) {
		// 	console.log('ensureLoaded fired true')
		// 	return dispatch(actions.getAccessToken())
		// }
	},

	setAccessToken: (email, password) => async (dispatch) => {
		console.log('setAccessToken fired')
		dispatch({ type: SETISINITIALIZED, payload: false })
		axios({
			method: 'POST',
			url: 'https://zenzapi.azurewebsites.net/token',
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
				return dispatch(actions.logOut()) // to do: add feedback to user about wrong pass
			})
	},

	getAccessToken: () => async (dispatch) => {
		// to do: add timer for how often we should check the token with the db
		// for now just check with each route.
		console.log('getAccessToken fired')
		dispatch({ type: START_LOADING })
		axios({
			method: 'GET',
			url: 'https://zenzapi.azurewebsites.net/api/users',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				// console.log('response from api: ', response)
				if (response.status === 200) {
					dispatch({ type: SETUSER, payload: response.data })
					dispatch({ type: ISLOGGEDIN, payload: true })
				} else {
					return dispatch(actions.logOut())
				}
			})
			.catch(function (error) {
				console.log(error)
				return dispatch(actions.logOut())
			})
	},

	logOut: () => async (dispatch) => {
		console.log('logging out')
		localStorage.removeItem('accessToken')
		dispatch({ type: LOGOUT })
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
	[START_LOADING]: (state) => state.merge({
		isLoading: true,
		isInitialized: true,
	}),
	[ISLOGGEDIN]: (state, { payload }) => state.merge({ isLoggedIn: payload }),
	[SETISINITIALIZED]: (state, { payload }) => state.merge({ isInitialized: payload }),
	[LOGOUT]: (state) => state.merge({
		user: null,
		isLoggedIn: false,
		isLoading: false,
		isInitialized: true,
	}),
	[SETUSER]: (state, { payload }) => state.merge({
		user: payload,
		isLoading: false,
		isInitialized: true,
	}),

}, initialState)
