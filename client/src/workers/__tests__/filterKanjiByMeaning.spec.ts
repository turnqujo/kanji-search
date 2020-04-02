import TestEnvWorker from './test-utils/test-env-worker'
import { Kanji } from '../../models/kanji'

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
  readings: ['asdf'],
  frequency: 2
}

interface Props {
  kanjiSet: Kanji[]
  searchTerm: string
}

const worker = new TestEnvWorker<Props, Kanji[]>('src/workers/filterKanjiByMeaning.worker.ts')

async function getResponse(message: Props): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage(message)
  })
}

describe('The Filter Kanji by Meaning Webworker', () => {
  it('Should return an empty array when given an empty array of kanji.', async () => {
    const response = await getResponse({ kanjiSet: [], searchTerm: 'Some Search Term' })

    expect(response).toEqual([])
  })

  it('Should return an empty array when the given search term was not found.', async () => {
    const response = await getResponse({
      kanjiSet: [kanjiA, kanjiB, kanjiC],
      searchTerm: 'Some Search Term'
    })

    expect(response).toEqual([])
  })

  it('Should return any kanji which pass a substring search.', async () => {
    const response = await getResponse({
      kanjiSet: [kanjiA, kanjiB, kanjiC],
      searchTerm: 'aa'
    })

    expect(response).toEqual([kanjiA, kanjiC])
  })

  it('Should be case insensitive.', async () => {
    const response = await getResponse({
      kanjiSet: [kanjiA, kanjiB, kanjiC],
      searchTerm: 'öL'
    })

    expect(response).toEqual([kanjiC])
  })
})
