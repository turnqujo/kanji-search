import { ConversionItem } from '../data/conversion-table'
import { Kanji, MatchOption, ReadingType } from '../models'

const getKanjiByConversionWorker = new Worker('workers/getKanjiByConversion.worker.js')

export function getKanjiByConversion(
  kanjiSet: Kanji[],
  conversionItems: ConversionItem[],
  matchOption: MatchOption,
  readingType: ReadingType
): Promise<Kanji[]> {
  const stringData = JSON.stringify(kanjiSet)
  const transfer = new ArrayBuffer(stringData.length * 8)

  return new Promise<Kanji[]>((resolve, reject) => {
    getKanjiByConversionWorker.onerror = (error: ErrorEvent) => {
      error.preventDefault()
      reject(error.message)
    }

    getKanjiByConversionWorker.onmessage = (e: MessageEvent) => resolve(e.data)

    getKanjiByConversionWorker.postMessage(
      {
        conversionItems,
        kanjiSet: kanjiSet.slice(),
        matchOption,
        readingType
      },
      [transfer]
    )
  })
}
