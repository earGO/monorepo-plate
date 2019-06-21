import { createSelector } from 'reselect'
import { put } from 'redux-saga/effects'
import { success, error } from 'redux-saga-requests'
import * as R from 'ramda'
import * as jokesService from '../../services/jokes'

const name = 'jokes-service'
const baseRoute = '/jokes'

const initialState = {
  loading: false,
  selectedGroup: null,
  searchQuery: '',
  seenJokes: [],
  openedJokes: [],
}

/** Internal types */
const SELECT_GROUP = `${name}/SELECT_GROUP`
const SEARCH = `${name}/SEARCH`
const SET_SEEN = `${name}/SET_SEEN`
const SET_OPEN = `${name}/SET_OPEN`
const SET_CLOSE = `${name}/SET_CLOSE`

const types = {
  SELECT_GROUP,
  SEARCH,
  SET_SEEN,
  SET_OPEN,
  SET_CLOSE,
}

/** Action creators */
const actions = {
  setGroup(group) {
    return {
      type: types.SELECT_GROUP,
      payload: {
        selectedGroup: group,
      },
    }
  },
  search(query) {
    return {
      type: types.SEARCH,
      payload: {
        searchQuery: query,
      },
    }
  },
  setSeen(id) {
    return {
      type: types.SET_SEEN,
      payload: {
        id,
      },
    }
  },
  setOpen(id) {
    return {
      type: types.SET_OPEN,
      payload: {
        id,
      },
    }
  },
  setClose(id) {
    return {
      type: types.SET_CLOSE,
      payload: {
        id,
      },
    }
  },
}

/** Reducers */
const reducers = {
  [jokesService.types.LOAD_JOKES]: () => ({
    loading: true,
  }),
  [success(jokesService.types.LOAD_JOKES)]: (_, { payload }) => ({
    loading: false,
  }),
  [error(jokesService.types.LOAD_JOKES)]: () => ({
    loading: false,
  }),
  [types.SELECT_GROUP]: (_, { payload }) => ({
    selectedGroup: payload.selectedGroup,
  }),
  [types.SEARCH]: (_, { payload }) => ({
    searchQuery: payload.searchQuery && '',
  }),
  [types.SET_SEEN]: (state, { payload }) => ({
    seenJokes: [...new Set(state.seenJokes.concat(payload.id))],
  }),
  [types.SET_OPEN]: (state, { payload }) => ({
    openedJokes: [...new Set(state.openedJokes.concat(payload.id))],
  }),
  [types.SET_CLOSE]: (state, { payload }) => ({
    openedJokes: [...new Set(state.openedJokes.filter(item => item !== payload.id))],
  }),
}

/** Selectors */

const stateSelector = state => state[name] || initialState
const jokesServiceSelector = state => state[jokesService.name] || []

const loading = createSelector(
  stateSelector,
  state => state.loading,
)

const selectedGroup = createSelector(
  stateSelector,
  state => state.selectedGroup,
)

const seenJokes = createSelector(
  stateSelector,
  state => state.seenJokes,
)

const openedJokes = createSelector(
  stateSelector,
  state => state.openedJokes,
)

const searchQuery = createSelector(
  stateSelector,
  state => state.searchQuery,
)

const grouped = createSelector(
  jokesServiceSelector,
  data => R.groupBy(joke => joke.type)(data),
)

const groupNames = createSelector(
  grouped,
  groups => Object.keys(groups),
)

const byGroupName = createSelector(
  grouped,
  selectedGroup,
  jokesServiceSelector,
  (groups, selectedGroup, allJokes) => groups[selectedGroup] || allJokes,
)

const getData = createSelector(
  byGroupName,
  searchQuery,
  (jokes, searchQuery) =>
    jokes
      .filter(item => {
        const { id, type, ...searchData } = item
        return JSON.stringify(Object.values(searchData))
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      })
      .sort((a, b) => a.id - b.id),
)

const selectors = {
  loading,
  selectedGroup,
  searchQuery,
  seenJokes,
  openedJokes,
  grouped,
  groupNames,
  byGroupName,
  getData,
}

const rootSaga = function*() {
  yield put(jokesService.actions.load())
}

export { name, baseRoute, selectors, types, reducers, actions }

export default {
  id: name,
  reducerMap: {
    [jokesService.name]: jokesService.default,
    [name]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [rootSaga],
}
