import { loadWorker } from "../../test-utils/webworker"
import { tearDownDB } from "../../test-utils/db"
import Event from 'events'

describe('The Kanji Loader Webworker.', () => {
  beforeEach(async (done) => {
    await tearDownDB()
    // TODO: Something strange is going on here with global.fetch
    jest.resetAllMocks()
    done()
  })

  afterEach(async (done) => {
    await tearDownDB()
    jest.resetAllMocks()
    done()
  })

  // it('Should load the given Kanji.', async done => {
  //   const kanji: Kanji[] = [
  //     {
  //       char: '亜',
  //       stroke: '7',
  //       meanings: ['Asia', 'rank next', 'come after', '-ous'],
  //       readings: ['ア', 'つ.ぐ']
  //     },
  //     {
  //       char: '唖',
  //       stroke: '10',
  //       meanings: ['mute', 'dumb'],
  //       readings: ['ア', 'アク', 'おし']
  //     }
  //   ]

  //   const worker = await loadWorker('src/webworkers/loadKanji.ts')

  //   const response = await new Promise(resolve => {
  //     if (worker === null) {
  //       fail()
  //     }

  //     worker.onmessage = (e) => resolve(e)
  //     worker.onerror = err => fail(err)
  //     worker.postMessage(kanji)
  //   })

  //   expect(response).toEqual({ data: true })

  //   const storedKanji = await new Promise(resolve => {
  //     const DBOpenRequest = indexedDB.open('kanjiStore')
  //     DBOpenRequest.onsuccess = (e: any) => {
  //       const db = e.target.result
  //       db
  //         .transaction('kanjiStore')
  //         .objectStore('kanjiStore')
  //         .getAll()
  //         .onsuccess = (res: any) => {
  //           resolve(res?.target?.result)
  //           db.close()
  //         }
  //     }
  //   })

  //   expect(storedKanji).toEqual(kanji)
  //   done()
  // })

  it('Should not break if given an empty Kanji set.', async done => {
    const worker = loadWorker('loadKanji.js')

    done()
    // console.log('Loading worker')

    // const worker = loadWorker('loadKanji.ts');
    // worker.on('error', err => {
    //   console.log('Failed')
    //   fail(err)
    // })

    // console.log(require('./loadKanji'))

    // console.log('Worker loaded')

    // const response = await new Promise(resolve => {
    //   console.log('attaching listeners')


    //   const emitter = new Event.EventEmitter()
    //   worker.addListener('message', _ => resolve(true))
    //   worker.emit('message')

    //   worker.on('message', (e) => {
    //     console.log('Message received')
    //     resolve(e)
    //   })

    //   console.log('posting')
    //   worker.postMessage([])
    // })

    // console.log('expecting')
    // expect(response).toEqual({ data: true })
    // done()
  })
})
