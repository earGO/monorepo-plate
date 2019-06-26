import {simpleGetRequest} from '../getRequests';
import serverRequests from '../.';

/**
 * we gonna test if this util returns expected call from mock api,
 * and if it returns error, when api URL is wrong
 * */

const api = 'http://localhost:3000/user';
const apiWrong = 'http://localhost:3200/wrong';
const correct = {
	id: 'mr2w3s0m3',
	name: 'Barney',
	lastname: 'Stinson'
};

describe('Test simpleGetRequest from server requests in utils', () => {
	test('returns correct value from correct api', async () => {
		const result = await simpleGetRequest(api);
		expect(result).toStrictEqual(correct);
	});
	test('the fetch fails with an error if empty', async () => {
		const result = await simpleGetRequest(apiWrong);
		expect(Object.keys(result)).toStrictEqual(['error', 'body']);
	});
});

describe('Test serverRequests imports and exports serverRequests utils', () => {
	test('imports simpleRequestApi', async () => {
		const result = await serverRequests.simpleGetRequest(api);
		expect(result).toStrictEqual(correct);
	});
});
