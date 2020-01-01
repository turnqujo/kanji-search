import { Kanji } from "../src/models/kanji"

// TODO: This contains a lot of duplicated code
export function initDB(newKanji: Kanji[] = []): Promise<void> {
  return new Promise((resolve) => {
    let db
    const dbRequest = indexedDB.open('kanjiStore')

    dbRequest.onupgradeneeded = (_e) => {
      db = dbRequest.result
      const kanjiStore = db.createObjectStore('kanjiStore', { keyPath: 'char' })
      kanjiStore.createIndex('stroke', 'stroke', { unique: false })
      kanjiStore.createIndex('meanings', 'meanings', {
        unique: false,
        multiEntry: true
      })
      kanjiStore.createIndex('readings', 'readings', { unique: false })

      newKanji.forEach(kanji => kanjiStore.add(kanji))

      db.close()
      resolve()
    }
  })
}

export function tearDownDB(): Promise<void> {
  return new Promise(resolve => {
    indexedDB.deleteDatabase('kanjiStore')
    resolve()
  })
}
