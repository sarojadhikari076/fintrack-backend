const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  config: {
    port: process.env.PORT ?? 8000,
    dbUrl: process.env.DB_URL ?? 'mongodb://localhost/finance-tracker'
  }
}
