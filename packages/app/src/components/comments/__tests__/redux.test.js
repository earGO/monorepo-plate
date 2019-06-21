import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Comment from '../Comment'

Enzyme.configure({ adapter: new Adapter() })

describe('redux file works', () => {
  test('renders w/o props', () => {
    const wrapper = shallow(<Comment />)
    expect(wrapper.exists()).toBe(true)
  })
})
