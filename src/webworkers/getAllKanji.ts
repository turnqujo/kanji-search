onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = _ => {
  let openRequest: IDBOpenDBRequest
  try {
    openRequest = indexedDB.open('kanjiStore')
  } catch (e) {
    if (onerror) {
      onerror((e as Error).message)
    }
    return
  }

  openRequest.onsuccess = () => {
    let transaction: IDBTransaction
    try {
      transaction = openRequest.result.transaction('kanji', 'readonly')
    } catch (e) {
      if (onerror) {
        onerror((e as Error).message)
      }

      openRequest.result.close()
      return
    }

    const request = transaction.objectStore('kanji').getAll()
    request.onsuccess = () => {
      openRequest.result.close()
      postMessage(request.result, '*')
    }
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
