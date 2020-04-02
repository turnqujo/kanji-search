import { Kanji } from '../models/kanji'

const filterKanjiByMeaningWorker = new Worker('workers/filterKanjiByMeaning.worker.js')

export function filterKanjiByMeaning(kanjiSet: Kanji[], searchTerm: string): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    filterKanjiByMeaningWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    filterKanjiByMeaningWorker.postMessage({
      kanjiSet,
      searchTerm
    })
  })
}
