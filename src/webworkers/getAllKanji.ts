onmessage = (_) => {
  const DBOpenRequest = indexedDB.open('kanjiStore')
  DBOpenRequest.onsuccess = (_) => {
    const db = DBOpenRequest.result
    db
      .transaction('kanjiStore')
      .objectStore('kanjiStore')
      .getAll()
      .onsuccess = (res: any) => {
        postMessage(res?.target?.result, '')
        db.close()
      }
  }
}
