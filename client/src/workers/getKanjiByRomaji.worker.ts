importScripts('utility-scripts/scriptConversions.js')

onerror = (_error: string | ErrorEvent) => {}

onmessage = (e: MessageEvent) => {
  const { romaji, kanjiSet, conversionTable, matchOption = 'exact' } = e.data as {
    romaji: string
    kanjiSet: any[]
    conversionTable: any[]
    matchOption: 'exact' | 'start' | 'anywhere'
  }

  if (!romaji || kanjiSet.length === 0) {
    postMessage([])
  }

  let convertedRomaji: any[]
  try {
    convertedRomaji = convertRomajiToConversionItem(romaji, conversionTable)
  } catch (e) {
    if (self.onerror !== null) {
      self.onerror(e)
    }

    return
  }

  const asHiragana = convertedRomaji.map((item) => item.hiragana).join('')
  const asKatakana = convertedRomaji.map((item) => item.katakana).join('')
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
              if (self.onerror !== null) {
                self.onerror(new ErrorEvent('Error: Unknown match option'))
              }
          }
        })
    )
  )
}
