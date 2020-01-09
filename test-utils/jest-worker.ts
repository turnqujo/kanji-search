import fs from 'fs'
import ts from 'typescript'
import projectRoot from '../root'

type Serializable = string | object | number | boolean

// TODO: Implement AbstractWorker, better listener handling
// TODO: Write tests for this class
// TODO: Typings
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
    let webWorkerScript = fs.readFileSync(`${projectRoot}/${src}`, 'utf8')
    if (webWorkerScript.indexOf('importScripts') >= 0) {
      /**
       * TODO: This regex should be updated to handle these situations:
       * - importScripts with parameters broken onto newlines
       * - ignoring importScripts in multi-line comment blocks, e.g.:
       * /*
       *  Note how the importScripts text is at the first column
       * importScripts('')
       * * /
       *
       */
      const extractedScripts = /(?<=^importScripts\().*(?=\))/gm.exec(webWorkerScript)
      webWorkerScript = webWorkerScript.replace(/(?=^importScripts\().*(?=\n)/gm, '')

      if (extractedScripts) {
        const rawScriptHandles = extractedScripts[0].replace(/['"`]+/g, '').split(', ')

        for (let rawScriptHandle of rawScriptHandles) {
          const adjustedHandle = rawScriptHandle.replace('.js', '.ts')

          // TODO: handle scripts in other directorieS?
          const importedScript = fs.readFileSync(`${projectRoot}/src/workers/${adjustedHandle}`, 'utf8')
          webWorkerScript = `${importedScript}\n${webWorkerScript}`
        }
      }
    }

    let onmessage: any // Set by webworker code
    eval(
      ts.transpile(webWorkerScript, {
        sourceMap: false,
        lib: ['webworker'],
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
