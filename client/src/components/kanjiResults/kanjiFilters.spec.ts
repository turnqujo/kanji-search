import { shallowMount } from '@vue/test-utils'
import KanjiFilters from './kanjiFilters.vue'

describe('The Kanji Filters component', () => {
  it('Should open when clicked.', async () => {
    const wrapper = shallowMount(KanjiFilters)
    const vm = wrapper.vm as any

    expect(vm.open).toBeFalsy()
    expect(wrapper.find('.kn-kanji-filters__popup').exists()).toBeFalsy()

    const filterToggle = wrapper.find('.kn-kanji-filters__popup-toggle')
    if (!filterToggle.exists()) {
      return fail('Could not find filter toggle.')
    }
    await filterToggle.trigger('click')

    expect(vm.open).toBeTruthy()
    expect(wrapper.find('.kn-kanji-filters__popup').exists()).toBeTruthy()
  })

  it('Should default the filter options to the state given.', async () => {
    const wrapper = shallowMount(KanjiFilters, { propsData: { state: ['frequency', 'meanings'] } })

    const filterToggle = wrapper.find('.kn-kanji-filters__popup-toggle')
    if (!filterToggle.exists()) {
      return fail('Could not find filter toggle.')
    }
    await filterToggle.trigger('click')

    expect(wrapper.find('input[value=frequency]:checked').exists()).toBeTruthy()
    expect(wrapper.find('input[value=grade]:checked').exists()).toBeFalsy()
    expect(wrapper.find('input[value=jlpt]:checked').exists()).toBeFalsy()
    expect(wrapper.find('input[value=stroke]:checked').exists()).toBeFalsy()
    expect(wrapper.find('input[value=on]:checked').exists()).toBeFalsy()
    expect(wrapper.find('input[value=kun]:checked').exists()).toBeFalsy()
    expect(wrapper.find('input[value=nanori]:checked').exists()).toBeFalsy()
    expect(wrapper.find('input[value=meanings]:checked').exists()).toBeTruthy()
  })

  it('Should emit changes made to selections.', async () => {
    const wrapper = shallowMount(KanjiFilters)

    const filterToggle = wrapper.find('.kn-kanji-filters__popup-toggle')
    if (!filterToggle.exists()) {
      return fail('Could not find filter toggle.')
    }
    await filterToggle.trigger('click')

    wrapper.find('input[value=frequency]').trigger('click')

    const emittedChanges = wrapper.emitted('onOptionsChanged')
    if (!emittedChanges) {
      return fail('Emitted changes unexpectedly empty.')
    }

    expect(emittedChanges[0][0]).toEqual(['grade', 'jlpt', 'stroke', 'on', 'kun', 'meanings'])
  })
})
