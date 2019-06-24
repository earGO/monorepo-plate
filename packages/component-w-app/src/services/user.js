import {success, error} from 'redux-saga-requests';

const name = 'user-api';

const api = 'http://localhost:3000/user';

/* Types */
const LOAD_USER = `${name}/LOAD_USER`;

const types = {
	LOAD_USER
};

/* Action creators */
const actions = {
	load() {
		return {
			type: LOAD_USER,
			payload: {
				request: {
					url: `${api}`
				}
			}
		};
	}
};

/* reducer */
export default function reducer(user = {}, {type, payload}) {
	switch (type) {
		case success(LOAD_USER):
			return payload.data;

		case error(LOAD_USER):
		default:
			return user;
	}
}

export {name, api, types, actions};
