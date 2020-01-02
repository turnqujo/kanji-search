import { Kanji } from '../models/kanji'

onmessage = (e: MessageEvent) => {
  const k: Kanji | null = null;
  postMessage(e.data * 2, '*')
}
