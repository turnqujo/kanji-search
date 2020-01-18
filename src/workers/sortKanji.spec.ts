import TestEnvWorker from '../../test-utils/test-env-worker'

const nahaKanji = {
  char: '亜',
  stroke: 4,
  meanings: ['Hiragana "naha"'],
  readings: ['なは']
}

const nahanoKanji = {
  char: '帰',
  stroke: 1,
  meanings: ['Katakana "nahano"'],
  readings: ['ナハノ']
}

const onnaKanji = {
  char: '年',
  stroke: 2,
  meanings: ['Hiragana "onna"'],
  readings: ['おんな']
}

const shiKanji = {
  char: '謎',
  stroke: 3,
  meanings: ['Hiragana "shiitake"'],
  readings: ['しいたけ']
}

const kanjiSet = [nahaKanji, nahanoKanji, onnaKanji, shiKanji]

const worker = new TestEnvWorker('src/workers/sortKanji.ts')

describe('The Sort Kanji Webworker', () => {
  it('Should return an empty array if given an empty set of kanji.', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ kanjiSet: [], sortBy: '', sortDirection: '' })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should support sorting by stroke count, descending.', async done => {
    const descendingResponse = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'strokeCount',
        sortDirection: 'desc'
      })
    })

    expect(descendingResponse).toEqual([nahaKanji, shiKanji, onnaKanji, nahanoKanji])
    done()
  })

  it('Should support sorting by stroke count, ascending.', async done => {
    const ascendingResponse = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'strokeCount',
        sortDirection: 'asc'
      })
    })

    expect(ascendingResponse).toEqual([nahanoKanji, onnaKanji, shiKanji, nahaKanji])
    done()
  })

  it('Should support sorting by stroke count, even when a kanji has multiple counts.', async done => {
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
        kanjiSet: [
          multiStrokeKanji,
          ...kanjiSet
        ],
        sortBy: 'strokeCount',
        sortDirection: 'asc'
      })
    })

    expect(ascendingResponse).toEqual([multiStrokeKanji, nahanoKanji, onnaKanji, shiKanji, nahaKanji])
    done()
  })


  it('Should support sorting by unicode order, descending.', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'unicode',
        sortDirection: 'desc'
      })
    })

    expect(response).toEqual([nahaKanji, nahanoKanji, onnaKanji, shiKanji])
    done()
  })

  it('Should support sorting by unicode order, ascending.', async done => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({
        kanjiSet,
        sortBy: 'unicode',
        sortDirection: 'asc'
      })
    })

    expect(response).toEqual([shiKanji, onnaKanji, nahanoKanji, nahaKanji])
    done()
  })


  it.todo('Should support sorting by usage frequency.')
})
