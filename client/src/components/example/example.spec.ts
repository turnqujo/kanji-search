import KnExample from "./example"
// https://github.com/WebReflection/document-register-element

describe('The Example component', () => {
  it('Should exist', () => {
    customElements.define('kn-example', KnExample)
    const something = new KnExample()
    console.log(something)
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<kn-example></kn-example>`
    console.log(wrapper.innerHTML)

    const foundEle = wrapper.querySelector('kn-example > h1') as HTMLElement
    console.log(foundEle?.innerText)
    
    expect(foundEle).toBeTruthy()
  })
})
