// @ts-ignore - TODO: can't find 'fs' even though it imports
import fs from 'fs'
import ts from 'typescript'

// TODO: Potential performance enhancements; see: https://stackoverflow.com/a/30370720
export default class TestEnvWorker<T, R> implements AbstractWorker {
  // These are like a "bridge" between the test worker and the actual worker's context
  onmessage: any
  onerror: any
  private listeners: Record<string, Function[]> = {}

  private workerContext: any = {
    onmessage: null,
    listeners: {}
  }

  constructor(src: string) {
    let webWorkerScript = fs.readFileSync(src, 'utf8')
    if (webWorkerScript.indexOf('importScripts') >= 0) {
      // TODO: This can't handle every permutation of how importScripts could be written
      const extractedScripts = /(?<=importScripts\().*(?=\))/gm.exec(webWorkerScript)

      webWorkerScript = webWorkerScript.replace(/(?=^importScripts\().*(?=\r\n|\r|\n)/gm, '')

      if (extractedScripts) {
        const rawScriptHandles = extractedScripts[0].replace(/['"`]+/g, '').split(', ')

        for (const rawScriptHandle of rawScriptHandles) {
          const adjustedHandle = rawScriptHandle.replace('.js', '.ts')
          const newScriptPath = `src/workers/${adjustedHandle}`

          // TODO: handle scripts in other directories?
          const importedScript = fs.readFileSync(newScriptPath, 'utf8')
          webWorkerScript = `${importedScript}\n\n${webWorkerScript}`
        }
      }
    }

    // Strip out imports; we don't need them since we already shoved them in manually
    webWorkerScript = webWorkerScript.replace(/(?=^import \{).*(?<=")/gm, '')

    // This record is keeping track of listeners registered by the webworker
    const listeners: Record<string, Function[]> = {}
    let addEventListener = function(type: string, cb: any) {
      if (!Array.isArray(listeners[type])) {
        listeners[type] = []
      }

      listeners[type].push(cb)
    }

    // Purposefully empty for the webworker code to reference and set
    let onmessage: any
    let onerror: any

    // This function will be used by the webworker to post to the test context
    const postMessage = (data: R) => {
      if (this.onmessage) {
        this.onmessage({ data })
      }

      if(Array.isArray(this.listeners['message'])) {
        this.listeners.message.forEach(cb => cb({ data }))
      }
    }

    // Compile and run the webworker in this context
    const compiled = ts.transpile(webWorkerScript, {
      module: ts.ModuleKind.CommonJS,
      sourceMap: false,
      lib: ['webworker']
    })
    eval(compiled)

    // This will override any custom `onerror` handler defined by the webworker
    onerror = (error: string | Event) => {
      if (this.onerror) {
        this.onerror(error)
      }
    }

    // Save to the worker context, so they can be used elsewhere within this class
    this.workerContext.onmessage = onmessage
    this.workerContext.listeners = listeners
  }

  public addEventListener(type: string, listener: EventListener) {
    if (!Array.isArray(this.listeners[type])) {
      this.listeners[type] = []
    }

    this.listeners[type].push(listener)
  }

  removeEventListener(type: string, listener: EventListener) {
    // TODO: Add this?
    throw new Error("Not implemented.")
  }

  public postMessage(data: T) {
    if (this.workerContext.onmessage) {
      this.workerContext.onmessage({ data })
    }

    if (Array.isArray(this.workerContext.listeners['message'])) {
      this.workerContext.listeners.message.forEach((cb: any) => cb({ data }))
    }
  }
}
