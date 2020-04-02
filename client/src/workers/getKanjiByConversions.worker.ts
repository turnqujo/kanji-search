// TODO: How to import these?
interface Kanji {
  char: string
  stroke: number | string
  meanings: string[]
  readings: string[]
  frequency: number | string
}

interface ConversionItem {
  hiragana: string
  katakana: string
  romaji: string
}

onerror = (_error: string | ErrorEvent) => {}

onmessage = (e: MessageEvent) => {
  const { kanjiSet, conversions, matchOption = 'exact' } = e.data as {
    kanjiSet: Kanji[]
    conversions: ConversionItem[]
    matchOption: 'exact' | 'start' | 'anywhere'
  }

  if (!Array.isArray(conversions) || conversions.length === 0) {
    postMessage([])
    return
  }

  const asHiragana = conversions.map((item) => item.hiragana).join('')
  const asKatakana = conversions.map((item) => item.katakana).join('')
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
