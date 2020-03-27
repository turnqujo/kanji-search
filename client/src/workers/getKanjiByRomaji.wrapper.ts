import { Kanji } from '../models/kanji'
import conversionTable from '../data/conversion-table'

const getKanjiByRomajiWorker = new Worker('workers/getKanjiByRomaji.worker.js')

export type MatchOption = 'exact' | 'start' | 'anywhere'

export function getKanjiByRomaji(
  romaji: string,
  kanjiSet: Kanji[],
  matchOption: MatchOption
): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    getKanjiByRomajiWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    getKanjiByRomajiWorker.onerror = (e: ErrorEvent) => console.log(e)
    getKanjiByRomajiWorker.postMessage({ romaji, kanjiSet, conversionTable, matchOption })
  })
}
