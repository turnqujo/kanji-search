import KnExample from "./example"
import polyfillCustomElements from 'custom-elements-module'

describe('The Example component', () => {
  beforeAll(() => {
    polyfillCustomElements(window)
    console.log(KnExample)
    customElements.define('kn-example', KnExample)
  })

  it('Should exist', () => {
    const ele = document.createElement('kn-example')
    console.log(ele)
    document.body.appendChild(ele)
    const test: HTMLElement | null = document.querySelector('kn-example')
    expect(test?.id).toBeTruthy()
  })
})
