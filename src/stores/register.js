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
}, 'register')

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
			url: 'https://zenzapi.azurewebsites.net/api/users/GetTwoFactor?emailAddress=' + email,
		})
			.then(function (response) {
				dispatch({ type: response.data === 200 ? SET_TOKENISSENT : null })
			})
			.catch(function (error) {
				console.log(error)
			})
	},

	sendToken: (token, password, email) => (dispatch) => {
		console.log('token: ', token, 'pwrd: ', password, 'email: ', email)

		axios({
			method: 'PATCH',
			url: 'https://zenzapi.azurewebsites.net/api/users/ActivateAccount',
			data: {
				EmailAddress: email,
				Password: password,
				TwoFactorCode: token,
			},
			// headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Accept': 'application/json' },
		})
			.then(function () {
				dispatch({ type: SET_TOKENISVALID })
			})
			.catch(function (error) {
				dispatch({ type: SET_ERROR, payload: true })
				console.log(error)
			})
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
	[SET_TOKENISSENT]: (state) => state.merge({ tokenIsSent: true }),
	[SET_TOKENISVALID]: (state) => state.merge({ tokenIsValid: true }),
}, initialState)
