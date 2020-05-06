import TestEnvWorker from './test-utils/test-env-worker'
import { Kanji, SortOptions } from '../../models'

const nahaKanji: Kanji = {
  char: '亜',
  stroke: 4,
  meanings: ['Hiragana "naha"'],
  readings: {
    on: ['なは'],
    kun: [],
    nanori: []
  },
  jlpt: null,
  grade: 1,
  set: [],
  frequency: 4
}

const nahanoKanji: Kanji = {
  char: '帰',
  stroke: 1,
  meanings: ['Katakana "nahano"'],
  readings: {
    on: ['ナハノ'],
    kun: [],
    nanori: []
  },
  jlpt: null,
  grade: 1,
  set: [],
  frequency: 2
}

const onnaKanji: Kanji = {
  char: '年',
  stroke: 2,
  meanings: ['Hiragana "onna"'],
  readings: {
    on: ['おんな'],
    kun: [],
    nanori: []
  },
  jlpt: null,
  grade: 2,
  set: [],
  frequency: 3
}

const shiKanji: Kanji = {
  char: '謎',
  stroke: 3,
  meanings: ['Hiragana "shiitake"'],
  readings: {
    on: ['しいたけ'],
    kun: [],
    nanori: []
  },
  jlpt: null,
  grade: null,
  set: [],
  frequency: 1
}

const kanjiSet: Kanji[] = [nahaKanji, nahanoKanji, onnaKanji, shiKanji]

interface Props {
  kanjiSet: Kanji[]
  primary: SortOptions
  secondary: SortOptions | null
}

const worker = new TestEnvWorker<Props, Kanji[]>('src/workers/sortKanji.worker.ts')

async function getResponse(message: Props): Promise<Kanji[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage(message)
  })
}

describe('The Sort Kanji Webworker', () => {
  it('Should return an empty array if given an empty set of kanji.', async () => {
    const response = await getResponse({
      kanjiSet: [],
      primary: {
        field: 'frequency',
        direction: 'asc'
      },
      secondary: null
    })

    expect(response).toEqual([])
  })

  it('Should support sorting by stroke count, descending.', async () => {
    const response = await getResponse({
      kanjiSet,
      primary: {
        field: 'strokeCount',
        direction: 'desc'
      },
      secondary: null
    })

    expect(response).toEqual([nahaKanji, shiKanji, onnaKanji, nahanoKanji])
  })

  it('Should support sorting by stroke count, ascending.', async () => {
    const response = await getResponse({
      kanjiSet,
      primary: {
        field: 'strokeCount',
        direction: 'asc'
      },
      secondary: null
    })

    expect(response).toEqual([nahanoKanji, onnaKanji, shiKanji, nahaKanji])
  })

  it('Should support sorting by stroke count, even when a kanji has multiple counts.', async () => {
    const multiStrokeKanji = {
      char: '操',
      stroke: [0, 15],
      meanings: ['Multiple stroke options'],
      readings: {
        on: [],
        kun: [],
        nanori: []
      },
      jlpt: null,
      grade: null,
      set: [],
      frequency: 1
    }

    const response = await getResponse({
      kanjiSet: [multiStrokeKanji, ...kanjiSet],
      primary: {
        field: 'strokeCount',
        direction: 'asc'
      },
      secondary: null
    })

    expect(response).toEqual([multiStrokeKanji, nahanoKanji, onnaKanji, shiKanji, nahaKanji])
  })

  it('Should support sorting by unicode order, descending.', async () => {
    const response = await getResponse({
      kanjiSet,
      primary: {
        field: 'unicode',
        direction: 'desc'
      },
      secondary: null
    })

    expect(response).toEqual([nahaKanji, nahanoKanji, onnaKanji, shiKanji])
  })

  it('Should support sorting by unicode order, ascending.', async () => {
    const response = await getResponse({
      kanjiSet,
      primary: {
        field: 'unicode',
        direction: 'asc'
      },
      secondary: null
    })

    expect(response).toEqual([shiKanji, onnaKanji, nahanoKanji, nahaKanji])
  })

  it('Should support sorting by usage frequency, descending.', async () => {
    const response = await getResponse({
      kanjiSet,
      primary: {
        field: 'frequency',
        direction: 'desc'
      },
      secondary: null
    })

    expect(response).toEqual([nahaKanji, onnaKanji, nahanoKanji, shiKanji])
  })

  it('Should support sorting by usage frequency, ascending.', async () => {
    const response = await getResponse({
      kanjiSet,
      primary: {
        field: 'frequency',
        direction: 'asc'
      },
      secondary: null
    })

    expect(response).toEqual([shiKanji, nahanoKanji, onnaKanji, nahaKanji])
  })

  it('Should treat kanji without frequency rankings as having an infinite rank.', async () => {
    const unrankedKanji = {
      char: '帰',
      stroke: 1,
      meanings: ['Katakana "nahano"'],
      readings: {
        on: [],
        kun: [],
        nanori: []
      },
      jlpt: null,
      grade: null,
      set: [],
      frequency: null // Infinity is not valid JSON
    }

    const ascResponse = await getResponse({
      kanjiSet: [...kanjiSet, unrankedKanji],
      primary: {
        field: 'frequency',
        direction: 'asc'
      },
      secondary: null
    })

    const expectedAscOrder = [shiKanji, nahanoKanji, onnaKanji, nahaKanji, unrankedKanji]
    expect(ascResponse).toEqual(expectedAscOrder)

    const descResponse = await getResponse({
      kanjiSet: [...kanjiSet, unrankedKanji],
      primary: {
        field: 'frequency',
        direction: 'desc'
      },
      secondary: null
    })

    const expectedDescOrder = [unrankedKanji, nahaKanji, onnaKanji, nahanoKanji, shiKanji]
    expect(descResponse).toEqual(expectedDescOrder)
  })

  it('Should support sorting by a secondary criteria.', async () => {
    const response = await getResponse({
      kanjiSet: kanjiSet,
      primary: {
        field: 'grade',
        direction: 'asc'
      },
      secondary: {
        field: 'frequency',
        direction: 'asc'
      }
    })

    expect(response).toEqual([nahanoKanji, nahaKanji, onnaKanji, shiKanji])
  })

  it('Should not apply a second sort if sorting by unicode, since it will be unambiguous.', async () => {
    const response = await getResponse({
      kanjiSet: kanjiSet,
      primary: {
        field: 'unicode',
        direction: 'asc'
      },
      secondary: {
        field: 'frequency',
        direction: 'asc'
      }
    })

    expect(response).toEqual([shiKanji, onnaKanji, nahanoKanji, nahaKanji])
  })
})
