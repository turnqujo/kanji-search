import TestEnvWorker from '../../test-utils/test-env-worker'
import { Kanji } from '../../../models/kanji'

const nahaKanji: Kanji = {
  char: 'A',
  stroke: 1,
  meanings: ['Hiragana "naha"'],
  readings: ['なは']
}

const nahanoKanji: Kanji = {
  char: 'A',
  stroke: 1,
  meanings: ['Fake word "nahano"'],
  readings: ['ナハノ', 'なはの']
}

const onnaKanji: Kanji = {
  char: 'B',
  stroke: 2,
  meanings: ['Hiragana "onna"'],
  readings: ['おんな']
}

const shiitakeKanji: Kanji = {
  char: 'C',
  stroke: 3,
  meanings: ['Hiragana "shiitake"'],
  readings: ['しいたけ']
}

const kanjiSet: Kanji[] = [nahaKanji, nahanoKanji, onnaKanji, shiitakeKanji]

const worker = new TestEnvWorker('src/workers/getKanjiByKana.ts')

describe('The Get Kanji by Kana Webworker', () => {
  it('Should return an empty array if given an empty kanji set.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ kana: 'か', kanjiSet: [], matchOption: 'anywhere' })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should return an empty array if given an empty string instead of kana.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ kana: '', kanjiSet, matchOption: 'anywhere' })
    })

    expect(response).toEqual([])
    done()
  })

  it('Should support searching by matching only the starts of kanji readings.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ kana: 'な', kanjiSet, matchOption: 'start' })
    })

    expect(response).toEqual([nahaKanji, nahanoKanji])
    done()
  })

  it('Should support searching by matching at least one of the exact kanji readings.', async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ kana: 'なは', kanjiSet, matchOption: 'exact' })
    })

    expect(response).toEqual([nahaKanji])
    done()
  })

  it("Should support searching by matching anywhere within at least one of the kanji's readings.", async (done) => {
    const response = await new Promise((resolve, reject) => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.onerror = (e: string | Event) => reject(e)
      worker.postMessage({ kana: 'いた', kanjiSet, matchOption: 'anywhere' })
    })

    expect(response).toEqual([shiitakeKanji])
    done()
  })
})
