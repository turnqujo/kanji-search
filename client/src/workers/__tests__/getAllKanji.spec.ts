import TestEnvWorker from './test-utils/test-env-worker'
import { initDB, fillDB, teardownDB } from './test-utils/db'
import { Kanji, KanjiSet } from '@/models'

interface WorkerProps {
  kanjiSet: KanjiSet
}

const worker = new TestEnvWorker<WorkerProps, Kanji[]>('src/workers/getAllKanji.worker.ts')

async function getResponse(kanjiSet: KanjiSet): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage({ kanjiSet })
  })
}

describe('The Get All Kanji Webworker', () => {
  beforeEach(async () => {
    if (!(await initDB())) {
      fail('Was not able to successfully init DB.')
    }
  })

  afterEach(async () => {
    await teardownDB()
  })

  it('Should return an empty array if no Kanji are loaded.', async () => {
    const response = await getResponse('jinmeiyoo')
    expect(response).toEqual([])
  })

  it('Should return any stored Kanji from a specific set when asked.', async () => {
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

    await fillDB(storedKanji, 'jooyoo')
    await fillDB([], 'jinmeiyoo')

    const jooyooKanji = await getResponse('jooyoo')
    expect(jooyooKanji).toEqual(storedKanji)

    const jinmeiyooKanji = await getResponse('jinmeiyoo')
    expect(jinmeiyooKanji).toEqual([])
  })
})
