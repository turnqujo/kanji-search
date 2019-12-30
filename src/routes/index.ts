import express from 'express'
import helmet from 'helmet'
import webworkerRoutes from './webworker'

const app = express()
app.use(helmet())
app.use('/webworker', webworkerRoutes)
app.get('/', (req, res) => {
  res.send(`
    <h1>Hello!</h1>
    <script>
      window.someWorker = new Worker('/webworker/all-kanji')
    </script>
  `)
})

export default app
