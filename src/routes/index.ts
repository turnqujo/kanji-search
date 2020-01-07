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
      window.someWorker = new Worker('/webworker/get-all-kanji')
      window.someWorker.onerror = e => console.error(e)
      window.someWorker.onmessage = (e) => console.log(e)
      window.someWorker.postMessage('')
    </script>
  `)
})

export default app
