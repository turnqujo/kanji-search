import { loadWorker } from "../../test-utils/webworker"
import { initDB } from "../../test-utils/db"

describe('The Get All Kanji Worker.', () => {
  afterEach(async (done) => {
    indexedDB.deleteDatabase('kanjiStore')
    done()
  })

  it('Should return an empty array if no Kanji have been loaded.', async (done) => {
    await initDB()
    const worker = await loadWorker('src/webworkers/getAllKanji.js')
    const response = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e)
      worker.postMessage('')
    })

    expect(response).toEqual({ data: [] })
    done()
  })

  it('Should return an array filled with every Kanji available when asked.', async (done) => {
    const kanji = [
      {
        char: '亜',
        stroke: '7',
        meanings: ['Asia', 'rank next', 'come after', '-ous'],
        readings: ['ア', 'つ.ぐ']
      },
      {
        char: '唖',
        stroke: '10',
        meanings: ['mute', 'dumb'],
        readings: ['ア', 'アク', 'おし']
      }
    ]
    await initDB(kanji)

    const worker = await loadWorker('src/webworkers/getAllKanji.js')
    const response = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e)
      worker.postMessage(null)
    })

    expect(response).toEqual({ data: kanji })
    done()
  })
})
