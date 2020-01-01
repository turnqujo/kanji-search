import { Kanji } from '../models/kanji'

this.addEventListener('message', (e: MessageEvent) => {
  console.log('onmessage!')
  const kanjiSet: Kanji[] = e.data
  const DBOpenRequest = indexedDB.open('kanjiStore')
  let db: IDBDatabase | null;
  DBOpenRequest.onupgradeneeded = (_) => {
    console.log('onupgradeneeded!', e.data.length)

    db = DBOpenRequest.result
    const kanjiStore = db.createObjectStore('kanjiStore', { keyPath: 'char' })
    kanjiStore.createIndex('stroke', 'stroke', { unique: false })
    kanjiStore.createIndex('meanings', 'meanings', { unique: false, multiEntry: true })
    kanjiStore.createIndex('readings', 'readings', { unique: false })

    kanjiSet.forEach((kanji: Kanji) => kanjiStore.add(kanji))
    db.close()
    this.postMessage(true, '*')
  }

  DBOpenRequest.onsuccess = successEvent => {
    console.log('onsuccess!', e.data.length)
    if (db) {
      db.close()
    }
  }
})
