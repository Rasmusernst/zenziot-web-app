import qs from 'querystring'

import { handleActions } from 'redux-actions'
import { fromJS, Record } from 'immutable'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_ERROR = '/ERROR'
export const SET_TOKENISSENT = 'REGISTER/TOKENISSENT'
export const SET_TOKENISVALID = 'REGISTER/TOKENISVALID'
// ------------------------------------
// initialState
// ------------------------------------
// const initialState = fromJS({
// 	error: null,
// 	pageName: 'Page Name',
// })
const State = Record({
	error: null,
	tokenIsSent: false,
	tokenIsValid: false,
	token: '',
	userName: '',
	userPassword: '',
	userRealName: '',
}, 'authStore')

const initialState = State()
// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
	setError: (payload) => ({ type: SET_ERROR, payload }),

	requestToken: (email) => (dispatch) => {
		console.log('requesting token for email: ', email)

		axios({
			method: 'GET',
			// headers: { 'Access-Control-Allow-Origin': '*' },
			url: 'http://zenzapi.azurewebsites.net/api/users/GetTwoFactor?emailAddress=' + email,
		})
			.then(function () {
				dispatch({ type: SET_TOKENISSENT })
			})
			.catch(function (error) {
				console.log(error)
			})
	},

	sendToken: (token, password, email) => (dispatch) => {
		console.log('token: ', token, 'pwrd: ', password, 'email: ', email)

		axios({
			method: 'PATCH',
			url: 'http://zenzapi.azurewebsites.net/api/users/ActivateAccount',
			data: {
				EmailAddress: email,
				Password: password,
				TwoFactorCode: token,
			},
			// headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Accept': 'application/json' },
		})
			.then(function (response) {
				console.log(response)
				dispatch({ type: SET_TOKENISVALID })
			})
			.catch(function (error) {
				console.log(error)
			})
	},

	getAccessToken: (email, password) => async (dispatch) => {
		console.log(email)

		// axios({
		// 	method: 'GET',
		// 	url: 'http://zenzapi.azurewebsites.net/api/users',
		// 	headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json', 'Authorization': 'Bearer iV0CpzrHrfpHAdRX_Xpcg5L8VT1N-lfrP5x0LHeNPmtVG8NQYwaJOubl9ot2i3i8Z2btPuO5kdGq-wRPGY6YnpO5ZTFvhOd70hPP3n1bDkxrzGV4nOe-88byydYetEswR3dVesP9IiQA2Wi-Crryxh82KKJ7DiIib6-m1mQANpeP6HKTAL-WSgsi0S5cK2Y4-Jfx28-ecTqGkvw36qfUQQdMT4vWiFyzCoN6aOCsTVwhnmmlHb1uaViao1jiUG539UMv_UEV1bZDKnIKMnrlWV7ldaVtZR2AllYffesCdxmXvD8-YI8H_x3iTbIntE9F' },
		// })

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
		// axios.post('http://zenzapi.azurewebsites.net/token', {
		// 	grant_type: 'password',
		// 	username: email,
		// 	password: password,
		// })

			.then(function (response) {
				console.log('response: ', response)
			})
			.catch(function (error, response) {
				console.log(error)
				console.log('response: ', response)
			})
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
	[SET_TOKENISSENT]: (state) => state.merge({ tokenIsSent: true }),
	[SET_TOKENISVALID]: (state) => state.merge({ tokenIsSent: true }),
}, initialState)
