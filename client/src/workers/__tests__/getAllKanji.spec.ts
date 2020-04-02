import TestEnvWorker from './test-utils/test-env-worker'
import { initDB, fillDB, teardownDB } from './test-utils/db'
import { Kanji } from '@/models/kanji'


const worker = new TestEnvWorker<string, Kanji[]>('src/workers/getAllKanji.worker.ts')

async function getResponse(message: string): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage(message)
  })
}

describe('The Get All Kanji Webworker', () => {
  afterEach(async () => {
    await teardownDB()
  })

  it('Should pass along an error if the DB has not been initialized.', async () => {
    await expect(getResponse('')).rejects.toBe('No objectStore named kanji in this database')
  })

  it('Should return an empty array if no Kanji are loaded.', async () => {
    await initDB()
    const response = await getResponse('')
    expect(response).toEqual([])
  })

  it('Should return any stored Kanji when asked.', async () => {
    const storedKanji = [
      {
        char: 'a',
        stroke: 1,
        meanings: ['a'],
        readings: ['b'],
        frequency: 1
      },

      {
        char: 'b',
        stroke: 2,
        meanings: ['c'],
        readings: ['d'],
        frequency: 2
      }
    ]

    await initDB()
    await fillDB(storedKanji)
    const response = await getResponse('')

    expect(response).toEqual(storedKanji)
  })
})
