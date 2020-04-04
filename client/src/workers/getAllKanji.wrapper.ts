import { Kanji, KanjiSet } from '../models'

const getAllKanjiWorker = new Worker('workers/getAllKanji.worker.js')

export function getAllKanji(kanjiSet: KanjiSet): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    getAllKanjiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getAllKanjiWorker.postMessage({ kanjiSet })
  })
}
