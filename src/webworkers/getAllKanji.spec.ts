import JestWorker from '../../test-utils/jest-worker'
import { initDB, fillDB } from '../../test-utils/db'

describe('The Get All Kanji Webworker', () => {
  let worker: JestWorker

  beforeAll(done => {
    worker = new JestWorker('src/webworkers/getAllKanji.ts')
    done()
  })

  it('Should return an empty array if no Kanji are loaded.', async done => {
    await initDB()

    const response = await new Promise(resolve => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('')
    })

    expect(response).toEqual([])
    done()
  })

  it('Should return any stored Kanji when asked.', async done => {
    const storedKanji = [
      {
        char: 'a',
        stroke: 1,
        meanings: ['a'],
        readings: ['b']
      },

      {
        char: 'b',
        stroke: 2,
        meanings: ['c'],
        readings: ['d']
      }
    ]

    await initDB()
    await fillDB(storedKanji)

    const response = await new Promise(resolve => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('')
    })

    expect(response).toEqual(storedKanji)
    done()
  })
})
