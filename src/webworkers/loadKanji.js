onmessage = (_) => {
  fetch('all_kanji.json')
  .then(raw => raw.json())
  .then(kanjiSet => {
    let db;
    const DBOpenRequest = indexedDB.open('kanjiStore')

    DBOpenRequest.onupgradeneeded = (_) => {
      db = DBOpenRequest.result

      const kanjiStore = db.createObjectStore('kanjiStore', { keyPath: 'char' })
      kanjiStore.createIndex('stroke', 'stroke', { unique: false })
      kanjiStore.createIndex('meanings', 'meanings', { unique: false, multiEntry: true })
      kanjiStore.createIndex('readings', 'readings', { unique: false })

      kanjiSet.forEach(kanji => kanjiStore.add(kanji))
      postMessage(true)
    }

    // TODO: Better handling
    DBOpenRequest.onsuccess = (_) => postMessage(true)
    DBOpenRequest.onerror = (_) => postMessage(true)
    DBOpenRequest.onblocked = (_) => postMessage(true)
  })
}
