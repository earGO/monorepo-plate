import React from 'react';

import * as service from '../../../services/likes';

import {call} from 'redux-saga/effects';
import {expectSaga} from 'redux-saga-test-plan';
import {api, actions, types, sagas} from '../likes-duck';
import {fetchApi} from '../../../utils/testApiCall';
import {getFirst, incrementField} from '../../../utils/hashTables';

const targetStateName = service.name;

let oneChunk, onePiece, globalKey, data, id, jokeId, first, likes;
let stateObject = {},
	requestBody = {},
	requestObject = {},
	payload = {},
	dataWithPayload = {};

/*payload:id, allLikes
 * */

beforeAll(async () => {
	data = await fetchApi(api);
	first = getFirst(data);
	oneChunk = getFirst(data)[0];
	likes = data;
	onePiece = getFirst(data)[0][0];

	globalKey = getFirst(data)[1];

	requestBody['url'] = `${api}`;
	requestObject['request'] = requestBody;
	stateObject[targetStateName] = data;
	payload['id'] = globalKey;
	payload['likes'] = data;
	dataWithPayload.payload = payload;
	jokeId = globalKey;
	id = globalKey;
});

afterAll(() => {
	data = {};
	first = [];
	oneChunk = [];
	likes = {};
	onePiece = {};

	globalKey = '';

	requestBody = {};
	requestObject = {};
	stateObject = {};
	payload = {};
	dataWithPayload = {};
});

describe('Test Likes sagas with redux-saga-plan', () => {
	it('fetches likes', () => {
		return expectSaga(sagas.loadLikes)
			.put({type: service.types.LOAD_LIKES, payload: requestObject})
			.silentRun();
	});
});

describe('test action creations', () => {
	it('creates like', () => {
		const like = actions.like(likes, id);
		expect(like).toStrictEqual({type: types.LIKE, payload: {likes, id}});
	});
	it('creates unlike', () => {
		const unlike = actions.unlike(likes, id);
		expect(unlike).toStrictEqual({
			type: types.UNLIKE,
			payload: {likes, id}
		});
	});
});
