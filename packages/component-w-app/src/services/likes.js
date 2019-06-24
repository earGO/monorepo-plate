import {success, error} from 'redux-saga-requests';

const name = 'likes-api';

const api = 'http://localhost:3000/likes';

/* Types */
const LOAD_LIKES = `${name}/LOAD_LIKES`;

const types = {
	LOAD_LIKES
};

/* Action creators */
export const load = likes => {
	return {
		type: LOAD_LIKES,
		payload: {likes}
	};
};

/* reducer */
export default function reducer(likes = {}, {type, payload}) {
	switch (type) {
		case success(LOAD_LIKES):
			return payload;

		case error(LOAD_LIKES):
		default:
			return likes;
	}
}

export {name, api, types};
