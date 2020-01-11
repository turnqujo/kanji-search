import JestWorker from '../../test-utils/jest-worker'
import { Kanji } from '../models/kanji'

// @ts-ignore TODO: Why is this showing an error? JSON is being imported properly.
import conversionTable from '../data/conversion-table.json'

const workerSrc = 'src/workers/getKanjiByRomaji.ts'

describe('The Get Kanji By Romaji webworker', () => {
  it('Should return an empty array if given an empty kanji set.', async done => {
    const response = await new Promise(resolve => {
      const worker = new JestWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({ romaji: 'ka', kanjiSet: [], conversionTable })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should find kanji based off of their hiragana or katakana readings.', async done => {
    const kanjiSet: Kanji[] = [
      {
        char: 'A',
        stroke: 1,
        meanings: ['Hiragana A'],
        readings: ['あ']
      },
      {
        char: 'B',
        stroke: 2,
        meanings: ['Katakana A'],
        readings: ['ア']
      }
    ]

    const response = await new Promise(resolve => {
      const worker = new JestWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({ romaji: 'a', kanjiSet, conversionTable })
    })

    expect(response).toEqual(kanjiSet)
    done()
  })

  it('Should be case insensitive.', async done => {
    const kanjiSet: Kanji[] = [
      {
        char: 'A',
        stroke: 1,
        meanings: ['Hiragana "hana"'],
        readings: ['はな']
      },
      {
        char: 'B',
        stroke: 2,
        meanings: ['Katakana "hana"'],
        readings: ['ハナ']
      }
    ]

    const response = await new Promise(resolve => {
      const worker = new JestWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({ romaji: 'Na', kanjiSet, conversionTable })
    })

    expect(response).toEqual(kanjiSet)
    done()
  })
})
