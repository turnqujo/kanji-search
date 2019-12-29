import { Router } from 'express'
import fs from 'fs'

const webworkerRoutes = Router()

webworkerRoutes.get('/all-kanji', (_, res) =>
  fs.readFile('src/webworkers/getAllKanji.ts', (err, data) =>
    !!err
      ? res.status(500).send(err)
      : res.send(data)
  )
)

export default webworkerRoutes
