import configureStore from 'redux-mock-store'


beforeAll(() => {
	return true;
});

describe('Mock test suite', () => {
	test('mock single test', () => {
		expect(2 + 2).toBe(4);
	});
});
