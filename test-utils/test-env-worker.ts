import fs from 'fs'
import ts from 'typescript'
import projectRoot from '../root'

type Serializable = string | object | number | boolean

// TODO: Implement AbstractWorker, better listener handling
// TODO: Write tests for this class
// TODO: Typings
// TODO: Potential performance enhancements; see: https://stackoverflow.com/a/30370720
class TestEnvWorker {
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

    /**
     * TODO: This process could be simpler if the paths defined in webworker import statements
     *       are adjusted to be relative to this file's position instead of the original worker's
     *       location. It's all a massive hack either way, though.
     *
     * NOTE: webworkers and their included scripts cannot be modules yet anyway (not clear when),
     *       so the fix above might not actually be viable anyway.
     */
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
       */
      const extractedScripts = /(?<=^importScripts\().*(?=\))/gm.exec(webWorkerScript)

      webWorkerScript = webWorkerScript.replace(/(?=^importScripts\().*(?=\n)/gm, '')

      if (extractedScripts) {
        const rawScriptHandles = extractedScripts[0].replace(/['"`]+/g, '').split(', ')

        for (let rawScriptHandle of rawScriptHandles) {
          const adjustedHandle = rawScriptHandle.replace('.js', '.ts')
          const newScriptPath = `${projectRoot}/src/workers/${adjustedHandle}`

          // TODO: handle scripts in other directories?
          const importedScript = fs.readFileSync(newScriptPath, 'utf8')
          webWorkerScript = `${importedScript}\n\n${webWorkerScript}`
        }
      }
    }

    // NOTE: Strip out imports; we don't need them since we already shoved them in manually
    webWorkerScript = webWorkerScript.replace(/(?=^import \{).*(?<=")/gm, '')

    const compiled = ts.transpile(webWorkerScript, {
      module: ts.ModuleKind.CommonJS,
      sourceMap: false,
      lib: ['webworker'],
    })

    let onmessage: any // Set by webworker code
    eval(compiled)

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
      this.workerContext.onmessage({ data: message })
    }
  }
}

export default TestEnvWorker
