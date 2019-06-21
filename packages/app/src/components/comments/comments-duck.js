import { createSelector } from 'reselect'
import { put, all, call, takeLatest, takeEvery } from 'redux-saga/effects'
import { success, error } from 'redux-saga-requests'
import * as commentsService from '../../services/comments'
import { patchComment } from '../../utils/serverRequests'
import { makePatch } from '../../utils/hashTables'

const name = 'comments-service'
const api = commentsService.api

const initialState = {
  loading: false,
  openedComments: [],
  addComments: [],
}

/** Internal types */
const ADD_COMMENT = `${name}/ADD_COMMENT`
const SET_OPEN = `${name}/SET_OPEN`
const SET_CLOSE = `${name}/SET_CLOSE`
const ADD_OPEN = `${name}/ADD_OPEN`
const ADD_CLOSE = `${name}/ADD_CLOSE`
const SAVE_COMMENTS = `${name}/SAVE_COMMENTS`
const SAVE_COMMENTS_SUCCESS = `${name}/SAVE_COMMENTS_SUCCESS`
const SAVE_COMMENTS_FAILED = `${name}/SAVE_COMMENTS_FAILED`

const types = {
  ADD_COMMENT,
  SET_OPEN,
  SET_CLOSE,
  ADD_OPEN,
  ADD_CLOSE,
  SAVE_COMMENTS,
  SAVE_COMMENTS_SUCCESS,
  SAVE_COMMENTS_FAILED,
}

/** Action creators */
const actions = {
  addComment(user, content, comments, jokeId) {
    return {
      type: types.ADD_COMMENT,
      payload: { user, content, comments, jokeId },
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
  setAddOpen(id) {
    return {
      type: types.ADD_OPEN,
      payload: {
        id,
      },
    }
  },
  setAddClose(id) {
    return {
      type: types.ADD_CLOSE,
      payload: {
        id,
      },
    }
  },
}

/** Reducers */
const reducers = {
  [commentsService.types.LOAD_COMMENTS]: () => ({
    loading: true,
  }),
  [success(commentsService.types.LOAD_COMMENTS)]: (_, { payload }) => ({
    loading: false,
  }),
  [error(commentsService.types.LOAD_COMMENTS)]: () => ({
    loading: false,
  }),
  [types.SET_OPEN]: (state, { payload }) => ({
    openedComments: [...new Set(state.openedComments.concat(payload.id))],
  }),
  [types.SET_CLOSE]: (state, { payload }) => ({
    openedComments: [...new Set(state.openedComments.filter(item => item !== payload.id))],
  }),
  [types.ADD_OPEN]: (state, { payload }) => ({
    addComments: [...new Set(state.addComments.concat(payload.id))],
  }),
  [types.ADD_CLOSE]: (state, { payload }) => ({
    addComments: [...new Set(state.addComments.filter(item => item !== payload.id))],
  }),
}

/** Selectors */

const stateSelector = state => state[name] || initialState
const commentsServiceSelector = state => state[commentsService.name] || {}

const loading = createSelector(
  stateSelector,
  state => state.loading,
)

const postComments = createSelector(
  commentsServiceSelector,
  state => state,
)

const openedComments = createSelector(
  stateSelector,
  state => state.openedComments,
)

const addComments = createSelector(
  stateSelector,
  state => state.addComments,
)

const selectors = {
  loading,
  postComments,
  openedComments,
  addComments,
}

//Saga to add like and dispatch save action
function* handleAddCommentToState(comment) {
  const patchToPush = yield call(makePatch, comment)
  yield put(actions.setAddClose(patchToPush[1]))
  yield put({ type: types.SAVE_COMMENTS, payload: patchToPush[0] })
}
//Saga to save like changes to db
function* handleSaveComments(data) {
  try {
    // Tell redux-saga to call fetch with the specified options
    yield call(patchComment, api, data)
    // Tell redux-saga to dispatch the saveScoreSucceeded action
    yield put(commentsService.actions.load())
  } catch (err) {
    // You get it
  }
}
//Initial load saga
function* loadComments() {
  try {
    yield put(commentsService.actions.load())
  } catch (e) {
    //treat error if you want
  }
}

//sagas watcher
function* watchIncrements() {
  /**comments are fetched with this call
   * IF LIKES ARE NOT FETCHED TRY RENAMING TRIGGERING ACTION
   * it is thrown by DynamicModules flow while mounting module*/
  yield takeLatest('@@Internal/ModuleManager/ModuleAdded', loadComments)
  yield takeEvery(types.ADD_COMMENT, handleAddCommentToState)
  yield takeEvery(types.SAVE_COMMENTS, handleSaveComments)
}

const rootSaga = function*() {
  yield all([watchIncrements()])
}

const sagas = {
  handleAddCommentToState,
  handleSaveComments,
  loadComments,
  watchIncrements,
  rootSaga,
}

export { api, name, selectors, types, reducers, actions, sagas }

export default {
  id: name,
  reducerMap: {
    [commentsService.name]: commentsService.default,
    [name]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [rootSaga],
}
