import {success, error} from 'redux-saga-requests';
import produce from 'immer';

const name = 'likes-api';

const api =
	'https://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=1362c34423375d167d694489b1c74080';

/* Types */
const LOAD_LIKES = `${name}/LOAD_LIKES`;

const types = {
	LOAD_LIKES
};

/* Action creators */
const actions = {
	weatherLoaded(weather) {
		return {
			type: LOAD_LIKES,
			payload: weather
		};
	}
};

/* reducer */
export default function weatherReducer(state, action) {
	return produce(state || [], draft => {
		switch (action.type) {
			case LOAD_LIKES:
				return [...state, action.payload];

			case error(LOAD_LIKES):
			default:
				return draft;
		}
	});
}

export {name, api, types, actions};
