const express = require('express')
const cors = require('cors')
const { config } = require('./src/config/app')
const { db } = require('./src/config/db')
const appRouter = require('./src/routes/main.route')
const {
  notFoundHandlers,
  globalErrorHandlers
} = require('./src/utils/errorHandlers')

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: config.allowedOrigins,
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']
  })
)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.on('close', () => {
  console.log('DB connection is close.')
})
db.once('open', () => {
  console.log('Connected to MongoDB database!')
})

app.use('/api/v1', appRouter)
app.use(notFoundHandlers)
app.use(globalErrorHandlers)

app.listen(config.port, () => {
  console.log(`Server Started at ${config.port}`)
})
