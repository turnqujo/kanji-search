onmessage = (e: MessageEvent) => {
  const { kanjiSet, searchTerm } = e.data as {
    kanjiSet: any[]
    searchTerm: string
  }

  const found = kanjiSet.filter(
    (kanji) =>
      !!kanji.meanings.find(
        (meaning: string) => meaning.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) >= 0
      )
  )

  postMessage(found)
}
