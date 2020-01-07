import fs from 'fs'
import ts from 'typescript'
import projectRoot from '../root'

type Serializable = string | object | number | boolean

// TODO: Implement AbstractWorker, better listener handling
class JestWorker {
  private _onmessage: any
  get onmessage(): any   { return this._onmessage }
  set onmessage(cb: any) { this._onmessage = cb }

  private _onerror: any
  get onerror(): any   { return this._onerror }
  set onerror(cb: any) { this._onerror = cb }

  private workerContext: any = {
    onmessage: null
  }

  constructor(src: string) {
    const webWorkerScript = fs.readFileSync(`${projectRoot}/${src}`, 'utf8')

    let onmessage: any // Set by webworker code
    eval(
      ts.transpile(webWorkerScript, {
        module: ts.ModuleKind.ESNext,
        sourceMap: false
      })
    )

    // NOTE: This will override any custom `onerror` handler defined in the webworker code
    let onerror = (error: string | Event) => {
      if (this.onerror) {
        this.onerror(error)
      }
    }

    let postMessage = (data: any) => {
      if (this.onmessage) {
        this.onmessage({ data })
      }
    }

    this.workerContext.onmessage = onmessage
  }

  public postMessage(message: Serializable) {
    if (this.workerContext.onmessage) {
      this.workerContext.onmessage(JSON.stringify({ data: message }))
    }
  }
}

export default JestWorker
