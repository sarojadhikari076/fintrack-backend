const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  config: {
    port: process.env.PORT ?? 8000,
    dbUrl: process.env.DB_URL ?? 'mongodb://localhost:27017/finance-tracker',
    isDev: process.env.ENVIRONMENT === 'DEVELOPMENT',
    secretKey: process.env.JWT_SECRET ?? 'verysecrettoken',
    jwtTtl: process.env.JWT_TTL ?? '5d'
  }
}
