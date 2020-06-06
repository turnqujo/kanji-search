importScripts('utility-scripts/dbUtil.js')

addEventListener('message', (e: MessageEvent) => {
  const { kanjiSet } = e.data as {
    kanjiSet: KanjiSet[]
  }

  openDB('kanjiStore').then((db) => {
    getTransaction(db, 'kanji', 'readonly')
      .then((transaction) => {
        const request = transaction.objectStore('kanji').getAll()

        request.onsuccess = () => {
          db.close()
          if (kanjiSet.length === 0) {
            postMessage(request.result)
            return
          }

          postMessage(request.result.filter((res: Kanji) => kanjiSet.some((set) => res.set.indexOf(set) > -1)))
        }
      })
      .catch((error) => {
        db.close()
        throw error
      })
      .finally(() => db.close())
  })
})
