import { Kanji } from '../models/kanji'

const getAllKanjiWorker = new Worker('workers/getAllKanji.worker.js')

/**
 * TODO: This should support choosing which kanji set to use
 */
let allKanji: Kanji[] = []
export function getAllKanji(): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    if (allKanji.length > 0) {
      // TODO: Should we really be holding these this way?
      return resolve(allKanji.slice())
    }

    getAllKanjiWorker.onmessage = (e: MessageEvent) => {
      allKanji = e.data
      resolve(e.data)
    }

    getAllKanjiWorker.postMessage('')
  })
}
