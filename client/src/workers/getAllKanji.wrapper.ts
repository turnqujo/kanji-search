import { Kanji } from '../../../shared/models/kanji'

const getAllKanjiWorker = new Worker('workers/getAllKanji.worker.js')
export function getAllKanji(): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    getAllKanjiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getAllKanjiWorker.postMessage('')
  })
}
