import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactDOM from 'react-dom'
import Comment from '../Comment'
import AddComment from '../AddComment'
import { fetchApi } from '../../../utils/testApiCall'
import { getFirst } from '../../../utils/hashTables'
import * as CommentsModule from '../comments-duck'
import CommentsList from '../CommentsList'

/**To test some components we need some data.
 * To use this data in tests we declare it globaly, then fill all data from mock api
 * using beforeAll setup method*/

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

describe('Test Comment component with Enzyme', () => {
  test('renders w/o props', () => {
    const wrapper = shallow(<Comment />)
    expect(wrapper.exists()).toBe(true)
  })
  test('renders w props', () => {
    const wrapper = shallow(<Comment singlecomment={onePiece} />)
    expect(wrapper.exists()).toBe(true)
  })
  test('renders w empty props', () => {
    const empty = {}
    const wrapper = shallow(<Comment singlecomment={empty} />)
    expect(wrapper.exists()).toBe(true)
  })
  test('check props', () => {
    const wrapper = shallow(<Comment singlecomment={onePiece} />),
      commentBody = wrapper.find('#content'),
      commentUser = wrapper.find('#user'),
      commentDate = wrapper.find('#date')
    expect(commentBody.text()).toBe(content)
    expect(commentUser.text()).toBe(userString)
    expect(commentDate.text()).toBe(date)
  })
})

describe('Test AddComment component with Enzyme', () => {
  test('renders w/o props', () => {
    const wrapper = shallow(<AddComment />)
    expect(wrapper.exists()).toBe(true)
  })
  test('comment field is echoed w/o props', () => {
    const wrapper = shallow(<AddComment />)
    wrapper.find('[name="commentText"]').simulate('change', {
      target: { value: 'hello' },
    })
    expect(wrapper.find('[name="commentText"]').props().value).toEqual('hello')
  })
  test('when submitted prevents default w/o props', () => {
    const wrapper = shallow(<AddComment />)
    let prevented = false
    wrapper.find('#AddComment').simulate('submit', {
      preventDefault: () => {
        prevented = true
      },
    })
    expect(prevented).toBe(true)
  })
  test('renders w partial props', () => {
    const wrapper = shallow(<AddComment comments={oneChunk} />)
    //I'm passing empty anonimous function as wrong addComment method
    const wrapperNoComments = shallow(<AddComment user={user} jokeId={globalKey} addComment={() => {}} />)
    const wrapperNoMethod = shallow(<AddComment user={user} jokeId={globalKey} comments={oneChunk} />)
    expect(wrapper.exists()).toBe(true)
    expect(wrapperNoComments.exists()).toBe(true)
    expect(wrapperNoMethod.exists()).toBe(true)
  })
  test('comment field is echoed w props', () => {
    const wrapper = shallow(
      <AddComment user={user} jokeId={globalKey} comments={oneChunk} addComment={() => {}} />,
    )
    wrapper.find('[name="commentText"]').simulate('change', {
      target: { value: 'hello' },
    })
    expect(wrapper.find('[name="commentText"]').props().value).toEqual('hello')
  })
  test('when submitted prevents default w props', () => {
    const wrapper = shallow(
      <AddComment user={user} jokeId={globalKey} comments={oneChunk} addComment={() => {}} />,
    )
    let prevented = false
    wrapper.find('#AddComment').simulate('submit', {
      preventDefault: () => {
        prevented = true
      },
    })
    expect(prevented).toBe(true)
  })
})

describe('Test CommentsLists component with Enzyme', () => {
  test('renders w/o props', () => {
    const wrapper = shallow(<CommentsList />)
    expect(wrapper.exists()).toBe(true)
  })
  test('renders w props', () => {
    const wrapper = shallow(<CommentsList singlecomment={onePiece} />)
    expect(wrapper.exists()).toBe(true)
  })
  test('renders w empty props', () => {
    const empty = {}
    const wrapper = shallow(<CommentsList singlecomment={empty} />)
    expect(wrapper.exists()).toBe(true)
  })
  test('renders w props', () => {
    const wrapper = shallow(<CommentsList comments={oneChunk} />)
    expect(wrapper.exists()).toBe(true)
  })
  test('renders w empty props', () => {
    const wrapper = shallow(<CommentsList comments={[]} />)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('test with full rendering', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Comment bar="baz" />)
    expect(wrapper.props().bar).toBe('baz')
    wrapper.setProps({ bar: 'foo' })
    expect(wrapper.props().bar).toBe('foo')
  })
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddComment />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
