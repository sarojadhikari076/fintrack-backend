const mongoose = require('mongoose')
const { config } = require('./app')

mongoose.connect(config.dbUrl).catch(console.error)
const db = mongoose.connection

module.exports = {
  db
}
