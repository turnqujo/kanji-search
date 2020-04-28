import { Kanji } from '../models/kanji'

const filterKanjiByMetricWorker = new Worker('workers/filterKanjiByMetric.worker.js')

export function filterKanjiByMetric(
  kanji: Kanji[],
  metricType: 'jlpt' | 'grade' | 'stroke',
  metric: string
): Promise<Kanji[]> {
  return new Promise<Kanji[]>((resolve) => {
    filterKanjiByMetricWorker.onmessage = (e: MessageEvent) => resolve(e.data)
    filterKanjiByMetricWorker.postMessage({
      kanji,
      metricType,
      metric
    })
  })
}
