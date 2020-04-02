import { Kanji } from '../models/kanji'
import { ConversionItem } from '../data/conversion-table'

const worker = new Worker('workers/getKanjiByConversions.worker.js')

export type MatchOption = 'exact' | 'start' | 'anywhere'

export function getKanjiByConversions(
  kanjiSet: Kanji[],
  conversions: ConversionItem[],
  matchOption: MatchOption
): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    worker.onmessage = (e: MessageEvent) => resolve(e.data)
    worker.onerror = (e: ErrorEvent) => console.log(e)
    worker.postMessage({ kanjiSet, conversions, matchOption })
  })
}
