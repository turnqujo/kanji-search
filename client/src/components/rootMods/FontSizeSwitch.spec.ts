import { shallowMount } from '@vue/test-utils'
import FontSizeSwitch from './FontSizeSwitch.vue'

describe('The Font Size Switch component.', () => {
  // @ts-ignore
  const localStorageSetting = () => localStorage.getItem(FontSizeSwitch.storageKey)

  const attributeName = 'font-size'

  afterEach(() => {
    const root = document.querySelector(':root')
    if (root === null) {
      return
    }

    root.removeAttribute(attributeName)
    // @ts-ignore
    localStorage.removeItem(FontSizeSwitch.storageKey)
  })

  it('Should toggle font-size settings by attaching an attribute onto the root element.', () => {
    const root = document.querySelector(':root')
    if (root === null) {
      return fail('Could not find root element.')
    }
    expect(root.hasAttribute(attributeName)).toBeFalsy()

    const wrapper = shallowMount(FontSizeSwitch)
    const vm: any = wrapper.vm

    // Defaults to 'medium'
    expect(root.getAttribute(attributeName)).toBe('medium')

    vm.fontSize = 'large'
    expect(root.getAttribute(attributeName)).toBe('large')

    vm.fontSize = 'xsmall'
    expect(root.getAttribute(attributeName)).toBe('xsmall')
  })

  it("Should store the user's preference in local storage.", () => {
    expect(localStorageSetting()).toBeNull()

    const wrapper = shallowMount(FontSizeSwitch)
    const vm: any = wrapper.vm

    // Defaults to 'medium'
    expect(localStorageSetting()).toBe('medium')

    vm.fontSize = 'xlarge'
    expect(localStorageSetting()).toBe('xlarge')

    vm.fontSize = 'small'
    expect(localStorageSetting()).toBe('small')
  })
})
