import React from 'react'
import { mount } from 'enzyme'
import ChoiceGroup from './ChoiceGroup'
import FormGroup from '../FormGroup'
import Checkbox from '../Checkbox'
import Radio from '../Radio'

describe('ChoiceGroup', () => {
  describe('ClassName', () => {
    test('Applies custom className if specified', () => {
      const customClass = 'piano-key-neck-tie'
      const wrapper = mount(<ChoiceGroup className={customClass} />)

      expect(wrapper.prop('className')).toContain(customClass)
    })
  })

  describe('Children', () => {
    test('Renders child content', () => {
      const wrapper = mount(
        <ChoiceGroup>
          <Radio />
        </ChoiceGroup>
      )
      const el = wrapper.find(Radio)

      expect(el.length).toBeTruthy()
    })

    test('Wraps child component in a FormGroup.Choice', () => {
      const wrapper = mount(
        <ChoiceGroup>
          <Radio />
          <Radio />
          <Radio />
        </ChoiceGroup>
      )
      const formGroup = wrapper.find(FormGroup.Choice)
      const radio = wrapper.find(Radio)

      expect(formGroup.length).toBe(3)
      expect(radio.length).toBe(3)
      expect(formGroup.first().find(Radio).length).toBeTruthy()
    })
  })

  describe('Events', () => {
    test('Can trigger onBlur callback', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onBlur={spy}>
          <Radio />
          <Radio />
          <Radio />
        </ChoiceGroup>
      )
      const input = wrapper.find('.c-Radio').first().find('input')

      input.simulate('blur')

      expect(spy).toHaveBeenCalled()
    })

    test('Can trigger onFocus callback', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onFocus={spy}>
          <Radio />
          <Radio />
          <Radio />
        </ChoiceGroup>
      )
      const input = wrapper.find('.c-Radio').first().find('input')

      input.simulate('focus')

      expect(spy).toHaveBeenCalled()
    })

    test('Can trigger onChange callback', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onChange={spy}>
          <Radio value="1" />
          <Radio value="2" />
          <Radio value="3" />
        </ChoiceGroup>
      )
      const input = wrapper.find('.c-Radio').first().find('input')

      input.simulate('change', { target: { checked: true } })

      expect(spy).toHaveBeenCalledWith(['1'])
    })
  })

  describe('MultiSelect', () => {
    test('Has multi-select className, if applicable', () => {
      const wrapper = mount(
        <ChoiceGroup value="katinka">
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const o = wrapper.find('div.c-ChoiceGroup')

      expect(o.hasClass('is-multi-select')).toBeTruthy()
    })

    test('Does not have multiSelect className, if applicable', () => {
      const wrapper = mount(
        <ChoiceGroup value="katinka" multiSelect={false}>
          <Radio value="derek" />
          <Radio value="hansel" />
          <Radio value="mugatu" />
        </ChoiceGroup>
      )
      const o = wrapper.find('div.c-ChoiceGroup')

      expect(o.hasClass('is-multi-select')).not.toBeTruthy()
    })

    test('Can multiSelect', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onChange={spy}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const input = wrapper.find(Checkbox).at(0).find('input')
      const input2 = wrapper.find(Checkbox).at(1).find('input')
      const input3 = wrapper.find(Checkbox).at(2).find('input')

      input.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['derek'])

      input2.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['derek', 'hansel'])

      input3.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['derek', 'hansel', 'mugatu'])
    })

    test('multiSelect can be turned off', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <ChoiceGroup onChange={spy} multiSelect={false}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const input = wrapper.find(Checkbox).at(0).find('input')
      const input2 = wrapper.find(Checkbox).at(1).find('input')
      const input3 = wrapper.find(Checkbox).at(2).find('input')

      input.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['derek'])

      input2.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['hansel'])

      input3.simulate('change', { target: { checked: true } })
      expect(spy).toHaveBeenCalledWith(['mugatu'])
    })
  })

  describe('Name', () => {
    test('Applies name to child Choice components', () => {
      const wrapper = mount(
        <ChoiceGroup name="MUGATU">
          <Radio />
          <Radio />
          <Radio />
        </ChoiceGroup>
      )

      expect(wrapper.find('input').first().props().name).toBe('MUGATU')
    })
  })

  describe('Value', () => {
    test('Does not check any Choices if value does not match', () => {
      const wrapper = mount(
        <ChoiceGroup value="katinka">
          <Radio value="derek" />
          <Radio value="hansel" />
          <Radio value="mugatu" />
        </ChoiceGroup>
      )
      const radios = wrapper.find('input')

      expect(radios.get(0).props.checked).toBeFalsy()
      expect(radios.get(1).props.checked).toBeFalsy()
      expect(radios.get(2).props.checked).toBeFalsy()
    })

    test('Checks a Choice if value matches', () => {
      const wrapper = mount(
        <ChoiceGroup value="hansel">
          <Radio value="derek" />
          <Radio value="hansel" />
          <Radio value="mugatu" />
        </ChoiceGroup>
      )
      const radios = wrapper.find('input')

      expect(radios.get(0).props.checked).toBeFalsy()
      expect(radios.get(1).props.checked).toBeTruthy()
      expect(radios.get(2).props.checked).toBeFalsy()
    })

    test('Deselects checked value on click', () => {
      const values = ['derek', 'hansel']
      const wrapper = mount(
        <ChoiceGroup value={values}>
          <Checkbox value="derek" />
          <Checkbox value="hansel" />
          <Checkbox value="mugatu" />
        </ChoiceGroup>
      )
      const input = wrapper.find('input')

      input.first().simulate('change')

      expect(wrapper.state().selectedValue).not.toContain('derek')
      expect(wrapper.state().selectedValue).toContain('hansel')
    })
  })

  describe('Style', () => {
    test('Can render responsive styles', () => {
      const wrapper = mount(<ChoiceGroup isResponsive />)
      const el = wrapper.find('div.c-ChoiceGroup')

      expect(el.hasClass('is-responsive')).toBe(true)
    })
  })
})
