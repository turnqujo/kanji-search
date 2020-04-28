onmessage = (e: MessageEvent) => {
  const { kanji, metricType, metric } = e.data as {
    kanji: Kanji[]
    metricType: 'jlpt' | 'grade' | 'stroke'
    metric: string | number
  }

  postMessage(kanji.filter((kanji) => Number(kanji[metricType]) === Number(metric)))
}
