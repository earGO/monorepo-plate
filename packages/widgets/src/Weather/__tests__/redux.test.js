import {error} from 'redux-saga-requests';
import {selectors} from '../weather-duck';
import {
	default as weatherReducer,
	types,
	actions,
	name
} from '../weather-service';

const initialMockState = {
	mockTitle: 'mockTitle',
	mockData: ['papul', 'banana', 'minion']
};

describe('Test weather service', () => {
	for (var prop in types) {
		if (types.hasOwnProperty(prop)) {
			it('type format should be correct', () => {
				const typeValue = name + '/' + prop;
				expect(types[prop]).toBe(typeValue);
			});
		}
	}
});

describe('Test weather service reducer', () => {
	it('should handle LOAD_WEATER', () => {
		// it's empty on purpose because it's just starting to fetch posts
		expect(
			weatherReducer([], actions.weatherLoaded({test: 'test'}))
		).toEqual([{test: 'test'}]);
	});
	it('should return emptyState when error', () => {
		const errorAction = {
			type: error(types.LOAD_WEATHER),
			payload: "if you see it reducer doesn't works"
		};
		expect(
			weatherReducer({initialState: 'initialState'}, errorAction)
		).toEqual({initialState: 'initialState'});
	});
});

describe('Test weather duck selectors', () => {
	it('loading should select Loading if present in state', () => {
		let stateWithLoading = {...initialMockState};
		stateWithLoading[name] = {loading: true, otherCaption: 'otherCaption'};
		expect(selectors.loading(stateWithLoading)).toEqual(true);
	});
	it('weatherData should select weatherReducer if present in state', () => {
		let stateWithWeather = {...initialMockState};
		stateWithWeather['weatherReducer'] = {weather: 'isGood'};
		expect(selectors.weatherData(stateWithWeather)).toEqual({
			weather: 'isGood'
		});
	});
	it('loading should return false if Loading absent in state', () => {
		expect(selectors.loading(initialMockState)).toEqual(false);
	});
	it('weatherData should return empty object if data absent in state', () => {
		expect(selectors.weatherData(initialMockState)).toEqual({});
	});
});
