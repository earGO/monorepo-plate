import { createSelector } from 'reselect'
import { put } from 'redux-saga/effects'
import { success, error } from 'redux-saga-requests'
import * as userService from '../../services/user'

const name = 'user-service'

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
  [userService.types.LOAD_USER]: () => ({
    loading: true,
  }),
  [success(userService.types.LOAD_USER)]: (_, { payload }) => ({
    loading: false,
  }),
  [error(userService.types.LOAD_USER)]: () => ({
    loading: false,
  }),
}

/** Selectors */

const stateSelector = state => state[name] || initialState
const userServiceSelector = state => state[userService.name] || []

const loading = createSelector(
  stateSelector,
  state => state.loading,
)

const singleUser = createSelector(
  userServiceSelector,
  state => state,
)

const selectors = {
  loading,
  singleUser,
}

const rootSaga = function*() {
  yield put(userService.actions.load())
}

export { name, selectors, types, reducers, actions }

export default {
  id: name,
  reducerMap: {
    [userService.name]: userService.default,
    [name]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [rootSaga],
}
