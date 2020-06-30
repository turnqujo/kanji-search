import { shallowMount } from '@vue/test-utils'
import KanjiPaginator from './paginator.vue'

describe('The Kanji Paginator component', () => {
  it('Should not be displayed if the given list length is zero.', () => {
    const wrapper = shallowMount(KanjiPaginator, {
      propsData: { state: { perPageLimit: 10, pageIndex: 0, listLength: 0 } }
    })

    expect(wrapper.find('.kn-kanji-paginator').exists()).toBeFalsy()
  })

  it('Should emit an event when the per page value has been changed.', () => {
    const wrapper = shallowMount(KanjiPaginator, {
      propsData: { state: { perPageLimit: 10, pageIndex: 0, listLength: 20 } }
    })
    const vm = wrapper.vm as any

    vm.perPage = '25'

    const emittedChanges = wrapper.emitted('onChange')
    if (!emittedChanges) {
      return fail('Emitted changes unexpectedly empty.')
    }

    const [newIndex, newPerPage] = emittedChanges[0]

    expect(newIndex).toEqual(0)
    expect(newPerPage).toEqual(25)
  })

  it('Should emit an event when the page index value has been changed.', () => {
    const wrapper = shallowMount(KanjiPaginator, {
      propsData: { state: { perPageLimit: 10, pageIndex: 0, listLength: 20 } }
    })
    const vm = wrapper.vm as any

    vm.pageIndex = 10

    const emittedChanges = wrapper.emitted('onChange')
    if (!emittedChanges) {
      return fail('Emitted changes unexpectedly empty.')
    }
    expect(emittedChanges).toEqual([[10, 10]])
  })

  it('Should emit a new index when the "next" button is pressed, unless there is no more pages left.', async () => {
    const wrapper = shallowMount(KanjiPaginator, {
      propsData: { state: { perPageLimit: 10, pageIndex: 0, listLength: 19 } }
    })

    const nextButton = wrapper.find('button[data-tid=next]')
    if (!nextButton.exists()) {
      return fail('Could not find the "next" button.')
    }
    await nextButton.trigger('click')

    const emittedChanges = wrapper.emitted('onChange')
    if (!emittedChanges) {
      return fail('Emitted changes unexpectedly empty.')
    }

    const [newIndex] = emittedChanges[0]
    expect(newIndex).toEqual(10)

    // Pass back the new index
    await wrapper.setProps({ state: { perPageLimit: 10, pageIndex: newIndex, listLength: 19 } })

    // Already showing the rest of the items - should do nothing
    await nextButton.trigger('click')

    // In fact, it should be disabled
    expect(nextButton.attributes().disabled).toEqual('disabled')

    // The component should have emitted only once by now
    expect(emittedChanges.length).toEqual(1)
  })

  it('Should emit the last possible index when the "last" button is pressed.', async () => {
    const wrapper = shallowMount(KanjiPaginator, {
      propsData: { state: { perPageLimit: 10, pageIndex: 0, listLength: 25 } }
    })

    const lastButton = wrapper.find('button[data-tid=last]')
    if (!lastButton.exists()) {
      return fail('Could not find the "last" button.')
    }
    await lastButton.trigger('click')

    const emittedChanges = wrapper.emitted('onChange')
    if (!emittedChanges) {
      return fail('Emitted changes unexpectedly empty.')
    }

    // Should emit the last possible index
    const [newIndex] = emittedChanges[0]
    expect(newIndex).toEqual(20)

    // Pass back the new index
    await wrapper.setProps({ state: { perPageLimit: 10, pageIndex: newIndex, listLength: 25 } })

    // Already showing the rest of the items - should do nothing
    await lastButton.trigger('click')

    // The last button should now be disabled
    expect(lastButton.attributes().disabled).toEqual('disabled')

    // The component should have emitted only once by now
    expect(emittedChanges.length).toEqual(1)

    // Should also work when the length is evenly divisible by the per page limit
    await wrapper.setProps({ state: { perPageLimit: 10, pageIndex: 0, listLength: 30 } })

    expect(lastButton.attributes().disabled).toBeUndefined()

    await lastButton.trigger('click')

    // Should emit the last possible index
    const [evenLastIndex] = emittedChanges[0]
    expect(evenLastIndex).toEqual(20)

    // Pass back the new index
    await wrapper.setProps({ state: { perPageLimit: 10, pageIndex: evenLastIndex, listLength: 30 } })

    expect(lastButton.attributes().disabled).toEqual('disabled')

    expect(emittedChanges[1]).toEqual([20, 10])
  })

  it('Should emit a previous index when the "previous" button is pressed, if not already at the start.', async () => {
    const wrapper = shallowMount(KanjiPaginator, {
      propsData: { state: { perPageLimit: 10, pageIndex: 10, listLength: 25 } }
    })

    const previousButton = wrapper.find('button[data-tid=previous]')
    if (!previousButton.exists()) {
      return fail('Could not find the "previous" button.')
    }
    await previousButton.trigger('click')

    const emittedChanges = wrapper.emitted('onChange')
    if (!emittedChanges) {
      return fail('Emitted changes unexpectedly empty.')
    }

    // Should emit the previous index
    const [newIndex] = emittedChanges[0]
    expect(newIndex).toEqual(0)

    // Pass back the new index
    await wrapper.setProps({ state: { perPageLimit: 10, pageIndex: newIndex, listLength: 25 } })

    // Cannot go back any further - should do nothing
    await previousButton.trigger('click')

    // The previous button should now be disabled
    expect(previousButton.attributes().disabled).toEqual('disabled')

    // The component should have emitted only once by now
    expect(emittedChanges.length).toEqual(1)
  })

  it('Should emit the first possible index when the "first" button is pressed, if not already at the start.', async () => {
    const wrapper = shallowMount(KanjiPaginator, {
      propsData: { state: { perPageLimit: 10, pageIndex: 20, listLength: 25 } }
    })

    const firstButton = wrapper.find('button[data-tid=first]')
    if (!firstButton.exists()) {
      return fail('Could not find the "first" button.')
    }
    await firstButton.trigger('click')

    const emittedChanges = wrapper.emitted('onChange')
    if (!emittedChanges) {
      return fail('Emitted changes unexpectedly empty.')
    }

    // Should emit the previous index
    const [newIndex] = emittedChanges[0]
    expect(newIndex).toEqual(0)

    // Pass back the new index
    await wrapper.setProps({ state: { perPageLimit: 10, pageIndex: newIndex, listLength: 25 } })

    // Cannot go back any further - should do nothing
    await firstButton.trigger('click')

    // The previous button should now be disabled
    expect(firstButton.attributes().disabled).toEqual('disabled')

    // The component should have emitted only once by now
    expect(emittedChanges.length).toEqual(1)
  })

  it('Should display a message containing the current pagination status.', async () => {
    const wrapper = shallowMount(KanjiPaginator, {
      propsData: { state: { perPageLimit: 10, pageIndex: 0, listLength: 25 } }
    })

    const statusMessage = wrapper.find('.kn-kanji-paginator__state')
    if (!statusMessage.exists()) {
      return fail('Could not find the status message.')
    }

    expect(statusMessage.text()).toBe('(0 - 10) of 25')

    // End of list - should limit the "to" part to the length of the list
    await wrapper.setProps({ state: { perPageLimit: 10, pageIndex: 20, listLength: 25 } })
    expect(statusMessage.text()).toBe('(20 - 25) of 25')

    // Changing the per page limit should adjust the status accordingly
    await wrapper.setProps({ state: { perPageLimit: 100, pageIndex: 0, listLength: 25 } })
    expect(statusMessage.text()).toBe('(0 - 25) of 25')
  })
})
