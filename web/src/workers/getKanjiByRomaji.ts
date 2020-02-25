// @ts-ignore
importScripts('utility-scripts/scriptConversions.js')

onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = (e: MessageEvent) => {
  const { romaji, kanjiSet, conversionTable, matchOption = 'exact' } = e.data as {
    romaji: string
    kanjiSet: any[]
    conversionTable: any[]
    matchOption: 'exact' | 'start' | 'anywhere'
  }

  if (!romaji || kanjiSet.length === 0) {
    // @ts-ignore
    postMessage([])
  }

  let convertedRomaji: any[]
  try {
    convertedRomaji = convertRomajiToConversionItem(romaji, conversionTable)
  } catch (e) {
    if (onerror) {
      ;(onerror as any)(e)
    }

    return
  }

  const asHiragana = convertedRomaji.map((item) => item.hiragana).join('')
  const asKatakana = convertedRomaji.map((item) => item.katakana).join('')

  // @ts-ignore
  postMessage(
    kanjiSet.filter(
      (kanji) =>
        !!kanji.readings.find((reading: string) => {
          switch (matchOption) {
            case 'exact':
              return reading === asHiragana || reading === asKatakana
            case 'start':
              return reading.startsWith(asHiragana) || reading.startsWith(asKatakana)
            case 'anywhere':
              return reading.indexOf(asHiragana) >= 0 || reading.indexOf(asKatakana) >= 0
            default:
              if (onerror) {
                ;(onerror as any)('Error: Unknown match option')
              }
          }
        })
    )
  )
}
