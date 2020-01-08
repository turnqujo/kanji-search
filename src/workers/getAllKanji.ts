onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = _ => {
  let openRequest: IDBOpenDBRequest
  try {
    openRequest = indexedDB.open('kanjiStore')
  } catch (e) {
    if (onerror) {
      (onerror as any)(e.message)
    }

    return
  }

  openRequest.onsuccess = () => {
    let transaction: IDBTransaction
    try {
      transaction = openRequest.result.transaction('kanji', 'readonly')
    } catch (e) {
      if (onerror) {
        (onerror as any)(e.message)
      }

      openRequest.result.close()
      return
    }

    const request = transaction.objectStore('kanji').getAll()
    request.onsuccess = () => {
      openRequest.result.close()

      postMessage(request.result)
    }
  }

  openRequest.onblocked = (e: Event) => {
    openRequest.result.close()

    if (onerror) {
      (onerror as any)(e)
    }
  }

  openRequest.onerror = (e: Event) => {
    openRequest.result.close()

    if (onerror) {
      (onerror as any)(e)
    }
  }
}
