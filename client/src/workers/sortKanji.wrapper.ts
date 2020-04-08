import { Kanji, SortBy, OrderBy } from '../models'

const getKanjiByRomajiWorker = new Worker('workers/sortKanji.worker.js')

export function sortKanji(kanjiSet: Kanji[], sortBy: SortBy, order: OrderBy): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    getKanjiByRomajiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getKanjiByRomajiWorker.onerror = (e: ErrorEvent) => console.log(e)
    getKanjiByRomajiWorker.postMessage({ kanjiSet, sortBy, order })
  })
}
