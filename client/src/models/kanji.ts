export type KanjiSet = ('jouyou' | 'jinmeiyou' | 'hyougai' | 'kyouiku' | 'jlpt')[]
export type ReadingType = ('on' | 'kun' | 'nanori')[]

export interface Kanji {
  char: string
  stroke: number | string | number[]
  meanings: string[]
  readings: {
    on: string[]
    kun: string[]
    nanori: string[] | null
  }
  frequency: number | string | null
  jlpt: number | string | null
  grade: number | string | null
  set: KanjiSet
}
