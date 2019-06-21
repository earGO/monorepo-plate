import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { configure, mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16'
import { fetchApi } from '../../../utils/testApiCall'
import * as CommentsModule from '../comments-duck'
import { getFirst } from '../../../utils/hashTables'
import Comments from '../Comments'
import Comment from '../Comment'

configure({ adapter: new Adapter() })

let onePiece = {} //one comment under specific post
let oneChunk = [] //all comments under one post
let allData = {} //all posts from database
let globalKey, //the id of specific post
  userString, //user, that wrote the post comment,put to String
  content, //comment body
  date = '', //comment date
  user = {} //comment author

beforeAll(async () => {
  const data = await fetchApi(CommentsModule.api)
  oneChunk = getFirst(data)[0]
  onePiece = getFirst(data)[0][0]
  globalKey = getFirst(data)[1]
  allData = data
  content = onePiece.content
  user = onePiece.user
  userString = onePiece.user.name + ' ' + onePiece.user.lastname
  date = onePiece.date
})

describe('integration tests file working', () => {
  test('renders w/o props', () => {
    const wrapper = shallow(<Comment />)
    expect(wrapper.exists()).toBe(true)
  })
})
