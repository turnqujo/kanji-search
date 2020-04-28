import TestEnvWorker from './test-utils/test-env-worker'
import { Kanji, ReadingType } from '@/models/kanji'
import { ConversionItem } from '@/data/conversion-table'

interface WorkerProps {
  kanjiSet: Kanji[]
  conversionItems: ConversionItem[]
  matchOption: 'exact' | 'start' | 'anywhere',
  readingType: ReadingType
}

const worker = new TestEnvWorker<WorkerProps, Kanji[]>('src/workers/getKanjiByConversion.worker.ts')

async function getResponse(message: WorkerProps): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage(message)
  })
}

const kikukeKanji = {
  char: 'kikuke',
  stroke: 7,
  meanings: [],
  readings: {
    on: ['きくけ'],
    kun: ['マ'],
    nanori: []
  },
  grade: 0,
  jlpt: 0,
  frequency: 0,
  set: []
}

const kakikukeKanji = {
  char: 'kakikuke',
  stroke: 7,
  meanings: [],
  readings: {
    on: ['かきくけ', 'ま'],
    kun: ['キャ'],
    nanori: []
  },
  grade: 0,
  jlpt: 0,
  frequency: 0,
  set: []
}

const kikukekoKanji = {
  char: 'kikukeko',
  stroke: 7,
  meanings: [],
  readings: {
    on: ['きくけこ'],
    kun: ['シ', 'マ'],
    nanori: []
  },
  grade: 0,
  jlpt: 0,
  frequency: 0,
  set: []
}

describe('The Get Kanji by Conversion Webworker', () => {
  it('Should return an empty array if given an empty kanji set.', async () => {
    const result = await getResponse({
      kanjiSet: [],
      conversionItems: [
        {
          katakana: 'a',
          hiragana: 'b',
          romaji: 'c'
        }
      ],
      matchOption: 'anywhere',
      readingType: ['on', 'kun', 'nanori']
    })

    expect(result).toEqual([])
  })

  it('Should handle exact matches.', async () => {
    const result = await getResponse({
      kanjiSet: [kikukeKanji, kakikukeKanji, kikukekoKanji],
      conversionItems: [
        { katakana: 'キ', hiragana: 'き', romaji: 'ki' },
        { katakana: 'ク', hiragana: 'く', romaji: 'ku' },
        { katakana: 'ケ', hiragana: 'け', romaji: 'ke' }
      ],
      matchOption: 'exact',
      readingType: ['on', 'kun', 'nanori']
    })

    expect(result).toEqual([kikukeKanji])
  })

  it('Should handle matching only the starts of readings.', async () => {
    const result = await getResponse({
      kanjiSet: [kikukeKanji, kakikukeKanji, kikukekoKanji],
      conversionItems: [
        { katakana: 'キ', hiragana: 'き', romaji: 'ki' },
        { katakana: 'ク', hiragana: 'く', romaji: 'ku' },
        { katakana: 'ケ', hiragana: 'け', romaji: 'ke' }
      ],
      matchOption: 'start',
      readingType: ['on', 'kun', 'nanori']
    })

    expect(result).toEqual([kikukeKanji, kikukekoKanji])
  })

  it('Should handle searching for matches anywhere in the kanji set.', async () => {
    const result = await getResponse({
      kanjiSet: [kikukeKanji, kakikukeKanji, kikukekoKanji],
      conversionItems: [{ katakana: 'キ', hiragana: 'き', romaji: 'ki' }],
      matchOption: 'anywhere',
      readingType: ['on', 'kun', 'nanori']
    })

    expect(result).toEqual([kikukeKanji, kakikukeKanji, kikukekoKanji])
  })

  it('Should handle limiting searches to specific reading types (On, Kun, Nanori)', async () => {
    const result = await getResponse({
      kanjiSet: [kikukeKanji, kakikukeKanji, kikukekoKanji],
      conversionItems: [{ katakana: 'マ', hiragana: 'ま', romaji: 'ma' }],
      matchOption: 'anywhere',
      readingType: ['kun']
    })

    expect(result).toEqual([kikukeKanji, kikukekoKanji])
  })
})
