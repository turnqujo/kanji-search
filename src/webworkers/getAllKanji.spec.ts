import JestWorker from '../../test-utils/jest-worker'

describe('The Get All Kanji Webworker', () => {
  it('Should return an empty array if no Kanji are loaded.', async done => {
    const worker = new JestWorker('src/webworkers/getAllKanji.ts')

    const DBOpenRequest = indexedDB.open('kanjiStore')

    await new Promise(resolve => {
      DBOpenRequest.onupgradeneeded = _e => {
        const kanjiStore = DBOpenRequest.result.createObjectStore(
          'kanjiStore',
          { keyPath: 'char' }
        )

        kanjiStore.createIndex('stroke', 'stroke', { unique: false })
        kanjiStore.createIndex('meanings', 'meanings', {
          unique: false,
          multiEntry: true
        })
        kanjiStore.createIndex('readings', 'readings', { unique: false })

        resolve(true)
      }
    })

    const response = await new Promise(resolve => {
      worker.onmessage = (res: any) => resolve(res.data)
      worker.postMessage('')
    })

    worker.terminate()

    expect(response).toEqual([])
    done()
  })

  it('Should return any stored Kanji when asked.', () => {})
})
