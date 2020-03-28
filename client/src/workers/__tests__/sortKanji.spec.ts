import TestEnvWorker from './test-utils/test-env-worker'
import { Kanji } from '../../models/kanji'

const nahaKanji: Kanji = {
  char: '亜',
  stroke: 4,
  meanings: ['Hiragana "naha"'],
  readings: ['なは'],
  frequency: 4
}

const nahanoKanji: Kanji = {
  char: '帰',
  stroke: 1,
  meanings: ['Katakana "nahano"'],
  readings: ['ナハノ'],
  frequency: 2
}

const onnaKanji: Kanji = {
  char: '年',
  stroke: 2,
  meanings: ['Hiragana "onna"'],
  readings: ['おんな'],
  frequency: 3
}

const shiKanji: Kanji = {
  char: '謎',
  stroke: 3,
  meanings: ['Hiragana "shiitake"'],
  readings: ['しいたけ'],
  frequency: 1
}

const kanjiSet = [nahaKanji, nahanoKanji, onnaKanji, shiKanji]

const worker = new TestEnvWorker('src/workers/sortKanji.worker.ts')

describe('The Sort Kanji Webworker', () => {
  it('Should return an empty array if given an empty set of kanji.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ kanjiSet: [], sortBy: '', order: '' })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should support sorting by stroke count, descending.', async (done) => {
    const descendingResponse = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'strokeCount',
        order: 'desc'
      })
    })

    expect(descendingResponse).toEqual([nahaKanji, shiKanji, onnaKanji, nahanoKanji])
    done()
  })

  it('Should support sorting by stroke count, ascending.', async (done) => {
    const ascendingResponse = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'strokeCount',
        order: 'asc'
      })
    })

    expect(ascendingResponse).toEqual([nahanoKanji, onnaKanji, shiKanji, nahaKanji])
    done()
  })

  it('Should support sorting by stroke count, even when a kanji has multiple counts.', async (done) => {
    const multiStrokeKanji = {
      char: '操',
      stroke: [0, 15],
      meanings: ['Multiple stroke options'],
      readings: ['Does not matter']
    }

    const ascendingResponse = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet: [multiStrokeKanji, ...kanjiSet],
        sortBy: 'strokeCount',
        order: 'asc'
      })
    })

    expect(ascendingResponse).toEqual([
      multiStrokeKanji,
      nahanoKanji,
      onnaKanji,
      shiKanji,
      nahaKanji
    ])
    done()
  })

  it('Should support sorting by unicode order, descending.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'unicode',
        order: 'desc'
      })
    })

    expect(response).toEqual([nahaKanji, nahanoKanji, onnaKanji, shiKanji])
    done()
  })

  it('Should support sorting by unicode order, ascending.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'unicode',
        order: 'asc'
      })
    })

    expect(response).toEqual([shiKanji, onnaKanji, nahanoKanji, nahaKanji])
    done()
  })

  it('Should support sorting by usage frequency, descending.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'frequency',
        order: 'desc'
      })
    })

    const expectedOrder = [nahaKanji, onnaKanji, nahanoKanji, shiKanji]
    expect(response).toEqual(expectedOrder)
    done()
  })

  it('Should support sorting by usage frequency, ascending.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'frequency',
        order: 'asc'
      })
    })

    const expectedOrder = [shiKanji, nahanoKanji, onnaKanji, nahaKanji]
    expect(response).toEqual(expectedOrder)
    done()
  })

  it('Should treat kanji without frequency rankings as having an infinite rank.', async (done) => {
    const unrankedKanji = {
      char: '帰',
      stroke: 1,
      meanings: ['Katakana "nahano"'],
      readings: ['ナハノ'],
      frequency: null // Infinity is not valid JSON
    }

    const ascResponse = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet: [...kanjiSet, unrankedKanji],
        sortBy: 'frequency',
        order: 'asc'
      })
    })

    const descResponse = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet: [...kanjiSet, unrankedKanji],
        sortBy: 'frequency',
        order: 'desc'
      })
    })

    const expectedAscOrder = [shiKanji, nahanoKanji, onnaKanji, nahaKanji, unrankedKanji]
    expect(ascResponse).toEqual(expectedAscOrder)

    const expectedDescOrder = [unrankedKanji, nahaKanji, onnaKanji, nahanoKanji, shiKanji]
    expect(descResponse).toEqual(expectedDescOrder)

    done()
  })
})
