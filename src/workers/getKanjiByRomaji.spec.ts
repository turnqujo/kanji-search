import TestEnvWorker from '../../test-utils/test-env-worker'

// @ts-ignore TODO: Why is this showing an error? JSON is being imported properly.
import conversionTable from '../data/conversion-table.json'

const nahaKanji = {
  char: 'A',
  stroke: 1,
  meanings: ['Hiragana "naha"'],
  readings: ['なは']
}

const onnaKanji = {
  char: 'B',
  stroke: 2,
  meanings: ['Hiragana "onna"'],
  readings: ['おんな']
}
const kanjiSet = [nahaKanji, onnaKanji]
Object.freeze(kanjiSet)

const workerSrc = 'src/workers/getKanjiByRomaji.ts'

describe('The Get Kanji By Romaji webworker', () => {
  it('Should return an empty array if given an empty kanji set.', async done => {
    const response = await new Promise(resolve => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({ romaji: 'ka', kanjiSet: [], conversionTable })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should be case insensitive.', async done => {
    const response = await new Promise(resolve => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({ romaji: 'NAhA', kanjiSet, conversionTable })
    })

    expect(response).toEqual([nahaKanji])
    done()
  })

  it('Should support searching by matching only the starts of kanji readings.', async done => {
    const response = await new Promise(resolve => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({ romaji: 'na', kanjiSet, conversionTable, matchOption: 'start' })
    })

    expect(response).toEqual([nahaKanji])
    done()
  })

  it('Should support searching by exact matching the kanji readings', async done => {
    const response = await new Promise(resolve => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({ romaji: 'naha', kanjiSet, conversionTable })
    })

    expect(response).toEqual([nahaKanji])
    done()
  })
})
