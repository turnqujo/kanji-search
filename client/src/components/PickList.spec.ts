import PickList from './PickList.vue'
import { shallowMount } from '@vue/test-utils'

describe('The Pick List component.', () => {
  const fakeKanjiSet = [
    { char: 'a' },
    { char: 'b' },
    { char: 'c' },
    { char: 'd' },
    { char: 'e' },
    { char: 'f' },
    { char: 'g' },
    { char: 'h' },
    { char: 'i' },
    { char: 'j' }, // 10
    { char: 'k' },
    { char: 'l' },
    { char: 'm' },
    { char: 'n' },
    { char: 'o' },
    { char: 'p' },
    { char: 'q' },
    { char: 'r' },
    { char: 's' }
  ]

  it('Should show only a subset of kanji by default if given a large list.', async () => {
    const wrapper = shallowMount(PickList, { propsData: { kanjiSet: [] } })

    // Having to set here to trigger the @Watch
    await wrapper.setProps({
      kanjiSet: fakeKanjiSet
    })

    expect(wrapper.findAll('.kanji-card').length).toBe(10)
  })

  it('Should hide or show kanji based off of which "per page" setting is selected.', async () => {
    const wrapper = shallowMount(PickList, { propsData: { kanjiSet: [] } })

    // Having to set here to trigger the @Watch
    await wrapper.setProps({
      kanjiSet: fakeKanjiSet
    })

    expect(wrapper.findAll('.kanji-card').length).toBe(10)

    await wrapper.setData({ perPage: 50 })

    expect(wrapper.findAll('.kanji-card').length).toBe(fakeKanjiSet.length)

    await wrapper.setData({ perPage: 10 })

    expect(wrapper.findAll('.kanji-card').length).toBe(10)
  })

  it('Should show the next page of kanji when asked, if more kanji are available.', async () => {
    const wrapper = shallowMount(PickList, { propsData: { kanjiSet: [] } })
    const vm: any = wrapper.vm

    // Having to set here to trigger the @Watch
    await wrapper.setProps({
      kanjiSet: fakeKanjiSet
    })

    expect(vm.pageIndex).toBe(0)

    const nextButton = wrapper.find('button[data-tid=next]')
    if (!nextButton.exists()) {
      return fail('Could not find the previous page button.')
    }

    await nextButton.trigger('click')
    expect(vm.pageIndex).toBe(10)

    // Should not go more, since there are only 19 kanji
    await nextButton.trigger('click')
    expect(vm.pageIndex).toBe(10)
  })

  it('Should show the previous page of kanji when asked, if more kanji are available.', async () => {
    const wrapper = shallowMount(PickList, { propsData: { kanjiSet: [] } })
    const vm: any = wrapper.vm

    // Having to set here to trigger the @Watch
    await wrapper.setProps({
      kanjiSet: fakeKanjiSet
    })

    expect(vm.pageIndex).toBe(0)

    const nextButton = wrapper.find('button[data-tid=next]')
    if (!nextButton.exists()) {
      return fail('Could not find the previous page button.')
    }

    await nextButton.trigger('click')
    expect(vm.pageIndex).toBe(10)

    const previousButton = wrapper.find('button[data-tid=previous]')
    if (!previousButton.exists()) {
      return fail('Could not find the previous page button.')
    }

    await previousButton.trigger('click')
    expect(vm.pageIndex).toBe(0)

    // Shouldn't go negative
    await previousButton.trigger('click')
    expect(vm.pageIndex).toBe(0)
  })
})
