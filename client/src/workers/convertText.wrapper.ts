import { ConversionItem } from '../data/conversion-table'

const convertTextWorker = new Worker('workers/convertText.worker.js')

export function convertText(text: string, conversionTable: ConversionItem[]): Promise<ConversionItem[]> {
  return new Promise<ConversionItem[]>((resolve, reject) => {
    convertTextWorker.onerror = (error: ErrorEvent) => {
      error.preventDefault()
      reject(error.message)
    }
    convertTextWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    convertTextWorker.postMessage({
      text,
      conversionTable
    })
  })
}
