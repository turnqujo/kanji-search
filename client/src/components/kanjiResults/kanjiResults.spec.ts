import { shallowMount } from '@vue/test-utils'
import KanjiResults from './kanjiResults.vue'

// TODO: KLUDGE: How to emulate an event from a child component?
describe('The Kanji Results component.', () => {
  it('Should set paginator and filter state as expected', () => {
    const wrapper = shallowMount(KanjiResults, {
      propsData: { kanjiSet: ['Totally kanji', 'Yup, I am kanji'] }
    })
    const vm = wrapper.vm as any

    expect(vm.paginatorState).toEqual({ perPageLimit: 10, pageIndex: 0, listLength: 2 })
    expect(vm.filterState.length).toBeGreaterThan(0)
  })

  it('Should react to filter update events.', () => {
    const wrapper = shallowMount(KanjiResults, {
      propsData: { kanjiSet: ['Totally kanji', 'Yup, I am kanji'] }
    })
    const vm = wrapper.vm as any

    const expectedState = ['frequency', 'grade']

    expect(vm.filterState).not.toEqual(expectedState)

    vm.onFiltersChanged(expectedState)

    expect(vm.filterState).toEqual(expectedState)
  })

  it('Should react to paginator update events.', () => {
    const wrapper = shallowMount(KanjiResults, {
      propsData: { kanjiSet: ['Totally kanji', 'Yup, I am kanji'] }
    })
    const vm = wrapper.vm as any

    const expectedState = {
      perPageLimit: 10,
      pageIndex: 10,
      listLength: 2
    }

    expect(vm.paginatorState).not.toEqual(expectedState)

    vm.onPaginatorChanged(10, 10)

    expect(vm.paginatorState).toEqual(expectedState)
  })

  it('Should reset the paginator state if the kanji set changes.', async () => {
    const wrapper = shallowMount(KanjiResults, {
      propsData: { kanjiSet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'] }
    })
    const vm = wrapper.vm as any

    vm.onPaginatorChanged(10, 10)

    expect(vm.paginatorState).toEqual({ perPageLimit: 10, pageIndex: 10, listLength: 11 })

    await wrapper.setProps({ kanjiSet: ['Different', 'hehe', 'fake kanji'] })

    expect(vm.paginatorState).toEqual({ perPageLimit: 10, pageIndex: 0, listLength: 3 })
  })

  it('Should provide a clipped-down version of the kanji set according to the paginator state.', async () => {
    const wrapper = shallowMount(KanjiResults, {
      propsData: { kanjiSet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'] }
    })
    const vm = wrapper.vm as any

    // According to default values
    expect(vm.limitedKanjiSet).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

    // Next page
    vm.onPaginatorChanged(10, 10)
    expect(vm.limitedKanjiSet).toEqual(['K'])

    // Per page changed, but index didn't - should reset index back to 0
    vm.onPaginatorChanged(10, 25)
    expect(vm.limitedKanjiSet).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'])
    expect(vm.paginatorState.pageIndex).toEqual(0)
  })
})
