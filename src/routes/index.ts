import express from 'express'
import webworkerRoutes from './webworker'

const app = express()
app.use('/webworker', webworkerRoutes)

export default app
