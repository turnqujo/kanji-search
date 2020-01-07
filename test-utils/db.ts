import { Kanji } from "../src/models/kanji"

let version = 1;
export function initDB(): Promise<boolean> {
  const openRequest = indexedDB.open('kanjiStore', version)
  version++;

  return new Promise(resolve => {
    openRequest.onupgradeneeded = () => {

      // TODO: Teardown function which would make this unnecessary
      let storedKanji
      try {
        storedKanji = openRequest.result.createObjectStore('kanji', { keyPath: 'char' })
      } catch (e) {
        // Something happened while trying to create the kanji store; likely already exists

        openRequest.result.close()
        resolve(true)
        return
      }

      storedKanji.createIndex('stroke', 'stroke', { unique: false })
      storedKanji.createIndex('meanings', 'meanings', { unique: false, multiEntry: true })
      storedKanji.createIndex('readings', 'readings', { unique: false })
      openRequest.result.close()
      resolve(true)
    }

    openRequest.onblocked = () => {
      resolve(false)
      openRequest.result.close()
    }

    openRequest.onerror = () => {
      // TODO: Some sort of logging; just ignore for now
    }

    openRequest.onsuccess = () => {
      // NOTE: Because we are opening the DB with a new version, this shouldn't be called
      resolve(false)
    }
  })
}

export function fillDB(newData: Kanji[]): Promise<boolean> {
  return new Promise(resolve => {
    const openRequest = indexedDB.open('kanjiStore')

    openRequest.onsuccess = () => {
      const db = openRequest.result
      const transaction = db.transaction('kanji', 'readwrite')
      transaction.objectStore('kanji').clear()
      newData.forEach(newKanji => transaction.objectStore('kanji').add(newKanji))
      db.close()
      resolve(true)
    }
  })
}

// TODO: Teardown function which can be called after each test
