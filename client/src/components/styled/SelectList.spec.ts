import { shallowMount, mount } from '@vue/test-utils'
import KnSelectList from './SelectList.vue'
import Vue from 'vue'

describe('The Select List Styled Component.', () => {
  it('Should encapsulate a set of option elements.', () => {
    const wrapper = shallowMount(KnSelectList, {
      slots: { default: ['<option value="a">A</option>', '<option value="b">B</option>'] }
    })

    expect(wrapper.findAll('option').length).toBe(2)
  })

  it('Should generate a default option and disable itself if given no options.', async () => {
    const wrapper = shallowMount(KnSelectList)
    const vm = wrapper.vm as KnSelectList
    await vm.$nextTick()

    expect(wrapper.findAll('option').length).toBe(1)
    expect(wrapper.find('.kn-input__control').attributes().disabled).toBeTruthy()
  })

  it('Should update itself when the model changes from the parent.', async () => {
    const wrapper = shallowMount(KnSelectList, {
      propsData: { value: 'b' },
      slots: { default: ['<option value="a">A</option>', '<option value="b">B</option>'] }
    })
    const vm = wrapper.vm as KnSelectList
    await vm.$nextTick()

    const selectRaw = wrapper.find('.kn-input__control')
    if (!selectRaw.exists()) {
      return fail('Could not find the select element.')
    }
    const selectEle = selectRaw.element as HTMLSelectElement

    expect(selectEle.value).toBe('b')

    await wrapper.setProps({ value: 'a' })

    expect(selectEle.value).toBe('a')
  })

  it('Should emit any changes made.', () => {
    const wrapper = shallowMount(KnSelectList, {
      propsData: { value: 'b' },
      slots: { default: ['<option value="a">A</option>', '<option value="b">B</option>'] }
    })

    const selectWrapper = wrapper.find('.kn-input__control')
    if (!selectWrapper.exists()) {
      return fail('Could not find the select element.')
    }

    const optionAEle = selectWrapper.find('option[value=a]').element as HTMLOptionElement
    optionAEle.selected = true
    selectWrapper.trigger('change')

    const emittedChanges = wrapper.emitted('change')
    if (!emittedChanges) {
      return fail('Emitted changes unexpectedly empty.')
    }

    expect(emittedChanges[0][0]).toBe('a')
  })

  it('Should update when option elements are added at a later time.', async () => {
    const TestBench = Vue.component('test-bench', {
      template: `
      <kn-select-list>
        <option v-for="option in options" :key="option" :value="option">{{option}}</option>
      </kn-select-list>`,
      components: { KnSelectList },
      props: {
        options: []
      }
    })
    const wrapper = mount(TestBench)
    const vm = wrapper.vm as KnSelectList
    await vm.$nextTick()

    expect(wrapper.find('option[value=default]').exists()).toBeTruthy()

    const selectWrapper = wrapper.find('.kn-input__control')
    if (!selectWrapper.exists()) {
      return fail('Could not find the select element.')
    }

    await wrapper.setProps({ options: ['a', 'b'] })

    expect(wrapper.find('option[value=a]').exists()).toBeTruthy()
    expect(wrapper.find('option[value=b]').exists()).toBeTruthy()
    expect(wrapper.find('option[value=default]').exists()).toBeFalsy()
  })

  // TODO: Make it disabled, remove it from the slot, other possibilities?
  it.todo('Should change the selected option to the first valid option when the selection is no longer valid.')

  it.todo('Should not change the selected option if an attribute is changed on a child option and it remains valid.')

  it.todo('Should support option groups.')

  // TODO: Should only allow option or optgroup elements
  it.todo('Should disregard any forbidden content of Select elements placed inside slot.')

  it.todo('Should support multi-select mode.')
})
