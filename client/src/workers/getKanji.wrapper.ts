import { Kanji, KanjiSet } from '../models'

const getKanjiWorker = new Worker('workers/getKanji.worker.js')

export function getKanji(kanjiSet: KanjiSet): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    getKanjiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getKanjiWorker.postMessage({ kanjiSet })
  })
}
