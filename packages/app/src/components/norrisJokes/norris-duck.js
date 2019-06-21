import { createSelector } from 'reselect'
import { put } from 'redux-saga/effects'
import { success, error } from 'redux-saga-requests'
import * as norrisService from '../../services/norris'

const name = 'norrisService'
const baseRoute = '/norris-joke'

const initialState = {
  loading: false,
}

/** Internal types */
//no local types

const types = {
  //no local types
}

/** Action creators */
const actions = {
  //no local actions
}

/** Reducers */
/*we only generate reducers for fetching Chuck Norris joke*/
const reducers = {
  [norrisService.types.NORRIS_JOKE]: () => ({
    loading: true,
  }),
  [success(norrisService.types.NORRIS_JOKE)]: (_, { payload }) => ({
    loading: false,
  }),
  [error(norrisService.types.NORRIS_JOKE)]: () => ({
    loading: false,
  }),
}

/** Selectors */

const stateSelector = state => state[name] || initialState
const norrisServiceSelector = state => state[norrisService.name] || []

const loading = createSelector(
  stateSelector,
  state => state.loading,
)

const singleJoke = createSelector(
  norrisServiceSelector,
  state => state,
)

const selectors = {
  loading,
  singleJoke,
}

const rootSaga = function*() {
  yield put(norrisService.actions.load())
}

export { name, baseRoute, selectors, types, reducers, actions }

export default {
  id: name,
  reducerMap: {
    [norrisService.name]: norrisService.default,
    [name]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [rootSaga],
}
