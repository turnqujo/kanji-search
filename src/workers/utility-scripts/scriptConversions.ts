interface ConversionItem {
  keyCodes: string[]
  katakana: string
  hiragana: string
  romaji: string
}

function isNucleus(romajiChar: string) {
  return ['a', 'i', 'u', 'e', 'o'].indexOf(romajiChar) >= 0
}

function convertRomajiToConversionItem(romaji: string, conversionTable: ConversionItem[]): ConversionItem[] {
  // TODO: This should use the onmessageerror handler
  if (!romaji || romaji.length === 0) {
    throw new Error('Invalid input, malformed romaji.')
  }

  // TODO: This should use the onmessageerror handler
  if (!Array.isArray(conversionTable) || conversionTable.length === 0) {
    throw new Error('Invalid input, malformed conversionTable.')
  }

  return findNextConversion(romaji.toLocaleLowerCase(), conversionTable)
}

function findNextConversion(romaji: string, conversionTable: ConversionItem[]): ConversionItem[] {
  if (romaji.length === 0) {
    throw new Error('Romaji string is unexpectedly empty')
  }

  if (isNucleus(romaji[0])) {
    const foundConversion = conversionTable.find(item => item.romaji === romaji[0])
    if (!foundConversion) {
      throw new Error(`Failed to find nucleus match for: ${romaji[0]}`)
    }

    return romaji.length - 1 > 0
      ? [foundConversion, ...findNextConversion(romaji.substr(1), conversionTable)]
      : [foundConversion]
  }

  if (romaji[0] === 'n' && !isNucleus(romaji[1]) && !isNucleus(romaji[2])) {
    const foundConversion = conversionTable.find(item => item.romaji === romaji[0])
    if (!foundConversion) {
      throw new Error(`Failed to find "ん" match for: ${romaji[0]}`)
    }

    return romaji.length - 1 > 0
      ? [foundConversion, ...findNextConversion(romaji.substr(1), conversionTable)]
      : [foundConversion]
  }

  if (romaji.length <= 1) {
    // NOTE: Nuclei and ん are the only possible single-character kana.
    throw new Error(`Failed to find single-character conversion for: ${romaji}`)
  }

  const pairedConversion = conversionTable.find(item => item.romaji === romaji[0] + romaji[1])
  if (pairedConversion) {
    return romaji.length - 2 > 0
      ? [pairedConversion, ...findNextConversion(romaji.substr(2), conversionTable)]
      : [pairedConversion]
  }

  if (romaji.length < 3) {
    throw new Error(`Failed to find a single or double character conversion for: ${romaji}`)
  }

  const tripleConversion = conversionTable.find(
    item => item.romaji === romaji[0] + romaji[1] + romaji[2]
  )
  if (!tripleConversion) {
    throw new Error(`Failed to find a conversion of any length for: ${romaji}`)
  }

  return romaji.length - 3 > 0
    ? [tripleConversion, ...findNextConversion(romaji.substr(3), conversionTable)]
    : [tripleConversion]
}
