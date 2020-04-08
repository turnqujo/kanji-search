import TestEnvWorker from './test-utils/test-env-worker'
import { initDB, fillDB, teardownDB } from './test-utils/db'
import { Kanji, KanjiSet } from '../../models'

interface WorkerProps {
  kanjiSet: KanjiSet
}

const worker = new TestEnvWorker<WorkerProps, Kanji[]>('src/workers/getKanji.worker.ts')

async function getResponse(kanjiSet: KanjiSet): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage({ kanjiSet })
  })
}

const kanjiA: Kanji = {
  char: 'a',
  stroke: 1,
  meanings: [],
  readings: {
    on: [],
    kun: [],
    nanori: []
  },
  jlpt: null,
  grade: null,
  set: ['jouyou'],
  frequency: 1
}

const kanjiB: Kanji = {
  char: 'b',
  stroke: 1,
  meanings: [],
  readings: {
    on: [],
    kun: [],
    nanori: []
  },
  jlpt: null,
  grade: null,
  set: ['jinmeiyou'],
  frequency: 1
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
    const response = await getResponse(['jinmeiyou'])
    expect(response).toEqual([])
  })

  it('Should return all kanji, regardless of set, if no set is asked for.', async () => {
    await fillDB([kanjiA, kanjiB])

    const allKanji = await getResponse([])
    expect(allKanji).toEqual([kanjiA, kanjiB])
  })

  it('Should return any stored Kanji from the desired sets when asked.', async () => {
    await fillDB([kanjiA, kanjiB])

    const jooyooKanji = await getResponse(['jouyou'])
    expect(jooyooKanji).toEqual([kanjiA])

    const jinmeiyooKanji = await getResponse(['jlpt'])
    expect(jinmeiyooKanji).toEqual([])

    const combined = await getResponse(['jouyou', 'jinmeiyou'])
    expect(combined).toEqual([kanjiA, kanjiB])
  })
})
