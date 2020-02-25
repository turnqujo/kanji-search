onerror = (error: string | Event) => {
  console.error(error)
}

onmessage = (e: MessageEvent) => {
  const { kanjiSet, sortBy, sortDirection = 'desc' } = e.data as {
    kanjiSet: any[]
    sortBy: 'strokeCount' | 'frequency' | 'unicode'
    sortDirection: 'asc' | 'desc'
  }

  if (kanjiSet.length === 0 || !sortBy) {
    // @ts-ignore
    postMessage([])
  }

  const leftSortVal = sortDirection === 'desc' ? -1 : 1
  const rightSortVal = sortDirection === 'desc' ? 1 : -1

  switch (sortBy) {
    case 'strokeCount':
      // @ts-ignore
      postMessage(
        kanjiSet.slice().sort((x, y) => {
          const leftStroke = Array.isArray(x.stroke) ? Math.min(...x.stroke) : x.stroke
          const rightStroke = Array.isArray(y.stroke) ? Math.min(...y.stroke) : y.stroke
          return leftStroke > rightStroke ? leftSortVal : rightSortVal
        })
      )
      break
    case 'frequency':
      // @ts-ignore
      postMessage(
        kanjiSet.slice().sort((x, y) => {
          if (y.frequency === null) {
            return x.frequency > Infinity ? leftSortVal : rightSortVal
          } else {
            return x.frequency > y.frequency ? leftSortVal : rightSortVal
          }
        })
      )
      break
    case 'unicode':
      // @ts-ignore
      postMessage(kanjiSet.slice().sort((x, y) => (x.char < y.char ? leftSortVal : rightSortVal)))
      break
    default:
      if (onerror) {
        ;(onerror as any)('Unknown sort by option.')
      }
      break
  }
}
