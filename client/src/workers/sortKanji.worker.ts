// TODO: How to import these?
interface Kanji {
  char: string
  stroke: number | string
  meanings: string[]
  readings: string[]
  frequency: number | string
}

onerror = (_error: string | ErrorEvent) => {}

onmessage = (e: MessageEvent) => {
  const { kanjiSet, sortBy, order = 'desc' } = e.data as {
    kanjiSet: Kanji[]
    sortBy: 'strokeCount' | 'frequency' | 'unicode'
    order: 'asc' | 'desc'
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
        kanjiSet.slice().sort((x, y) => {
          const leftFrequency = x.frequency === null ? Infinity : Number(x.frequency)
          const rightFrequency = y.frequency === null ? Infinity : Number(y.frequency)
          return leftFrequency > rightFrequency ? leftSortVal : rightSortVal
        })
      )
      break
    case 'unicode':
      postMessage(kanjiSet.slice().sort((x, y) => (x.char < y.char ? leftSortVal : rightSortVal)))
      break
    default:
      if (self.onerror !== null) {
        self.onerror(new ErrorEvent('Error: Unknown sort by option'))
      }
      break
  }
}
