onmessage = (_e) => {
  fetch('../../build/all_kanji.json')
  // fetch('../../build/kanji_final.json')
  .then(raw => raw.json())
  .then(kanjiSet => {
    let db;
    const DBOpenRequest = indexedDB.open('kanjiStore')

    DBOpenRequest.onupgradeneeded = (_e) => {
      db = DBOpenRequest.result

      const kanjiStore = db.createObjectStore('kanjiStore', { keyPath: 'char' })
      kanjiStore.createIndex('stroke', 'stroke', { unique: false })
      kanjiStore.createIndex('meanings', 'meanings', { unique: false, multiEntry: true })
      kanjiStore.createIndex('readings', 'readings', { unique: false })

      kanjiSet.forEach(kanji => kanjiStore.add(kanji))
      postMessage(true)
    }

    // TODO: Better handling
    DBOpenRequest.onsuccess = (_e) => postMessage(true)
    DBOpenRequest.onerror = (_e) => postMessage(true)
    DBOpenRequest.onblocked = (_e) => postMessage(true)
  })
}
