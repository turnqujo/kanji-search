const fs = require('fs')

const jooyooKanji = JSON.parse(fs.readFileSync('../jooyooWorkspace/allAltered.json', 'utf8'))
const v1Kanji = JSON.parse(fs.readFileSync('./out.json', 'utf8'))

const updated = v1Kanji.map(v1 => {
  const counterpart = jooyooKanji.find(x => x.char === v1.char)
  if (!counterpart) {
    console.log(`Could not find: ${v1.char}`)
    return null
  }

  return counterpart
})

// console.log(updated)
fs.writeFileSync('./jinmeiyoo.v2.json', JSON.stringify(updated))
