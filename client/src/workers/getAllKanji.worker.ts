importScripts('utility-scripts/dbUtil.js')

onmessage = (e: MessageEvent) => {
  const { kanjiSet } = e.data as {
    kanjiSet: 'jooyoo' | 'jinmeiyoo'
  }

  openDB('kanjiStore').then((db) => {
    getTransaction(db, `kanji-${kanjiSet}`, 'readonly')
      .then((transaction) => {
        const request = transaction.objectStore(`kanji-${kanjiSet}`).getAll()

        request.onsuccess = () => {
          db.close()
          postMessage(request.result)
        }
      })
      .catch((error) => {
        db.close()
        throw error
      })
  })
}
