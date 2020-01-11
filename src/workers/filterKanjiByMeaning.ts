import { Kanji } from '../models/kanji'

onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = async (e: MessageEvent) => {
  const { kanjiSet, searchTerm } = e.data as { kanjiSet: Kanji[], searchTerm: string }
  const adjustedSearchTerm = searchTerm.toLocaleLowerCase()
  const found = kanjiSet.filter(
    kanji =>
      !!kanji.meanings.find(
        meaning => meaning.toLocaleLowerCase().indexOf(adjustedSearchTerm) >= 0
      )
  )

  postMessage(found)
}
