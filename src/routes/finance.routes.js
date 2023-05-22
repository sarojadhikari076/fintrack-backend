const router = require('express').Router()
const {
  getFinancePlan,
  upsertFinancePlan,
  deleteFinancePlan
} = require('../controllers/finance.controllers')

router
  .route('/')
  .get(getFinancePlan)
  .patch(upsertFinancePlan)
  .delete(deleteFinancePlan)

module.exports = router
