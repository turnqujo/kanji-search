import TestEnvWorker from './test-utils/test-env-worker'
import { Kanji, MatchOption } from '../../models'

const kanjiA: Kanji = {
  char: 'a',
  stroke: 1,
  meanings: ['aaa'],
  readings: {
    on: ['b'],
    kun: [],
    nanori: []
  },
  jlpt: 1,
  grade: 1,
  set: [],
  frequency: 0
}

const kanjiB: Kanji = {
  char: 'b',
  stroke: 2,
  meanings: ['c'],
  readings: {
    on: ['d'],
    kun: [],
    nanori: []
  },
  jlpt: 1,
  grade: 1,
  set: [],
  frequency: 1
}

const kanjiC: Kanji = {
  char: 'c',
  stroke: 2,
  meanings: ['öL', 'aa'],
  readings: {
    on: ['asdf'],
    kun: [],
    nanori: []
  },
  jlpt: 1,
  grade: 1,
  set: [],
  frequency: 2
}

const kanjiD: Kanji = {
  char: 'c',
  stroke: 2,
  meanings: ['aöL'],
  readings: {
    on: ['asdf'],
    kun: [],
    nanori: []
  },
  jlpt: 1,
  grade: 1,
  set: [],
  frequency: 2
}

const kanjiSet = [kanjiA, kanjiB, kanjiC, kanjiD]

interface Props {
  kanjiSet: Kanji[]
  searchTerm: string
  matchOption?: MatchOption
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
    const response = await getResponse({ kanjiSet, searchTerm: 'Some Search Term' })
    expect(response).toEqual([])
  })

  it('Should return any kanji which pass a substring search.', async () => {
    const response = await getResponse({ kanjiSet, searchTerm: 'aa' })
    expect(response).toEqual([kanjiA, kanjiC])
  })

  it('Should be case insensitive.', async () => {
    const response = await getResponse({ kanjiSet, searchTerm: 'öL' })
    expect(response).toEqual([kanjiC, kanjiD])
  })

  it('Should support searching exactly for the text given.', async () => {
    const response = await getResponse({ kanjiSet, searchTerm: 'aa', matchOption: 'exact' })
    expect(response).toEqual([kanjiC])
  })

  it('Should support searching for meanings starting with the given text.', async () => {
    const response = await getResponse({ kanjiSet, searchTerm: 'öL', matchOption: 'start' })
    expect(response).toEqual([kanjiC])
  })

  it('Should throw an error if given an unknown match option.', async () => {
    expect.assertions(1)

    await getResponse({ kanjiSet, searchTerm: 'öL', matchOption: 'unknown' as MatchOption }).catch((e) => {
      expect(e.message).toBe('Unknown match option.')
    })
  })
})
