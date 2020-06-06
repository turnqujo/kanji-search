import { ConversionItem } from '../../data/conversion-table'
import TestEnvWorker from './test-utils/test-env-worker'

// @ts-ignore - importing successfully, but shows error
import conversionTable from '../../../../shared/static/conversionTable.json'

interface Props {
  text: string
  conversionTable: ConversionItem[]
}

const worker = new TestEnvWorker<Props, ConversionItem[]>('src/workers/convertText.worker.ts')

async function getResponse(message: Props): Promise<ConversionItem[]> {
  return new Promise((resolve, reject) => {
    worker.onmessage = (res: any) => resolve(res.data)
    worker.onerror = (e: string | Event) => reject(e)
    worker.postMessage(message)
  })
}

describe('The Convert Text Worker.', () => {
  it('Should return an empty array when given empty text to convert.', async () => {
    const response = await getResponse({ text: '', conversionTable })
    expect(response).toEqual([])
  })

  it('Should handle converting unmixed romaji.', async () => {
    const response = await getResponse({ text: 'anyakinnpunugyo', conversionTable })
    expect(response).toEqual([
      { katakana: 'ア', hiragana: 'あ', romaji: 'a', original: 'romaji' },
      { katakana: 'ニャ', hiragana: 'にゃ', romaji: 'nya', original: 'romaji' },
      { katakana: 'キ', hiragana: 'き', romaji: 'ki', original: 'romaji' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'romaji' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'romaji' },
      { katakana: 'プ', hiragana: 'ぷ', romaji: 'pu', original: 'romaji' },
      { katakana: 'ヌ', hiragana: 'ぬ', romaji: 'nu', original: 'romaji' },
      { katakana: 'ギョ', hiragana: 'ぎょ', romaji: 'gyo', original: 'romaji' }
    ])
  })

  it('Should handle converting unmixed katakana.', async () => {
    const response = await getResponse({ text: 'アニャキンンプヌギョ', conversionTable })
    expect(response).toEqual([
      { katakana: 'ア', hiragana: 'あ', romaji: 'a', original: 'katakana' },
      { katakana: 'ニャ', hiragana: 'にゃ', romaji: 'nya', original: 'katakana' },
      { katakana: 'キ', hiragana: 'き', romaji: 'ki', original: 'katakana' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'katakana' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'katakana' },
      { katakana: 'プ', hiragana: 'ぷ', romaji: 'pu', original: 'katakana' },
      { katakana: 'ヌ', hiragana: 'ぬ', romaji: 'nu', original: 'katakana' },
      { katakana: 'ギョ', hiragana: 'ぎょ', romaji: 'gyo', original: 'katakana' }
    ])
  })

  it('Should handle converting unmixed hiragana.', async () => {
    const response = await getResponse({ text: 'あにゃきんんぷぬぎょ', conversionTable })
    expect(response).toEqual([
      { katakana: 'ア', hiragana: 'あ', romaji: 'a', original: 'hiragana' },
      { katakana: 'ニャ', hiragana: 'にゃ', romaji: 'nya', original: 'hiragana' },
      { katakana: 'キ', hiragana: 'き', romaji: 'ki', original: 'hiragana' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'hiragana' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'hiragana' },
      { katakana: 'プ', hiragana: 'ぷ', romaji: 'pu', original: 'hiragana' },
      { katakana: 'ヌ', hiragana: 'ぬ', romaji: 'nu', original: 'hiragana' },
      { katakana: 'ギョ', hiragana: 'ぎょ', romaji: 'gyo', original: 'hiragana' }
    ])
  })

  it('Should handle converting mixed text.', async () => {
    const response = await getResponse({ text: 'aニャきnんプnuぎょ', conversionTable })
    expect(response).toEqual([
      { katakana: 'ア', hiragana: 'あ', romaji: 'a', original: 'romaji' },
      { katakana: 'ニャ', hiragana: 'にゃ', romaji: 'nya', original: 'katakana' },
      { katakana: 'キ', hiragana: 'き', romaji: 'ki', original: 'hiragana' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'romaji' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'hiragana' },
      { katakana: 'プ', hiragana: 'ぷ', romaji: 'pu', original: 'katakana' },
      { katakana: 'ヌ', hiragana: 'ぬ', romaji: 'nu', original: 'romaji' },
      { katakana: 'ギョ', hiragana: 'ぎょ', romaji: 'gyo', original: 'hiragana' }
    ])
  })

  it('Should be case insensitive.', async () => {
    const response = await getResponse({ text: 'ニャDO', conversionTable })
    expect(response).toEqual([
      { katakana: 'ニャ', hiragana: 'にゃ', romaji: 'nya', original: 'katakana' },
      { katakana: 'ド', hiragana: 'ど', romaji: 'do', original: 'romaji' }
    ])
  })

  it('Should support searching for "n" with a preceding vowel.', async () => {
    const response = await getResponse({ text: 'あn', conversionTable })
    expect(response).toEqual([
      { katakana: 'ア', hiragana: 'あ', romaji: 'a', original: 'hiragana' },
      { katakana: 'ン', hiragana: 'ん', romaji: 'n', original: 'romaji' }
    ])
  })

  it('Should throw an error if given a malformed or missing conversion table.', async () => {
    expect.assertions(2)
    const expectedMessage = 'Conversion table is malformed or missing.'

    await getResponse({ text: 'あ', conversionTable: [] }).catch((e) => {
      expect(e.message).toBe(expectedMessage)
    })

    await getResponse({ text: 'あ', conversionTable: null as unknown as ConversionItem[] }).catch((e) => {
      expect(e.message).toBe(expectedMessage)
    })
  })

  it('Should throw an error if given text which cannot be converted.', async () => {
    expect.assertions(1)

    await getResponse({ text: 'lol no way this converts', conversionTable }).catch((e) => {
      expect(e.message).toBe('Could not find conversion for input.')
    })
  })
})
