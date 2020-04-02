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

  it('Should handle exact matches.', async () => {
    const expectedKanji = {
      char: 'kikuke',
      stroke: 7,
      meanings: [],
      readings: ['きくけ'],
      frequency: 0
    }

    const wrongKanji = {
      char: 'kakikuke',
      stroke: 7,
      meanings: [],
      readings: ['かきくけ'],
      frequency: 0
    }

    const deceptiveKanji = {
      char: 'kikukeko',
      stroke: 7,
      meanings: [],
      readings: ['きくけこ'],
      frequency: 0
    }

    const result = await getResponse({
      kanjiSet: [wrongKanji, expectedKanji, deceptiveKanji],
      conversions: [
        { katakana: 'キ', hiragana: 'き', romaji: 'ki' },
        { katakana: 'ク', hiragana: 'く', romaji: 'ku' },
        { katakana: 'ケ', hiragana: 'け', romaji: 'ke' }
      ],
      matchOption: 'exact'
    })

    expect(result).toEqual([expectedKanji])
  })

  it('Should handle matching only the starts of readings.', async () => {
    const expectedKanji = {
      char: 'kikuke',
      stroke: 7,
      meanings: [],
      readings: ['きくけ'],
      frequency: 0
    }

    const wrongKanji = {
      char: 'kakikuke',
      stroke: 7,
      meanings: [],
      readings: ['かきくけ'],
      frequency: 0
    }

    const alsoExpected = {
      char: 'kikukeko',
      stroke: 7,
      meanings: [],
      readings: ['きくけこ'],
      frequency: 0
    }

    const result = await getResponse({
      kanjiSet: [wrongKanji, expectedKanji, alsoExpected],
      conversions: [
        { katakana: 'キ', hiragana: 'き', romaji: 'ki' },
        { katakana: 'ク', hiragana: 'く', romaji: 'ku' },
        { katakana: 'ケ', hiragana: 'け', romaji: 'ke' }
      ],
      matchOption: 'start'
    })

    expect(result).toEqual([expectedKanji, alsoExpected])
  })

  it('Should handle searching for matches anywhere in the kanji set.', async () => {
    const expectedKanji = {
      char: 'kikuke',
      stroke: 7,
      meanings: [],
      readings: ['きくけ'],
      frequency: 0
    }

    const wrongKanji = {
      char: 'kakikuke',
      stroke: 7,
      meanings: [],
      readings: ['かきくけ'],
      frequency: 0
    }

    const alsoExpected = {
      char: 'kikukeko',
      stroke: 7,
      meanings: [],
      readings: ['きくけこ'],
      frequency: 0
    }

    const result = await getResponse({
      kanjiSet: [wrongKanji, expectedKanji, alsoExpected],
      conversions: [{ katakana: 'キ', hiragana: 'き', romaji: 'ki' }],
      matchOption: 'anywhere'
    })

    expect(result).toEqual([wrongKanji, expectedKanji, alsoExpected])
  })
})
