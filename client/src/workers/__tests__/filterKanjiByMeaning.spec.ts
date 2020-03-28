import TestEnvWorker from './test-utils/test-env-worker'
import { Kanji } from '../../models/kanji'

const workerSrc = 'src/workers/filterKanjiByMeaning.worker.ts'

const kanjiA: Kanji = {
  char: 'a',
  stroke: 1,
  meanings: ['aaa'],
  readings: ['b'],
  frequency: 0
}

const kanjiB: Kanji = {
  char: 'b',
  stroke: 2,
  meanings: ['c'],
  readings: ['d'],
  frequency: 1
}

const kanjiC: Kanji = {
  char: 'c',
  stroke: 2,
  meanings: ['öL', 'aa'],
  readings: ['lololol'],
  frequency: 2
}

describe('The Filter Kanji by Meaning Webworker', () => {
  it('Should return an empty array when given an empty array of kanji.', async (done) => {
    const response = await new Promise((resolve) => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({ kanjiSet: [], searchTerm: 'Some Search Term' })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should return an empty array when the given search term was not found.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onerror = (error: string | Event) => reject(error)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({
        kanjiSet: [kanjiA, kanjiB, kanjiC],
        searchTerm: 'Some Search Term'
      })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should return any kanji which pass a substring search.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onerror = (error: string | Event) => reject(error)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({
        kanjiSet: [kanjiA, kanjiB, kanjiC],
        searchTerm: 'aa'
      })
    })

    expect(response).toEqual([kanjiA, kanjiC])
    done()
  })

  it('Should be case insensitive.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onerror = (error: string | Event) => reject(error)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage({
        kanjiSet: [kanjiA, kanjiB, kanjiC],
        searchTerm: 'öL'
      })
    })

    expect(response).toEqual([kanjiC])
    done()
  })
})
