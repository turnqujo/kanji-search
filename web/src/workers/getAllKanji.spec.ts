import TestEnvWorker from '../../test-utils/test-env-worker'
import { initDB, fillDB, teardownDB } from '../../test-utils/db'

const workerSrc = 'src/workers/getAllKanji.ts'

describe('The Get All Kanji Webworker', () => {
  afterEach(async (done) => {
    await teardownDB()
    done()
  })

  it('Should pass along an error if the DB has not been initialized.', async (done) => {
    const response = new Promise((resolve, reject) => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onerror = (error: string | Event) => reject(error)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('')
    })

    await expect(response).rejects.toBe('No objectStore named kanji in this database')
    done()
  })

  it('Should return an empty array if no Kanji are loaded.', async (done) => {
    await initDB()

    const response = await new Promise((resolve) => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('')
    })

    expect(response).toEqual([])
    done()
  })

  it('Should return any stored Kanji when asked.', async (done) => {
    const storedKanji = [
      {
        char: 'a',
        stroke: 1,
        meanings: ['a'],
        readings: ['b']
      },

      {
        char: 'b',
        stroke: 2,
        meanings: ['c'],
        readings: ['d']
      }
    ]

    await initDB()
    await fillDB(storedKanji)

    const response = await new Promise((resolve) => {
      const worker = new TestEnvWorker(workerSrc)
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('')
    })

    expect(response).toEqual(storedKanji)
    done()
  })
})
