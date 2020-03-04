import { Kanji } from '../../../shared/models/kanji'

const getAllKanjiWorker = new Worker('workers/getAllKanji.worker.js')

let allKanji: Kanji[] = []
export function getAllKanji(): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    if (allKanji.length > 0) {
      return resolve(allKanji.slice())
    }

    getAllKanjiWorker.onmessage = (e: MessageEvent) => {
      allKanji = e.data
      resolve(e.data)
    }

    getAllKanjiWorker.postMessage('')
  })
}
