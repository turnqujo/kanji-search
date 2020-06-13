import { shallowMount } from "@vue/test-utils"
import DarkSwitch from './DarkSwitch.vue'

describe('The Dark Switch component.', () => {
  // @ts-ignore
  const localStorageSetting = () => localStorage.getItem(DarkSwitch.storageKey)

  afterEach(() => {
    const root = document.querySelector(':root')
    if (root === null) {
      return
    }

    root.removeAttribute('dark')
    // @ts-ignore
    localStorage.removeItem(DarkSwitch.storageKey)
  })

  it('Should toggle dark and light modes by attaching an attribute onto the root element.', () => {
    const root = document.querySelector(':root')
    if (root === null) {
      return fail('Could not find root element.')
    }
    expect(root.hasAttribute('dark')).toBeFalsy()

    const wrapper = shallowMount(DarkSwitch)
    const vm: any = wrapper.vm

    // Defaults to 'light' (no attribute)
    expect(root.hasAttribute('dark')).toBeFalsy()

    vm.appearance = 'dark'
    expect(root.hasAttribute('dark')).toBeTruthy()

    vm.appearance = 'light'
    expect(root.hasAttribute('dark')).toBeFalsy()
  })

  it('Should store the user\'s preference in local storage.', () => {
    expect(localStorageSetting()).toBeNull()

    const wrapper = shallowMount(DarkSwitch)
    const vm: any = wrapper.vm

    // Defaults to 'light'
    expect(localStorageSetting()).toBe('light')

    vm.appearance = 'dark'
    expect(localStorageSetting()).toBe('dark')

    vm.appearance = 'light'
    expect(localStorageSetting()).toBe('light')
  })
})
