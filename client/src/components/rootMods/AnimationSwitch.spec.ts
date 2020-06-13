import { shallowMount } from "@vue/test-utils"
import AnimationSwitch from './AnimationSwitch.vue'

describe('The Animation Switch component.', () => {
  // @ts-ignore
  const localStorageSetting = () => localStorage.getItem(AnimationSwitch.storageKey)

  afterEach(() => {
    const root = document.querySelector(':root')
    if (root === null) {
      return
    }

    root.classList.remove('transitions-disabled')
    // @ts-ignore
    localStorage.removeItem(AnimationSwitch.storageKey)
  })

  it('Should enable or disable animations by attaching a class onto the root element.', () => {
    expect(localStorageSetting()).toBeNull()

    const wrapper = shallowMount(AnimationSwitch)
    const vm: any = wrapper.vm

    const root = document.querySelector(':root')
    if (root === null) {
      return fail('Could not find root element.')
    }

    // Defaults to 'enabled'
    expect(root.classList.contains('transitions-disabled')).toBeFalsy()

    vm.animationEnabled = 'disabled'
    expect(root.classList.contains('transitions-disabled')).toBeTruthy()

    vm.animationEnabled = 'enabled'
    expect(root.classList.contains('transitions-disabled')).toBeFalsy()
  })

  it('Should store the user\'s preference in local storage.', () => {
    expect(localStorageSetting()).toBeNull()

    const wrapper = shallowMount(AnimationSwitch)
    const vm: any = wrapper.vm

    // Defaults to 'enabled'
    expect(localStorageSetting()).toBe('enabled')

    vm.animationEnabled = 'disabled'
    expect(localStorageSetting()).toBe('disabled')

    vm.animationEnabled = 'enabled'
    expect(localStorageSetting()).toBe('enabled')
  })
})
