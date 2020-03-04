import { Kanji } from '../../../shared/models/kanji'

// @ts-ignore
import conversionTable from '../../../shared/data/conversion-table.json'

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
