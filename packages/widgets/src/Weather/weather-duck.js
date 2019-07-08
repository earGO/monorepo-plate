import weatherService, {
	actions as serviceActions,
	api,
	name
} from './weather-service';
import {createSelector} from 'reselect';
import {call, put} from 'redux-saga/effects';
import {logger} from 'redux-logger';
import {serverRequests} from '@project/utils';

const initialState = {
	loading: false
};

const stateSelector = state => state[name] || initialState;
const weatherServiceSelector = state => state['weatherReducer'] || {};

const loading = createSelector(
	stateSelector,
	state => state.loading
);

const weatherData = createSelector(
	weatherServiceSelector,
	state => state
);

const selectors = {
	loading,
	weatherData
};

function* loadWeatherData() {
	const url = api;

	const data = yield call(serverRequests.simpleGetRequest, url);
	yield put(serviceActions.weatherLoaded(data));
}

const sagas = {
	loadWeatherData
};

export {name, selectors, sagas};

export function getWeatherModule() {
	return {
		// Unique id of the module
		id: 'weather',
		// Maps the Store key to the reducer
		reducerMap: {
			[weatherService.name]: weatherService,
		},
		middlewares: [logger],
		// This module uses redux-saga middleware
		// This property will be be used by the SagaExtension
		// to run sagas for the moduleD
		sagas: [loadWeatherData]
	};
}
