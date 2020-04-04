import { Kanji } from '../../../models/kanji'

// NOTE: initDB expects the kanjiStore DB to not exist
export function initDB(): Promise<boolean> {
  return new Promise((resolve) => {
    const openRequest = indexedDB.open('kanjiStore')

    openRequest.onupgradeneeded = () => {
      const jooyooKanjiStore = openRequest.result.createObjectStore('kanji-jooyoo', {
        keyPath: 'char'
      })
      jooyooKanjiStore.createIndex('stroke', 'stroke', { unique: false })
      jooyooKanjiStore.createIndex('meanings', 'meanings', { unique: false, multiEntry: true })
      jooyooKanjiStore.createIndex('readings', 'readings', { unique: false })

      const jinmeiyooStore = openRequest.result.createObjectStore('kanji-jinmeiyoo', {
        keyPath: 'char'
      })
      jinmeiyooStore.createIndex('stroke', 'stroke', { unique: false })
      jinmeiyooStore.createIndex('meanings', 'meanings', { unique: false, multiEntry: true })
      jinmeiyooStore.createIndex('readings', 'readings', { unique: false })

      openRequest.result.close()
      resolve(true)
    }

    openRequest.onblocked = () => {
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

export function fillDB(newData: Kanji[], kanjiSet: 'jooyoo' | 'jinmeiyoo'): Promise<boolean> {
  const storeName = `kanji-${kanjiSet}`
  return new Promise((resolve) => {
    const openRequest = indexedDB.open('kanjiStore')

    openRequest.onsuccess = () => {
      const db = openRequest.result
      const transaction = db.transaction(storeName, 'readwrite')

      newData.forEach((newKanji) => transaction.objectStore(storeName).add(newKanji))

      db.close()
      resolve(true)
    }
  })
}

export function teardownDB(): Promise<boolean> {
  return new Promise((resolve) => {
    const result = indexedDB.deleteDatabase('kanjiStore')
    result.onsuccess = () => {
      resolve(true)
    }
  })
}
