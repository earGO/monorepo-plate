import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Like from '../Like'

Enzyme.configure({ adapter: new Adapter() })

describe('Test Like component with Enzyme and snapshots', () => {
  test('renders', () => {
    const wrapper = shallow(<Like />)
    expect(wrapper.exists()).toBe(true)
  })
  test('onClick gets function from parent', () => {
    const wrapper = shallow(<Like onClick={() => {}} />)
    expect(wrapper.exists()).toBe(true)
  })
})
