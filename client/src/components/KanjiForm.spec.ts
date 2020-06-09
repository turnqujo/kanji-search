import { shallowMount } from '@vue/test-utils'
import KanjiForm from './kanjiForm.vue'

describe('The Kanji Form component.', () => {
  it('Should exist.', () => {
    const wrapped = shallowMount(KanjiForm)
    expect(wrapped).toBeTruthy()
  })
})
