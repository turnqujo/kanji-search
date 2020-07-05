import { Kanji, KanjiSet } from '../models'

const getKanjiBySetWorker = new Worker('workers/getKanjiBySet.worker.js')

export function getKanjiBySet(kanjiSet: Kanji[], desiredSets: KanjiSet[]): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve, reject) => {
    getKanjiBySetWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getKanjiBySetWorker.onerror = (error: ErrorEvent) => {
      error.preventDefault()
      reject(error.message)
    }

    getKanjiBySetWorker.postMessage({ kanjiSet, desiredSets })
  })
}
