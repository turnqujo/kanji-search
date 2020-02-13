abstract class BaseComponent extends HTMLElement {
  abstract readonly tag: string

  protected shadow: ShadowRoot
  protected wrapperElement: HTMLDivElement
  protected styleContext: HTMLStyleElement

  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    this.wrapperElement = document.createElement('div')

    this.styleContext = document.createElement('style')
    this.styleContext.type = 'text/css'
  }
}


class Example extends BaseComponent {
  readonly tag = 'kn-example'

}
