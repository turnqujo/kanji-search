onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = (e: MessageEvent) => {
  const { kana, kanjiSet, matchOption = 'exact' } = e.data as {
    kana: string
    kanjiSet: any[]
    conversionTable: any[]
    matchOption: 'exact' | 'start' | 'anywhere'
  }

  if (!kana || kanjiSet.length === 0) {
    postMessage([])
  }

  postMessage(
    kanjiSet.filter(
      kanji =>
        !!kanji.readings.find((reading: string) => {
          switch (matchOption) {
            case 'exact':
              return reading === kana
            case 'start':
              return reading.startsWith(kana)
            case 'anywhere':
              return reading.indexOf(kana) >= 0
            default:
              if (onerror) {
                (onerror as any)('Error: Unknown match option')
              }
          }
        })
    )
  )
}
