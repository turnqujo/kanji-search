import { shallowMount } from '@vue/test-utils'
import KanjiTable from './kanjiTable.vue'

describe('The Kanji Table component.', () => {
  it('Should adjust the colspan of the empty set message according to the given filters.', async () => {
    const wrapper = shallowMount(KanjiTable, {
      propsData: { kanjiSet: [], filters: ['frequency', 'grade', 'meanings'] }
    })

    const emptySetCell = wrapper.find('.kn-kanji-table__cell--empty')
    if (!emptySetCell.exists()) {
      return fail('Could not find empty set cell.')
    }

    // Ensure it sets the correct initial value
    expect(emptySetCell.attributes().colspan).toBe('3')

    await wrapper.setProps({
      filters: ['frequency', 'grade']
    })

    // Ensure the component reacts to changes
    expect(emptySetCell.attributes().colspan).toBe('2')
  })

  it('Should adjust kanji with multiple stroke counts so they display as a list.', async () => {
    const wrapper = shallowMount(KanjiTable, {
      propsData: {
        kanjiSet: [
          {
            char: '亜',
            stroke: ['1', '2', '3'],
            meanings: ['fake kanji'],
            readings: { on: ['ア'], kun: ['つ.ぐ'], nanori: [] },
            frequency: 1,
            jlpt: '1',
            grade: '8',
            set: ['kyouiku']
          }
        ],
        filters: ['stroke']
      }
    })

    const strokeCell = wrapper.find('.kn-kanji-table__cell--stroke')
    if (!strokeCell.exists()) {
      return fail('Could not find stroke count cell.')
    }

    expect(strokeCell.text()).toBe('1, 2, 3')
  })

  it('Should adjust readings so that they display as a list, as well as clip down to the first three.', async () => {
    const wrapper = shallowMount(KanjiTable, {
      propsData: {
        kanjiSet: [
          {
            char: '亜',
            stroke: ['1'],
            meanings: ['fake kanji'],
            readings: { on: ['a', 'b', 'c', '1'], kun: ['d', 'e', 'f', '2'], nanori: ['g', 'h', 'i', '3'] },
            frequency: 1,
            jlpt: '1',
            grade: '8',
            set: ['kyouiku']
          }
        ],
        filters: ['on', 'kun', 'nanori']
      }
    })

    const onReadingCell = wrapper.find('.kn-kanji-table__cell--on')
    if (!onReadingCell.exists()) {
      return fail('Could not find on reading cell.')
    }
    expect(onReadingCell.text()).toBe('a, b, c')

    const kunReadingCell = wrapper.find('.kn-kanji-table__cell--kun')
    if (!kunReadingCell.exists()) {
      return fail('Could not find kun reading cell.')
    }
    expect(kunReadingCell.text()).toBe('d, e, f')

    const nanoriReadingCell = wrapper.find('.kn-kanji-table__cell--nanori')
    if (!nanoriReadingCell.exists()) {
      return fail('Could not find nanori reading cell.')
    }
    expect(nanoriReadingCell.text()).toBe('g, h, i')
  })

  it('Should adjust kanji meanings so they display as a list.', async () => {
    const wrapper = shallowMount(KanjiTable, {
      propsData: {
        kanjiSet: [
          {
            char: '亜',
            stroke: ['1'],
            meanings: ['fake kanji', 'no really, this means nothing', 'yup'],
            readings: { on: ['ア'], kun: ['つ.ぐ'], nanori: [] },
            frequency: 1,
            jlpt: '1',
            grade: '8',
            set: ['kyouiku']
          }
        ],
        filters: ['meanings']
      }
    })

    const meaningCell = wrapper.find('.kn-kanji-table__cell--meanings')
    if (!meaningCell.exists()) {
      return fail('Could not find meanings cell.')
    }

    expect(meaningCell.text()).toBe('fake kanji, no really, this means nothing, yup')
  })

  it('Should display all of the given kanji.', async () => {
    const wrapper = shallowMount(KanjiTable, {
      propsData: {
        kanjiSet: [
          {
            char: 'KANJI A',
            stroke: ['1'],
            meanings: ['fake kanji'],
            readings: { on: ['ア'], kun: ['つ.ぐ'], nanori: [] },
            frequency: 1,
            jlpt: '1',
            grade: '8',
            set: ['kyouiku']
          },
          {
            char: 'KANJI B',
            stroke: ['1'],
            meanings: ['fake kanji'],
            readings: { on: ['ア'], kun: ['つ.ぐ'], nanori: [] },
            frequency: 1,
            jlpt: '1',
            grade: '8',
            set: ['kyouiku']
          }
        ],
        filters: []
      }
    })

    expect(wrapper.find('tr[data-tid="KANJI A"]').exists()).toBeTruthy()
    expect(wrapper.find('tr[data-tid="KANJI B"]').exists()).toBeTruthy()
  })
})
