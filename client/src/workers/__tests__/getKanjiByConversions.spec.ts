import TestEnvWorker from './test-utils/test-env-worker'
import { Kanji } from '@/models/kanji'
import { ConversionItem } from '@/data/conversion-table'

interface WorkerProps {
  kanjiSet: Kanji[]
  conversions: ConversionItem[]
  matchOption: 'exact' | 'start' | 'anywhere'
}

const worker = new TestEnvWorker<WorkerProps, Kanji[]>(
  'src/workers/getKanjiByConversions.worker.ts'
)

async function getResponse(message: WorkerProps): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage(message)
  })
}

describe('The Get Kanji by Conversions Webworker', () => {
  it('Should return an empty array if given an empty kanji set.', async () => {
    const result = await getResponse({
      kanjiSet: [],
      conversions: [
        {
          katakana: 'a',
          hiragana: 'b',
          romaji: 'c'
        }
      ],
      matchOption: 'anywhere'
    })

    expect(result).toEqual([])
  })
})
