import { ConversionItem } from '../data/conversion-table'
import { Kanji, MatchOption } from '../models'

const getKanjiByConversionWorker = new Worker('workers/getKanjiByConversion.worker.js')

export function getKanjiByConversion(
  kanjiSet: Kanji[],
  conversionItems: ConversionItem[],
  matchOption: MatchOption
): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve, reject) => {
    getKanjiByConversionWorker.onerror = (error: ErrorEvent) => {
      error.preventDefault()
      reject(error.message)
    }

    getKanjiByConversionWorker.onmessage = (e: MessageEvent) => resolve(e.data)

    getKanjiByConversionWorker.postMessage({
      conversionItems,
      kanjiSet,
      matchOption
    })
  })
}
