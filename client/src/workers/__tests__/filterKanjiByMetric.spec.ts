import { Kanji, MinMax } from '../../models'
import TestEnvWorker from './test-utils/test-env-worker'

type MetricType = 'jlpt' | 'grade'

interface WorkerProps {
  kanji: Kanji[]
  metricType: MetricType
  metric: string | number | MinMax
}

const worker = new TestEnvWorker<WorkerProps, Kanji[]>('src/workers/filterKanjiByMetric.worker.ts')

const kanjiA: Kanji = {
  char: 'a',
  stroke: 1,
  meanings: [],
  readings: {
    on: [],
    kun: [],
    nanori: []
  },
  jlpt: 1,
  grade: 1,
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
  jlpt: 2,
  grade: 2,
  set: ['jinmeiyou'],
  frequency: 1
}

const kanjiC: Kanji = {
  char: 'c',
  stroke: 1,
  meanings: [],
  readings: {
    on: [],
    kun: [],
    nanori: []
  },
  jlpt: 3,
  grade: 3,
  set: ['jinmeiyou'],
  frequency: 1
}

async function getResponse(
  kanji: Kanji[],
  metricType: MetricType,
  metric: string | number | MinMax
): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage({ kanji, metricType, metric })
  })
}

describe('The Filter Kanji By Metric Webworker', () => {
  it('Should return an empty array if no kanji are provided.', async () => {
    const response = await getResponse([], 'grade', 3)
    expect(response).toEqual([])
  })

  it('Should support filtering by JLPT level.', async () => {
    const response = await getResponse([kanjiA, kanjiB], 'jlpt', 2)
    expect(response).toEqual([kanjiB])
  })

  it('Should support filtering by Grade level.', async () => {
    const response = await getResponse([kanjiA, kanjiB], 'grade', 1)
    expect(response).toEqual([kanjiA])
  })

  it('Should support filtering using a min/max range.', async () => {
    const response = await getResponse([kanjiA, kanjiB, kanjiC], 'grade', { min: 1, max: 2 })
    expect(response).toEqual([kanjiA, kanjiB])
  })

  it('Should coerce a null min/max value to infinity, allowing for unrestricted upper / lower bounds.', async () => {
    const response = await getResponse([kanjiA, kanjiB, kanjiC], 'grade', { min: 2, max: null })
    expect(response).toEqual([kanjiB, kanjiC])
  })
})
