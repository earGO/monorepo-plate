import weatherService, {
	actions as serviceActions,
	api
} from './weather-service';

import {call, put} from 'redux-saga/effects';
import {logger} from 'redux-logger';

const name = 'weather-app';

const reducers = {};

export function* weatherSaga() {
	yield call(loadWeatherData);
}

function* loadWeatherData() {
	const url = api;

	const response = yield call(fetch, url);
	const json = yield call([response, response.json]);
	yield put(serviceActions.weatherLoaded(json.weather));
}

export function getWeatherModule() {
	return {
		// Unique id of the module
		id: 'weather',
		// Maps the Store key to the reducer
		reducerMap: {
			[weatherService.name]: weatherService,
			[name]: (state = {}, action) => ({
				...state,
				...(reducers[action.type] &&
					reducers[action.type](state, action))
			})
		},
		middlewares: [logger],
		// This module uses redux-saga middleware
		// This property will be be used by the SagaExtension
		// to run sagas for the moduleD
		sagas: [weatherSaga]
	};
}
