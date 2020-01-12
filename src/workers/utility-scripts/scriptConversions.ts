import { ConversionItem } from '../../models/conversionItem'

function isNucleus(romajiChar: string) {
  return ['a', 'i', 'u', 'e', 'o'].indexOf(romajiChar) >= 0
}

// TODO: Why is VSCode not recognizing this function as used, but openDB is fine?
function convertRomajiToConversionItem(romaji: string, conversionTable: ConversionItem[]): ConversionItem[] {
  const chars = romaji.toLocaleLowerCase().split('') as (string|null)[]

  const result: ConversionItem[] = []
  for (let i = 0; i < chars.length; i++) {
    const currentChar = chars[i]
    if (currentChar === null) {
      // TODO: I really don't like how this modifies the array
      // NOTE: This signifies that the current romaji was handled in combination with the previous kanji
      continue
    }

    if (isNucleus(currentChar)) {
      const found = conversionTable.find(({romaji}) => romaji === currentChar)
      if (!found) {
        throw new Error('Invalid input, could not find conversion item by romaji.')
      }

      result.push(found)
      continue
    }

    // TODO: This fails on tsu, chi, shi, and n
    const next = chars[i + 1] || null
    if (next !== null && !isNucleus(next) && next !== 'n') {
      throw new Error('Invalid input, impossible romaji')
    }

    const found = conversionTable.find(({romaji}) => romaji === currentChar + next)
    if (!found) {
      throw new Error('Invalid input, could not find conversion item by combined romaji.')
    }

    result.push(found)
    chars[i + 1] = null
  }

  return result
}
