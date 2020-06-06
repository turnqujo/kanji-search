addEventListener('message', (e: MessageEvent) => {
  const { kanjiSet, conversionItems, matchOption, readingType } = e.data as {
    kanjiSet: Kanji[]
    conversionItems: ConversionItem[]
    matchOption: MatchOption
    readingType: ReadingType[]
  }

  if (!Array.isArray(conversionItems) || conversionItems.length === 0) {
    throw new Error('Conversion table is malformed or missing.')
  }

  if (!Array.isArray(kanjiSet)) {
    throw new Error('Kanji Set is malformed or missing.')
  }

  if (!matchOption) {
    throw new Error('Match Option is malformed or missing.')
  }

  if (!Array.isArray(readingType) || readingType.length === 0) {
    throw new Error('Reading Type is malformed or missing.')
  }

  if (kanjiSet.length === 0) {
    postMessage([])
    return
  }

  const asHiragana = conversionItems.map((item) => item.hiragana).join('')
  const asKatakana = conversionItems.map((item) => item.katakana).join('')
  postMessage(
    kanjiSet.filter((kanji) => {
      const readings = []
      if (readingType.indexOf('on') > -1) {
        readings.push(...kanji.readings.on)
      }

      if (readingType.indexOf('kun') > -1) {
        readings.push(...kanji.readings.kun)
      }

      if (readingType.indexOf('nanori') > -1 && Array.isArray(kanji.readings.nanori)) {
        readings.push(...kanji.readings.nanori)
      }

      return !!readings.find((reading: string) => {
        switch (matchOption) {
          case 'exact':
            return reading === asHiragana || reading === asKatakana
          case 'start':
            return reading.startsWith(asHiragana) || reading.startsWith(asKatakana)
          case 'anywhere':
            return reading.indexOf(asHiragana) >= 0 || reading.indexOf(asKatakana) >= 0
          default:
            throw new Error('Unknown match option given.')
        }
      })
    })
  )
})
