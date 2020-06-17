export interface ConversionItem {
  katakana: string
  hiragana: string
  romaji: string
  original?: 'katakana' | 'hiragana' | 'romaji'
}

const fetchConversionTable = (): Promise<ConversionItem[]> =>
  fetch('data/conversionTable.json', {
    mode: 'cors',
    method: 'GET'
  }).then((resp) => resp.json())

export default fetchConversionTable
