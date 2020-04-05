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

    // Filter data
    const hasReadingMeaning = jsonData.dict.character.filter(x => x.hasOwnProperty('reading_meaning'))
    const hasMeaning = hasReadingMeaning.filter(x => Array.isArray(x.reading_meaning[0].rmgroup[0].meaning))
    const hasReadings = hasMeaning.filter(x => Array.isArray(x.reading_meaning[0].rmgroup[0].reading))

    // Reformat data
    const reformed = hasReadings.map(sourceKanji => {
      const index = frequencyOrder.indexOf(sourceKanji.literal[0])
      const frequency = index < 0 ? null : index + 1

      return {
        char: sourceKanji.literal[0],
        stroke: sourceKanji.misc[0]['stroke_count'].sort((x, y) => x < y ? -1 : 1),
        meanings: sourceKanji.reading_meaning[0].rmgroup[0].meaning.filter(x => typeof x === 'string'),
        readings: {
          on: sourceKanji.reading_meaning[0].rmgroup[0].reading.filter(x => x.$.r_type === 'ja_on').map(x => x._),
          kun: sourceKanji.reading_meaning[0].rmgroup[0].reading.filter(x => x.$.r_type === 'ja_kun').map(x => x._),
          nanori: sourceKanji.reading_meaning[0].nanori || []
        },
        frequency,
        jlpt: sourceKanji.misc[0].hasOwnProperty('jlpt') ? sourceKanji.misc[0].jlpt[0] : null,
        grade: sourceKanji.misc[0].hasOwnProperty('grade') ? sourceKanji.misc[0].grade[0] : null
      }
    })

    fs.writeFileSync('./allAltered.json', JSON.stringify(reformed))
  })
})
