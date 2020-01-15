import TestEnvWorker from '../../test-utils/test-env-worker'
import { ConversionItem } from '../models/conversionItem'
import { Kanji } from '../models/kanji'

// @ts-ignore TODO: Why is this showing an error? JSON is being imported properly.
import conversionTable from '../data/conversion-table.json'

const nahaKanji = {
  char: 'A',
  stroke: 1,
  meanings: ['Hiragana "naha"'],
  readings: ['なは']
}

const nahanoKanji = {
  char: 'A',
  stroke: 1,
  meanings: ['Katakana "nahano"'],
  readings: ['ナハノ']
}

const onnaKanji = {
  char: 'B',
  stroke: 2,
  meanings: ['Hiragana "onna"'],
  readings: ['おんな']
}

const shiKanji = {
  char: 'C',
  stroke: 3,
  meanings: ['Hiragana "shiitake"'],
  readings: ['しいたけ']
}

const kanjiSet = [nahaKanji, nahanoKanji, onnaKanji, shiKanji]
Object.freeze(kanjiSet)

const workerSrc = 'src/workers/getKanjiByRomaji.ts'
const worker = new TestEnvWorker(workerSrc)

describe('The Get Kanji By Romaji webworker', () => {
  it('Should return an empty array if given an empty kanji set.', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: 'ka', kanjiSet: [], conversionTable, matchOption: 'anywhere' })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should be case insensitive.', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: 'NAhA', kanjiSet, conversionTable, matchOption: 'exact' })
    })

    expect(response).toEqual([nahaKanji])
    done()
  })

  it('Should support searching by matching only the starts of kanji readings.', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: 'na', kanjiSet, conversionTable, matchOption: 'start' })
    })

    expect(response).toEqual([nahaKanji, nahanoKanji])
    done()
  })

  it('Should support searching by exact matching the kanji readings', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: 'naha', kanjiSet, conversionTable, matchOption: 'exact' })
    })

    expect(response).toEqual([nahaKanji])
    done()
  })

  it('Should support searching by single-character romaji.', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: 'o', kanjiSet, conversionTable, matchOption: 'start' })
    })

    expect(response).toEqual([onnaKanji])
    done()
  })

  it('Should support searching by three-character romaji.', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: 'shi', kanjiSet, conversionTable, matchOption: 'start' })
    })

    expect(response).toEqual([shiKanji])
    done()
  })

  it('Should support searching for "n" with and without a nucleus.', () => {
    const withNucleus = new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: 'on', kanjiSet, conversionTable, matchOption: 'start' })
    }).then(result => expect(result).toEqual([onnaKanji]))

    const withoutNucleus = new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: 'n', kanjiSet, conversionTable, matchOption: 'anywhere' })
    }).then(result => expect(result).toEqual([onnaKanji]))

    return Promise.all([withNucleus, withoutNucleus])
  })

  it('Should handle converting each romaji individually and in sequence.', () => {
    return Promise.all(
      (conversionTable as ConversionItem[]).map(({ romaji, hiragana, katakana }, index: number) => {
        const fakeKanji: Kanji = {
          char: 'hi',
          stroke: 1,
          readings: [katakana, hiragana],
          meanings: [`Comparison #${index + 1}, looking for: ${romaji}`]
        }

        return new Promise((resolve, reject) => {
          worker.onerror = (e: string | Event) =>
            reject(`Failed to convert: (${romaji}). Original error: ${e}`)

          worker.onmessage = (res: any) => resolve(res.data)

          worker.postMessage({
            romaji,
            kanjiSet: [fakeKanji],
            matchOption: 'exact',
            conversionTable
          })
        }).then(response => expect(response).toEqual([fakeKanji]))
      })
    )
  })

  it('Should handle a ridiculous situation.', async done => {
    const insaneKanji: Kanji = {
      char: 'lol',
      stroke: Infinity,
      readings: [
        conversionTable.map((item: ConversionItem) => item.hiragana).join(''),
        conversionTable.map((item: ConversionItem) => item.katakana).join('')
      ],
      meanings: ['All supported conversion items smashed together']
    }

    const allRomaji = conversionTable.map((item: ConversionItem) => item.romaji).join('')

    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ romaji: allRomaji, kanjiSet: [insaneKanji], conversionTable, matchOption: 'exact' })
    })

    expect(response).toEqual([insaneKanji])
    done()
  })
})
