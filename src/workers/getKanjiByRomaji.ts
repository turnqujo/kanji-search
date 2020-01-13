importScripts('utility-scripts/scriptConversions.js')

onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = (e: MessageEvent) => {
  // TODO: Should matchOption default to anywhere?
  const { romaji, kanjiSet, conversionTable, matchOption = 'exact' } = e.data as {
    romaji: string
    kanjiSet: any[]
    conversionTable: any[]
    matchOption: any
  }

  if (!romaji || kanjiSet.length === 0) {
    postMessage([])
  }

  // @ts-ignore TODO: Why is this function not being found?
  const convertedRomaji: any[] = convertRomajiToConversionItem(romaji, conversionTable)
  const asHiragana = convertedRomaji.map(item => item.hiragana).join('')
  const asKatakana = convertedRomaji.map(item => item.katakana).join('')

  postMessage(
    kanjiSet.filter(
      kanji =>
        !!kanji.readings.find((reading: string) => {
          switch (matchOption) {
            case 'exact':
              return reading === asHiragana || reading === asKatakana
            case 'start':
              return reading.startsWith(asHiragana) || reading.startsWith(asKatakana)
            default:
              if (onerror) {
                (onerror as any)('Error: Unknown match option')
              }
          }
        })
    )
  )
}
