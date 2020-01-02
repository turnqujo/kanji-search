import { Kanji } from "../models/kanji";

onmessage = (e: MessageEvent) => {
  const DBOpenRequest = indexedDB.open("kanjiStore");
  DBOpenRequest.onsuccess = _e =>
    (DBOpenRequest.result
      .transaction("kanjiStore")
      .objectStore("kanjiStore")
      .getAll()
      .onsuccess = (res: Event) => {
        postMessage((res.target as any).result.filter((kanji: Kanji) => !!kanji.meanings.find((meaning: string) => meaning.indexOf(e.data) >= 0)), '*')
      }
    )
}
