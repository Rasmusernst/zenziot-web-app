// import qs from 'querystring'

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
export const SETMOVEMENTALARM = 'TRACKERS/SETMOVEMENTALARM'
export const SETTRACKERLIST = 'TRACKERS/SETTRACKERLIST'

// ------------------------------------
// initialState
// ------------------------------------

const State = Record({
	error: null,
	trackers: null,
	trackerList: null,
	areaAlarms: null,
	movementAlarms: null,
	movementAlarm: null,
	alarmPersons: null,
	isInitialized: false,
	formContentSubmitted: false,
}, 'trackers')

const initialState = State()
// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
	setError: (payload) => ({ type: SET_ERROR, payload }),

	getTrackers: () => async (dispatch) => {
		dispatch({ type: SETISINITIALIZED, payload: false })
		axios({
			method: 'GET',
			url: 'https://zenzapi.azurewebsites.net/api/zenztrackers',
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
			url: 'https://zenzapi.azurewebsites.net/api/zenztrackers/' + trackerId + '/areaalarms',
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
	getTrackerList: () => async (dispatch) => {
		dispatch({ type: SET_ERROR, payload: false })
		dispatch({ type: SETISINITIALIZED, payload: false })
		axios({
			method: 'GET',
			url: 'https://zenzapi.azurewebsites.net/api/zenztrackers/GetDevicesList',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				dispatch({ type: SETTRACKERLIST, payload: response.data })
			})

			.catch(function (error) {
				console.log(error)
			})
	},
	getMovementAlarms: () => async (dispatch) => {
		dispatch({ type: SET_ERROR, payload: false })
		dispatch({ type: SETISINITIALIZED, payload: false })
		axios({
			method: 'GET',
			url: 'https://zenzapi.azurewebsites.net/api/movementalarms/',
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

	getMovementAlarm: (alarmId) => async (dispatch) => {
		dispatch({ type: SETISINITIALIZED, payload: false })
		axios({
			method: 'GET',
			url: 'https://zenzapi.azurewebsites.net/api/movementalarms/' + alarmId,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function (response) {
				dispatch({ type: SETMOVEMENTALARM, payload: response.data })
			})

			.catch(function (error) {
				console.log(error)
			})
	},

	createMovementAlarm: (name, startTime, stopTime) => async (dispatch) => {
		dispatch({ type: SETISINITIALIZED, payload: false })
		axios({
			method: 'POST',
			url: 'https://zenzapi.azurewebsites.net/api/movementalarms',
			data: {
				name: name,
				StartTime: startTime,
				EndTime: stopTime,
			},
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function () {
				return dispatch(actions.getMovementAlarms())
			})
			.catch(function (error) {
				console.log(error)
				dispatch({ type: SET_ERROR, payload: true })
				return dispatch(actions.getMovementAlarms())
			})
	},

	editMovementAlarm: (name, startTime, stopTime, alarmId) => async (dispatch) => {
		axios({
			method: 'PATCH',
			url: 'https://zenzapi.azurewebsites.net/api/movementalarms/' + alarmId,
			data: {
				name: name,
				StartTime: startTime,
				EndTime: stopTime,
			},
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function () {
				dispatch({ type: SETMOVEMENTALARM, payload: null })
				return dispatch(actions.getMovementAlarms())
			})
			.catch(function (error) {
				console.log(error)
				dispatch({ type: SET_ERROR, payload: true })
				return dispatch(actions.getMovementAlarms())
			})
	},
	deleteMovementAlarm: (alarmId) => async (dispatch) => {
		dispatch({ type: SETISINITIALIZED, payload: false })
		axios({
			method: 'DELETE',
			url: 'https://zenzapi.azurewebsites.net/api/movementalarms/' + alarmId,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('accessToken') },
		})
			.then(function () {
				dispatch({ type: SETMOVEMENTALARM, payload: null })
				return dispatch(actions.getMovementAlarms())
			})

			.catch(function (error) {
				console.log(error)
				dispatch({ type: SET_ERROR, payload: true })
				return dispatch(actions.getMovementAlarms())
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
	[SETTRACKERLIST]: (state, { payload }) => state.merge({
		trackerList: payload,
		isInitialized: true,
	}),
	[SETAREAALARMS]: (state, { payload }) => state.merge({ areaAlarms: payload }),
	[SETMOVEMENTALARMS]: (state, { payload }) => state.merge({
		movementAlarms: payload,
		isInitialized: true,
	}),
	[SETMOVEMENTALARM]: (state, { payload }) => state.merge({
		movementAlarm: payload,
		isInitialized: true,
	}),
	[SETALARMPERSONS]: (state, { payload }) => state.merge({ alarmPersons: payload }),
	[SETISINITIALIZED]: (state, { payload }) => state.merge({ isInitialized: payload }),
}, initialState)
