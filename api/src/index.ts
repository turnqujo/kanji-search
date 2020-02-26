import express from 'express'
import helmet from 'helmet'

const app = express()
app.use(helmet())
app.use(express.static('public'))

export default app
