import { Router } from 'express'
import fs from 'fs'
import { transpile } from 'typescript'

const webworkerRoutes = Router()

function convertToJavaScript(typeScriptCode: Buffer): Buffer {
  const transpiled = transpile(typeScriptCode.toString())
  return Buffer.alloc(transpiled.length, transpiled)
}

webworkerRoutes.get('/kanji-loader', (_, res) =>
  fs.readFile('src/webworkers/loadKanji.ts', (err, data) =>
    !!err
      ? res.status(500).send('Something went wrong.')
      : res.type('.js').send(convertToJavaScript(data))
  )
)

webworkerRoutes.get('/all-kanji', (_, res) =>
  fs.readFile('src/webworkers/getAllKanji.ts', (err, data) =>
    !!err
      ? res.status(500).send('Something went wrong.')
      : res.type('.js').send(convertToJavaScript(data))
  )
)

export default webworkerRoutes
