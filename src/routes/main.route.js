const router = require('express').Router()
const financeRouter = require('./finance.router')

router.use('/finance', financeRouter)

module.exports = router
