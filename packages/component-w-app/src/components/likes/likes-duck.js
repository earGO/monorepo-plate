import {createSelector} from 'reselect';
import {put, takeEvery, call, takeLatest, all} from 'redux-saga/effects';
import {success, error, requestsPromiseMiddleware} from 'redux-saga-requests';
import * as likesService from '../../services/likes';
import {incrementField} from '../../utils/hashTables';
import {postData} from '../../utils/serverRequests';
import {logger} from 'redux-logger/src';
import {load} from '../../services/likes';

const name = 'likes-service';
const api = likesService.api;

const initialState = {
	loading: false
};

/** Internal types */
const LIKE = `${name}/LIKE`;
const UNLIKE = `${name}/UNLIKE`;
const SAVE_LIKES = `${name}/SAVE_LIKES`;
const SAVE_LIKES_SUCCESS = `${name}/SAVE_LIKES_SUCCESS`;
const SAVE_LIKES_FAILED = `${name}/SAVE_LIKES_FAILED`;
const LOAD_LIKES = `${name}/LOAD_LIKES`;

const types = {
	LIKE,
	UNLIKE,
	SAVE_LIKES,
	SAVE_LIKES_FAILED,
	SAVE_LIKES_SUCCESS,
	LOAD_LIKES
};

/** Action creators */
const actions = {
	like(likes, id) {
		return {
			type: types.LIKE,
			payload: {id, likes}
		};
	},
	unlike(likes, id) {
		return {
			type: types.UNLIKE,
			payload: {id, likes}
		};
	}
};

/** Reducers */
const reducers = {
	[likesService.types.LOAD_LIKES]: () => ({
		loading: true
	}),
	[success(likesService.types.LOAD_LIKES)]: (_, {payload}) => ({
		loading: false
	}),
	[error(likesService.types.LOAD_LIKES)]: () => ({
		loading: false
	})
};

/** Selectors */

const stateSelector = state => state[name] || initialState;
const likesServiceSelector = state => state[likesService.name] || {};

const loading = createSelector(
	stateSelector,
	state => state.loading
);

const postLikes = createSelector(
	likesServiceSelector,
	state => state
);

const selectors = {
	loading,
	postLikes
};

/**Sagas*/

//Saga to add like and dispatch save action
function* handleIncrement(likes) {
	const response = yield call(incrementField, likes, 1);
	yield put({type: SAVE_LIKES, payload: response});
}

//Saga to remove like and dispatch save action
function* handleDecrement(likes) {
	const response = yield call(incrementField, likes, -1);
	yield put({type: SAVE_LIKES, payload: response});
}

//Saga to save like changes to db
function* handleSave(likes) {
	try {
		// Tell redux-saga to call fetch with the specified options
		yield call(postData, api, likes.payload);
		// Tell redux-saga to dispatch the saveScoreSucceeded action
		yield put(load());
	} catch (err) {
		// You get it
		// yield put(types.SAVE_LIKES_FAILED(err))
	}
}
//Initial load saga
async function* loadLikes() {
	const url = api;
	const response = yield await call(fetch, url);
	const json = yield await call([response, response.json]);

	yield put(load(json));
}

//sagas watcher
function* watchIncrements() {
	/**a Likes are fetched with this call
	 * IF LIKES ARE NOT FETCHED TRY RENAMING TRIGGERING ACTION
	 * it is thrown by DynamicModules flow while mounting module*/
	yield takeLatest('@@Internal/ModuleManager/ModuleAdded', loadLikes);
	yield takeEvery(types.LIKE, handleIncrement);
	yield takeEvery(types.UNLIKE, handleDecrement);
	yield takeEvery(types.SAVE_LIKES, handleSave);
}

const rootSaga = function*() {
	yield all([watchIncrements()]);
};
const sagas = {
	handleIncrement,
	handleDecrement,
	handleSave,
	loadLikes,
	watchIncrements
};
export {api, name, selectors, types, reducers, actions, sagas};

export default {
	id: name,
	reducerMap: {
		[likesService.name]: likesService.default,
		[name]: (state = initialState, action) => ({
			...state,
			...(reducers[action.type] && reducers[action.type](state, action))
		})
	},
	middlewares: [
		logger,
		requestsPromiseMiddleware({
			auto: true
		})
	],
	sagas: [rootSaga]
};
