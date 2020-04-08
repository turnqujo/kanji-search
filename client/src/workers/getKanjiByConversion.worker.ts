onmessage = (e: MessageEvent) => {
  const { kanjiSet, conversionItems, matchOption = 'exact' } = e.data as {
    kanjiSet: Kanji[]
    conversionItems: ConversionItem[]
    matchOption: 'start' | 'anywhere' | 'exact'
  }

  if (!Array.isArray(conversionItems)) {
    throw new Error('Conversion Items is malformed.')
  }

  if (!Array.isArray(kanjiSet)) {
    throw new Error('Kanji Set is malformed.')
  }

  if (conversionItems.length === 0 || kanjiSet.length === 0) {
    postMessage([])
    return
  }

  const asHiragana = conversionItems.map((item) => item.hiragana).join('')
  const asKatakana = conversionItems.map((item) => item.katakana).join('')
  postMessage(
    kanjiSet.filter((kanji) => {
      const { on, kun, nanori } = kanji.readings
      const allReadings = [...on, ...kun]

      if (nanori) {
        allReadings.push(...nanori)
      }

      return !!allReadings.find((reading: string) => {
        switch (matchOption) {
          case 'exact':
            return reading === asHiragana || reading === asKatakana
          case 'start':
            return reading.startsWith(asHiragana) || reading.startsWith(asKatakana)
          case 'anywhere':
            return reading.indexOf(asHiragana) >= 0 || reading.indexOf(asKatakana) >= 0
          default:
            throw new Error('Unknown match option')
        }
      })
    })
  )
}
