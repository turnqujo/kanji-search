import { Kanji } from '../models/kanji'
importScripts('dbUtil.js')

onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = async (e: MessageEvent) => {
  const db = await openDB('kanjiStore')

  getTransaction(db, 'kanji', 'readonly')
    .then(transaction => {
      const request = transaction.objectStore('kanji').getAll()

      request.onsuccess = () => {
        db.close()

        const adjustedNeedle = e?.data?.toLocaleLowerCase()
        const found = request.result.filter(
          (kanji: Kanji) =>
            !!kanji.meanings.find(
              meaning => meaning.toLocaleLowerCase().indexOf(adjustedNeedle) >= 0
            )
        )

        postMessage(found)
      }
    })
    .catch(error => {
      if (onerror) {
        (onerror as any)(error)
      }

      db.close()
    })
}
