addEventListener('message', (e: MessageEvent) => {
  const { kanji, metricType, metric } = e.data as {
    kanji: Kanji[]
    metricType: LimitField
    metric: string | number | MinMax
  }

  if (typeof metric !== 'object') {
    return postMessage(kanji.filter((kanji) => Number(kanji[metricType]) === Number(metric)))
  }

  const range = metric as MinMax
  const minVal = range.min === null ? -Infinity : Number(range.min)
  const maxVal = range.max === null ? Infinity : Number(range.max)
  postMessage(
    kanji.filter((kanji) => {
      if (kanji[metricType] === null) {
        return false
      }

      const subjectMetric = Number(kanji[metricType])
      return subjectMetric >= minVal && subjectMetric <= maxVal
    })
  )
})
