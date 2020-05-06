export type SortBy = 'strokeCount' | 'frequency' | 'grade' | 'jlpt' | 'unicode'
export type OrderBy = 'asc' | 'desc'

export interface SortOptions {
  field: SortBy
  direction: OrderBy
}
