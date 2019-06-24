import {createStore} from 'redux-dynamic-modules';
import {getSagaExtension} from 'redux-dynamic-modules-saga';
import likesService, {
	actions as likesActions,
	types as likesTypes
} from './services/likes';
import {
	createRequestInstance,
	error,
	success,
	watchRequests
} from 'redux-saga-requests';
import LikesDuck from './components/likes/likes-duck';
import {createDriver} from 'redux-saga-requests-fetch';
import {logger} from 'redux-logger/src';
import {requestsPromiseMiddleware} from 'redux-saga-requests';
import {fork} from 'redux-saga/effects';

const requestSaga = function*() {
	yield createRequestInstance({
		driver: createDriver(window.fetch)
	});

	yield fork(watchRequests);
};

const modules = [LikesDuck];

const store = createStore({}, [], [getSagaExtension()], modules);

export default store;
