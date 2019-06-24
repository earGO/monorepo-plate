import {success, error} from 'redux-saga-requests';

const name = 'likes-api';

const api = 'http://localhost:3000/likes';

/* Types */
const LOAD_LIKES = `${name}/LOAD_LIKES`;

const types = {
	LOAD_LIKES
};

/* Action creators */
const actions = {
	load() {
		return {
			type: LOAD_LIKES,
			payload: {
				request: {
					url: `${api}`
				}
			}
		};
	}
};

/* reducer */
export default function reducer(likes = {}, {type, payload}) {
	switch (type) {
		case success(LOAD_LIKES):
			return payload.data;

		case error(LOAD_LIKES):
		default:
			return likes;
	}
}

export {name, api, types, actions};
