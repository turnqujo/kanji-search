import { ConversionItem } from '../models/conversionItem'
import { Kanji } from '../models/kanji'

importScripts('utility-scripts/scriptConversions.js')

onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = e => {
  const { romaji, kanjiSet, conversionTable } = e.data as {
    romaji: string
    kanjiSet: Kanji[]
    conversionTable: ConversionItem[]
  }

  if (romaji.length === 0) {
    postMessage([])
  }

  if (kanjiSet.length === 0) {
    postMessage([])
  }

  // @ts-ignore TODO: Why is this function not being found?
  const convertedRomaji: ConversionItem[] = convertRomajiToConversionItem(
    romaji,
    conversionTable
  )

  const asHiragana = convertedRomaji.map(item => item.hiragana).join('')
  const asKatakana = convertedRomaji.map(item => item.katakana).join('')

  postMessage(
    kanjiSet.filter(
      kanji =>
        !!kanji.readings.find(
          // TODO: Just a simple exact search? Maybe provide multiple options for how to match?
          reading => reading === asHiragana || reading === asKatakana
        )
    )
  )
}
