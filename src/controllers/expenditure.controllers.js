const Expenditure = require('../models/expenditure.model')
const asyncWrapper = require('../utils/asyncWrapper')

const getExpenditurePlan = asyncWrapper(async (req, res) => {
  const expenditures = await Expenditure.find()

  res.status(200).json({
    ok: true,
    message: 'Expenditure fetched successfully',
    expenditures
  })
})

module.exports = {
  getExpenditurePlan
}
