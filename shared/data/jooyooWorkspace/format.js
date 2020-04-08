const fs = require('fs')
const xml2js = require('xml2js')

fs.readFile('./kanjidic2.xml', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }

  const noNewlinesData = data.replace(/(\r\n|\n|\r)/gm, "")

  xml2js.parseString(noNewlinesData, (parseError, jsonData) => {
    if (parseError) {
      console.log(parseError)
      return
    }

    const frequencyOrder = JSON.parse(fs.readFileSync('../frequencyWorkspace/wikipedia.json', 'utf8')).map(x => x[0])
    const jouyou = JSON.parse(fs.readFileSync('./jooyoo.json', 'utf-8'))
    const jinmeiyou = JSON.parse(fs.readFileSync('../jinmeiyooWorkspace/out.json', 'utf-8'))

    const jouyouChars = jouyou.map(x => x.char)
    const jinmeiyouChars = jinmeiyou.map(x => x.char)

    // Filter data
    const hasReadingMeaning = jsonData.dict.character.filter(x => x.hasOwnProperty('reading_meaning'))
    const hasMeaning = hasReadingMeaning.filter(x => Array.isArray(x.reading_meaning[0].rmgroup[0].meaning))
    const hasReadings = hasMeaning.filter(x => Array.isArray(x.reading_meaning[0].rmgroup[0].reading))

    // Reformat data
    const reformed = hasReadings.map(sourceKanji => {
      const index = frequencyOrder.indexOf(sourceKanji.literal[0])
      const frequency = index < 0 ? null : index + 1
      const char = sourceKanji.literal[0]

      let set = []
      if (jouyouChars.indexOf(char) > -1) {
        set.push('jouyou')
      }

      if (jinmeiyouChars.indexOf(char) > -1) {
        set.push('jinmeiyou')
      }

      if (set.indexOf('jouyou') === -1 && set.indexOf('jinmeiyou') === -1) {
        set.push('hyougai')
      }

      const grade = sourceKanji.misc[0].hasOwnProperty('grade') ? sourceKanji.misc[0].grade[0] : null
      if (!!grade) {
        set.push('kyouiku')
      }

      const jlpt = sourceKanji.misc[0].hasOwnProperty('jlpt') ? sourceKanji.misc[0].jlpt[0] : null
      if (!!jlpt) {
        set.push('jlpt')
      }

      return {
        char,
        stroke: sourceKanji.misc[0]['stroke_count'].sort((x, y) => x < y ? -1 : 1),
        meanings: sourceKanji.reading_meaning[0].rmgroup[0].meaning.filter(x => typeof x === 'string'),
        readings: {
          on: sourceKanji.reading_meaning[0].rmgroup[0].reading.filter(x => x.$.r_type === 'ja_on').map(x => x._),
          kun: sourceKanji.reading_meaning[0].rmgroup[0].reading.filter(x => x.$.r_type === 'ja_kun').map(x => x._),
          nanori: sourceKanji.reading_meaning[0].nanori || []
        },
        frequency,
        jlpt,
        grade,
        set
      }
    })

    fs.writeFileSync('./allAltered.json', JSON.stringify(reformed))
  })
})
