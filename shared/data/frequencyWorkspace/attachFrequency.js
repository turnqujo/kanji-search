const fs = require('fs')

const frequencyOrder = JSON.parse(fs.readFileSync('./wikipedia.json', 'utf8')).map(x => x[0])
// const jinmeiyooKanji = JSON.parse(fs.readFileSync('../jinmeiyoo.json', 'utf8'))
const allKanji = JSON.parse(fs.readFileSync('../../../client/src/data/joyo.json', 'utf8'))

function attachFrequency(kanjiSet) {
  return kanjiSet.map(x => {
    const index = frequencyOrder.indexOf(x.char)

    // NOTE: Infinity will be converted to null when turned to JSON
    const frequency = index < 0 ? Infinity : index + 1
    return { ...x, frequency }
  })
  .sort((prev, next) => prev.frequency < next.frequency ? -1 : 1)
}

// fs.writeFileSync('./jinmeiyooAltered.json', JSON.stringify(attachFrequency(jinmeiyooKanji), null, 2))
fs.writeFileSync('./allAltered.json', JSON.stringify(attachFrequency(allKanji)))
