import React from 'react'
import { mount } from 'enzyme'
import Radio from '.'
import Choice from '../Choice'

describe('Radio', () => {
  test('Renders a radio Choice component', () => {
    const wrapper = mount(<Radio value="check" />)
    const choice = wrapper.find(Choice)

    expect(choice.length).toBeTruthy()
    expect(choice.props().type).toBe('radio')
    expect(choice.props().value).toBe('check')
  })

  test('Renders a radio as stacked', () => {
    const wrapper = mount(<Radio value="check" stacked={true} />)
    const choice = wrapper.find(Choice)

    expect(choice.length).toBeTruthy()
    expect(choice.props().type).toBe('radio')
    expect(choice.props().value).toBe('check')
    expect(choice.props().stacked).toBe(true)
  })
})
