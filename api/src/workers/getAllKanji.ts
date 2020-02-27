// @ts-ignore
importScripts('utility-scripts/dbUtil.js')

onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = () =>
  openDB('kanjiStore').then((db) => {
    getTransaction(db, 'kanji', 'readonly')
      .then((transaction) => {
        const request = transaction.objectStore('kanji').getAll()

        request.onsuccess = () => {
          db.close()

          // @ts-ignore
          postMessage(request.result)
        }
      })
      .catch((error) => {
        if (onerror) {
          ;(onerror as any)(error)
        }

        db.close()
      })
  })