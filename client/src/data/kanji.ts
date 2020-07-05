import { Kanji } from '@/models'

export function fetchAllKanji(): Promise<Kanji[]> {
  return fetch('data/allKanji.json', {
    mode: 'cors',
    method: 'GET'
  }).then((resp) => resp.json())
}
