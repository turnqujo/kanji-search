import { teardownDB, initDB, fillDB } from '../../test-utils/db'
import JestWorker from '../../test-utils/jest-worker'
import { Kanji } from '../models/kanji'

const workerSrc = 'src/workers/getKanjiByMeaning.ts'

const kanjiA: Kanji = {
  char: 'a',
  stroke: 1,
  meanings: ['aaa'],
  readings: ['b']
}

const kanjiB: Kanji = {
  char: 'b',
  stroke: 2,
  meanings: ['c'],
  readings: ['d']
}

const kanjiC: Kanji = {
  char: 'c',
  stroke: 2,
  meanings: ['öL', 'aa'],
  readings: ['lololol']
}

describe('The Get Kanji by Meaning Webworker', () => {
  afterEach(async done => {
    await teardownDB()
    done()
  })

  it('Should pass along an error if the DB has not been initialized.', async done => {
    const response = new Promise((resolve, reject) => {
      const worker = new JestWorker(workerSrc)
      worker.onerror = (error: string | Event) => reject(error)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('')
    })

    await expect(response).rejects.toBe('No objectStore named kanji in this database')
    done()
  })

  it('Should return an empty array when there are no stored kanji.', async done => {
    await initDB()

    const response = await new Promise(resolve => {
      const worker = new JestWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('Some Search Term')
    })

    expect(response).toEqual([])
    done()
  })

  it('Should return an empty array when the given search term was not found.', async done => {
    await initDB()
    await fillDB([kanjiA, kanjiB])

    const response = await new Promise((resolve, reject) => {
      const worker = new JestWorker(workerSrc)
      worker.onerror = (error: string | Event) => reject(error)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('SHOULD NOT MATCH')
    })

    expect(response).toEqual([])
    done()
  })

  it('Should return any kanji which pass a substring search.', async done => {
    await initDB()
    await fillDB([kanjiA, kanjiB, kanjiC])

    const response = await new Promise((resolve, reject) => {
      const worker = new JestWorker(workerSrc)
      worker.onerror = (error: string | Event) => reject(error)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('aa')
    })

    expect(response).toEqual([kanjiA, kanjiC])

    done()
  })

  it('Should be case insensitive.', async done => {
    await initDB()
    await fillDB([kanjiA, kanjiB, kanjiC])

    const response = await new Promise((resolve, reject) => {
      const worker = new JestWorker(workerSrc)
      worker.onerror = (error: string | Event) => reject(error)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('öL')
    })

    expect(response).toEqual([kanjiC])
    done()
  })
})
