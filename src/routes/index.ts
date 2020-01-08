import express from 'express'
import helmet from 'helmet'
import webworkerRoutes from './webworker'

const app = express()
app.use(helmet())
app.use('/worker', webworkerRoutes)

app.get('/', (_, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
      <script>
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/worker/service-worker')
          .then(reg => {
            console.log('Success!')
            window.someWorker = new Worker('/worker/get-all-kanji')
            window.someWorker.onerror = e => console.error(e)
            window.someWorker.onmessage = (e) => console.log(e.data)
            window.someWorker.postMessage('')
          })
          .catch(err => {
            console.error(err)
          })
        }
      </script>
      </head>
      <body>
        <h1>Hello!</h1>
      </body>
    </html>
  `)
})

export default app
