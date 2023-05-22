const router = require('express').Router()
const {
  getExpenditure,
  getExpenditures,
  createExpenditure,
  deleteExpenditure,
  updateExpenditure
} = require('../controllers/expenditure.controllers')

router.route('/').get(getExpenditures).post(createExpenditure)
router
  .route('/expenditureId')
  .get(getExpenditure)
  .patch(updateExpenditure)
  .delete(deleteExpenditure)

module.exports = router
