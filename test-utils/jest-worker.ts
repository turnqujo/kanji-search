import fs from 'fs'
import ts from 'typescript'
import projectRoot from '../root'

type Serializable = string | object | number | boolean

class JestWorker {
  private _onmessage: any

  get onmessage(): any {
    return this._onmessage
  }

  set onmessage(cb: any) {
    this._onmessage = cb
  }

  private childOnMessage: any = null

  constructor(src: string) {
    const webWorkerScript = fs.readFileSync(`${projectRoot}/${src}`, 'utf8')

    let onmessage
    let postMessage = (data: any) => {
      if (this.onmessage) {
        this.onmessage({ data })
      }
    }

    eval(
      ts.transpile(webWorkerScript, {
        module: ts.ModuleKind.ESNext,
        sourceMap: false
      })
    )

    this.childOnMessage = onmessage
  }

  public postMessage(message: Serializable) {
    if (this.childOnMessage) {
      this.childOnMessage(JSON.stringify({ data: message }))
    }
  }

  public terminate() {}
}

export default JestWorker
