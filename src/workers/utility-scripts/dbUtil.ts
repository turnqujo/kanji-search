function openDB(name: string, version?: number): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    let openRequest: IDBOpenDBRequest
    try {
      openRequest = indexedDB.open(name, version)
    } catch (e) {
      return reject(e)
    }

    openRequest.onsuccess = () => {
      resolve(openRequest.result)
    }

    openRequest.onerror = (e: Event) => {
      reject(e)
    }

    openRequest.onblocked = (e: Event) => {
      // TODO: Is this really a rejection?
      reject(e)
    }
  })
}

function getTransaction(db: IDBDatabase, storeNames: string | string[], mode?: IDBTransactionMode): Promise<IDBTransaction> {
  return new Promise((resolve, reject) => {
    try {
      resolve(db.transaction(storeNames, mode))
    } catch (e) {
      reject(e.message)
    }
  })
}
