import { ConversionItem } from '../models/conversionItem'
import { Kanji } from '../models/kanji'
import { MatchOptions } from '../models/matchOptions'

importScripts('utility-scripts/scriptConversions.js')

onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = (e: MessageEvent) => {
  // TODO: Should matchOption default to anywhere?
  const { romaji, kanjiSet, conversionTable, matchOption = 'exact' } = e.data as {
    romaji: string
    kanjiSet: Kanji[]
    conversionTable: ConversionItem[]
    matchOption: MatchOptions
  }

  if (!romaji || kanjiSet.length === 0) {
    postMessage([])
  }

  // @ts-ignore TODO: Why is this function not being found?
  const convertedRomaji: ConversionItem[] = convertRomajiToConversionItem(romaji, conversionTable)
  const asHiragana = convertedRomaji.map(item => item.hiragana).join('')
  const asKatakana = convertedRomaji.map(item => item.katakana).join('')

  postMessage(
    kanjiSet.filter(
      kanji =>
        !!kanji.readings.find(reading => {
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
