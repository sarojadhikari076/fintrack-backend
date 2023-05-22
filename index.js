const express = require('express')
const { config } = require('./src/config/app')
const { db } = require('./src/config/db')
const appRouter = require('./src/routes/main.route')

const app = express()
app.use(express.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.on('close', () => {
  console.log('DB connection is close.')
})
db.once('open', () => {
  console.log('Connected to MongoDB database!')
})

app.use('/api/v1', appRouter)

app.listen(config.port, () => {
  console.log(`Server Started at ${config.port}`)
})
