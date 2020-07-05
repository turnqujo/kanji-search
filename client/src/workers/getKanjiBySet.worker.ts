addEventListener('message', (e: MessageEvent) => {
  const { kanjiSet, desiredSets } = e.data as {
    kanjiSet: Kanji[]
    desiredSets: KanjiSet[]
  }

  if (desiredSets.length === 0) {
    return postMessage(kanjiSet)
  }

  postMessage(kanjiSet.filter((kanji: Kanji) => kanji.set.some((kSet: KanjiSet) => desiredSets.indexOf(kSet) > -1)))
})
