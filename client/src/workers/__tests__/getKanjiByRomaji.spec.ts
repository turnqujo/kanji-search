import TestEnvWorker from './test-utils/test-env-worker'
import { ConversionItem } from '../../../../shared/models/conversionItem'
import { Kanji } from '../../../../shared/models/kanji'

// @ts-ignore TODO: Why is this showing an error? JSON is being imported properly.
import conversionTable from '../../../../shared/data/conversion-table.json'
const conversions = conversionTable as ConversionItem[]

const nahaKanji: Kanji = {
  char: 'A',
  stroke: 1,
  meanings: ['Hiragana "naha"'],
  readings: ['なは'],
  frequency: 1
}

const nahanoKanji: Kanji = {
  char: 'A',
  stroke: 1,
  meanings: ['Katakana "nahano"'],
  readings: ['ナハノ'],
  frequency: 2
}

const onnaKanji: Kanji = {
  char: 'B',
  stroke: 2,
  meanings: ['Hiragana "onna"'],
  readings: ['おんな'],
  frequency: 3
}

const shiKanji: Kanji = {
  char: 'C',
  stroke: 3,
  meanings: ['Hiragana "shiitake"'],
  readings: ['しいたけ'],
  frequency: 4
}

const kanjiSet = [nahaKanji, nahanoKanji, onnaKanji, shiKanji]

const worker = new TestEnvWorker('src/workers/getKanjiByRomaji.worker.ts')

interface WorkerProps {
  romaji: string
  kanjiSet: Kanji[]
  conversionTable: any[]
  matchOption: 'exact' | 'start' | 'anywhere'
}

export async function getResponse(message: WorkerProps): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage(message)
  })
}

describe('The Get Kanji By Romaji webworker', () => {
  it('Should return an empty array if given an empty kanji set.', async () => {
    const result = await getResponse({
      romaji: 'na',
      kanjiSet: [],
      conversionTable: conversions,
      matchOption: 'anywhere'
    })

    expect(result).toEqual([])
  })

  it('Should be case insensitive.', async () => {
    const response = await getResponse({
      romaji: 'NAhA',
      kanjiSet,
      conversionTable: conversions,
      matchOption: 'exact'
    })

    expect(response).toEqual([nahaKanji])
  })

  it('Should support searching by matching only the starts of kanji readings.', async () => {
    const response = await getResponse({
      romaji: 'na',
      kanjiSet,
      conversionTable: conversions,
      matchOption: 'start'
    })

    expect(response).toEqual([nahaKanji, nahanoKanji])
  })

  it('Should support searching by exact matching the kanji readings', async () => {
    const response = await getResponse({
      romaji: 'naha',
      kanjiSet,
      conversionTable: conversions,
      matchOption: 'exact'
    })

    expect(response).toEqual([nahaKanji])
  })

  it('Should support searching for "n" with and without a preceding nucleus.', async () => {
    const withNucleus = await getResponse({
      romaji: 'on',
      kanjiSet,
      conversionTable: conversions,
      matchOption: 'start'
    })

    expect(withNucleus).toEqual([onnaKanji])

    const withoutNucleus = await getResponse({
      romaji: 'n',
      kanjiSet,
      conversionTable: conversions,
      matchOption: 'anywhere'
    })

    expect(withoutNucleus).toEqual([onnaKanji])
  })

  it('Should handle converting each romaji individually, in sequence.', async () => {
    return conversions.map(async ({ romaji, hiragana, katakana }, index: number) => {
      const fakeKanji: Kanji = {
        char: 'hi',
        stroke: 1,
        readings: [katakana, hiragana],
        meanings: [`Comparison #${index + 1}, looking for: ${romaji}`],
        frequency: 1
      }

      const response = await getResponse({
        romaji,
        kanjiSet: [fakeKanji],
        matchOption: 'exact',
        conversionTable: conversions
      })

      return expect(response).toEqual([fakeKanji])
    })
  })

  it('Should handle every supported romaji smashed together.', async () => {
    const insaneKanji: Kanji = {
      char: 'lol',
      stroke: Infinity,
      readings: [
        conversions.map((item: ConversionItem) => item.hiragana).join(''),
        conversions.map((item: ConversionItem) => item.katakana).join('')
      ],
      meanings: ['All supported conversion items smashed together'],
      frequency: Infinity
    }

    const allRomaji = conversionTable.map((item: ConversionItem) => item.romaji).join('')

    const response = await getResponse({
      romaji: allRomaji,
      kanjiSet: [insaneKanji],
      conversionTable: conversions,
      matchOption: 'exact'
    })

    expect(response).toEqual([insaneKanji])
  })

  it("Should handle multiple ん's in a row.", async () => {
    const nnnKanji: Kanji = {
      char: 'lol',
      stroke: 10,
      readings: ['んんん', 'ンンン'],
      meanings: ['NNN'],
      frequency: 0
    }

    const response = await getResponse({
      romaji: 'nNn',
      kanjiSet: [nnnKanji],
      conversionTable: conversions,
      matchOption: 'exact'
    })

    expect(response).toEqual([nnnKanji])
  })

  it('Should handle words with other characters following ん.', async () => {
    const tonkatsuKanji: Kanji = {
      char: '豚カツ',
      stroke: 10,
      readings: ['とんかつ', 'トンカツ'],
      meanings: ['I know this is not one Kanji'],
      frequency: 0
    }

    const response = await getResponse({
      romaji: 'tonkatsu',
      kanjiSet: [tonkatsuKanji],
      conversionTable: conversions,
      matchOption: 'exact'
    })

    expect(response).toEqual([tonkatsuKanji])
  })
})
