/**
 * See here: https://github.com/Kamiapp-fr/kami-component
 */

interface Props {
  tag: string
  externalStylePaths?: string[]
  internalStyle?: string
  template?: string
}

abstract class Component extends HTMLElement {
  protected shadow: ShadowRoot | null = null

  constructor({ tag, externalStylePaths, internalStyle, template }: Props) {
    super()

    if (!tag) {
      throw new Error('Component: Tag required.')
    }

    this.shadow = this.attachShadow({ mode: 'open' })

    const resetCSS = document.createElement('link')
    resetCSS.setAttribute('rel', 'stylesheet')
    resetCSS.setAttribute('href', 'vendor/reset.css')
    this.shadow.appendChild(resetCSS)

    if (externalStylePaths) {
      for (const stylePath of externalStylePaths) {
        const css = document.createElement('link')
        css.setAttribute('rel', 'stylesheet')
        css.setAttribute('href', stylePath)
        this.shadow.appendChild(css)
      }
    }

    if (internalStyle) {
      const css = document.createElement('style')
      css.innerText = internalStyle.replace(/\r?\n|\r/g, '')
      this.shadow.appendChild(css)
    }

    const templateId = `${tag}-template`
    if (template) {
      let foundTemplate = document.getElementById(templateId) as HTMLTemplateElement | null
      if (!foundTemplate) {
        foundTemplate = document.createElement('template')
        foundTemplate.innerHTML = template
        foundTemplate.setAttribute('id', templateId)
        document.body.appendChild(foundTemplate)
      }

      this.shadow.appendChild(foundTemplate.content.cloneNode(true))
    }
  }
}

export default Component
