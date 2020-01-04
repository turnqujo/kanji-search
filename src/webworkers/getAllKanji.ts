onmessage = _ => {
  const DBOpenRequest = indexedDB.open('kanjiStore')
  DBOpenRequest.onsuccess = _ =>
    DBOpenRequest.result
      .transaction('kanjiStore')
      .objectStore('kanjiStore')
      .getAll()
      .onsuccess = (res => postMessage((res.target as any).result, '*'))
}
