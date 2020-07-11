import { shallowMount } from '@vue/test-utils'
import KnSelectList from './SelectList.vue'

describe('The Select List Styled Component.', () => {
  it('Should encapsulate a set of option elements.', () => {
    const wrapper = shallowMount(KnSelectList, {
      slots: { default: ['<option value="a">A</option>', '<option value="b">B</option>'] }
    })

    expect(wrapper.findAll('option').length).toBe(2)
  })

  it.todo('Should select the first option in the list if the previously selected option is removed.')

  it.todo('Should provide a backup option if given none, and disable itself if that is the only option.')

  it.todo('Should support using <optgroup> elements.')

  it.todo('Should support mutli-selects.')
})

// it('Should generate a default option and disable itself if given no options.', async () => {
//   const wrapper = shallowMount(KnSelectList)
//   const vm = wrapper.vm as KnSelectList
//   await vm.$nextTick()

//   expect(wrapper.findAll('option').length).toBe(1)
//   expect(wrapper.find('.kn-input__control').attributes().disabled).toBeTruthy()
// })

// it('Should update itself when the model changes from the parent.', async () => {
//   const wrapper = shallowMount(KnSelectList, {
//     propsData: { value: 'b' },
//     slots: { default: ['<option value="a">A</option>', '<option value="b">B</option>'] }
//   })
//   const vm = wrapper.vm as KnSelectList
//   await vm.$nextTick()

//   const selectRaw = wrapper.find('.kn-input__control')
//   if (!selectRaw.exists()) {
//     return fail('Could not find the select element.')
//   }
//   const selectEle = selectRaw.element as HTMLSelectElement

//   expect(selectEle.value).toBe('b')

//   await wrapper.setProps({ value: 'a' })

//   expect(selectEle.value).toBe('a')
// })

// it('Should emit any changes made.', () => {
//   const wrapper = shallowMount(KnSelectList, {
//     propsData: { value: 'b' },
//     slots: { default: ['<option value="a">A</option>', '<option value="b">B</option>'] }
//   })

//   const selectWrapper = wrapper.find('.kn-input__control')
//   if (!selectWrapper.exists()) {
//     return fail('Could not find the select element.')
//   }

//   const optionAEle = selectWrapper.find('option[value=a]').element as HTMLOptionElement
//   optionAEle.selected = true
//   selectWrapper.trigger('change')

//   const emittedChanges = wrapper.emitted('change')
//   if (!emittedChanges) {
//     return fail('Emitted changes unexpectedly empty.')
//   }

//   expect(emittedChanges[0]).toEqual([])
// })

// it.only('Should update when option elements are added and removed.', async () => {
//   const TestBench = Vue.component('test-bench', {
//     template: `
//       <kn-select-list @change="changeSpy">
//         <option v-for="option in options" :key="option" :value="option">{{option}}</option>
//       </kn-select-list>`,
//     components: { KnSelectList },
//     props: {
//       options: []
//     },
//     data: () => (
//       changeSpy: jest.fn()
//     })
//   })
//   const wrapper = mount(TestBench)

//   const selectWrapper = wrapper.find('.kn-input__control')
//   if (!selectWrapper.exists()) {
//     return fail('Could not find the select element.')
//   }
//   const selectEle = selectWrapper.element as HTMLSelectElement

//   expect(wrapper.find('option[data-tid=default-option]').exists()).toBeTruthy()

//   await wrapper.setProps({ options: ['a', 'b'] })

//   await wrapper.vm.$nextTick()
//   expect(wrapper.find('option[value=a]').exists()).toBeTruthy()
//   expect(wrapper.find('option[value=b]').exists()).toBeTruthy()
//   expect(wrapper.find('option[value=default]').exists()).toBeFalsy()

//   // Selection state should be reset when the list changes
//   expect(selectEle.value).toBe('')

//   const optionAEle = selectWrapper.find('option[value=b]').element as HTMLOptionElement
//   optionAEle.selected = true
//   selectWrapper.trigger('change')
//   await wrapper.vm.$nextTick()

//   expect(selectEle.disabled).toBeFalsy()
//   expect(selectEle.value).toBe('b')

//   await wrapper.setProps({ options: ['a', 'b', 'c'] })
//   await wrapper.vm.$nextTick()

//   expect(selectEle.value).toBe('')

//   // Default, list updated, selected 'b', list updated
//   expect(wrapper.vm.$data.changeSpy).toBeCalledWith('', '', 'b', '')
// })

// it.todo('Should support option groups.')

// it.todo('Should support multi-select mode.')
