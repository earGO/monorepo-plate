import React from 'react'

import * as commentsService from '../../../services/comments'

import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { actions, types, sagas } from '../comments-duck'
import { fetchApi } from '../../../utils/testApiCall'
import { getFirst, makePatch } from '../../../utils/hashTables'
import { patchComment } from '../../../utils/serverRequests'

/*Some mock variables*/
const api = commentsService.api,
  targetState = commentsService.name
let onePiece = {} //one comment under specific post
let oneChunk = [],
  comments = [] //all comments under one post
let allData = {} //all posts from database
let globalKey, //the id of specific post
  userString, //user, that wrote the post comment,put to String
  content, //comment body
  date = '', //comment date
  user = {}, //comment author
  jokeId,
  id = ''
let dataWithPayload = {}
let payload = {}
let idPayload = {}
let requestObject = {},
  requestBody = {}
let stateObject = {}

function testReducer(state = {}, action) {
  if (action.type === commentsService.types.LOAD_COMMENTS) {
    return {
      ...state,
      stateObject,
    }
  }
}

beforeAll(async () => {
  const data = await fetchApi(api)
  oneChunk = getFirst(data)[0]
  onePiece = getFirst(data)[0][0]
  globalKey = getFirst(data)[1]
  allData = data
  content = onePiece.content
  user = onePiece.user
  userString = onePiece.user.name + ' ' + onePiece.user.lastname
  date = onePiece.date
  idPayload.id = globalKey
  payload.jokeId = globalKey
  payload.user = user
  payload.content = content
  payload.comments = oneChunk
  dataWithPayload['payload'] = payload
  requestBody.url = `${api}`
  requestObject['request'] = requestBody
  stateObject[targetState] = allData
  comments = oneChunk
  jokeId, (id = globalKey)
})

afterAll(() => {
  onePiece = {} //one comment under specific post
  oneChunk = [] //all comments under one post
  allData = {} //all posts from database
  globalKey //the id of specific post
  userString //user, that wrote the post comment,put to String
  content //comment body
  date = '' //comment date
  user = {} //comment author
  dataWithPayload = {}
  payload = {}
  requestObject = {}
  requestBody = {}
  idPayload = {}
  stateObject = {}
})

describe('Test Comments sagas with redux-saga-plan', () => {
  it('fetches comments', () => {
    return expectSaga(sagas.loadComments)
      .put({ type: commentsService.types.LOAD_COMMENTS, payload: requestObject })
      .silentRun()
  })
  it('adds comments to state and initiates save', () => {
    return expectSaga(sagas.watchIncrements)
      .provide([[call(makePatch, dataWithPayload), payload]])
      .put({ type: types.ADD_CLOSE, payload: idPayload })
      .dispatch({ type: types.ADD_COMMENT, payload: payload })
      .silentRun()
  })

  it('saves comments and initiate reload', () => {
    return expectSaga(sagas.watchIncrements)
      .provide([[call(patchComment, api, payload), allData]])
      .dispatch({ type: types.SAVE_COMMENTS, payload: payload })
      .silentRun()
  })
  it('fills reducer with data', () => {
    return expectSaga(sagas.loadComments)
      .withReducer(testReducer)
      .put({ type: commentsService.types.LOAD_COMMENTS, payload: requestObject })
      .hasFinalState({ stateObject })
      .run(1500)
  })
})

describe('test action creations', () => {
  it('creates addComment', () => {
    const add = actions.addComment(user, content, comments, jokeId)
    expect(add).toStrictEqual({ type: types.ADD_COMMENT, payload: { user, content, comments, jokeId } })
  })
  it('creates setOpen', () => {
    const setOpen = actions.setOpen(id)
    expect(setOpen).toStrictEqual({ type: types.SET_OPEN, payload: { id } })
  })
  it('creates setClose', () => {
    const setClose = actions.setClose(id)
    expect(setClose).toStrictEqual({ type: types.SET_CLOSE, payload: { id } })
  })
  it('creates setAddOpen', () => {
    const setAddOpen = actions.setAddOpen(id)
    expect(setAddOpen).toStrictEqual({ type: types.ADD_OPEN, payload: { id } })
  })
  it('creates setAddClose', () => {
    const setAddClose = actions.setAddClose(id)
    expect(setAddClose).toStrictEqual({ type: types.ADD_CLOSE, payload: { id } })
  })
})
