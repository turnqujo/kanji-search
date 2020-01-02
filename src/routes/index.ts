import express from 'express'
import helmet from 'helmet'
import webworkerRoutes from './webworker'

const app = express()
app.use(helmet())

app.use('/webworker', webworkerRoutes)

app.get('/', (_, res) => {
  res.send(`
    <h1>Hello!</h1>
    <script>
      window.someWorker = new Worker('/webworker/get-kanji-by-meaning')
    </script>
  `)
})

export default app
