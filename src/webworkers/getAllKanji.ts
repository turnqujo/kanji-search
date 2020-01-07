onmessage = _ => {
  const openRequest = indexedDB.open('kanjiStore')

  openRequest.onsuccess = () => {
    const transaction = openRequest.result.transaction('kanji', 'readonly')
    const request = transaction.objectStore('kanji').getAll()

    request.onsuccess = () => {
      openRequest.result.close()
      postMessage(request.result, '*')
    }
  }

  openRequest.onupgradeneeded = () => {
    // TODO: Remove? I don't think this can happen if a version is not given when opening
    openRequest.result.close()
    postMessage(false, '*')
  }

  openRequest.onblocked = () => {
    openRequest.result.close()
    postMessage(false, '*')
  }

  openRequest.onerror = () => {
    // TODO: Stop execution here? Will the worker continue after an error?
    openRequest.result.close()
    postMessage(false, '*')
  }
}
