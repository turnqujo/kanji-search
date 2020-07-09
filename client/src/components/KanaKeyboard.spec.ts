import { shallowMount } from '@vue/test-utils'
import KanaKeyboard from './KanaKeyboard.vue'
import * as dependencies from '../data/gojuon-ordered-kana'

import gojuonHandakuten from '../../public/data/gojuonHandakuten.json'
import gojuonOrderedKana from '../../public/data/gojuonOrderedKana.json'
import gojuonDakuten from '../../public/data/gojuonDakuten.json'
import chiisaiKana from '../../public/data/chiisaiKana.json'

describe('The Kana Keyboard component.', () => {
  beforeAll(() => {
    // KLUDGE: Yeah, this is mutating all of these imports. Too bad!
    // @ts-ignore
    dependencies.fetchGojuonHandakuten = jest.fn(async () => gojuonHandakuten)
    // @ts-ignore
    dependencies.fetchGojuonOrderedKana = jest.fn(async () => gojuonOrderedKana)
    // @ts-ignore
    dependencies.fetchGojuonDakuten = jest.fn(async () => gojuonDakuten)
    // @ts-ignore
    dependencies.fetchChiisaiKana = jest.fn(async () => chiisaiKana)
  })

  it('Should open when clicked.', async () => {
    const wrapper = shallowMount(KanaKeyboard)
    const vm = wrapper.vm as any

    expect(vm.open).toBeFalsy()
    expect(wrapper.find('.popup').exists()).toBeFalsy()

    const keyboardToggle = wrapper.find('button[data-tid=toggle-keyboard]')
    if (!keyboardToggle.exists()) {
      return fail('Could not find keyboard toggle.')
    }
    await keyboardToggle.trigger('click')

    expect(vm.open).toBeTruthy()
    expect(wrapper.find('.popup').exists()).toBeTruthy()
  })

  it('Should emit the clicked kana.', async () => {
    const wrapper = shallowMount(KanaKeyboard)
    const vm = wrapper.vm as any

    // Wait for the kanji sets to load
    await vm.$nextTick()

    const keyboardToggle = wrapper.find('button[data-tid=toggle-keyboard]')
    if (!keyboardToggle.exists()) {
      return fail('Could not find keyboard toggle.')
    }
    await keyboardToggle.trigger('click')

    const kanaTableWrapper = wrapper.find('.kana-table')
    expect(kanaTableWrapper.exists()).toBeTruthy()

    const shiKana = kanaTableWrapper.find('button[data-tid=kana-し]')
    if (!shiKana.exists()) {
      return fail('Could not find the shi kana button.')
    }
    await shiKana.trigger('click')

    const submittedValues = wrapper.emitted('kana-picked')
    if (!submittedValues) {
      return fail('Submitted values unexpectedly empty.')
    }

    const expectedSubmit = {
      katakana: 'シ',
      hiragana: 'し',
      romaji: 'shi',
      original: 'hiragana'
    }
    expect(submittedValues[0][0]).toEqual(expectedSubmit)
  })
})
