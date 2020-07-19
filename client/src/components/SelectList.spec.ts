import { shallowMount, mount } from '@vue/test-utils'
import KnSelectList from './SelectList.vue'
import Vue from 'vue'

describe('The Select List Component.', () => {
  it('Should encapsulate a set of option elements.', () => {
    const wrapper = shallowMount(KnSelectList, {
      slots: { default: ['<option value="a">A</option>', '<option value="b">B</option>'] }
    })

    expect(wrapper.findAll('option').length).toBe(2)
  })

  it('Should select the default option and disable itself if no options are given.', async () => {
    const wrapper = shallowMount(KnSelectList, {
      slots: { default: [] }
    })
    const vm = wrapper.vm as KnSelectList
    await vm.$nextTick()

    const selectControl = wrapper.find('.kn-select-list__control')
    if (!selectControl.exists()) {
      return fail('Could not find the select list element.')
    }
    const selectEle = selectControl.element as HTMLSelectElement

    expect(wrapper.find('.kn-select-list__default-option').exists()).toBeTruthy()
    expect(selectControl.attributes().disabled).toBeTruthy()
    expect(selectEle.value).toBe('')
  })

  it('Should emit changes made when expected.', async () => {
    const receivedEmits: string[] = []
    const TestBench = Vue.component('test-bench', {
      template: `
        <kn-select-list @change="changeSpy">
          <option v-for="option in options" :key="option" :value="option">{{option}}</option>
        </kn-select-list>`,
      components: { KnSelectList },
      props: {
        options: []
      },
      data: () => ({
        changeSpy: (val: string) => receivedEmits.push(val)
      })
    })
    const wrapper = mount(TestBench)

    const selectWrapper = wrapper.find('.kn-select-list__control')
    if (!selectWrapper.exists()) {
      return fail('Could not find the select element.')
    }
    const selectEle = selectWrapper.element as HTMLSelectElement

    // Initial state: no options declared, so the component should display the default one
    expect(wrapper.find('.kn-select-list__default-option').exists()).toBeTruthy()

    // Updating state with new options
    await wrapper.setProps({ options: ['a', 'b'] })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('option[value=a]').exists()).toBeTruthy()
    expect(wrapper.find('option[value=b]').exists()).toBeTruthy()
    expect(wrapper.find('.kn-select-list__default-option').exists()).toBeFalsy()
    expect(selectEle.value).toBe('a')

    // Change selection to B, then update the options list with a new option
    const optionAEle = selectWrapper.find('option[value=b]').element as HTMLOptionElement
    optionAEle.selected = true
    selectWrapper.trigger('change')
    await wrapper.vm.$nextTick()

    expect(selectEle.disabled).toBeFalsy()
    expect(selectEle.value).toBe('b')

    await wrapper.setProps({ options: ['a', 'b', 'c'] })
    await wrapper.vm.$nextTick()

    // Should keep the selection if it's still around after an update
    expect(selectEle.value).toBe('b')

    await wrapper.setProps({ options: [] })
    await wrapper.vm.$nextTick()

    // Reset selection to the default when all the options are removed
    expect(selectEle.value).toBe('')

    // Should emit default selection, first in list after update, user selection, and when all options are removed
    expect(receivedEmits).toEqual(['', 'a', 'b', ''])
  })

  it('Should support using <optgroup> elements.', async () => {
    const TestBench = Vue.component('test-bench', {
      template: `
        <kn-select-list>
          <optgroup label="Group">
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c" disabled>C</option>
          </optgroup>
        </kn-select-list>`,
      components: { KnSelectList }
    })
    const wrapper = mount(TestBench)

    expect(wrapper.find('.kn-select-list__default-option').exists()).toBeFalsy()
  })

  it('Should support mutli-selects.', async () => {
    const TestBench = Vue.component('test-bench', {
      template: `
        <kn-select-list multiple>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c" disabled>C</option>
        </kn-select-list>`,
      components: { KnSelectList }
    })
    const wrapper = mount(TestBench)

    const selectControl = wrapper.find('.kn-select-list__control')
    if (!selectControl.exists()) {
      return fail('Could not find the select list element.')
    }
    const selectEle = selectControl.element as HTMLSelectElement

    expect(selectEle.multiple).toBeTruthy()
    expect(wrapper.find('.kn-select-list__default-option').exists()).toBeFalsy()
  })
})
