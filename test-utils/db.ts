import { Kanji } from "../src/models/kanji"

// NOTE: initDB expects the kanjiStore DB to not exist
export function initDB(): Promise<boolean> {
  return new Promise(resolve => {
    const openRequest = indexedDB.open('kanjiStore')

    openRequest.onupgradeneeded = () => {
      const storedKanji = openRequest.result.createObjectStore('kanji', { keyPath: 'char' })
      storedKanji.createIndex('stroke', 'stroke', { unique: false })
      storedKanji.createIndex('meanings', 'meanings', { unique: false, multiEntry: true })
      storedKanji.createIndex('readings', 'readings', { unique: false })
      openRequest.result.close()
      resolve(true)
    }

    openRequest.onblocked = () => {
      openRequest.result.close()
    }

    openRequest.onerror = (e) => {
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

export function teardownDB(): Promise<boolean> {
  return new Promise(resolve => {
    const result = indexedDB.deleteDatabase('kanjiStore')
    result.onsuccess = () => {
      resolve(true)
    }
  })
}
