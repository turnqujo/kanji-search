import { Kanji, SortOptions } from '../models'

const getKanjiByRomajiWorker = new Worker('workers/sortKanji.worker.js')

export function sortKanji(kanjiSet: Kanji[], primary: SortOptions, secondary: SortOptions | null): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve, reject) => {
    getKanjiByRomajiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getKanjiByRomajiWorker.onerror = (error: ErrorEvent) => {
      error.preventDefault()
      reject(error.message)
    }
    getKanjiByRomajiWorker.postMessage({ kanjiSet: kanjiSet.slice(), primary, secondary })
  })
}
