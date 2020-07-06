import { shallowMount } from '@vue/test-utils'
import * as convertTextDependency from '../workers'
import conversionTable from '../../public/data/conversionTable.json'
import kanaKeyboard from './KanaKeyboard.vue'
import KanjiForm from './KanjiForm.vue'

describe('The Kanji Form component.', () => {
  it('Should display an error if the reading input is not valid.', async () => {
    // @ts-ignore TODO: Yep, this is mutating the import. Too bad!
    convertTextDependency.convertText = jest.fn(async () => {
      throw new Error('Test Error')
    })

    const wrapper = shallowMount(KanjiForm, {
      propsData: { debounceTime: 0, conversionTable }
    })
    await wrapper.setData({ reading: 'lol not kana!' })

    const readingInput = wrapper.find('input[data-tid=reading-input]')
    if (!readingInput.exists()) {
      return fail('Could not find reading input.')
    }

    // TODO: Couldn't figure out how to wait for the method to finish
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect((wrapper.vm as any).readingError).toBe('Test Error')
  })

  it('Should accept picked kana from a child keyboard component.', async () => {
    const wrapper = shallowMount(KanjiForm, {
      propsData: { debounceTime: 0, conversionTable }
    })

    const keyboardEle = wrapper.findComponent(kanaKeyboard)
    if (!keyboardEle.exists()) {
      return fail('Could not find Kana Keyboard.')
    }

    const pickedKana = { hiragana: 'a', katakana: 'b', romaji: 'c', original: 'katakana' }
    keyboardEle.vm.$emit('kana-picked', pickedKana)

    expect((wrapper.vm as any).reading).toBe('b')
  })

  it('Should clear the form back to its original values when asked.', async () => {
    const wrapper = shallowMount(KanjiForm, {
      propsData: { debounceTime: 0, conversionTable }
    })
    const vm = wrapper.vm as any
    const expectedSubmit = {
      kanjiSet: vm.kanjiSet,
      meaning: vm.meaning,
      meaningMatchOption: vm.meaningMatchOption,
      primarySort: {
        direction: vm.primarySortDirection,
        field: vm.primarySortField
      },
      readingConverted: vm.readingConverted,
      readingMatchOption: vm.readingMatchOption,
      readingType: vm.readingType,
      secondarySort: {
        direction: vm.secondarySortDirection,
        field: vm.secondarySortField === 'none' ? null : vm.secondarySortField
      }
    }

    wrapper.setData({
      kanjiSet: ['jinmeiyou', 'hyougai'],
      meaning: 'Some Garbage',
      meaningMatchOption: 'exact',
      primarySortDirection: 'desc',
      primarySortField: 'grade',
      readingConverted: [{ katakana: 'a', hiragana: 'E', romaji: 'd' }],
      readingMatchOption: 'anywhere',
      readingType: ['on', 'kun'],
      secondarySortDirection: 'desc',
      secondarySortField: 'frequency'
    })

    const clearButton = wrapper.find('button[data-tid=clear-button]')
    if (!clearButton.exists()) {
      return fail('Could not find clear button.')
    }
    clearButton.trigger('click')

    const submitButton = wrapper.find('button[type=submit]')
    if (!submitButton.exists()) {
      return fail('Could not find submit button.')
    }
    await submitButton.trigger('submit')

    // TODO: Couldn't figure out how to wait for the method to finish
    await new Promise((resolve) => setTimeout(resolve, 0))

    const submittedValues = wrapper.emitted('submit')
    if (!submittedValues) {
      return fail('Submitted values unexpectedly empty.')
    }

    expect(submittedValues[0][0]).toEqual(expectedSubmit)
  })

  it('Should disable invalid options in the primary / secondary sort selects.', async () => {
    const wrapper = shallowMount(KanjiForm, {
      propsData: { debounceTime: 0, conversionTable }
    })

    const primarySortSelect = wrapper.find('select[data-tid=primary-sort]')
    if (!primarySortSelect.exists()) {
      return fail('Could not find the primary sort element.')
    }

    const secondarySortSelect = wrapper.find('select[data-tid=secondary-sort]')
    if (!secondarySortSelect.exists()) {
      return fail('Could not find the secondary sort element.')
    }

    // Default: secondary sort disabled, primary and secondary have different values
    expect(secondarySortSelect.attributes().disabled).toBeTruthy()

    // Setting primary to an ambiguous sorting value should enable the secondary sort
    await primarySortSelect.setValue('jlpt')
    expect(secondarySortSelect.attributes().disabled).toBeUndefined()
    expect(secondarySortSelect.find('option[value=jlpt]').attributes().disabled).toBeTruthy()

    // Setting secondary sort should disable the same option in the primary sort
    await secondarySortSelect.setValue('grade')
    expect(primarySortSelect.find('option[value=grade]').attributes().disabled).toBeTruthy()
    expect(secondarySortSelect.find('option[value=jlpt]').attributes().disabled).toBeTruthy()
  })
})
