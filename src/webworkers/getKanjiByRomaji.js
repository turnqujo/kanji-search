function isNucleus(char) {
  return ['a', 'i', 'u', 'e', 'o'].indexOf(char) >= 0
}

onmessage = e => {
  fetch('../../build/conversionTable.json')
    .then(raw => raw.json())
    .then(conversionTable => {
      const DBOpenRequest = indexedDB.open("kanjiStore");
      DBOpenRequest.onsuccess = _e =>
        (DBOpenRequest.result
          .transaction("kanjiStore")
          .objectStore("kanjiStore")
          .getAll().onsuccess = res => {
            const chars = e.data.toLocaleLowerCase().split('')

            const result = []
            for (let i = 0; i < chars.length; i++) {
              const current = chars[i]
              if (current === null) {
                // TODO: I really don't like how this modifies the array
                continue
              }

              if (isNucleus(current)) {
                result.push(conversionTable.find(({romaji}) => romaji === current))
                continue
              }

              // TODO: This fails on tsu, chi, shi, and n
              const next = chars[i + 1] || null
              if (!isNucleus(next) && next !== 'n') {
                throw new Error('Invalid input, impossible romaji')
              }

              result.push(conversionTable.find(({romaji}) => romaji === current + next))
              chars[i + 1] = null
            }

            const asHiragana = result.map(x => x.hiragana).join('')
            const asKatakana = result.map(x => x.katakana).join('')

            const filtered = res.target.result.filter(
              kanji => !!kanji.readings.find(reading =>
                reading === asHiragana || reading === asKatakana)
            )

            const sorted = filtered.sort((a, b) =>
              Array.isArray(b.stroke)
                ? +a.stroke >= +Math.min(...b.stroke)
                : +a.stroke >= +b.stroke
            )

            postMessage(sorted)
          }
        )
    })
}
