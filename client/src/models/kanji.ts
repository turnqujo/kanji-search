export type KanjiSet = 'jouyou' | 'jinmeiyou' | 'hyougai' | 'kyouiku' | 'jlpt'
export type ReadingType = ('on' | 'kun' | 'nanori')[]

export interface KanjiReadings {
  on: string[]
  kun: string[]
  nanori: string[] | null
}

export interface Kanji {
  char: string
  stroke: number | string | number[]
  meanings: string[]
  readings: KanjiReadings
  frequency: number | string | null
  jlpt: number | string | null
  grade: number | string | null
  set: KanjiSet[]
}
