import { success, error } from 'redux-saga-requests'

const name = 'chuck-norris-joke-api'

/*this url returns a random Chuck Norris joke in JSON format
* example
* {
"icon_url" : "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
"id" : "cPWY8sVhSCSQqf0rg_ztCA",
"url" : ""
"value" : "Chuck Norris is so American, he eats tyranny and shits apple pie."
}
* */

const api = 'https://api.chucknorris.io/jokes/random'

/* Types */
const NORRIS_JOKE = `${name}/NORRIS_JOKE`

const types = {
  NORRIS_JOKE,
}

/* Action creators */
const actions = {
  load() {
    return {
      type: NORRIS_JOKE,
      payload: {
        request: {
          url: `${api}`,
        },
      },
    }
  },
}

/* reducer */
export default function reducer(norrisJoke = [], { type, payload }) {
  switch (type) {
    case success(NORRIS_JOKE):
      return [payload.data]

    case error(NORRIS_JOKE):
    default:
      return norrisJoke
  }
}

export { name, types, actions }
