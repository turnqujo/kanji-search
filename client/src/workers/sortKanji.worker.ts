function getNumber(val: number | string | null): number {
  return val === null ? Infinity : Number(val)
}

function customSort(list: Kanji[], { field, direction }: SortOptions) {
  const leftSort = direction === 'desc' ? -1 : 1
  const rightSort = direction === 'desc' ? 1 : -1

  switch (field) {
    case 'strokeCount':
      return list.sort((x, y) => {
        const leftStroke = Number(Array.isArray(x.stroke) ? Math.min(...x.stroke) : x.stroke)
        const rightStroke = Number(Array.isArray(y.stroke) ? Math.min(...y.stroke) : y.stroke)
        return leftStroke > rightStroke ? leftSort : rightSort
      })
    case 'frequency':
      return list.sort((x, y) => (getNumber(x.frequency) > getNumber(y.frequency) ? leftSort : rightSort))
    case 'grade':
      return list.sort((x, y) => (getNumber(x.grade) > getNumber(y.grade) ? leftSort : rightSort))
    case 'jlpt':
      return list.sort((x, y) => (getNumber(x.jlpt) > getNumber(y.jlpt) ? leftSort : rightSort))
    case 'unicode':
      return list.sort((x, y) => (x.char < y.char ? leftSort : rightSort))
    default:
      throw new Error('Unknown sort by option')
  }
}

function getSortableValue(kanji: Kanji, field: SortBy) {
  switch (field) {
    case 'frequency':
      return kanji.frequency
    case 'grade':
      return kanji.grade
    case 'jlpt':
      return kanji.jlpt
    case 'strokeCount':
      return Number(Array.isArray(kanji.stroke) ? Math.min(...kanji.stroke) : kanji.stroke)
    case 'unicode':
      return parseInt(kanji.char, 16)
    default:
      throw new Error('Unknown sort by option, cannot determine sorted value')
  }
}

onmessage = (e: MessageEvent) => {
  const { kanjiSet, primary, secondary } = e.data as {
    kanjiSet: Kanji[]
    primary: SortOptions
    secondary: SortOptions | null
  }

  if (kanjiSet.length === 0) {
    postMessage([])
  }

  if (!primary || !primary.field) {
    throw new Error('Primary sort field unexpectedly empty.')
  }

  const primarySorted = customSort(kanjiSet.slice(), primary)

  if (secondary === null || primary.field === 'unicode') {
    postMessage(primarySorted)
    return
  }

  const segments = primarySorted.reduce((acc: { [key: string]: Kanji[] }, curr: Kanji) => {
    // NOTE: Adding a 'k-' prefix here to prevent it from being a number and later sorted automatically
    const key = `k-${JSON.stringify(getSortableValue(curr, primary.field))}`
    if (Object.prototype.hasOwnProperty.call(acc, key)) {
      acc[key].push(curr)
    } else {
      acc[key] = [curr]
    }

    return acc
  }, {})

  const sortedSegments = Object.keys(segments)
    .map((key) => customSort(segments[key], secondary))
    .flat()

  postMessage(sortedSegments)
}
