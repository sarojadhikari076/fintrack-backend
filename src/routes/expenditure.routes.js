const router = require('express').Router()
const { getExpenditurePlan } = require('../controllers/expenditure.controllers')

router.get('/', getExpenditurePlan)

module.exports = router
