import qs from 'querystring'

import { handleActions } from 'redux-actions'
import { fromJS, Record } from 'immutable'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_ERROR = '/ERROR'
export const SETTRACKERS = 'TRACKERS/SETTRACKERS'
export const SETAREAALARMS = 'TRACKERS/SETAREAALARMS'
export const SETMOVEMENTALARMS = 'TRACKERS/SETMOVEMENTALARMS'
export const SETALARMPERSONS = 'TRACKERS/SETALARMPERSONS'
export const SETISINITIALIZED = 'TRACKERS/SETISINITIALIZED'

// ------------------------------------
// initialState
// ------------------------------------

const State = Record({
	error: null,
	trackers: null,
	areaAlarms: null,
	movementAlarms: null,
	alarmPersons: null,
	isInitialized: false,
}, 'trackers')

const initialState = State()
// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
	setError: (payload) => ({ type: SET_ERROR, payload }),

	getTrackers: () => async (dispatch) => {
		axios({
			method: 'GET',
			url: 'http://zenzapi.azurewebsites.net/api/zenztrackers',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				dispatch({ type: SETTRACKERS, payload: response.data })
			})

			.catch(function (error) {
				console.log(error)
			})
	},
	getAreaAlarms: (trackerId) => async (dispatch) => {
		axios({
			method: 'GET',
			url: 'http://zenzapi.azurewebsites.net/api/zenztrackers/' + trackerId + '/areaalarms',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				dispatch({ type: SETAREAALARMS, payload: response.data })
			})

			.catch(function (error) {
				console.log(error)
			})
	},
	getMovementAlarms: () => async (dispatch) => {
		axios({
			method: 'GET',
			url: 'http://zenzapi.azurewebsites.net/api/movementalarms/',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				dispatch({ type: SETMOVEMENTALARMS, payload: response.data })
			})

			.catch(function (error) {
				console.log(error)
			})
	},
	createMovementAlarm: (name, starttime, endtime) => async (dispatch) => {
		axios({
			method: 'POST',
			url: 'http://zenzapi.azurewebsites.net//api/movementalarms',
			data: qs.stringify({
				name: name,
				StartTime: starttime,
				EndTime: endtime,
			}),
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				console.log(response)
				return dispatch(actions.getMovementAlarms())
			})
			.catch(function (error) {
				console.log(error)
				return dispatch(actions.logOut()) // to do: add feedback to user about wrong pass
			})
	},
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[SET_ERROR]: (state, { payload }) => state.set('error', fromJS(payload)),
	[SETTRACKERS]: (state, { payload }) => state.merge({
		trackers: payload,
		isInitialized: true,
	}),
	[SETAREAALARMS]: (state, { payload }) => state.merge({ areaAlarms: payload }),
	[SETMOVEMENTALARMS]: (state, { payload }) => state.merge({ movementAlarms: payload }),
	[SETALARMPERSONS]: (state, { payload }) => state.merge({ alarmPersons: payload }),
	[SETISINITIALIZED]: (state, { payload }) => state.merge({ isInitialized: payload }),
}, initialState)
