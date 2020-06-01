onmessage = (e: MessageEvent) => {
  const { kanjiSet, searchTerm, matchOption = 'anywhere' } = e.data as {
    kanjiSet: any[]
    searchTerm: string
    matchOption: 'start' | 'anywhere' | 'exact'
  }

  let comparisonFunc: (a: string, b: string) => boolean
  switch (matchOption) {
    case 'anywhere':
      comparisonFunc = (a: string, b: string) => a.toLocaleLowerCase().indexOf(b.toLocaleLowerCase()) >= 0
      break
    case 'exact':
      comparisonFunc = (a: string, b: string) => a.toLocaleLowerCase() === b.toLocaleLowerCase()
      break
    case 'start':
      comparisonFunc = (a: string, b: string) => a.toLocaleLowerCase().startsWith(b.toLocaleLowerCase())
      break
    default:
      throw new Error('Unknown match option')
  }

  postMessage(
    kanjiSet.filter((kanji) => !!kanji.meanings.find((meaning: string) => comparisonFunc(meaning, searchTerm)))
  )
}
