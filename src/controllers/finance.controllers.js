const FinancePlan = require('../models/finance.model')
const asyncWrapper = require('../utils/asyncWrapper')

const getFinancePlan = asyncWrapper(async (req, res) => {
  const financePlan = await FinancePlan.find()

  res
    .status(200)
    .json({ ok: true, message: 'Finance fetched successfully', financePlan })
})

module.exports = {
  getFinancePlan
}
