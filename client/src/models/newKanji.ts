export interface NewKanji {
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
}
