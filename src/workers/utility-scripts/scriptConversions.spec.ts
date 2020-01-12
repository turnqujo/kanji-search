import ts from 'typescript'
import fs from 'fs'

function prepScriptConversionsScript() {
  const rawFile = fs.readFileSync('src/workers/utility-scripts/scriptConversions.ts').toString()
  const compiled = ts.transpile(rawFile)

  // TODO: Does this need to be stripped?
  const stripped = compiled
    .replace(`Object.defineProperty(exports, "__esModule", { value: true });`, '')

  return stripped
}

describe('Script Conversions: Romaji -> Conversion Item', () => {
  it('Should handle single-character romaji conversions', function() {

    // TODO: For some reason, this isn't populating this scope with the imported scripts
    eval(prepScriptConversionsScript())

    // @ts-ignore
    expect(isNucleus('a')).toBe(true)
  })
})
