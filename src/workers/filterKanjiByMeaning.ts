onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = (e: MessageEvent) => {
  const { kanjiSet, searchTerm } = e.data as { kanjiSet: any[], searchTerm: string }
  const adjustedSearchTerm = searchTerm.toLocaleLowerCase()
  const found = kanjiSet.filter(
    kanji =>
      !!kanji.meanings.find(
        (meaning: string) => meaning.toLocaleLowerCase().indexOf(adjustedSearchTerm) >= 0
      )
  )

  postMessage(found)
}
