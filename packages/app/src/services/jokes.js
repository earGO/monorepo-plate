import { success, error } from 'redux-saga-requests'

const name = 'official-joke-api'

const api = 'https://official-joke-api.appspot.com'

/* Types */
const LOAD_JOKES = `${name}/LOAD_JOKES`

const types = {
  LOAD_JOKES,
}

/* Action creators */
const actions = {
  load() {
    return {
      type: LOAD_JOKES,
      payload: {
        request: {
          url: `${api}/random_ten`,
        },
      },
    }
  },
}

/* reducer */
export default function reducer(jokes = [], { type, payload }) {
  switch (type) {
    case success(LOAD_JOKES):
      return jokes.concat(payload.data)

    case error(LOAD_JOKES):
    default:
      return jokes
  }
}

export { name, types, actions }
