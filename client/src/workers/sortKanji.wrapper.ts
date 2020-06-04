import { Kanji, SortOptions } from '../models'

const getKanjiByRomajiWorker = new Worker('workers/sortKanji.worker.js')

export function sortKanji(kanjiSet: Kanji[], primary: SortOptions, secondary: SortOptions | null): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    getKanjiByRomajiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getKanjiByRomajiWorker.onerror = (e: ErrorEvent) => console.log(e)
    getKanjiByRomajiWorker.postMessage({ kanjiSet: kanjiSet.slice(), primary, secondary })
  })
}
