import {error} from 'redux-saga-requests';
import produce from 'immer';

const name = 'weather-api';

const api =
	'https://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=1362c34423375d167d694489b1c74080';

/* Types */
const LOAD_WEATHER = `${name}/LOAD_WEATHER`;

const types = {
	LOAD_WEATHER
};

/* Action creators */
const actions = {
	weatherLoaded(weather) {
		return {
			type: LOAD_WEATHER,
			payload: weather
		};
	}
};

/* reducer */
export default function weatherReducer(state, action) {
	return produce(state || [], draft => {
		switch (action.type) {
			case LOAD_WEATHER:
				return [...state, action.payload];

			case error(LOAD_WEATHER):
			default:
				return draft;
		}
	});
}

export {name, api, types, actions};
