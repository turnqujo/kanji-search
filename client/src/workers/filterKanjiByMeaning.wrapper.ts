import { Kanji, MatchOption } from '../models'

const filterKanjiByMeaningWorker = new Worker('workers/filterKanjiByMeaning.worker.js')

export function filterKanjiByMeaning(
  kanjiSet: Kanji[],
  searchTerm: string,
  matchOption?: MatchOption
): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve, reject) => {
    filterKanjiByMeaningWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    filterKanjiByMeaningWorker.onerror = (error: ErrorEvent) => {
      error.preventDefault()
      reject(error.message)
    }
    filterKanjiByMeaningWorker.postMessage({
      kanjiSet: kanjiSet.slice(),
      searchTerm,
      matchOption
    })
  })
}
