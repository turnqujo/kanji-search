function getNumber(val: number | string | null): number {
  return val === null ? Infinity : Number(val)
}

onmessage = (e: MessageEvent) => {
  const { kanjiSet, sortBy, order = 'desc' } = e.data as {
    kanjiSet: Kanji[]
    sortBy: SortBy
    order: OrderBy
  }

  if (kanjiSet.length === 0 || !sortBy) {
    postMessage([])
  }

  const leftSortVal = order === 'desc' ? -1 : 1
  const rightSortVal = order === 'desc' ? 1 : -1

  switch (sortBy) {
    case 'strokeCount':
      postMessage(
        kanjiSet.slice().sort((x, y) => {
          const leftStroke = Number(Array.isArray(x.stroke) ? Math.min(...x.stroke) : x.stroke)
          const rightStroke = Number(Array.isArray(y.stroke) ? Math.min(...y.stroke) : y.stroke)
          return leftStroke > rightStroke ? leftSortVal : rightSortVal
        })
      )
      break
    case 'frequency':
      postMessage(
        kanjiSet
          .slice()
          .sort((x, y) =>
            getNumber(x.frequency) > getNumber(y.frequency) ? leftSortVal : rightSortVal
          )
      )
      break
    case 'grade':
      postMessage(
        kanjiSet
          .slice()
          .sort((x, y) => (getNumber(x.grade) > getNumber(y.grade) ? leftSortVal : rightSortVal))
      )
      break
    case 'jlpt':
      postMessage(
        kanjiSet
          .slice()
          .sort((x, y) => (getNumber(x.jlpt) > getNumber(y.jlpt) ? leftSortVal : rightSortVal))
      )
      break
    case 'unicode':
      postMessage(kanjiSet.slice().sort((x, y) => (x.char < y.char ? leftSortVal : rightSortVal)))
      break
    default:
      throw new Error('Unknown sort by option')
  }
}
