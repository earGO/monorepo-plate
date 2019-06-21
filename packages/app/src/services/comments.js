import { success, error } from 'redux-saga-requests'

const name = 'comments-api'

const api = 'http://localhost:3000/comments'

/* Types */
const LOAD_COMMENTS = `${name}/LOAD_COMMENTS`

const types = {
  LOAD_COMMENTS,
}

/* Action creators */
const actions = {
  load() {
    return {
      type: LOAD_COMMENTS,
      payload: {
        request: {
          url: `${api}`,
        },
      },
    }
  },
}

/* reducer */
export default function reducer(postComments = {}, { type, payload }) {
  switch (type) {
    case success(LOAD_COMMENTS):
      return payload.data

    case error(LOAD_COMMENTS):
    default:
      return postComments
  }
}

export { name, api, types, actions }
