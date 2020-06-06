import { Kanji, KanjiSet } from '../models'

const getKanjiWorker = new Worker('workers/getKanji.worker.js')

export function getKanji(kanjiSet: KanjiSet): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve, reject) => {
    getKanjiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getKanjiWorker.onerror = (error: ErrorEvent) => {
      error.preventDefault()
      reject(error.message)
    }
    getKanjiWorker.postMessage({ kanjiSet })
  })
}
