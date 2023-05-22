const router = require('express').Router()
const { getFinancePlan } = require('../controllers/finance.controllers')

router.get('/', getFinancePlan)

module.exports = router
