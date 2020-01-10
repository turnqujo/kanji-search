importScripts('dbUtil.js')

onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = async _ => {
  const db = await openDB('kanjiStore')

  getTransaction(db, 'kanji', 'readonly')
    .then(transaction => {
      const request = transaction.objectStore('kanji').getAll()

      request.onsuccess = () => {
        db.close()
        postMessage(request.result)
      }
    })
    .catch(error => {
      if (onerror) {
        (onerror as any)(error)
      }

      db.close()
    })
}
