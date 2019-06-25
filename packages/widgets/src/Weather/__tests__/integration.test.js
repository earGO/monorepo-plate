import {call, put, take} from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {serverRequests} from '@project/utils';
import {sagas} from '../weather-duck';
import {
	types,
	actions,
	name,
	api,
	actions as serviceActions
} from '../weather-service';

const mockData = {
	simpleMockField: 'simpleMockValue'
};

describe('Test weather-duck with redux-saga-test-plan', () => {
	it('provides a value for the API call', () => {
		return expectSaga(sagas.loadWeatherData)
			.provide({
				call(effect, next) {
					// Check for the API call to return fake value
					if (effect.fn === serverRequests.simpleGetRequest) {
						return {mockData};
					}

					// Allow Redux Saga to handle other `call` effects
					return next();
				}
			})
			.put({
				type: types.LOAD_WEATHER,
				payload: {mockData}
			})
			.silentRun();
	});
});
