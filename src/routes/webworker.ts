import { Router } from 'express'
import fs from 'fs'

const webworkerRoutes = Router()

webworkerRoutes.get('/service-worker', (_, res) =>
  fs.readFile(`build/serviceWorker.js`, (err, data) => {
    if (err) {
      res.status(500).send('Something went wrong.')
      console.error(err)
      return
    }

    res.type('.js').send(data)
  })
)

webworkerRoutes.get('/utility-scripts/dbUtil.js', (_, res) =>
  fs.readFile(`build/utility-scripts/dbUtil.js`, (err, data) => {
    if (err) {
      res.status(500).send('Something went wrong.')
      console.error(err)
      return
    }

    res.type('.js').send(data)
  })
)

webworkerRoutes.get('/get-kanji-by-meaning', (_, res) =>
  fs.readFile(`build/getKanjiByMeaning.js`, (err, data) => {
    if (err) {
      res.status(500).send('Something went wrong.')
      console.error(err)
      return
    }

    res.type('.js').send(data)
  })
)

webworkerRoutes.get('/get-all-kanji', (_, res) =>
  fs.readFile(`build/getAllKanji.js`, (err, data) => {
    if (err) {
      res.status(500).send('Something went wrong.')
      console.error(err)
      return
    }

    res.type('.js').send(data)
  })
)

export default webworkerRoutes
