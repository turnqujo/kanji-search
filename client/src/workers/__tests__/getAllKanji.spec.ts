import TestEnvWorker from './test-utils/test-env-worker'
import { initDB, fillDB, teardownDB } from './test-utils/db'
import { Kanji } from '@/models/kanji'

const worker = new TestEnvWorker<string, Kanji[]>('src/workers/getAllKanji.worker.ts')

async function getResponse(): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage('')
  })
}

describe('The Get All Kanji Webworker', () => {
  beforeEach(async () => {
    await initDB()
  })

  afterEach(async () => {
    await teardownDB()
  })

  it('Should return an empty array if no Kanji are loaded.', async () => {
    const response = await getResponse()
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

    await fillDB(storedKanji)
    const response = await getResponse()
    expect(response).toEqual(storedKanji)
  })
})
