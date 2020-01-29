const fs = require('fs')

const allKanji = JSON.parse(fs.readFileSync('../all_kanji.json', 'utf8'))
const jinmeiyoo = JSON.parse(fs.readFileSync('./jinmeiyoo_raw.json', 'utf8'))
const joyoVariants = JSON.parse(fs.readFileSync('./joyoVariants.json', 'utf8'))

const foundKanji = [] // Expected to be full kanji objects
const unknownKanji = [] // Just the kanji

let numJoyoVariants = 0

for(let jinmeiyooKanji of jinmeiyoo) {
  if (typeof jinmeiyooKanji === 'string') {
    const joyoVariant = joyoVariants.find(x => x[0] === jinmeiyooKanji)

    if (!!joyoVariant) {
      numJoyoVariants++
      jinmeiyooKanji = joyoVariant
    }
  }

  if (typeof jinmeiyooKanji === 'string') {
    const foundChar = allKanji.find(x => x.char === jinmeiyooKanji)
    if (!!foundChar) {
      foundKanji.push({...foundChar, variants: []})
      continue
    }

    unknownKanji.push(jinmeiyooKanji)
    continue
  }

  if (Array.isArray(jinmeiyooKanji)) {
    const foundChar = allKanji.find(x => x.char === jinmeiyooKanji[0])
    const foundVariation = allKanji.find(x => x.char === jinmeiyooKanji[1])

    if (!!foundChar && !!foundVariation) {
      foundKanji.push({...foundChar, variants: [jinmeiyooKanji[1]]})

      // TODO: add this one also? Maybe form a new kanji definition with merged data?
      foundKanji.push({...foundVariation, variants: [jinmeiyooKanji[0]]})
      continue
    }

    if (!!foundChar) {
      foundKanji.push({...foundChar, variants: [jinmeiyooKanji[1]]})
      continue
    }

    if (!!foundVariation) {
      foundKanji.push({...foundVariation, variants: [jinmeiyooKanji[0]]})
      continue
    }

    unknownKanji.push(jinmeiyooKanji)
    continue
  }

  console.error(`Kanji is of invalid type: ${typeof jinmeiyooKanji}\n\r${JSON.stringify(jinmeiyooKanji)}`)
}

fs.writeFileSync('./out.json', JSON.stringify(foundKanji), 'utf8')
fs.writeFileSync('./unknown.json', JSON.stringify(unknownKanji, null, 2), 'utf8')

console.log(`
  Found Kanji: ${foundKanji.length}
  Unknown Kanji: ${unknownKanji.length}
  Joyo Variants: ${joyoVariants.length}
`)

// Test output data
const output = JSON.parse(fs.readFileSync('./out.json', 'utf8'))
const duplicateKanji = []
const uniqueKanji = output.reduce((acc, curr) => {
  if (acc.indexOf(curr.char) === -1) {
    acc.push(curr.char)
    return acc
  }

  duplicateKanji.push(curr)

  return acc
}, [])

if (duplicateKanji.length > 0) {
  console.error(`Duplicate kanji found:\r\n${JSON.stringify(duplicateKanji)}`)
}

if (output.length < 863) {
  console.error(`Missing ${863 - output.length} kanji from the official list.`)
}
