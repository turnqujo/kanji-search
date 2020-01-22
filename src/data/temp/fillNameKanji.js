const fs = require('fs')

const allKanji = JSON.parse(fs.readFileSync('../all_kanji.json', 'utf8'))
const jinmeiyoo = JSON.parse(fs.readFileSync('../jinmeiyoo.json', 'utf8'))
const joyoVariants = JSON.parse(fs.readFileSync('./joyoVariants.json', 'utf8'))

const foundKanji = [] // Expected to be full kanji objects
const missingKanji = [] // Just the kanji

let numJoyoVariants = 0

for(let jinmeiyooKanji of jinmeiyoo) {
  if (typeof jinmeiyooKanji === 'string') {
    const joyoVariant = joyoVariants.find(x => x[0] === jinmeiyooKanji)

    if (!!joyoVariant) {
      if (jinmeiyooKanji === '祕') {
        console.log(`HERE! ${jinmeiyooKanji}, ${JSON.stringify(joyoVariant)}`)
      }
      
      numJoyoVariants++
      jinmeiyooKanji = joyoVariant
    }
  }

  let found
  let variants = []

  if (typeof jinmeiyooKanji === 'string') {
    found = allKanji.find(x => x.char === jinmeiyooKanji)
  }

  if (Array.isArray(jinmeiyooKanji)) {
    found = allKanji.find(x => x.char === jinmeiyooKanji[0] || x.char === jinmeiyooKanji[1])
    variants = [jinmeiyooKanji[1]]
  }

  if (!!found) {
    foundKanji.push({...found, variants})
    continue
  }

  missingKanji.push(jinmeiyooKanji)
}

fs.writeFileSync('./out.json', JSON.stringify(foundKanji, null, 2), 'utf8')
fs.writeFileSync('./unknown.json', JSON.stringify(missingKanji, null, 2), 'utf8')

console.log(`
  Found Kanji: ${foundKanji.length}
  Unknown Kanji: ${missingKanji.length}
  Joyo Variants: ${joyoVariants.length}
`)

/** TODO: There seems to be a problem with joyo variant kanji. Both the "char" and "variant"
 *        are somehow being set to the "variant", but only for some characters.
 * 
 *  NOTE: Found out that 祕 uses a variation of 秘, but these Kanji are both in the allKanji set.
 *        Not sure what the implications of this are.
 * 
  {
    "char": "秘",
    "stroke": "10",
    "meanings": [
      "secret",
      "conceal"
    ],
    "readings": [
      "ヒ"
    ],
    "variants": [
      "秘"
    ]
  },
 * 
 */
