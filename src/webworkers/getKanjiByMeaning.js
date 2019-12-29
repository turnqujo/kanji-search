onmessage = e => {
  const DBOpenRequest = indexedDB.open("kanjiStore");
  DBOpenRequest.onsuccess = _e =>
    (DBOpenRequest.result
      .transaction("kanjiStore")
      .objectStore("kanjiStore")
      .getAll().onsuccess = res =>
      postMessage(
        res.target.result.filter(
          kanji => !!kanji.meanings.find(meaning => meaning.indexOf(e.data) >= 0)
        )
      ))
}
