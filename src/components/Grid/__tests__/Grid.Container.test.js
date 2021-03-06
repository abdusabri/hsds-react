import React from 'react'
import { mount } from 'enzyme'
import Container from '../Grid.Container'

describe('ClassName', () => {
  test('Has the correct CSS class', () => {
    const wrapper = mount(<Container />)

    expect(wrapper.getDOMNode().classList.contains('c-Container')).toBeTruthy()
  })

  test('Accepts additional classNames', () => {
    const wrapper = mount(<Container className="mugatu" />)

    expect(wrapper.getDOMNode().classList.contains('mugatu')).toBeTruthy()
  })
})

describe('Children', () => {
  test('Can render child components', () => {
    const wrapper = mount(
      <Container>
        <div className="mugatu" />
      </Container>
    )

    const o = wrapper.find('.mugatu')

    expect(o.length).toBeTruthy()
  })
})

describe('Style', () => {
  test('Accepts style prop', () => {
    const style = { background: 'red' }
    const wrapper = mount(<Container style={style} />)

    expect(wrapper.html()).toContain('style')
    expect(wrapper.html()).toContain('background')
    expect(wrapper.html()).toContain('red')
  })
})

describe('Variants', () => {
  test('Correctly renders (old) fluid variant', () => {
    const wrapper = mount(<Container fluid />)

    expect(wrapper.getDOMNode().classList.contains('c-Container')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-fluid')).toBeTruthy()
    expect(
      wrapper.getDOMNode().classList.contains('is-responsive')
    ).not.toBeTruthy()
  })

  test('Correctly renders fluid variant', () => {
    const wrapper = mount(<Container isFluid />)

    expect(wrapper.getDOMNode().classList.contains('c-Container')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-fluid')).toBeTruthy()
    expect(
      wrapper.getDOMNode().classList.contains('is-responsive')
    ).not.toBeTruthy()
  })

  test('Correctly renders (old) responsive variant', () => {
    const wrapper = mount(<Container responsive />)

    expect(wrapper.getDOMNode().classList.contains('c-Container')).toBeTruthy()
    expect(
      wrapper.getDOMNode().classList.contains('is-responsive')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-fluid')).not.toBeTruthy()
  })

  test('Correctly renders responsive variant', () => {
    const wrapper = mount(<Container isResponsive />)

    expect(wrapper.getDOMNode().classList.contains('c-Container')).toBeTruthy()
    expect(
      wrapper.getDOMNode().classList.contains('is-responsive')
    ).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-fluid')).not.toBeTruthy()
  })

  test('Correctly renders size', () => {
    const wrapper = mount(<Container size="sm" />)

    expect(wrapper.getDOMNode().classList.contains('c-Container')).toBeTruthy()
    expect(wrapper.getDOMNode().classList.contains('is-sm')).toBeTruthy()
  })
})
