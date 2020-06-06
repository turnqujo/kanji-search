/**
 * TODO: How could this be done better?
 *  - Models shared with other app code cannot be imported into webworkers, since
 *    they are not modules. Repeating them here works, though, but isn't a good
 *    solution.
 */

interface ConversionItem {
  hiragana: string
  katakana: string
  romaji: string
  original?: 'katakana' | 'hiragana' | 'romaji'
}

type KanjiSet = 'jouyou' | 'jinmeiyou' | 'hyougai' | 'kyouiku' | 'jlpt'

interface Kanji {
  char: string
  stroke: number | string | number[]
  meanings: string[]
  readings: {
    on: string[]
    kun: string[]
    nanori: string[] | null
  }
  frequency: number | string
  jlpt: number | string | null
  grade: number | string | null
  set: KanjiSet[]
}

type SortBy = 'strokeCount' | 'frequency' | 'grade' | 'jlpt' | 'unicode'
type OrderBy = 'asc' | 'desc'

interface SortOptions {
  field: SortBy
  direction: OrderBy
}

interface MinMax {
  min: number | null
  max: number | null
}

type LimitField = 'jlpt' | 'grade' | 'stroke' | 'frequency'

type MatchOption = 'start' | 'anywhere' | 'exact'

type ReadingType = 'on' | 'kun' | 'nanori'
