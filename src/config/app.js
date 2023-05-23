const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  config: {
    port: process.env.PORT ?? 8000,
    dbUrl: process.env.DB_URL ?? 'mongodb://localhost:27017/finance-tracker',
    isDev: process.env.ENVIRONMENT === 'DEVELOPMENT',
    secretKey: process.env.JWT_SECRET ?? 'verysecrettoken',
    jwtTtl: process.env.JWT_TTL ?? '5d',
    allowedOrigins: process.env.ALLOWED_ORIGINS ?? 'http://localhost:4000',

    thresholdBudget: 100,

    mail: {
      service: process.env.MAIL_SERVICE,
      from: process.env.MAIL_FROM || 'info@domain.com',
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
      host: process.env.MAIL_HOST || 'smtp.sendgrid.net',
      port: process.env.MAIL_PORT || '465'
    }
  }
}
