function findConversionItem(
  needle: string,
  conversionTable: ConversionItem[]
): ConversionItem | null {
  const romajiIndex = conversionTable.findIndex((item) => item.romaji === needle)
  if (romajiIndex >= 0) {
    return { ...conversionTable[romajiIndex], original: 'romaji' }
  }

  const hiraganaIndex = conversionTable.findIndex((item) => item.hiragana === needle)
  if (hiraganaIndex >= 0) {
    return { ...conversionTable[hiraganaIndex], original: 'hiragana' }
  }

  const katakanaIndex = conversionTable.findIndex((item) => item.katakana === needle)
  if (katakanaIndex >= 0) {
    return { ...conversionTable[katakanaIndex], original: 'katakana' }
  }

  return null
}

function convertText(text: string, conversionTable: ConversionItem[]): ConversionItem[] {
  // NOTE: 3 is the most characters needed for a section of text to be unambiguous
  for (let selectionLength = 3; selectionLength >= 1; selectionLength--) {
    const foundConversion = findConversionItem(text.slice(0, selectionLength), conversionTable)
    if (foundConversion === null) {
      continue
    }

    if (!foundConversion.original) {
      throw new Error('`foundConversion` has unexpectedly empty "original" property.')
    }
    const conversionLength = Number(foundConversion[foundConversion.original].length)

    return text.length - conversionLength > 0
      ? [foundConversion, ...convertText(text.substr(conversionLength), conversionTable)]
      : [foundConversion]
  }

  throw new Error('Could not find conversion for input.')
}

onmessage = (e: MessageEvent) => {
  const { text, conversionTable } = e.data as {
    text: string // NOTE: Can be romaji / hiragana / katakana / mixed
    conversionTable: ConversionItem[]
  }

  if (!text) {
    postMessage([])
    return
  }

  if (!Array.isArray(conversionTable) || conversionTable.length === 0) {
    throw new Error('Conversion table is malformed or missing.')
  }

  postMessage(convertText(text.toLocaleLowerCase(), conversionTable))
}
