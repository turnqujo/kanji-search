import TestEnvWorker from './test-utils/test-env-worker'
import { Kanji, KanjiSet } from '../../models'

interface WorkerProps {
  kanjiSet: Kanji[]
  desiredSets: KanjiSet[]
}

const worker = new TestEnvWorker<WorkerProps, Kanji[]>('src/workers/getKanjiBySet.worker.ts')

async function getResponse(kanjiSet: Kanji[], desiredSets: KanjiSet[]): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage({ kanjiSet, desiredSets })
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

describe('The Get Kanji by Set Webworker', () => {
  it('Should return an empty array if no Kanji are loaded.', async () => {
    const response = await getResponse([], ['jinmeiyou'])
    expect(response).toEqual([])
  })

  it('Should return all kanji, regardless of set, if no set is asked for.', async () => {
    const allKanji = await getResponse([kanjiA, kanjiB], [])
    expect(allKanji).toEqual([kanjiA, kanjiB])
  })

  it('Should return any stored Kanji from the desired sets when asked.', async () => {
    const jooyooKanji = await getResponse([kanjiA, kanjiB], ['jouyou'])
    expect(jooyooKanji).toEqual([kanjiA])

    const jinmeiyooKanji = await getResponse([kanjiA, kanjiB], ['jlpt'])
    expect(jinmeiyooKanji).toEqual([])

    const combined = await getResponse([kanjiA, kanjiB], ['jouyou', 'jinmeiyou'])
    expect(combined).toEqual([kanjiA, kanjiB])
  })
})
